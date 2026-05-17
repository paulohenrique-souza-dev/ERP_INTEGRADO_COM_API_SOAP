import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Table from "../components/Table";
import Modal from "../components/Modal";

import { executarMetodo } from "../services/api";

export default function CrudPage({
  titulo,
  subtitulo,
  metodoListar,
  metodoCriar,
  campos = [],
  relacionamentos = {},
}) {
  const [dados, setDados] = useState([]);
  const [form, setForm] = useState({});
  const [mapas, setMapas] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  async function carregarRelacionamentos() {
    const novosMapas = {};

    for (const campo in relacionamentos) {
      const config = relacionamentos[campo];

      const res = await executarMetodo(config.metodo);

      const lista = Array.isArray(res?.data) ? res.data : [];

      novosMapas[campo] = {
        lista,
        id: config.id,
        label: config.label,
      };
    }

    setMapas(novosMapas);
  }

  async function carregar() {
    setLoading(true);
    setErro("");
    setSucesso("");

    try {
      await carregarRelacionamentos();

      const res = await executarMetodo(metodoListar);

      const lista = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : [];

      setDados(lista);
    } catch (error) {
      console.error("ERRO AO CARREGAR:", error);
      setErro(`Erro ao carregar ${titulo}`);
    } finally {
      setLoading(false);
    }
  }

  async function salvar(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");
    setSalvando(true);

    try {
      const payload = {};

      campos.forEach((campo) => {
        const nomeCampo = typeof campo === "string" ? campo : campo.name;
        const tipoCampo = typeof campo === "string" ? "text" : campo.type || "text";

        let valor = form[nomeCampo];

        if (valor === undefined || valor === null) {
          valor = "";
        }

        if (tipoCampo === "number" || nomeCampo.startsWith("id_")) {
          valor = valor === "" ? null : Number(valor);
        }

        payload[nomeCampo] = valor;
      });

      const res = await executarMetodo(metodoCriar, payload);

      console.log("RETORNO SALVAR:", res);

      setModal(false);
      setForm({});
      setSucesso(`${titulo} salvo com sucesso.`);

      await carregar();
    } catch (error) {
      console.error("ERRO AO SALVAR:", error);

      const mensagem =
        error?.response?.data?.message ||
        error?.response?.data?.detail ||
        error?.message ||
        `Erro ao salvar ${titulo}`;

      setErro(mensagem);
    } finally {
      setSalvando(false);
    }
  }

  function atualizarCampo(campo, valor) {
    setForm((formAtual) => ({
      ...formAtual,
      [campo]: valor,
    }));
  }

  function abrirModal() {
    setErro("");
    setSucesso("");
    setForm({});
    setModal(true);
  }

  function fecharModal() {
    setModal(false);
    setForm({});
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Header titulo={titulo} subtitulo={subtitulo} />

        <div className="actions">
          <button type="button" onClick={abrirModal}>
            Novo Registro
          </button>

          <button type="button" className="secondary" onClick={carregar}>
            Atualizar
          </button>
        </div>

        {erro && <div className="alert-error">{erro}</div>}
        {sucesso && <div className="alert-success">{sucesso}</div>}

        <section className="panel">
          {loading ? (
            <p>Carregando dados...</p>
          ) : (
            <Table dados={dados} relacionamentos={mapas} />
          )}
        </section>

        <Modal aberto={modal} titulo={`Novo ${titulo}`} onClose={fecharModal}>
          <form onSubmit={salvar} className="form">
            {campos.map((campo) => {
              const nomeCampo = typeof campo === "string" ? campo : campo.name;
              const labelCampo = typeof campo === "string" ? campo : campo.label;
              const tipoCampo = typeof campo === "string" ? "text" : campo.type || "text";
              const required = typeof campo === "string" ? true : campo.required !== false;

              const relacionamento = mapas[nomeCampo];

              return (
                <div className="form-group" key={nomeCampo}>
                  <label>{labelCampo}</label>

                  {relacionamento ? (
                    <select
                      value={form[nomeCampo] || ""}
                      required={required}
                      onChange={(e) => atualizarCampo(nomeCampo, e.target.value)}
                    >
                      <option value="">Selecione...</option>

                      {relacionamento.lista.map((item) => (
                        <option
                          key={item[relacionamento.id]}
                          value={item[relacionamento.id]}
                        >
                          {item[relacionamento.label]}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={tipoCampo}
                      placeholder={labelCampo}
                      value={form[nomeCampo] || ""}
                      required={required}
                      onChange={(e) => atualizarCampo(nomeCampo, e.target.value)}
                    />
                  )}
                </div>
              );
            })}

            <button type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </form>
        </Modal>
      </main>
    </div>
  );
}
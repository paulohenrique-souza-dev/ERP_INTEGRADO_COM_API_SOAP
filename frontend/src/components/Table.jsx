import { formatarDataBR, formatarMoeda } from "../utils/formatters";

export default function Table({ dados = [], relacionamentos = {} }) {
  if (!dados || dados.length === 0) {
    return <div className="empty">Nenhum dado encontrado.</div>;
  }

  const colunas = Object.keys(dados[0]);

  function buscarNomeRelacionado(coluna, valor) {
    const config = relacionamentos[coluna];

    if (!config) return null;

    const encontrado = config.lista.find(
      (item) => Number(item[config.id]) === Number(valor)
    );

    return encontrado ? encontrado[config.label] : valor;
  }

  function formatarValor(coluna, valor) {
    if (valor === null || valor === undefined || valor === "") return "-";

    const relacionado = buscarNomeRelacionado(coluna, valor);

    if (relacionado !== null) return relacionado;

    const nomeColuna = coluna.toLowerCase();

    if (
      nomeColuna.includes("data") ||
      nomeColuna.includes("admissao") ||
      nomeColuna.includes("cadastro") ||
      nomeColuna.includes("atualizacao")
    ) {
      return formatarDataBR(valor);
    }

    if (
      nomeColuna.includes("preco") ||
      nomeColuna.includes("valor") ||
      nomeColuna.includes("custo") ||
      nomeColuna.includes("salario")
    ) {
      return formatarMoeda(valor);
    }

    return String(valor);
  }

  function nomeColuna(coluna) {
    const nomes = {
      id_cliente: "Cliente",
      id_vendedor: "Vendedor",
      id_produto: "Produto",
      id_categoria: "Categoria",
      id_fornecedor: "Fornecedor",
      id_pedido: "Pedido",
      id_item: "Item",
      id_estoque: "Estoque",
      nome_produto: "Produto",
      nome_categoria: "Categoria",
      nome_fornecedor: "Fornecedor",
      data_cadastro: "Data cadastro",
      data_admissao: "Data admissão",
      data_atualizacao: "Data atualização",
      data_pedido: "Data pedido",
      status_pedido: "Status",
      valor_unitario: "Valor unitário",
      estoque_minimo: "Estoque mínimo",
      tipo_cliente: "Tipo",
    };

    return nomes[coluna] || coluna.replaceAll("_", " ");
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {colunas.map((coluna) => (
              <th key={coluna}>{nomeColuna(coluna)}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              {colunas.map((coluna) => (
                <td key={coluna}>{formatarValor(coluna, item[coluna])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import CrudPage from "./CrudPage";

export default function Vendedores() {
  return (
    <CrudPage
      titulo="Vendedores"
      subtitulo="Equipe comercial"
      metodoListar="GetVendedores"
      metodoCriar="CreateVendedor"
      campos={[
        { name: "nome", label: "Nome", type: "text" },
        { name: "regiao", label: "Região", type: "text" },
        { name: "salario", label: "Salário", type: "number" },
        { name: "data_admissao", label: "Data admissão", type: "date" },
      ]}
    />
  );
}
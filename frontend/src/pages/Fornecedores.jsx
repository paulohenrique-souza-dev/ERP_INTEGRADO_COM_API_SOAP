import CrudPage from "./CrudPage";

export default function Fornecedores() {
  return (
    <CrudPage
      titulo="Fornecedores"
      subtitulo="Gestão de fornecedores"
      metodoListar="GetFornecedores"
      metodoCriar="CreateFornecedor"
      campos={[
        { name: "nome_fornecedor", label: "Nome do fornecedor", type: "text" },
        { name: "cidade", label: "Cidade", type: "text" },
        { name: "estado", label: "Estado", type: "text" },
      ]}
    />
  );
}
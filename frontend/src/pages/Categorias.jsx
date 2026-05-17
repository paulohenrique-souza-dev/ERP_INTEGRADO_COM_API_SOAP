import CrudPage from "./CrudPage";

export default function Categorias() {
  return (
    <CrudPage
      titulo="Categorias"
      subtitulo="Cadastro de categorias"
      metodoListar="GetCategorias"
      metodoCriar="CreateCategoria"
      campos={[
        { name: "nome_categoria", label: "Nome da categoria", type: "text" },
      ]}
    />
  );
}
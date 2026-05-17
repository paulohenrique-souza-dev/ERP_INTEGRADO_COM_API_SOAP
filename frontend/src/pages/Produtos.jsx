import CrudPage from "./CrudPage";

export default function Produtos() {
  return (
    <CrudPage
      titulo="Produtos"
      subtitulo="Controle profissional de produtos"
      metodoListar="GetProdutos"
      metodoCriar="CreateProduto"
      campos={[
        { name: "nome_produto", label: "Nome do produto", type: "text" },
        { name: "preco", label: "Preço", type: "number" },
        { name: "custo", label: "Custo", type: "number" },
        { name: "id_categoria", label: "Categoria", type: "number" },
        { name: "id_fornecedor", label: "Fornecedor", type: "number" },
      ]}
      relacionamentos={{
        id_categoria: {
          metodo: "GetCategorias",
          id: "id_categoria",
          label: "nome_categoria",
        },
        id_fornecedor: {
          metodo: "GetFornecedores",
          id: "id_fornecedor",
          label: "nome_fornecedor",
        },
      }}
    />
  );
}
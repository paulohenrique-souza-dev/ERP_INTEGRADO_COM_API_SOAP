import CrudPage from "./CrudPage";

export default function Estoque() {
  return (
    <CrudPage
      titulo="Estoque"
      subtitulo="Controle de estoque"
      metodoListar="GetEstoque"
      metodoCriar="CreateEstoque"
      campos={[
        { name: "quantidade", label: "Quantidade", type: "number" },
        { name: "estoque_minimo", label: "Estoque mínimo", type: "number" },
        { name: "data_atualizacao", label: "Data atualização", type: "date" },
        { name: "id_produto", label: "Produto", type: "number" },
      ]}
      relacionamentos={{
        id_produto: {
          metodo: "GetProdutos",
          id: "id_produto",
          label: "nome_produto",
        },
      }}
    />
  );
}
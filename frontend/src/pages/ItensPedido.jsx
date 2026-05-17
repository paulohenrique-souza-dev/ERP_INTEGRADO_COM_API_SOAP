import CrudPage from "./CrudPage";

export default function ItensPedido() {
  return (
    <CrudPage
      titulo="Itens do Pedido"
      subtitulo="Produtos vendidos dentro dos pedidos"
      metodoListar="GetItensPedido"
      metodoCriar="CreateItemPedido"
      campos={[
        { name: "quantidade", label: "Quantidade", type: "number" },
        { name: "valor_unitario", label: "Valor unitário", type: "number" },
        { name: "id_pedido", label: "Pedido", type: "number" },
        { name: "id_produto", label: "Produto", type: "number" },
      ]}
      relacionamentos={{
        id_pedido: {
          metodo: "GetPedidos",
          id: "id_pedido",
          label: "id_pedido",
        },
        id_produto: {
          metodo: "GetProdutos",
          id: "id_produto",
          label: "nome_produto",
        },
      }}
    />
  );
}
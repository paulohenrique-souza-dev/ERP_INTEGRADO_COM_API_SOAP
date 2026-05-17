import CrudPage from "./CrudPage";

export default function Pedidos() {
  return (
    <CrudPage
      titulo="Pedidos"
      subtitulo="Gestão de pedidos"
      metodoListar="GetPedidos"
      metodoCriar="CreatePedido"
      campos={[
        { name: "data_pedido", label: "Data do pedido", type: "date" },
        { name: "status_pedido", label: "Status", type: "text" },
        { name: "id_cliente", label: "Cliente", type: "number" },
        { name: "id_vendedor", label: "Vendedor", type: "number" },
      ]}
      relacionamentos={{
        id_cliente: {
          metodo: "GetClientes",
          id: "id_cliente",
          label: "nome",
        },
        id_vendedor: {
          metodo: "GetVendedores",
          id: "id_vendedor",
          label: "nome",
        },
      }}
    />
  );
}
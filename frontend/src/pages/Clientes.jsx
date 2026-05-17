import CrudPage from "./CrudPage";

export default function Clientes() {
  return (
    <CrudPage
      titulo="Clientes"
      subtitulo="Gestão de clientes "
      metodoListar="GetClientes"
      metodoCriar="CreateCliente"
      campos={[
        { name: "nome", label: "Nome", type: "text" },
        { name: "cidade", label: "Cidade", type: "text" },
        { name: "data_cadastro", label: "Data de cadastro", type: "date" },
        { name: "tipo_cliente", label: "Tipo do cliente", type: "text" },
      ]}
    />
  );
}
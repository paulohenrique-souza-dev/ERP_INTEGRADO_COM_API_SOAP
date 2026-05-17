import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Produtos from "./pages/Produtos";
import Pedidos from "./pages/Pedidos";
import Estoque from "./pages/Estoque";
import Categorias from "./pages/Categorias";
import Fornecedores from "./pages/Fornecedores";
import Vendedores from "./pages/Vendedores";
import ItensPedido from "./pages/ItensPedido";

import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/itens-pedido" element={<ItensPedido />} />
        <Route path="/estoque" element={<Estoque />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/vendedores" element={<Vendedores />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
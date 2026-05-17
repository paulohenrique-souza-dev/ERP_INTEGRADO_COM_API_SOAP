import { NavLink } from "react-router-dom";

const links = [
  { path: "/", label: "Dashboard" },
  { path: "/clientes", label: "Clientes" },
  { path: "/produtos", label: "Produtos" },
  { path: "/pedidos", label: "Pedidos" },
  { path: "/itens-pedido", label: "Itens Pedido" },
  { path: "/estoque", label: "Estoque" },
  { path: "/categorias", label: "Categorias" },
  { path: "/fornecedores", label: "Fornecedores" },
  { path: "/vendedores", label: "Vendedores" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">E</div>

        <div>
          <strong>ERP & Análises</strong>
          <span>Gestão e Insights</span>
        </div>
      </div>

      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
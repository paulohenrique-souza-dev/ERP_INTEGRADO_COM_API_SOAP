import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Wallet,
  AlertTriangle,
  CalendarClock,
  Trophy,
  UserRoundCheck,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { executarMetodo } from "../services/api";
import {
  formatarDataBR,
  formatarMoeda,
  formatarNumero,
} from "../utils/formatters";

const cores = ["#635bff", "#ff7a59", "#ffd166", "#22c55e", "#38bdf8", "#a855f7"];

function CardIndicador({ titulo, valor, detalhe, tipo = "", Icone }) {
  return (
    <div className={`card ${tipo}`}>
      <div className="card-top">
        <div>
          <span>{titulo}</span>
          <strong>{valor}</strong>
          <small>{detalhe}</small>
        </div>

        <div className="card-icon">
          <Icone size={24} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [itensPedido, setItensPedido] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarDashboard() {
    try {
      const [
        resClientes,
        resProdutos,
        resPedidos,
        resEstoque,
        resItensPedido,
        resVendedores,
      ] = await Promise.all([
        executarMetodo("GetClientes", {}, true),
        executarMetodo("GetProdutos", {}, true),
        executarMetodo("GetPedidos", {}, true),
        executarMetodo("GetEstoque", {}, true),
        executarMetodo("GetItensPedido", {}, true),
        executarMetodo("GetVendedores", {}, true),
      ]);

      setClientes(Array.isArray(resClientes.data) ? resClientes.data : []);
      setProdutos(Array.isArray(resProdutos.data) ? resProdutos.data : []);
      setPedidos(Array.isArray(resPedidos.data) ? resPedidos.data : []);
      setEstoque(Array.isArray(resEstoque.data) ? resEstoque.data : []);
      setItensPedido(Array.isArray(resItensPedido.data) ? resItensPedido.data : []);
      setVendedores(Array.isArray(resVendedores.data) ? resVendedores.data : []);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDashboard();
  }, []);

  const analytics = useMemo(() => {
    const mapaProdutos = {};
    const mapaPedidos = {};
    const mapaClientes = {};
    const mapaVendedores = {};

    produtos.forEach((produto) => {
      mapaProdutos[Number(produto.id_produto)] = produto;
    });

    pedidos.forEach((pedido) => {
      mapaPedidos[Number(pedido.id_pedido)] = pedido;
    });

    clientes.forEach((cliente) => {
      mapaClientes[Number(cliente.id_cliente)] = cliente;
    });

    vendedores.forEach((vendedor) => {
      mapaVendedores[Number(vendedor.id_vendedor)] = vendedor;
    });

    const vendasPorProduto = {};
    const vendasPorCliente = {};
    const vendasPorVendedor = {};

    let faturamentoTotal = 0;
    let quantidadeVendida = 0;

    itensPedido.forEach((item) => {
      const idProduto = Number(item.id_produto);
      const idPedido = Number(item.id_pedido);

      const produto = mapaProdutos[idProduto];
      const pedido = mapaPedidos[idPedido];

      const idCliente = Number(pedido?.id_cliente);
      const idVendedor = Number(pedido?.id_vendedor);

      const cliente = mapaClientes[idCliente];
      const vendedor = mapaVendedores[idVendedor];

      const quantidade = Number(item.quantidade || 0);
      const valorUnitario = Number(item.valor_unitario || produto?.preco || 0);
      const total = quantidade * valorUnitario;

      faturamentoTotal += total;
      quantidadeVendida += quantidade;

      if (!vendasPorProduto[idProduto]) {
        vendasPorProduto[idProduto] = {
          id_produto: idProduto,
          nome: produto?.nome_produto || `Produto #${idProduto}`,
          quantidade: 0,
          faturamento: 0,
        };
      }

      vendasPorProduto[idProduto].quantidade += quantidade;
      vendasPorProduto[idProduto].faturamento += total;

      if (idCliente) {
        if (!vendasPorCliente[idCliente]) {
          vendasPorCliente[idCliente] = {
            id_cliente: idCliente,
            nome: cliente?.nome || `Cliente #${idCliente}`,
            pedidos: new Set(),
            quantidade: 0,
            faturamento: 0,
          };
        }

        vendasPorCliente[idCliente].pedidos.add(idPedido);
        vendasPorCliente[idCliente].quantidade += quantidade;
        vendasPorCliente[idCliente].faturamento += total;
      }

      if (idVendedor) {
        if (!vendasPorVendedor[idVendedor]) {
          vendasPorVendedor[idVendedor] = {
            id_vendedor: idVendedor,
            nome: vendedor?.nome || `Vendedor #${idVendedor}`,
            pedidos: new Set(),
            quantidade: 0,
            faturamento: 0,
          };
        }

        vendasPorVendedor[idVendedor].pedidos.add(idPedido);
        vendasPorVendedor[idVendedor].quantidade += quantidade;
        vendasPorVendedor[idVendedor].faturamento += total;
      }
    });

    const topProdutosVendidos = Object.values(vendasPorProduto)
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 5);

    const faturamentoPorProduto = Object.values(vendasPorProduto)
      .sort((a, b) => b.faturamento - a.faturamento)
      .slice(0, 5);

    const topClientes = Object.values(vendasPorCliente)
      .map((cliente) => ({
        ...cliente,
        pedidos: cliente.pedidos.size,
      }))
      .sort((a, b) => b.faturamento - a.faturamento)
      .slice(0, 8);

    const topVendedores = Object.values(vendasPorVendedor)
      .map((vendedor) => ({
        ...vendedor,
        pedidos: vendedor.pedidos.size,
      }))
      .sort((a, b) => b.faturamento - a.faturamento)
      .slice(0, 3);

    const pedidosPorStatus = Object.values(
      pedidos.reduce((acc, pedido) => {
        const status = pedido.status_pedido || "Sem status";

        if (!acc[status]) {
          acc[status] = {
            name: status,
            value: 0,
          };
        }

        acc[status].value += 1;
        return acc;
      }, {})
    );

    const pedidosPorData = Object.values(
      pedidos.reduce((acc, pedido) => {
        const data = formatarDataBR(pedido.data_pedido);

        if (!acc[data]) {
          acc[data] = {
            data,
            pedidos: 0,
          };
        }

        acc[data].pedidos += 1;
        return acc;
      }, {})
    );

    const produtosPorCategoria = Object.values(
      produtos.reduce((acc, produto) => {
        const categoria = `Categoria ${produto.id_categoria || "-"}`;

        if (!acc[categoria]) {
          acc[categoria] = {
            categoria,
            produtos: 0,
          };
        }

        acc[categoria].produtos += 1;
        return acc;
      }, {})
    );

    const valorEstoquePorProduto = estoque
      .map((item) => {
        const produto = mapaProdutos[Number(item.id_produto)];
        const quantidade = Number(item.quantidade || 0);
        const preco = Number(produto?.preco || 0);

        return {
          nome: produto?.nome_produto || `Produto #${item.id_produto}`,
          valor: quantidade * preco,
          quantidade,
          minimo: Number(item.estoque_minimo || 0),
        };
      })
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 5);

    const estoqueBaixo = estoque.filter(
      (item) => Number(item.quantidade || 0) <= Number(item.estoque_minimo || 0)
    );

    const ticketMedio = pedidos.length > 0 ? faturamentoTotal / pedidos.length : 0;

    return {
      faturamentoTotal,
      quantidadeVendida,
      ticketMedio,
      topProdutosVendidos,
      faturamentoPorProduto,
      topClientes,
      topVendedores,
      pedidosPorStatus,
      pedidosPorData,
      produtosPorCategoria,
      valorEstoquePorProduto,
      estoqueBaixo,
    };
  }, [clientes, produtos, pedidos, estoque, itensPedido, vendedores]);

  if (loading) {
    return (
      <div className="layout">
        <Sidebar />
        <main className="content">
          <p>Carregando dashboard...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Header
          titulo="ERP & Análises"
          subtitulo="Sistema V1"
        />

        <section className="cards">
          <CardIndicador
            titulo="Clientes"
            valor={formatarNumero(clientes.length)}
            detalhe="Total cadastrados"
            Icone={Users}
          />

          <CardIndicador
            titulo="Produtos"
            valor={formatarNumero(produtos.length)}
            detalhe="Produtos ativos"
            
            Icone={Package}
          />

          <CardIndicador
            titulo="Pedidos"
            valor={formatarNumero(pedidos.length)}
            detalhe="Pedidos registrados"
            
            Icone={ShoppingCart}
          />

          <CardIndicador
            titulo="Faturamento"
            valor={formatarMoeda(analytics.faturamentoTotal)}
            detalhe="Baseado nos itens dos pedidos"
            
            Icone={DollarSign}
          />
        </section>

        <section className="cards">
          <CardIndicador
            titulo="Qtd. vendida"
            valor={formatarNumero(analytics.quantidadeVendida)}
            detalhe="Soma dos itens vendidos"
            Icone={TrendingUp}
          />

          <CardIndicador
            titulo="Ticket médio"
            valor={formatarMoeda(analytics.ticketMedio)}
            detalhe="Faturamento / pedidos"
            
            Icone={Wallet}
          />

          <CardIndicador
            titulo="Estoque baixo"
            valor={analytics.estoqueBaixo.length}
            detalhe="Produtos abaixo do mínimo"
            
            Icone={AlertTriangle}
          />

          <CardIndicador
            titulo="Última atualização"
            valor={new Date().toLocaleDateString("pt-BR")}
            detalhe="Dashboard em tempo real"
            
            Icone={CalendarClock}
          />
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-title">
              <h2>Top produtos mais vendidos</h2>
              <span>Quantidade vendida</span>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.topProdutosVendidos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#635bff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <div className="panel-title">
              <h2>Top 3 vendedores</h2>
              <span>Por faturamento</span>
            </div>

            <div className="ranking-list">
              {analytics.topVendedores.map((vendedor, index) => (
                <div className="ranking-item" key={vendedor.id_vendedor}>
                  <div className="ranking-position">
                    {index === 0 ? <Trophy size={20} /> : index + 1}
                  </div>

                  <div className="ranking-info">
                    <strong>{vendedor.nome}</strong>
                    <span>
                      {vendedor.pedidos} pedidos • {formatarNumero(vendedor.quantidade)} itens
                    </span>
                  </div>

                  <em>{formatarMoeda(vendedor.faturamento)}</em>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-title">
              <h2>Top 8 clientes</h2>
              <span>Clientes que mais compraram</span>
            </div>

            <div className="ranking-list">
              {analytics.topClientes.map((cliente, index) => (
                <div className="ranking-item" key={cliente.id_cliente}>
                  <div className="ranking-position client">
                    <UserRoundCheck size={18} />
                  </div>

                  <div className="ranking-info">
                    <strong>
                      {index + 1}. {cliente.nome}
                    </strong>
                    <span>
                      {cliente.pedidos} pedidos • {formatarNumero(cliente.quantidade)} itens
                    </span>
                  </div>

                  <em>{formatarMoeda(cliente.faturamento)}</em>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="panel-title">
              <h2>Pedidos por status</h2>
              <span>Distribuição</span>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.pedidosPorStatus}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {analytics.pedidosPorStatus.map((_, index) => (
                    <Cell key={index} fill={cores[index % cores.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-title">
              <h2>Pedidos por data</h2>
              <span>Formato brasileiro</span>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.pedidosPorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pedidos"
                  stroke="#635bff"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <div className="panel-title">
              <h2>Produtos por categoria</h2>
              <span>Volume cadastrado</span>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.produtosPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="produtos" fill="#ff7a59" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="dashboard-grid">
          <div className="panel">
            <div className="panel-title">
              <h2>Faturamento por produto</h2>
              <span>Top 5</span>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.faturamentoPorProduto}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nome" />
                <YAxis />
                <Tooltip formatter={(value) => formatarMoeda(value)} />
                <Bar dataKey="faturamento" fill="#22c55e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <div className="panel-title">
              <h2>Valor em estoque</h2>
              <span>Top 5 produtos</span>
            </div>

            <div className="list">
              {analytics.valorEstoquePorProduto.map((item, index) => (
                <div className="list-item" key={index}>
                  <div>
                    <strong>{item.nome}</strong>
                    <span>Qtd: {item.quantidade} | Mín: {item.minimo}</span>
                  </div>

                  <em>{formatarMoeda(item.valor)}</em>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
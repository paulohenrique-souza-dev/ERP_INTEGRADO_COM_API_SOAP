import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/soap",
  headers: {
    "Content-Type": "application/json",
  },
});

export const listarOperacoes = async () => {
  const response = await api.get("/operacoes");
  return response.data;
};

export const executarMetodo = async (metodo, payload = {}) => {
  const response = await api.post(`/${metodo}`, payload);
  return response.data;
};

export default api;
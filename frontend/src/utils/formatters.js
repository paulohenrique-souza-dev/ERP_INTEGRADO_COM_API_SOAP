export function formatarDataBR(data) {
  if (!data) return "-";

  if (typeof data === "string" && data.includes("-")) {
    const partes = data.split("T")[0].split("-");

    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
  }

  const d = new Date(data);

  if (isNaN(d.getTime())) return data;

  return d.toLocaleDateString("pt-BR");
}

export function formatarMoeda(valor) {
  const numero = Number(valor || 0);

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarNumero(valor) {
  return Number(valor || 0).toLocaleString("pt-BR");
}
# ERP SOAP 🚀

Projeto ERP com integração SOAP utilizando:

- React + Vite
- Flask
- Docker

---

# 📦 Como rodar o projeto

## 1. Clone o repositório

```bash
git clone https://github.com/paulohenrique-souza-dev/ERP_INTEGRADO_COM_API_SOAP
```

Entre na pasta:

```bash
cd erp-soap
```

---

# 🐳 Rodando com Docker

Na raiz do projeto execute:

```bash
docker compose up --build
```

Pronto o projeto já deve rodar ✅

---

# 🌐 Acessos

## Frontend

```txt
http://localhost:5173
```

## Backend

```txt
http://localhost:5000
```

## Health Check

```txt
http://localhost:5000/health
```

---

# 🛠 Tecnologias

## Frontend
- React
- Vite
- Axios
- React Router DOM

## Backend
- Flask
- Flask CORS

## Infra
- Docker
- Docker Compose

---

# 📁 Estrutura do projeto

```txt
backend/   → API Flask que consome Api SOAP
frontend/  → Interface React que consome Backend do Flask
```



# ⛔ Parar containers

```bash
docker compose down
```

---

# 👨‍💻 Autor

Projeto desenvolvido para estudos e integração ERP SOAP.

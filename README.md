# ERP SOAP 🚀

Projeto ERP com integração SOAP utilizando:

- React + Vite
- Flask
- Docker

---

# 📦 Como rodar o projeto

## 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
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

Pronto ✅

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
backend/   → API Flask + SOAP
frontend/  → Interface React
```

---

# ⚠️ Importante

Quando estiver usando Docker, o frontend acessa o backend usando:

```txt
http://backend:5000
```

e não:

```txt
http://localhost:5000
```

---

# ⛔ Parar containers

```bash
docker compose down
```

---

# 👨‍💻 Autor

Projeto desenvolvido para estudos e integração ERP SOAP.

# 🛒 E-Commerce Fullstack (Laravel + React + Docker)

Este projeto é uma plataforma de e-commerce simplificada desenvolvida com **Laravel 11**, **React (Vite)** e **MySQL**, utilizando **Docker** para orquestração.

---

## 🚀 Funcionalidades

* **Autenticação:** Registro e login via Laravel Sanctum
* **Catálogo:** Listagem de produtos, detalhes e filtros por categoria
* **Gestão CRUD:** Criação, edição e exclusão de produtos (exclusivo para usuários autenticados)
* **Design:** Interface responsiva com Tailwind CSS e Lucide Icons
* **Arquitetura:** Backend estruturado com os padrões Service e Repository

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

* Docker
* Docker Compose

---

## 🛠️ Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd e-commerce
```

---

### 2. Configurar Variáveis de Ambiente

Crie o arquivo `.env` do backend a partir do exemplo:

```bash
cp backend/.env.example backend/.env
```

Verifique se as variáveis de banco estão assim:

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=ecommerce
DB_USERNAME=root
DB_PASSWORD=root
```

---

### 3. Instalar Dependências

Para rodar o projeto sem precisar instalar PHP ou Node localmente:

#### Backend (Composer)

```bash
docker run --rm -v $(pwd)/backend:/var/www -w /var/www composer install
```

#### Frontend (NPM)

```bash
docker run --rm -v $(pwd)/frontend:/app -w /app node:20 npm install
```

---

### 4. Subir os Containers

```bash
docker-compose up -d --build
```

---

### 5. Finalizar Configuração do Laravel

Execute os comandos abaixo com os containers rodando:

```bash
# Gerar chave da aplicação
docker exec -it ecommerce_backend php artisan key:generate

# Corrigir permissões
docker exec -it ecommerce_backend chown -R www-data:www-data storage bootstrap/cache
docker exec -it ecommerce_backend chmod -R 775 storage bootstrap/cache

# Rodar migrations e seeders
docker exec -it ecommerce_backend php artisan migrate:fresh --seed
```

---

## 🖥️ Acesso à Aplicação

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend (API):** [http://localhost:8000](http://localhost:8000)

---

## 🔐 Dados de Acesso (Seeders)

Após rodar o seed:

* **Usuário:** [admin@example.com](mailto:admin@example.com)
* **Senha:** password

---

## 🛠️ Comandos Úteis

### Verificar tabelas no banco

```bash
docker exec -it ecommerce_db mysql -u root -proot ecommerce -e "SHOW TABLES;"
```

### Limpar cache de configuração

```bash
docker exec -it ecommerce_backend php artisan config:clear
```

### Resetar banco de dados

```bash
docker exec -it ecommerce_backend php artisan migrate:fresh --seed
```

---

## 📌 Observações

* Certifique-se de que as portas `5173` e `8000` não estão sendo utilizadas por outros serviços
* Caso altere o `.env`, sempre limpe o cache com `config:clear`
* Se tiver problemas de permissão, reexecute os comandos de `chown` e `chmod`

---

## 📄 Licença

Este projeto é apenas para fins educacionais.

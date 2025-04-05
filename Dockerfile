# Etapa 1: Definir a imagem base para construir a aplicação
FROM node:18 AS build

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto para o container
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Construir a aplicação React para produção
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar o build gerado no estágio anterior para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta 8080 para que a aplicação seja acessível
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

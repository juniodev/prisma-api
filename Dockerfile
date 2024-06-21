# Use a imagem oficial do Node.js LTS como base
FROM node:lts-alpine

# Instala o Yarn globalmente (caso ainda não esteja instalado na imagem base)
RUN npm install -g yarn

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos necessários para o diretório de trabalho
COPY package.json yarn.lock ./

# Instala as dependências de produção utilizando Yarn
RUN yarn install --production

# Copia o restante dos arquivos do projeto
COPY . .

# Executa o comando de pós-instalação definido no package.json
RUN yarn postinstall

# Expor a porta em que a aplicação vai rodar
EXPOSE 3000

# Define um volume para persistir os dados do Prisma
VOLUME /app/prisma

# Comando para iniciar a aplicação
CMD ["yarn", "start"]

# Utiliza una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package*.json ./
RUN npm install


# Copia el archivo .env al contenedor
COPY . .

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]

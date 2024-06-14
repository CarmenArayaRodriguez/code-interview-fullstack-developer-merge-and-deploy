# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Copia el script wait-for-it.sh
COPY wait-for-it.sh /wait-for-it.sh

# Asegura permisos de ejecución para wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Expone el puerto que la aplicación usará
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]

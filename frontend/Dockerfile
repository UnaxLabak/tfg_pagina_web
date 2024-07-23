# Utiliza una imagen base oficial de Node.js 18
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para correr la aplicación en modo producción
CMD ["npm", "run", "start"]

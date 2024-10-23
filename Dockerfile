# Stage 1: Build
FROM node:18-alpine AS build
# Directorio donde se mantendran los archivos de la app
WORKDIR /app
# Copiar el package.json y el package-lock en nuestro WORKDIR
COPY package*.json ./
# Instalar dependencias
RUN npm ci
# Instalar Angular CLI
RUN npm install -g @angular/cli@18.2.5
# Copiar todos los archivos
COPY . .
# Construir la aplicacion lista para produccion, puede no incluir el # flag --prod
#RUN npm run build --prod
RUN ng build --configuration=production

# Stage 2
FROM nginx:1.17.1-alpine

# Copiar desde la "Etapa" build el contenido de la carpeta build/
# dentro del directorio indicado en nginx
COPY --from=build /app/dist/frontend-bcrp /usr/share/nginx/html
# Copiar desde la "Etapa" build el contenido de la carpeta la 
# configuracion de nginx dentro del directorio indicado en nginx
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
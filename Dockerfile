# Stage 1: Build the React application
FROM node:18.18.2-bullseye-slim as build

WORKDIR /app

COPY /package*.json .

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

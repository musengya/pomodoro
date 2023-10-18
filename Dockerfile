# Stage 1: Build the React application
FROM node:18.18.2-bullseye-slim as build

WORKDIR /app

COPY /package*.json .

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the React application using Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN touch /var/run/nginx.pid
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
USER nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

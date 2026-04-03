# Stage 1: Build frontend
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

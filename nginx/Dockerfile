# nginx/Dockerfile
FROM nginx:alpine

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/default.conf
# Copy built frontend files
COPY frontend/dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80 
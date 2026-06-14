# Frontend Dockerfile - Utilise le build existant
FROM nginx:alpine

# Copier les fichiers buildés localement
COPY dist /usr/share/nginx/html

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

FROM nginx:1.9
COPY build /usr/share/nginx/html/test-clients
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

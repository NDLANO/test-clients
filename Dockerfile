FROM nginx:1.11.5

# Delete examplefiles
RUN rm /etc/nginx/conf.d/default.conf

COPY build /usr/share/nginx/html/test-clients
COPY nginx.conf /etc/nginx/nginx.conf

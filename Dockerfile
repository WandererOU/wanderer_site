FROM nginx:latest

EXPOSE 80

COPY config/nginx.conf /etc/nginx/nginx.conf

# Copy static assets into var/www
# COPY ./docs/* /var/www/

# Start up nginx server
RUN nginx
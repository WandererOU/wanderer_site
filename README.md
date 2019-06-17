# Wanderer Studio Website

## Developing with Docker
1. Create basic NGINX image with Dockerfile
  - `docker build -t wanderer_site .`
2. Run a docker container that is linked to current directory
  - `docker run -d -p 80:80 --volume=$PWD/dist:/var/www --name wanderer wanderer_site`
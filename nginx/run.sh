#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
TEMPLATE_DIR=${SCRIPT_DIR%%/}/template

docker run --name manekiswap-nginx -v ${TEMPLATE_DIR}:/etc/nginx/templates -p ${NGINX_PORT}:${NGINX_PORT} --env NGINX_HOST=${NGINX_HOST} --env NGINX_PORT=${NGINX_PORT} nginx

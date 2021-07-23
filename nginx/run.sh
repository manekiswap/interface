#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
TEMPLATE_DIR=${SCRIPT_DIR%%/}/template

docker rm manekiswap-proxy
docker run --name manekiswap-proxy -v ${TEMPLATE_DIR}:/etc/nginx/templates -p ${EXPOSED_PORT}:80 --env FORWARDED_HOST=${FORWARDED_HOST} nginx

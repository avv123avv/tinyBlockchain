#!/usr/bin/env bash

docker-compose -f docker-compose.yml down --rmi all
docker-compose -f docker-compose.yml up --force-recreat --build

.PHONY: up down build

up:
	docker-compose up -d

down:
	docker-compose down -v

build:
	docker-compose build

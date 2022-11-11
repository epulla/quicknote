BACKEND=backend
FRONTEND=frontend


# General Commands Wrappers

start_backend:
	cd $(BACKEND); \
	$(MAKE) start

start_frontend:
	cd $(FRONTEND); \
	$(MAKE) start

install:
	cd api ; \
	$(MAKE) install ; \
	cd ../frontend ; \
	$(MAKE) install

# Dockerizing the app with docker-compose

build_frontend_nginx_conf:
	cd frontend; \
	$(MAKE) build_nginx_conf

compose_build:
	$(MAKE) build_frontend_nginx_conf
	docker-compose build

compose_up_build:
	$(MAKE) build_frontend_nginx_conf
	docker-compose up --build

# Redis Commands Wrapper

start_redis:
	docker-compose -f redis.docker-compose.yaml up

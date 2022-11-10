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

# Dockerizing the app

compose_build:
	docker-compose build

compose_up_build:
	docker-compose up --build

# Redis Commands Wrapper

start_redis:
	docker-compose -f redis.docker-compose.yaml up

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

# Redis Commands Wrapper

start_redis:
	docker-compose -f dev.docker-compose.yaml up

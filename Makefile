BACKEND=api
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

# Postgres DB Commands Wrappers

restart_postgres:
	docker-compose up --build

restart_and_clean_postgres:
	rm -rf ./postgres-data && $(MAKE) restart_postgres

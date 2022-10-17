
# General Commands Wrappers

start_api:
	cd api; \
	$(MAKE) start

start_ui:
	cd frontend; \
	$(MAKE) start


# Postgres DB Commands Wrappers

restart_postgres:
	docker-compose up --build

restart_and_clean_postgres:
	rm -rf ./postgres-data && $(MAKE) restart_postgres


start: ACTIVATE_ENV=1
start:
	if [ $(ACTIVATE_ENV) = 0 ] ; then \
		python main.py ; \
	else \
		source .venv/bin/activate ; \
		python main.py ; \
	fi

install:
	python3 -m venv .venv ; \
	source .venv/bin/activate ; \
	pip install -U pip ; \
	pip install -r requirements.txt ; \
	deactivate

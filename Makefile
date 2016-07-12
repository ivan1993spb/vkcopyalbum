
deps:

	npm install

dev:

	http-server & gulp watch &

build:

	gulp build

clean:

	git clean -f
	rm -rf node_modules dist

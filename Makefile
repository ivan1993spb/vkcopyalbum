
deps:

	npm install
	bower install

dev:

	http-server & gulp watch &

build:

	gulp build

clean:

	git clean -f
	rm -rf node_modules bower_components dist

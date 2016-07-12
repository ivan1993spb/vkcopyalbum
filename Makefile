
install:

	npm install
	bower install

start:

	http-server

dev:

	http-server & gulp watch &

build:

	gulp build
	gulp less

clean:

	git clean -f
	rm -rf node_modules bower_components dist

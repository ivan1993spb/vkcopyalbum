
install:

	npm install
	bower install

start:

	http-server

dev:

	http-server & gulp watch &

stop:

	kill `ps -A -o pid,cmd | egrep "node.+http-server" | head -n 1 | awk '{print $$1}'`
	kill `ps -A -o pid,cmd | egrep "gulp" | head -n 1 | awk '{print $$1}'`

build:

	gulp build
	gulp less

clean:

	git clean -f
	rm -rf node_modules bower_components dist

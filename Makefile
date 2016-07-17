
install:

	npm install
	npm install http-server -g || rm -f npm-debug.log
	bower install
	go build tls_server.go

start:

	sudo ./tls_server --addr=127.0.0.1:443 --cert=nw-normativ.ru.pem --key=nw-normativ.key & \
		gulp watch &

stop:

	kill `ps -A -o pid,cmd | egrep "tls_server" | head -n 1 | awk '{print $$1}'`
	kill `ps -A -o pid,cmd | egrep "gulp" | head -n 1 | awk '{print $$1}'`

restart: stop start

build:

	gulp build

clean:

	git clean -f
	rm -rf node_modules bower_components dist

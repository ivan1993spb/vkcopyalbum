
install:

	npm install
	bower install

start:

	./tls_server --addr=127.0.0.1:443 --cert=nw-normativ.ru.pem --key=nw-normativ.key &
	gulp watch &

stop:

	kill `ps -A -o pid,cmd | egrep "tls_server" | head -n 1 | awk '{print $$1}'`
	kill `ps -A -o pid,cmd | egrep "gulp" | head -n 1 | awk '{print $$1}'`

restart: stop start

build:

	go build tls_server.go
	gulp build

clean:

	git clean -f
	rm -rf node_modules bower_components dist tls_server

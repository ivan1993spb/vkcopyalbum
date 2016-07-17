package main

import (
	"flag"
	"log"
	"net/http"
)

var (
	addr     string
	keyFile  string
	certFile string
	dir      string
)

func init() {
	flag.StringVar(&addr, "addr", ":8080", "serve address")
	flag.StringVar(&keyFile, "key", "", "pem key file")
	flag.StringVar(&certFile, "cert", "", "pem cert file")
	flag.StringVar(&dir, "dir", ".", "shared directory")
}

func main() {
	flag.Parse()
	log.Fatal(http.ListenAndServeTLS(addr, certFile, keyFile, http.FileServer(http.Dir(dir))))
}

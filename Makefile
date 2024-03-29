REPORTER = spec
stylus_files := $(wildcard assets/styl/*.styl)
javascript_files := $(wildcard assets/*.js)
template_files := $(patsubst assets/jade/%.jade,static/%.html,$(wildcard assets/jade/*.jade))

default: static/index.js
	@:

heroku: local_build
	@DEBUG=bookofmormon:*,bookofmormon:* node app.js

static/index.js: static/index.html $(stylus_files) $(javascript_files)
	@echo "Component build"
	@component build --dev --use component-stylus -o static -n index

local_build: node_modules components static/index.html $(stylus_files) $(javascript_files)
	@./node_modules/.bin/component build --dev --use component-stylus -o static -n index

components: component.json
	@./node_modules/.bin/component install

node_modules: package.json
	@npm install

serve: default
	nodemon app.js

static/index.html: $(wildcard assets/jade/*.jade) assets/pages.js
	@echo "Jade"
	@./build.js

test:
	@echo "No tests yet"

reboot:
	@rm -rf node_modules components

.PHONY: test reboot serve heroku local_build

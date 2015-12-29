

node_modules/.bin/gulp $*

[ ! -f node_modules/.bin/gulp ] && echo "Building node modules" && npm rebuild

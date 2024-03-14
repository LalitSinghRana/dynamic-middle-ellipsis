#!/bin/bash

dir_ts="TypeScript"
dir_js="JavaScript"

build_ts() {
  mkdir -p $dir_ts
  cp -r src/* $dir_ts
  sed -i 's#../truncate-text#./truncate-text#g' $dir_ts/**/*.*
}

build_js() {
  mkdir -p $dir_js
  npx babel src --out-dir $dir_js --extensions ".ts,.tsx"
  cp src/* $dir_js
  sed -i 's#../truncate-text#./truncate-text#g' $dir_js/**/*.*
}

# Remove previous build
rm -rf $dir_ts $dir_js
build_ts
build_js

#!/bin/bash

# Cleaning up previously generated files
rm -rf build/

wintersmith build

cp package.json build
cp -R node_modules/ build/node_modules

h5bp --config build/grunt.js

rm -rf build/node_modules

cp -R build/ ~/Repos/kevingorski
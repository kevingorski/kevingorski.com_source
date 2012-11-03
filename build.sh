#!/bin/bash

# Cleaning up previously generated files
rm -rf build/

wintersmith build

h5bp --config build/grunt.js

cp -R build/ ~/Repos/kevingorski
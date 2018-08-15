#!/bin/bash

# include parse_yaml function
. scripts/parse_yaml.sh

npm run build
gulp

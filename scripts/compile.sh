#!/bin/bash

# include parse_yaml functio
. scripts/parse_yaml.sh

# npm run build
# gulp

cp -r scaffolds/* out/
cd out

for D in *; do
    if [ -d "${D}" ]; then
        echo "${D}"   # your processing here
        cd $D
        git diff ./ | wc -l
        # eval $(parse_yaml index.yml "config_")
        # REPO=$(echo ${config_git_url} | sed "s/'//g")
        # echo $REPO
        # git clone $REPO src
        # cd src
        # npm install
        cd ..
    fi
done
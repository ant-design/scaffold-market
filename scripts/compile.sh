#!/bin/bash

# include parse_yaml function
. scripts/parse_yaml.sh

npm run build
gulp

cp -r scaffolds/* out/
cd out
git add .
for D in *; do
    if [ -d "${D}" ]; then
        if [ "$D" = "static" ]; then
            echo "scaped static folder."
            continue
        fi
        # cd $D
        if [ $(git status --porcelain | grep $D | wc -l) -lt 1 ]; then
            echo "No changes to the output on scaffold ${D}; exiting."
            continue
        fi
        cd $D

        eval $(parse_yaml index.yml "config_")
        REPO=$(echo ${config_git_url} | sed "s/'//g")
        LAST_HASH=$(echo ${config_git_hash} | sed "s/'//g")

        git clone $REPO _temp --depth=1

        echo "try to build scaffold ${D} at ${REPO}"
        cd _temp
        CURRENT_HASH=$(git rev-parse --short HEAD)
        echo "current git hash: ${CURRENT_HASH}"
        echo "last git hash: ${LAST_HASH}"
        # cd $D
        if [ CURRENT_HASH = LAST_HASH ]; then
            echo "No changes to scaffold ${D}"
            continue
        fi
        cd $D
        npm install
        npm run build
        cp -r dist/* ../
        rm -rf _temp
        cd ../../
    fi
done

cd ..

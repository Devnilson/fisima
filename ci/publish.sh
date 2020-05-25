#!/bin/bash

BRANCH="$TRAVIS_PULL_REQUEST_BRANCH"
if [ "$BRANCH" = "" ]; then
  BRANCH="$TRAVIS_TAG"
fi
if [ "$BRANCH" = "" ]; then
  BRANCH="$TRAVIS_BRANCH"
fi

if [ "$BRANCH" = "master" ]; then
  npm publish
elif [ "$BRANCH" = "develop" ]; then
  npm publish --tag develop
fi

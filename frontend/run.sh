#!/usr/bin/env bash

case $1 in
  start)
    yarn start | cat
    ;;
  build)
    yarn build
    ;;
  test)
    yarn test $@
    ;;
  *)
    yarn "$@"
    ;;
esac
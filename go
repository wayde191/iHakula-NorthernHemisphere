#!/bin/bash -eu

#. devenv

DIR=$(cd `dirname ${BASH_SOURCE}` > /dev/null && pwd)
GALEN_PATH=$DIR/tools/galen
LEIN_ROOT=$DIR/tools/lein-2.5.1
NODE_PATH=$DIR/node_modules/.bin
LOCAL_GEMS=$DIR/tools/ruby
LOCAL_GEMS_BIN=${LOCAL_GEMS}/bin
export GEM_HOME=$LOCAL_GEMS

export PATH=$LOCAL_GEMS_BIN:$LEIN_ROOT:$NODE_PATH:$GALEN_PATH:$PATH
export XDG_CACHE_HOME=./.cache
export LEIN_ROOT

source ./devenv.local
lein "$@"

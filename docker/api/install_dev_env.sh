#!/bin/bash -eu

DIR=$(cd `dirname ${BASH_SOURCE}` > /dev/null && pwd)

function install_lein {
    yum install --assumeyes java-1.7.0-openjdk > /dev/null

    if [ ! -f $LEIN_ROOT/lein ]
    then
        curl --create-dirs --output $LEIN_ROOT/lein http://source.sunzhongmou.com/tools/lein
        chmod 755 $LEIN_ROOT/lein
    fi
}

function install_nodejs {
    yum install --assumeyes epel-release
    yum install --assumeyes nodejs
    node --version
}

install_sass() {
    mkdir -p $LOCAL_GEMS
    mkdir -p $LOCAL_GEMS_BIN

    if ls $LOCAL_GEMS/gems/sass-3.3.14 &> /dev/null;
    then
        echo "Sass already installed"
    else
        yum install --assumeyes ruby rubygems > /dev/null
        /usr/bin/gem install sass --version '=3.3.14' --no-rdoc --no-ri --bindir $LOCAL_GEMS_BIN --install-dir $LOCAL_GEMS
    fi
}

function install_ansible {
    yum install --assumeyes ansible > /dev/null
}

function install_package_tools {
    yum install --assumeyes rpm-build  > /dev/null
}

GALEN_BIN=galen-bin-1.2.0
GALEN=galen-1.2.0

function install_galen {
    if [ ! -f $GALEN_PATH/$GALEN_BIN.zip ]
    then
        wget -P $GALEN_PATH http://source.sunzhongmou.com/tools/$GALEN_BIN.zip
        chmod 755 $GALEN_PATH
        unzip -qq $GALEN_PATH/$GALEN_BIN.zip -d $GALEN_PATH

    fi
    cd $GALEN_PATH/$GALEN_BIN/
    sh install.sh
    cd $DIR
}

GALEN_PATH=$DIR/tools/galen
LEIN_ROOT=$DIR/tools/lein-2.5.1
NODE_PATH=$DIR/node_modules/.bin
LOCAL_GEMS=$DIR/tools/ruby
LOCAL_GEMS_BIN=${LOCAL_GEMS}/bin
export GEM_HOME=$LOCAL_GEMS

install_lein
install_nodejs
install_sass
install_package_tools
install_ansible
install_galen

export PATH=$LOCAL_GEMS_BIN:$LEIN_ROOT:$NODE_PATH:$GALEN_PATH:$PATH
export XDG_CACHE_HOME=./.cache

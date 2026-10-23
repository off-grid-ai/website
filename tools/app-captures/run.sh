#!/bin/zsh
# run.sh '<js body>'  -> runs in the serving app, prints result
D=${0:A:h}/cmd; n=$(date +%s%N); print -r -- "$1" > $D/$n.js
for i in {1..2400}; do [ -f $D/$n.out ] && { cat $D/$n.out; echo; exit 0 }; sleep 0.5; done; echo TIMEOUT

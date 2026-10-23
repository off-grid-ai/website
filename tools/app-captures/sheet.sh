#!/bin/zsh
# sheet.sh <out-name> <glob...>  -> labelled contact sheet in dbg/
W=${0:A:h}; o=$1; shift
montage -font /System/Library/Fonts/Supplemental/Arial.ttf -label '%t' -pointsize 22 -fill white -background '#222' -geometry 900x581+4+4 -tile 4x "$@" $W/dbg/$o.png

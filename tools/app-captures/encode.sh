#!/bin/zsh
# encode.sh <out-dir> <dest-dir> [names...]: PNG captures (3024x1954) -> the site's webp set
set -e
OUT=$1; DEST=$2; shift 2
names=("$@"); [ ${#names} -eq 0 ] && names=($(ls $OUT/*.png | xargs -n1 basename | sed -E 's/\.png$//'))
for n in $names; do
  src=$OUT/$n.png; [ -f $src ] || { echo "missing $n"; continue }
  cwebp -quiet -q 82 -m 6 $src -o $DEST/$n.webp
  for w in 1760 960 640 160; do cwebp -quiet -q 80 -m 6 -resize $w 0 $src -o $DEST/$n-$w.webp; done
done

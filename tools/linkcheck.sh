#!/bin/sh
# Every URL on the live site (tools/live-urls.txt, from getoffgridai.co/sitemap.xml) must still resolve locally.
# usage: sh tools/linkcheck.sh [grep-filter]
cd "$(dirname "$0")/.." || exit 1
fail=0; n=0
for u in $(grep -E "${1:-.}" tools/live-urls.txt); do
  n=$((n+1)); code=$(curl -s -o /dev/null -L -w '%{http_code}' "http://127.0.0.1:4000$u")
  [ "$code" = "200" ] || { echo "BROKEN $code $u"; fail=$((fail+1)); }
done
echo "checked $n urls, $fail broken"; [ $fail -eq 0 ]

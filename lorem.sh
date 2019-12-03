#!/bin/bash

gtr -dc a-z1-4 </dev/urandom | tr 1-2 ' \n' | awk 'length==0 || length>50' | gtr 3-4 ' ' | sed 's/^ *//' | cat -s | sed 's/ / /g' |fmt


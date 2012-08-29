#!/bin/bash

wintersmith preview -p 3000 &
echo $! > ws.pid

open http://localhost:3000/
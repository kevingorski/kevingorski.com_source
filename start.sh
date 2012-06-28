#!/bin/bash

wintersmith preview -p 3000 &
echo $! > ws.pid
#!/bin/bash

vogue . &
echo $! > vogue.pid

serve . &
echo $! > serve.pid
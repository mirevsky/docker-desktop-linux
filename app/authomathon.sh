#!/bin/bash
exec_cmd=""
if [[ $2 =~ "sudo" ]];then
  args=$@
  count=1
  for i in $args; do
    if [[ $count > 1 ]];then
      exec_cmd+="$i "
    fi
    count=`expr $count + 1`
  done
  expect -c '
  spawn /bin/bash
  send "'$exec_cmd'\r"
  expect "*?assword:*"
  send "'$1'\r"
  interact
  expect eof
  '
elif [[ "$1" =~ "docker" ]]; then
  args=$@
  for i in $args; do
    exec_cmd+="$i "
  done
  if [[ $2 = "login" ]];then
    expect -c '
    spawn /bin/bash
    send "'$exec_cmd'\r"
    expect "*?sername:*"
    send "'$3'\r"
    expect "*?assword:*"
    send "'$4'\r"
    interact
    expect eof
    '
  elif [[ $exec_cmd =~ "prune" ]];then
    expect -c '
    spawn /bin/bash
    send "'$exec_cmd'\r"
    expect "y/N"
    send "y\r"
    interact
    expect eof
    '
  else
    bash -c "$exec_cmd"
  fi


fi

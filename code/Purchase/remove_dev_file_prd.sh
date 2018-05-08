nginx_user=nginx
nginx_password="Qyjhqm_9"
nginx_htmlDir=/qhapp/nginx/ec_html/ec/new_onemind
nginx_server1=10.60.133.46

echo "deleting data in ${svr} ${nginx_htmlDir}"

expect -c "
  spawn ssh ${nginx_user}@${nginx_server1} \"cd ${nginx_htmlDir} && rm -rf *\"
  set timeout 90
  expect {
    \"*assword\" {sleep 1; send \"${nginx_password}\r\";}
    \"yes/no\" {send \"yes\r\"; exp_continue;}
  }
  expect eof"
echo "ddd$?"
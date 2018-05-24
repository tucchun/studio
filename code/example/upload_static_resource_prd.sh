#!/bin/sh

localDir=src/assets/static
distDir=dist/static
serverDir=/qhapp/nginx/html/static/public
username=jboss
password="Qhiptt_9"

server1=10.70.128.23
server2=10.70.128.24

echo "Clean files..."
rm -rf ${distDir}

echo "start compile project..."
cp -rf ${localDir} ${distDir}

cd ${distDir}

echo "upload file to server..."
for host in ${server1} ${server2}
do
	echo "sending data to ${host}"
	expect -c "
	  spawn scp -r . ${username}@${host}:${serverDir}
	  expect {
	    \"*assword\" {set timeout 300; send \"${password}\r\";}
	    \"yes/no\" {send \"yes\r\"; exp_continue;}
	  }
	  expect eof"
done
#!/bin/sh

# "usage: $0 uc"
# "       u: only upload ${toFile}"
# "       c: only compile"

echo "**********************CALL $0**********************"

compile=1
upload=1
preresult=0

distDir=dist
nginx_user=jboss
nginx_password="Qopczx_9"
nginx_htmlDir=/qhapp/nginx/html/omapphtml
nginx_server1=10.70.128.23
nginx_server2=10.70.128.24

if [ "$1"x = "u"x ];then
  compile=0
fi

if [ "$1"x = "c"x ];then
  upload=0
fi


if [ ${compile} -eq 1 ];then
  echo "Clean files..."
  rm -rf ${distDir}

  echo "start compile project..."
  export NODE_ENV="production"
  export RUN_IN="PRD"
  export NOT_ENCRYPT="YES"
  npm run compile
  preresult=$?
fi

if [ ${upload} -eq 1 ]; then
  if [ ${preresult} -eq 0 ];then
    echo "upload file to server..."

    cd ${distDir}

    for svr in ${nginx_server1} ${nginx_server2}
    do
        if [ "$1"x = "d"x ];then
          echo "deleting data in ${svr} ${nginx_htmlDir}"
          expect -c "
            spawn ssh ${nginx_user}@${svr} \"cd ${nginx_htmlDir} && rm -rf *\"
            set timeout 90
            expect {
              \"*assword\" {sleep 1; send \"${nginx_password}\r\";}
              \"yes/no\" {send \"yes\r\"; exp_continue;}
            }
            expect eof"
        fi

        echo "sending data to ${svr}"

        expect -c "
          spawn scp -r . ${nginx_user}@${svr}:${nginx_htmlDir}
          set timeout 900
          expect {
            \"*assword\" {sleep 1; send \"${nginx_password}\r\";}
            \"yes/no\" {send \"yes\r\"; exp_continue;}
          }
          expect eof"

        echo "Backup data in ${svr} ${nginx_htmlDir}"
        expect -c "
          spawn ssh ${nginx_user}@${svr} \"cd ${nginx_htmlDir} && zip -r /qhapp/nginx/html/backup/ONEMINDAPP_BACKUP_`date +%y%m%d`.zip .\"
          set timeout 90
          expect {
            \"*assword\" {sleep 1; send \"${nginx_password}\r\";}
            \"yes/no\" {send \"yes\r\"; exp_continue;}
          }
          expect eof"
        echo "ddd$?"
    done
  fi
fi

if [ ${preresult} -eq 0 ];then
  echo "**********************$0 DONE**********************"
else
  echo "!!!!!!!!!!!!!!!!!!!!!!$0 FAIL!!!!!!!!!!!!!!!!!!!!!!"
  exit 1
fi

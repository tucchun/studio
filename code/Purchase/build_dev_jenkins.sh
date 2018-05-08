#!/bin/sh

# "usage: $0 uc"
# "       u: only upload ${toFile}"
# "       c: only compile"

echo "**********************CALL $0**********************"

compile=1
upload=1
preresult=0

# distDir=dist
# nginx_user=jboss
# nginx_password="Qhiptt_9"
# nginx_htmlDir=/qhapp/nginx/html/onemind
# nginx_server1=10.60.133.179

distDir=dist
nginx_user=nginx
nginx_password="Qeuisg_9"
nginx_htmlDir=/qhapp/nginx/ec_html/ec/app_onemind
nginx_server1=10.60.133.46
zip_name=APP_ONEMIND_BACKUP_`date +%y%m%d`.zip

if [ "$1"x = "u"x ];then
  compile=0
fi

if [ "$1"x = "c"x ];then
  upload=0
fi

if [ "$1"x = "d"x ];then
  echo "deleting data in ${nginx_server1} ${nginx_htmlDir}"
  expect -c "
    spawn ssh ${nginx_user}@${nginx_server1} \"cd ${nginx_htmlDir} && rm -rf *\"
    set timeout 90
    expect {
      \"*assword\" {sleep 1; send \"${nginx_password}\r\";}
      \"yes/no\" {send \"yes\r\"; exp_continue;}
    }
    expect eof"
  echo "ddd$?"
fi

if [ ${compile} -eq 1 ];then
  echo "Clean files..."
  rm -rf ${distDir}

  echo "start compile project..."
  export NODE_ENV="production"
  export RUN_IN="DEV"
  export NOT_ENCRYPT="YES"
  npm run compile
  preresult=$?
fi

if [ ${upload} -eq 1 ]; then
  if [ ${preresult} -eq 0 ];then
    echo "upload file to server..."

    cd dist
    zip -r ${zip_name} .

    for svr in ${nginx_server1}
    do
        echo "sending data to ${svr}"

        expect -c "
          spawn scp -r ${zip_name} ${nginx_user}@${svr}:${nginx_htmlDir}/..
          set timeout 300
          expect {
            \"*assword\" {sleep 1; send \"${nginx_password}\r\";}
            \"yes/no\" {send \"yes\r\"; exp_continue;}
          }
          expect eof"
        expect -c "
          spawn ssh ${nginx_user}@${svr} \"unzip -o ${nginx_htmlDir}/../${zip_name} -d ${nginx_htmlDir}\"
          set timeout 90
          expect {
            \"*assword\" {sleep 1; send \"${nginx_password}\r\";}
            \"yes/no\" {send \"yes\r\"; exp_continue;}
          }
          expect eof"
        echo "sending end$?"
    done
  fi
fi

if [ ${preresult} -eq 0 ];then
  echo "**********************$0 DONE**********************"
else
  echo "!!!!!!!!!!!!!!!!!!!!!!$0 FAIL!!!!!!!!!!!!!!!!!!!!!!"
  exit 1
fi

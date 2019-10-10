#!/usr/bin/env sh
# 脚本错误退出
set -e
echo "Enter release version: "
# 从标准输入读取值，赋值给VERSION变量
read VERSION
# -p 后面跟提示符 -n 只接收一个有效字符 -r 禁止反斜线转义功能
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo  # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish
  npm publish
fi
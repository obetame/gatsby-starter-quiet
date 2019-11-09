# auto travis-ci build

# 如果这一步有问题可以注释掉自己手动登录(时间可能会比较长),
# 根据提示输入github账户与密码
travis login --pro

# 在当前目录生成密钥
ssh-keygen -t rsa -b 4096 -C 'build@travis-ci.org' -f ./deploy_rsa

# 使用Travis加密
travis encrypt-file deploy_rsa --add

# 添加信任关系, 请先替换你自己的机器
# ssh-copy-id -i deploy_rsa.pub root@11.111.111.111
ssh-copy-id -i deploy_rsa.pub username@domain

# 删除敏感文件
rm -f deploy_rsa deploy_rsa.pub

# 将修改添加到git中
git add deploy_rsa.enc .travis.yml

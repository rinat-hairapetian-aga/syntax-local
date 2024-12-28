## Steps to commit to Bitbuket
1. git add -all
2. git commit -m '<message>'
3. git push

If this doesn't work, you might have to do the following

1. git pull
2. git push

Reference:
https://support.atlassian.com/bitbucket-cloud/docs/push-code-to-bitbucket/
---

## Install Docker to Linode

1. install docker - https://www.linode.com/docs/guides/installing-and-using-docker-on-ubuntu-and-debian/

## Install Docker Compose

Reference:
https://www.linode.com/docs/guides/how-to-use-docker-compose/

1. When use "sudo curl -L https://github.com/docker/compose/releases/download/1.25.4/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose" make sure to place "v" letter before version number
2. Check `uname -s` and `uname -m` properties. There are case sensitive and must be lowercase.
   For example system can return `Linux-x86_64`, but in repo is file with `linux-x86_64` suffix.
   https://github.com/docker/compose/releases/tag/v2.11.1

## Run gatsby project docker

1. cd [gatsby project]
2. docker-compose up -d --build

## Clean docker system cache

1. docker system prune -a

## Stop gatsby application

1. cd [gatsby project]
2. docker-compose down --volumes (deletes volumes)

## Build from Wordpress

1. Wordpress has "Activate Bitbucket Pipeline" button.
Button click starts bitbucket pipeline for some branch (dev branch in this case)
2. Pipeline sends last commit image to Linode server via "sftp-deploy" pipe
3. After sending pipeline must run ssh command (docker-compose up -d --build) or .sh file on Linode server side (via ssh-run pipe or other way) for build new docker image on server

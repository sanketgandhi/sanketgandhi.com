---
date: 2019-12-21
title: Containers
template: post
thumbnail: './CheatSheet-icon.png'
categories: Containers
tags:
  - Container
  - Docker
---

# Chroot

Chroot is the linux command that sets the root directory for new process.

In the context of container, the processes running in the container can not see the directory outside of it. Which helps to serperate the the process, running environment and ofcourse security.

To try chroot, try to run in container it self.
```sh
docker run -it --name docker-host --rm --privileged ubuntu:bionic
```
Above command will -
  1. Launch ubuntu which is marked as bionic tag
  2. `-it` means shell will be interactive. (i.e. you can access shell of the launched container)
  3. `docker-host` will allow to use docker inside of the container. That means event though you have not installed the docker in the container but host machine does have docker (Host meachine means your computer). The tunnel has been created to use docker inside the container from host machine 🎩

Now we are inside the container, create a new directory
` mkdir my-new-root` and create a new file `echo "Hey, how are you doing?" >> /my-new-root/message.txt`

Now we will create a new process by setting a new root directory for that process -
```sh
chroot /my-new-root bash
```


The folks who wrote docker does this for you!


Happy Hacking!

---
id: docker-latest-image-tag
date: 2022-06-19
title: Docker latest image tag and why you should not use it?
template: post
topic: 'topic'
thumbnail: './../../images/docker.webp'
slug: docker-image-tag
categories: docker
tags:
  - docker
  - container
---

Recetly, I faced issue where our code pipeline broke and after debugging container it was found that latest node version used and our code was not comaptible with it! 🤦🏻‍♂️

After researching about it, I got to know about basic mistake which we did about versioning and I decided to write this blog posts to explain it.

If you know about tags then you will get to know what I'm talking about. Have you built CICD pipeline? have you ever check docker base image that is used? Have you ever notice version? ... and there are bunch of other questions which I thing you should be curious about.

As we all programmers follow that either on frontend or backend we mention versions and we mention it preceisely and we know that it can not be vague. Otherwise surprise's are on your way! (if you don't know about sematic versioning and it works then then you should stop reading this and first read about it)

So having set this expectation, we should follow same practice in docker image tags. 

When you are developing CICD pipeline or creating container for your application then you most probably choosing base image then you should choose precise version. In many blog posts or videos lot of folks just use `latest` version of image. It is ***_BAD practice and anti-pattern_***.

If you want to use `latest` version then use it but mention precise version.

For e.g., check this - 

```
FROM node:16.13.1

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npm run build
```

`latest` tag never represent latest image it is misunderstanding. Whenever we publish image for the first time then `latest` tag gets attach to it. 

But in subsequent releases if `latest` tag is not change by auther then it will point to same version. 

If you are using it then it will surely backfire one day. 

Cheers! 👋
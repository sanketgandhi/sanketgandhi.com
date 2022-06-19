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
Recently, I faced an issue where our code pipeline broke and after debugging the container, it was found that the latest node version was used and our code was not compatible with it! 🤦🏻‍♂️

After doing some research, I discovered a basic mistake we made with versioning and decided to write this blog post to explain it.

If you know about tags, then you will get to know what I'm talking about. Have you built a CICD pipeline? Have you ever check docker base image that is used? Have you ever noticed versions? ... and there are a bunch of other questions which I think you should be curious about.

As all programmers know, whether on the frontend or the backend, we mention versions, and we mention them precisely, because we know it cannot be vague.

Otherwise, surprises are on your way! (If you don't know about sematic versioning and how it works then you should stop reading this and first read about it.)

So, having set this expectation, we should follow the same practise in docker image tags.

When you are developing CICD pipeline or creating container for your application, then you are most probably choosing a base image, then you should choose precise version. In many blog posts or videos, a lot of folks just use latest version of an image. It is BAD practise and anti-pattern.

If you want to use latest version then use it but mention precise version.

For example, check this -

```
FROM node:16.13.1

WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npm run build
```

It is a misunderstanding that the `latest` tag always represents the most recent image. Whenever we publish an image for the first time, the `latest` tag gets attached to it.

But in subsequent releases, if `latest` tag is not changed by the author, then it will point to same version.

If you are using it, then it will surely backfire one day. 

Cheers! 👋
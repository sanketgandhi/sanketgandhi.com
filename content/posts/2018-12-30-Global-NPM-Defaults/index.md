---
date: 2018-12-30
title: Global NPM Defaults
template: post
thumbnail: '../../thumbnails/npmlogo.png'
slug: global-npm-modules
categories: JS
tags:
  - tools
---
![](Skills-Tools-Sharpening.jpg)

Whenever you start any javascript project in which you are going to use [NPM (Node Package Manager)](https://www.npmjs.com/) then you must be creating package.json file through `npm init` command.

To skip all the question that `init` command ask, we just pass -y flag i.e. `npm init -y`. But the generated package.json file will have default values.

But what if you want to change default values for project and you don't want to repeat yourself for everytime you run `npm init`. So npm provides nice way to configure global properties. To check all the properties in your global [NPM config](https://docs.npmjs.com/files/npmrc) (npmrc) file, then run:

```shell
npm config ls -l
```

It showes all the properties but right now we need only `init-` prefix properties. To configure npm global config use `npm config` [command](https://docs.npmjs.com/cli/config)

```shell
npm config set <key> <value> -g
```

Example:

```shell
npm config set init-author-name "Sanket Gandhi" -g
```

Now you can run `npm init -y` and it will put all default values in package.json file.

Happy Coding 🔥

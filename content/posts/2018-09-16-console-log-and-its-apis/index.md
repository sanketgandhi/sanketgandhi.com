---
date: 2018-09-16
title: Console and its various APIs
template: post
thumbnail: '../../images/chrome-1.png'
slug: console-and-its-various-apis
categories: JS
tags:
  - Notes
  - cheatsheet
---

`console.clear()`

- Used to clear console

`console.log(‘something’)`

- To log something on console

`Console.time(‘GiveName’)` AND `console.timeEnd(‘GiveName’)`

- Used to calculate time required to execute code in between console.time and console.timeEnd.
- It give time in millisecond

`console.profile(‘GiveName’)` AND `console.profileEnd(‘GiveName’)`

- To start profile
- It shows profile in profile tab with given name

`console.assert(expression, message)`

- If the value passed in the first argument is false, the function will log a message given as the second argument in the web console. If the expression is true, nothing is logged.

`console.table(object)` AND `console.table(array,[“name”,”address”]);`

- This function displays the provided object or array as a table
- You can also restrict table to console only certain property by following way

`console.group(message)` AND `console.groupEnd(message)`

- The console.group(message) groups all logs that follow after it until the console.groupEnd()is called to a dropdown list. Lists can be nested.
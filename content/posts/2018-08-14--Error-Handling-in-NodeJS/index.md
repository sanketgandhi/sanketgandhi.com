---
date: 2018-08-14
title: Error Handling in NodeJs
template: post
thumbnail: '../../images/nodejs.png'
slug: error-handling-in-nodejs
categories: NodeJS
tags:
  - Notes
---

![Error-Handling](../../images/Error-Handling.jpg)

_It is important to realize that in any Node.js application handling of uncaught errors is not done automatically. There is no global domain set by default. If an error is emitted somewhere in the guts of your application and there is no error handler above it somewhere in the call stack, that error can bring down a Node process and may have direct consequences for application stability._ [_Refer here_](https://www.signal.co/dev-log/exception-handling-node-js/)

* **Tag your errors:** Whenever you catch an error, specify within the error object whether its a safe/trusted/operational error or unknown/developer error, then throw it.
* **Catch all API errors and decide whether they are safe:** At your API endpoints use promises and try-catch all errors, forward the errors to express error handler, there decide whether this is a known/trusted (see above point) error — then just return some HTTP status and error to the caller. If the error is unknown — throw it and let step 3 (below point) handle it.
* **Centrally catch leftovers and restart:** Using `process.onuncaughexpcetion` process all uncaught errors, if the error is not marked as safe then exit the process and let your process manager take care to restart.
* Use try-catch only for `JSON.parse()` statement. Don't use this in other scenarios
* Use custom errors like,

```js
function MountainError(message) {
  Error.captureStackTrace(this)
  this.messahe = message
  this.name = 'MountainError'
}
MountainError.prototype = Object.create(Error.prototype)
```

* Always deal in `Error` object. Because it helps to stack trace the issues.
* `process.on("uncaughtException")` must always do `process.exit()`. Because when this type of error occured then that connection remains open like database connections or security issues may occur. It is good practice to exit that process.
* Don’t `throw` errors in the node app.
* Try/catch will only catch exceptions thrown synchronously. The I/O error will not be handled. File reading will not be handle. For e.g.

```js
try {
    fs.open(“file.txt”, function (contents) {
        console.log(contents);
    });
} catch(Error e) {
    console.error("An error occured!", e);
}
```

* There are a large number of third-party logging libraries available for Node.js. In this guide, we’re going to look at three: **Winston, Bunyan, and Node-Loggly**. Check [this](https://www.loggly.com/ultimate-guide/category/node/) guide to use this.

### Examples

* Always try to use error handler middlewares.

Example-I:

```js
// Every single route in an application will require this module and it should called whenever programmer need to handle any error
function handleError(err, req, res) {
  logError(err)

  var message = err ? err.message : 'Internal Server Error'

  res.json({
    error: {message: message},
  })

  function logError(error) {
    console.log({
      message: error.message,
      stack: error.stack,
    })
  }
}

// On client side you just need to call this function
app.get('mountains/:id', function(req, res) {
  db.get(req.params.id, function(err, user) {
    if (err) {
      // Pass all the information that you want to log
      return handleError(err, req, res)
    }
    res.json(user)
  })
})
```

Example-II:

```js
//  Error handler middle wares have 4 parameters and look like this:

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.send(500, 'Something broke!')
})

// The error handlers would typically sit at the bottom of the stack (below other app.use) and the way to send errors is by using the third parameter of typical middleware:

app.use(function(req, res, next) {
  next('it blew')
})
```

* There is one last resort in node for catching uncaught exceptions before it exits the process. It’s the `uncaughtException` event in the process object. Putting the following code at the top of the file will cause the program to exit more gracefully:

```js
process.on('uncaughtException', function(err) {
  console.error('An uncaughtException was found, the program will end.')
  //hopefully do some logging.
  process.exit(1)
})
```

* Unfortunately, this is not a silver bullet, and should not be used for handling errors in your node.js app. It’s merely for being able to report the problem, and shut down gracefully. The state of the app is not guaranteed to be consistent, so the app should be restarted.

Resources -

1.  [Checklist: Best practice of Error Handling in NodeJS](https://goldbergyoni.com/checklist-best-practices-of-node-js-error-handling/)
2.  [Examples to handle errors-1](https://github.com/xjamundx/error-handling)
3.  [Examples to handle errors-2](https://github.com/imperugo/NodeJs-Sample)
4.  [Logging in node.js done right](http://www.jyotman.xyz/post/logging-in-node.js-done-right)

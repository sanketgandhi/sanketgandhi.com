---
date: 2019-01-20
title: Laravel Queues and use cases (Part-I)
template: post
thumbnail: '../../thumbnails/laravel-logo.png'
slug: laravel-queues-and-ues-cases
categories:
  - PHP
  - Popular
---

![](demystified.jpg)

Typically backend server receives HTTP request, does some processing and return a response to the user. This is normal flow we are familiar with. This works perfectly fine but there are other use cases too. For example, once user sign up then you want to send an email or you want to send report once user click on something or you want to send push notification once user click on save, etc.

## Scenario

Consider if you have website like amazon or social network site and user can sign up for an account. Suppose a user is currently on the sign up page and has submitted the details. So we want following to happen:

```php
// Save user's details into the database

// Send a welcome email to the user

// Return "Thank You" page
```

Skipping minor details, let suppose in there is some PHP in the background that takes care of sanitizing the input and storing the user's details into the database.

After inserting the user details into the database, the script now has to send a welcome email and since PHP executes code line-by-line top-to-bottom, **the user will see the "Thank You" page only after the email has been sent.** Even though sending email sometimes happens very fast (if we are using external service like SendGrid 🚀) else it takes time to send an email. So question is, why make the user wait and show the beautiful loading icon 🚧? (User is going to judge you anyway 😂)

## Queues to the rescue!

That's where queue services come into play. A **queue** is just a list/line of **things** waiting to be handled in order, starting from beginning. When I say **things**, I mean **jobs**.

If you want to **push a job**(dispatch it) onto the queue, the job implement `Illuminate\Contracts\Queue\ShouldQueue` interface. To learn more about jobs and how to create them, [visit official docs](http://laravel.com/docs/queues#writing-job-classes).

> In laravel, a job that should be queued must implement `Illuminate\Contracts\Queue\ShouldQueue` interface.

🎩 What if we take the process of sending the email and shove it into job, and then push that job onto the queue?

So second step will be:
```php
// Save user's details into the database

//push a SendEmail job onto the queue
this->dispatch(new SendEmail(user));

// Return "Thank You" page
```
Instead of returning the "Thank You" response after the email has been sent, **we now return the response after the job has been pushed onto the queue**. This way, user has to wait only as long as it takes for the job to be pushed, as opposed to waiting for an email to be actually sent.

## Executing jobs

So there's queue/list and there are jobs that get pushed onto the queue. But when and how do these jobs get executed? When does the welcome email actually gets sent?

In Laravel, there is this intimidating thing called **Queue Listener**. Queue listener is nothing more than a long-running process that listens to and runs the jobs from queue.

Technically, a worker command is being created in the background. So long story short - if Queue Listener never existed, none of the jobs from the queue would ever get executed.

We start the Queue Listener by running the following command from the terminal:

```php
php artisan queue:listen
```

> If your server crashed, so will the Queue Listener Stop. You should configure a process monitor that will automatically restart the Queue Listener. [Supervisor](http://supervisord.org/) is a great process monitor for the Linux OS.

If there were already hobs on the queue, it will just go on and do them one-by-one.

## Storing jobs

So the question is, where are these jobs stored? All we've learned so far is that they're pushed onto this queue, but what is it exactly?

As mentioned earlier - a queue is just a list of jobs that are waiting to be executed. Don't think of queue as anything else by a list of jobs!

Okay, where is this list stored anyway? How do we push the jobs onto the list? We use queue drivers!

(Insert Image Here of queue driver)

## Queue drivers

A queue driver is a concrete implementation of `Illuminate\Contracts\Queue\Queue` interface. It is responsible for managing the jobs, that is - storing and retrieving the jobs from our queue.

There are server drivers that ship with Laravel, and you can create one yourself if that's what you want.

For example - we cans store jobs in the database. Laravel even provides `database` driver out of the box~ You only have to do two simple steps:

- Set environment variable `QUEUE_DRIVER` to `database` (or just shove it in .env file)
- Run the `php artisan queue:table` and `php artisan migrate` from the terminal

The latter will create migrate for table that will hold the jobs, conveniently called "jobs", and run the migration.

Believer it or not - literally that's all you have to do! You can run Queue Listener and everything will work.

> You might want to create a migration for failed jobs as well. You can do so by running `queue:failed-jobs` artisan command.

You can also create your own queue drivers. Bear in mind your queue implementation has to adhere to `Illuminate\Contracts\Queue\Queue` contract.

## Listener and Worker explained

When you run `queue:listen` artisan command, the
`Illuminate\Queue\Listener::listen()` method will eventually get triggered:

```php
public function listen(connection, queue, delay, memory, timeout = 60)
{
    process = this->makeProcess(connection, queue, delay, memory, timeout);

    while (true) {
        this->runProcess(process, memory);
    }
}
```
More specifically, the `process` that is created is actually a Worker process. Even more specifically, the Worker process is actually Symfony’s `Process` object that calls the `queue:work` command once it has been started.

The `while(true)` basically says “run forever”. Thus, the listen command runs as long as you want it to (or until it runs out of memory), running the `runProcess(process)` method over and over.

This is what the `runProcess()` method looks like:

```php
public function runProcess(Process process, memory)
{
    process->run(function (type, line) {
        this->handleWorkerOutput(type, line);
    });

    if (this->memoryExceeded(memory)) {
        this->stop();
    }
}
```

Basically, it does two things. It runs the process and it checks if the memory limit has been exceeded. You can set the memory limit by providing a `--memory` option when starting the listener, but by default it’s 128 megabytes. If the memory has been exceeded, the listener gets stopped so a process manager can re-start it with a clean slate of memory (given you have a configured process manager to do so).

If all this is still somewhat confusing, read on the step-by-step guide.

### Doing it step-by-step
Lets go through all the listener-worker fuss one more time, step-by-step.

When we run the `queue:listen`, the following things occur:

1. `Listener::listen()` method is triggered, which creates a new instance of Symfony’s `Process` (which is a call to `queue:work` artisan command), and stores it in `process` variable.
2. `runProcess(process)` called in the infinite loop (for the 1st time)
3. `run()` method is being triggered on the `Process` (which starts the `queue:work` Artisan command at this point)
4. The `queue:work` command eventually runs the `Worker::pop()` method, that either runs the next job available, or sleeps if there are no jobs
5. After the job has been finished or, if there wasn’t any job available, worker has finished sleeping, a check is being made on the Listener class whether memory has been exceeded - if the memory has been exceeded, the listener just stops here and there are no more steps
6. `runProcess(process)` called in the infinite loop (for the 2nd time)
7. And so on…

As stated in step #4, the worker command essentially runs `Worker::pop()` method, which looks like this:

```php
public function pop(connectionName, queue = null, delay = 0, sleep = 3, maxTries = 0)
{
    connection = this->manager->connection(connectionName);

    job = this->getNextJob(connection, queue);

    if (! is_null(job)) {
        return this->process(
            this->manager->getName(connectionName), job, maxTries, delay
        );
    }

    this->sleep(sleep);

    return ['job' => null, 'failed' => false];
}
```
So as you can see, all it does is try to get the next job off of queue. If there is nothing on the queue, it will sleep for whatever time you’ve specified it to (`--sleep` option when running the listener).

There were some comments in the community about this being a cron job, so hopefully all this illustrates a bit better what actually happens in the background.

### Tips and tricks
#### - Daemon Worker
You might as well try to run `queue:work` with `--daemon` option for forcing the queue worker to continue processing jobs without ever re-booting the framework. This results in a significant reduction of CPU usage when compared to the `queue:listen` command, but at the added complexity of needing to drain the queues of currently executing jobs during your deployments.

Daemon queue workers do not restart the framework before processing each job. Therefore, you should be careful to free any heavy resources before your job finishes. For example, if you are doing image manipulation with the GD library, you should free the memory with `imagedestroy()` when you are done.

Similarly, your database connection may disconnect when being used by long-running daemon. You may use the `DB::reconnect` method to ensure you have a fresh connection.

#### - Failed Jobs
Sometimes things don’t go as planned, meaning your queued jobs will fail. It happens to everyone, don’t worry. Laravel includes a simple way to specify the maximum number of times a job should be attempted. After a job has exceeded this amount of attempts, it will be inserted into a `failed_jobs` table.

When running Queue Listener, you may specify the maximum number of times a job should be attempted using the `--tries` option:

`php artisan queue:listen --tries=3`

You also may define `failed` method directly on a job class, which will get triggered when a failure occurs.

```php
class SendWelcomeEmail extends Job implements SelfHandling, ShouldQueue
{
    public function failed()
    {
        // Called when the job is failing...
    }
}
```

#### - Leverage DispatchesJobs trait
As long as your controllers extend Laravel’s `App\Http\Controllers\Controller` you can dispatch jobs easily using the `this->dispatch(job)` syntax. If you want to dispatch a job from somewhere other than your controllers, you should use `Illuminate\Foundation\Bus\DispatchesJobs` trait.

#### - Multiple Queues and Workers
You can have different queues/lists for storing the jobs. You can name them however you want, such as “images” for pushing image processing tasks, or “emails” for queue that holds jobs specific to sending emails.

You can also have multiple workers, each working on a different queue if you want. You can even have multiple workers per queue, thus having more than one job being worked on simultaneously. Bear in mind having multiple workers comes with a CPU and memory cost.

Look it up in the official docs, it’s pretty straightforward.

## Conclusion
This was a brief overview of how queues work in Laravel. Most of this also does apply to other PHP frameworks (or even other languages), but the API and approaches are different.

Hopefully this article was helpful to you and you’ve gotten the grasp of what queues are and how they fit into the software development world.

Happy Coding 🔥

<!-- Refer: https://toniperic.com/2015/12/01/laravel-queues-demystified
https://divinglaravel.com/introduction-to-the-queue-system
https://divinglaravel.com/queue-workers-how-they-work
https://blog.menara.com.au/2016/06/running-laravel-in-amazon-elastic-beanstalk/
https://toniperic.com/2015/12/01/maintenance-mode-and-whitelists-in-laravel-5 -->
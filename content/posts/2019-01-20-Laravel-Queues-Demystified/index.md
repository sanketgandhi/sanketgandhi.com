---
id: laravel-queues-and-use-cases-part-one
date: 2019-01-20
title: Laravel Queues and use cases (Part-I)
template: post
thumbnail: './../../images/laravel-logo.png'
slug: laravel-queues-and-ues-cases-part-one
categories: Popular
tags:
  - Laravel
  - Queues
---

![](demystified.jpg)

Typically backend server receives HTTP request, does some processing and return a response to the user. This is normal flow we all are familiar with. This works perfectly fine in small applications where there is less work load. But there are applications that are beyond CRUD that are considered as "Enterprise" and need to serve and support for large data.

There are use-cases where application need to perform certain task in the background like -

1. Sending invoice when user buy something
2. Generate reports
3. Sending notifications
4. Heavy or builk operations that can not be completed within request time frame (typically 30sec/60sec)

##### Queue defination form docs

> Queues allow you to defer the processing of a time consuming task, such as sending an email, until a later time. Deferring these time consuming tasks drastically speeds up web requests to your application.

## Scenario

Consider if you have application where user can sign up for an account. So we want following things to happen whenever new user sign up.

```php
// ... Some business logic ...

// Save user's details into the database

// ... Some business logic ...

// Send a welcome email to the user

// Return "Thank You" page
```

Skipping minor details like business logic and service layers, lets suppose there is API which takes care of sanitizing the input and storing the user's details into the database.

After database operations, script has to send a welcome email and since PHP executes code line-by-line top-to-bottom, **user will see the "Thank You" page only after the email has been sent.**

Calling APIs is time consuming process (though sending email happens very fast with some good vendors like [SendGrid](https://sendgrid.com) 🚀) but otherwise it takes time to send an email. So question is, why make user to wait and show the beautiful loading icon ⏳? Even though your system is not slow then this proceess will make feels slow. So what's the answere 🤔

## Queues to the rescue!

Imagine queue is bucket and which holds **messages**. All your deffered messages will be in the queue. So queue holds just a messages waiting to be processed.

Laravel supports variety of queue's like AWS SQS, Redis, RabbitMQ, Database, etc. All queue configurations stored in [`config/queue.php`](https://github.com/laravel/laravel/blob/master/config/queue.php).

If you want to **push a message** onto the queue then you have to dispatch it from your controller.

So in our above scenario we take the process of sending the email and shove it into job, and then push that job onto the queue.

```php
// Save user's details into the database

//push a SendEmail message onto the queue
$this->dispatch(new SendEmail(user));

// Return "Thank You" page
```

Instead of returning the "Thank You" response after the email has been sent, **we now return the response after the message has been pushed onto the queue**. This way, user has to wait only as long as it takes for the message to be pushed, as opposed to waiting for an email to be actually sent.

## Executing messages

When and how these messages gets executed? When does email actually gets send?

In Laravel, all the workers related files are stored in **app/Jobs** directory. Workers are also called as Jobs/Messages in laravel. It is nothing more than a long-running process that listens to queue and runs the messages from queue.

In order to create the job, the worker class should implement `Illuminate\Contracts\Queue\ShouldQueue` interface. To learn more about jobs and how to create them, [visit official docs](http://laravel.com/docs/queues#writing-job-classes).

> In laravel, a job that should be queued must implement `Illuminate\Contracts\Queue\ShouldQueue` interface.

To be specific, some commands (like polling/heartbeat) is sent. If Queue Listener never existed, none of the jobs from the queue would ever get executed. Remember that, queue is generally called as "Pull Technique" means you have to pull from queue. Queue will never push/broadcase jobs.

We start the Queue Listener by running the following command from the terminal:

```php
php artisan queue:listen
```

> If your server crashed, so will the Queue Listener Stop. You should configure a process monitor that will automatically restart the Queue Listener. [Supervisor](http://supervisord.org/) is a great process monitor.

If there were already jobs on the queue, it will just execute those one after another. So the question is, how jobs are pushed to the queue? We use queue drivers!

## Queue drivers

A queue driver is a concrete implementation of `Illuminate\Contracts\Queue\Queue` interface. It is responsible for managing the jobs, that is - storing, retrieving, deleting the jobs from queue.

There are several drivers that ship with Laravel. For example - There is one way where we can use database as queue system. So laravel ship with database as driver uses as default. You only have to do two simple steps:

- Set environment variable `QUEUE_DRIVER` to `database` (or just shove it in .env file)
- Run the `php artisan queue:table` and `php artisan migrate` from the terminal

The latter will create migration for table that will hold the jobs.

> You might want to create a migration for failed jobs as well. You can do so by running `queue:failed-jobs` artisan command.

You can also create your own queue drivers. Bear in mind your queue implementation has to adhere to `Illuminate\Contracts\Queue\Queue` contract.

#### Daemon Worker

You might as well try to run `queue:work` with `--daemon` option for forcing the queue worker to continue processing jobs without ever re-booting the framework. This results in a significant reduction of CPU usage when compared to the `queue:listen` command, but at the added complexity of needing to drain the queues of currently executing jobs during your deployments.

Daemon queue workers do not restart the framework before processing each job. Therefore, you should be careful to free any heavy resources before your job finishes. For example, if you are doing image manipulation with the GD library, you should free the memory with `imagedestroy()` when you are done.

Similarly, your database connection may disconnect when being used by long-running daemon. You may use the `DB::reconnect` method to ensure you have a fresh connection.

#### Failed Jobs

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

#### Leverage DispatchesJobs trait

As long as your controllers extend Laravel’s `App\Http\Controllers\Controller` you can dispatch jobs easily using the `this->dispatch(job)` syntax. If you want to dispatch a job from somewhere other than your controllers, you should use `Illuminate\Foundation\Bus\DispatchesJobs` trait.

#### Multiple Queues and Workers

You can have different queues/lists for storing the jobs. You can name them however you want, such as “images” for pushing image processing tasks, or “emails” for queue that holds jobs specific to sending emails.

You can also have multiple workers, each working on a different queue if you want. You can even have multiple workers per queue, thus having more than one job being worked on simultaneously. Bear in mind having multiple workers comes with a CPU and memory cost.

Look it up in the official docs, it’s pretty straightforward.

## Conclusion

This was a brief overview of how queues work in Laravel. This concepts are same across other frameworks just you need to understand when to use it and when not to use it.

Hopefully this post was helpful to you and you’ve gotten the grasp of what queues are and how they fit into the software development world.

Cheers!

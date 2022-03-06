---
id: aws-rds-proxy-and-sts-related-issues
date: 2022-03-06
title: AWS RDS Proxy and STS related issue
template: post
topic: 'topic'
thumbnail: './../../images/aws.png'
slug: aws-rds-proxy-and-sts-related-issues
categories: aws
tags:
  - aws
  - sts
  - rds-proxy
---

Whenever you sign up for new AWS account then AWS creates/enables some default services (like VPC). One of which is Security Token Service (STS). Lot of folks don't know about STS service and of course I was one of them. 

I faced multiple issues while creting RDS proxy into another region which does not have STS by default enabled and neither I was aware of it. I followed offical AWS docs to create RDS proxy but was not able to create RDS proxy due to STS issue. 


In simple words, you are asking AWS to give you temporary credentials for limited amount of time to access certain AWS resources. 

I will highly recommend to check [how it works](https://aws-blog.de/2021/08/iam-what-happens-when-you-assume-a-role.html) and [how to enable it](https://aws.amazon.com/blogs/security/aws-security-token-service-is-now-available-in-every-aws-region/).


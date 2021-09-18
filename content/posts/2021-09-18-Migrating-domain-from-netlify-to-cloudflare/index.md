---
id: migrating-domain-from-netlify-to-cloudflare
date: 2021-09-18
title: Migrating domain from netlify to cloudflare
template: post
topic: 'topic'
thumbnail: './../../images/cloudflare.png'
slug: migrating-domain-from-netlify-to-cloudflare
categories: dns
tags:
  - cloudflare
  - netlify
---


If you bought domain from Netlify and you realised that you want -
1. More control on your domain
2. Additional features
3. Reputed registrar
Or you have any reason to move away from Netlify for domain management

Then read on...

When I started looking into moving out my domain then I had to hop on multiple things and required time to figure out what I have to do. There is [support guide from netlify](https://answers.netlify.com/t/support-guide-how-do-i-transfer-my-domain-name-to-or-away-from-netlify/186) which explain it well but if there is some missing points that I want to address.

First and foremost, netlify is not registrar! They cannot sell you domain.

So who is selling you domain through Netlify. Their partners! [Name.com](https://www.name.com/)

In order to control your domain go to [Name.com](https://www.name.com/) and create account. After creating account Netlify will able to trafer domain to your account.

Once account is created then verify your [ICANN contact details](https://www.name.com/support/articles/115013814748-Contact-Information-Validation). This is very important to verify contact details.

After above step [create netlify ticket](https://www.netlify.com/support/) for transferring domain and send them account code which you get on Name.com so they will transfer domain to Name.com and you can do whatever you want on Name.com

It takes around 2-3 days to transfer domain to Name.com which I experienced. Once you get from Netlify that your domain is transferred then go to your target registrar and start migration process.

### Cloudflare
I choose cloudflare registrar because of number of reasons. Security, infrastructure, cloudflare workers (awesome piece of tech).

It is pretty much easy to setup and [read this doc](https://developers.cloudflare.com/registrar/setup-domain-transfers/transfer-domain-to-cloudflare) and there is no confusion in their docs.

Few points to remember,
- When transfer is in process then make sure you unlock your domain on Name.com otherwise it will fail to transfer it.
- Make sure you renew your domain and do not try to transfer expired domain

---

Before ending this post few things I want address -
- Why I wrote this? Will it be useful in future?
No. I'm pretty much going to stay with cloudflare unless something happens to cloudflare.

- Why this post?
When I migrated to cloudflare then I got to know about analytics and I was shocked to see 910 unique vistor for last month. Personally, I don't care about this analytics, I simply want to share knowledge.

Hence this post for someone who might find it useful!

Cheers! 👋
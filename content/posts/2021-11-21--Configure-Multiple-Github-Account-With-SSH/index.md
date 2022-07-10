---
id: configure-multiple-github-accounts-with-ssh
date: 2021-10-21
title: Configure Multiple Github/Gitlab Account With SSH
template: post
topic: 'topic'
thumbnail: './../../images/github.png'
slug: configure-multiple-github-accounts-with-ssh
categories: git
tags:
  - git
  - github
---

Sometimes you need to configure multiple github accounts on your machine which is quite difficult if it is not properly setup. In this post, we will walk through steps. 

Note: Steps for github and gitlab are same. Just you need to replace domain name i.e. `github.com` with `gitlab.com` wherever it is mentioned.

- [1. Generate SSH Keys](#1-generate-ssh-keys)
- [2. Add public keys to GitHub](#2-add-public-keys-to-github)
- [3. Add private SSH Keys on your machine](#3-add-private-ssh-keys-on-your-machine)
- [4. Modify/Create SSH Config file](#4-modifycreate-ssh-config-file)
- [Setting `user.name` and `user.email` for all projects](#setting-username-and-useremail-for-all-projects)
  - [Alternate Way For Above Steps](#alternate-way-for-above-steps)
- [One command switch?](#one-command-switch)

### 1. Generate SSH Keys

We need to generate pair of ssh keys on your machine. Once keys are generated, there will be public and private key. You should NOT share your private key with anyone or upload anywhere. 

Open terminal on your machine, you need to generate SSH keys for all accounts that you need to configure with name and emails.

```sh
ssh-keygen -t rsa -b 4096 -f ~/.ssh/<github_username>_github_personal -C "<your_personal_email@youremail.com>"

# Work
ssh-keygen -t rsa -b 4096 -f ~/.ssh/<github_username>_github_work -C "<your_work_email@workmail.com>"
```

This will create public and private keys:

Personal Keys: `~/.ssh/<github_username>_github_personal.pub` and `~/.ssh/<github_username>_github_personal`

Work Keys: `~/.ssh/<github_username>_github_work.pub` and `~/.ssh/<github_username>_github_work`

Note, we have used `rsa` 4096 algo to generate ssh keys and are stored in your home directory.

### 2. Add public keys to GitHub

Now, we have keys generated on our machine. We need to add public key to github.

- Login to [github account](https://github.com/login)
- Copy your public ssh key (`.pub` extenion). You can open public file in text editor and copy content or use `pbcopy` to copy content to clipboard.

```sh
pbcopy < ~/.ssh/<github_username>_github_personal.pub
pbcopy < ~/.ssh/<github_username>_github_work.pub
```

- Create [New SSH Key on Github](https://github.com/settings/ssh) and paste copy content in it.
  - You can visit above link and check how to add key on github.
- Repeat above two steps for all your github accounts.

### 3. Add private SSH Keys on your machine

Now, we have public keys added to github. We need to add private keys on our machine.

```sh
ssh-add ~/.ssh/<github_username>_github_personal
ssh-add ~/.ssh/<github_username>_github_work
```

[OPTIONAL] Below are some commands if you want to dig into what all keys are stored on your machine.

- Delete all cached keys that are added by `ssh-add`

```sh
ssh-add -D
```

- Check all saved keys

```sh
ssh-add -l
```

### 4. Modify/Create SSH Config file

Now, we have private keys added on our machine. We need to add those keys to ssh config file.

- If you don't have `~/.ssh/config` file then you can create it and set permission

```sh
touch ~/.ssh/config
chmod 644 ~/.ssh/config
```

Note: git config file is used for lot of different configurations like git username, email, etc.

- Add following configuration in config file,

```sh
Host personal.github.com
    HostName github.com
    User git
    PreferredAuthentications publickey
    IdentityFile <absolute_path_to_your_personal_github_private_ssh_key>
    UseKeychain yes # Comment this other than macOS user
    AddKeysToAgent yes

Host work.github.com
    HostName github.com
    User git
    PreferredAuthentications publickey
    IdentityFile <absolute_path_to_your_work_github_private_ssh_key>
    UseKeychain yes # Comment this other than macOS user
    AddKeysToAgent yes
```

Note, Abosolution path means you need to give full path of private keys like e.g. `/Users/<username>/.ssh/<github_username>_github_personal`.

**Setup is done!**

Now, whenever you are cloning repository, you need to replace `git@github.com` to `git@personal.github.com` OR `git@work.github.com`

Example - 

```sh
git clone git@work.github.com:<username>/repository-name.git
cd repo
git config user.email "<email_address>"
```

For existing repository you need to change upstream URL so that your machine know which account to use.

```sh
git remote set-url origin git@work.github.com:<username>/repository-name.git
```

If you clone repo like this, `git clone git@github.com:<username>/repository-name.git` then it will use your public ssh key id which will use personal email address.

---

### Setting `user.name` and `user.email` for all projects

From above steps, you will able to use multiple github accounts on your machine. But, it will show wrong email address whenever you push changes to github. To resolve this, we need to tell our machine gitconfig when to use which email/name.

- You will need specific folder for all your work repo and personal/work repo e.g., `~/personal/` and `~/work/`
- Modify git config file `~/.gitconfig`, 

```sh
# Personal gitconfig
[includeIf "gitdir:~/personal/"]
    path = ~/.gitconfig-personal
# Work gitconfig
[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work
```

- Create `~/.gitconfig-personal` and `~/.gitconfig-work` files and add below configuration on both files.

```sh
[user]
    email = <personal_email>
    name = <Name>
```

#### Alternate Way For Above Steps

- Set alias in `~/.gitconfig` file,

```sh
[alias]
setworkmail = "config user.email '<your_work_email@workmail.com>'"
setpersonalmail = "config user.email '<your_personal_email@youremail.com>'"
```

- From above alias we can do `git setworkmail` to change email this project only.

### One command switch?

single command is `git work` or `git personal`!!!

> ```sh
git clone git@github.com:username/repo.git
cd repo
git work // <- 🔥
```

Do below setup to run single command: 

1. Open `~/.gitconfig` file and add folowing configuration:

```sh
[alias]
setworkmail = "config user.email '<your_work_email@workmail.com>'"
setpersonalmail = "config user.email '<your_personal_email@youremail.com>'"
changeremotehost = !sh -c \"git remote -v | grep '$1.*fetch' | sed s/..fetch.// | sed s/$1/$2/ | xargs git remote set-url\"
work = !sh -c \"git changeremotehost github.com work.github.com && git setworkmail\"
personal = !sh -c \"git changeremotehost github.com personal.github.com && git setpersonalmail\"
```

and you are good to go 😎

**How it is working?**

If you check `changeremotehost` alias, it will use to replace domain. example -

```sh
> git remote -v
origin git@github.com:sanketgandhi/sample-repo.git (fetch)
origin git@github.com:sanketgandhi/sample-repo.git (push)

> git changeremotehost github.com personal.github.com

> git remote -v
origin git@personal.github.com:sanketgandhi/sample-repo.git (fetch)
origin git@github_pro:sanketgandhi/sample-repo.git (push)
```


Cheers!

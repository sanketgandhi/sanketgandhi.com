---
id: configure-multiple-github-accounts-with-ssh
date: 2021-10-21
title: Configure Multiple Github Account With SSH
template: post
topic: 'topic'
thumbnail: './../../images/github.png'
slug: configure-multiple-github-accounts-with-ssh
categories: git
tags:
  - git
  - github
---

### Generating SSH Keys
- Generate SSH keys for the number of accounts with different name and email.

```shell
# Personal
ssh-keygen -t rsa -b 4096 -f <github_username>_github_personal "<your_personal_email@youremail.com>"

# Work
ssh-keygen -t rsa -b 4096 -f <github_username>_github_work "<your_work_email@workmail.com>"
```
- This will create public and private keys,
  - Personal Keys: `~/.ssh/<github_username>_github_personal.pub` and `~/.ssh/<github_username>_github_personal`
  - Works Keys: `~/.ssh/<github_username>_github_work.pub` and `~/.ssh/<github_username>_github_work`

### Add public keys to GitHub
- Login to [github account](https://github.com/login)
- Copy your public ssh key (`.pub` extenion) and add it in your gihub account
    ```shell
    pbcopy < ~/.ssh/<github_username>_github_personal.pub
    ```
- Create [New SSH Key on Github](https://github.com/settings/ssh) and paste copied key
- Repeat above two steps for all your github accounts

### Add SSH Keys
```shell
ssh-add ~/.ssh/<github_username>_github_personal
ssh-add ~/.ssh/<github_username>_github_work
```
- Delete all cached keys that are added by `ssh-add`
    ```shell
    ssh-add -D
    ```
- Check all saved keys
    ```shell
    ssh-add -l
    ```

### Modify/Create SSH Config file
- If you don't have `~/.ssh/config` file then you can create and set proper permission
    ```shell
    touch ~/.ssh/config
    chmod 644 ~/.ssh/config
    ```
- Add following configuration in config file,
  ```shell
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
- You can now use git remote URL by changing git@github.com by git@work.github.com
- Every time you clone git repo using different git account then you need to use like this,
    ```shell
    git clone git@work.github.com:<username>/repository-name.git
    cd repo
    git config user.email "<email_address>"
    ```
- You have to do this for every new repository. For existing repo,
    ```shell
    git remote set-url origin git@work.github.com:<username>/repository-name.git
    ```
- If you clone repo like this, `git clone git@github.com:<username>/repository-name.git` then it will use your public ssh key id which will use personal email address.

### Setting `user.name` and `user.email` for all projects
- You will need specific folder for all your work repo and personal/OSS repo. For e.g., `~/personal/` and `~/work/`
- Modify git config file,
    ```shell
        # ...
        # Personal gitconfig
        [includeIf "gitdir:~/personal/"]
            path = ~/.gitconfig-personal
        # Work gitconfig
        [includeIf "gitdir:~/work/"]
            path = ~/.gitconfig-work
    ```
- Create `~/.gitconfig-personal` and `~/.gitconfig-work` files and add,
    ```shell
        [user]
            email = <personal_email>
            name = <Name>
    ```

### Alternate Way For Above Step
- Set alias in `~/.gitconfig` file,
    ```shell
    [alias]
	setworkmail = "config user.email '<your_work_email@workmail.com>'"
    setpersonalmail = "config user.email '<your_personal_email@youremail.com>'"
    ```
- From above alias we can do `git setworkmail` to change email this project only.

### Single command to switch after cloning repo?
1. Clone repo with normal URL that github provides
2. Change remote host and email
    - To change remote host add alias in `~/.gitconfig`
        ```shell
        [alias]
            changeremotehost = !sh -c \"git remote -v | grep '$1.*fetch' | sed s/..fetch.// | sed s/$1/$2/ | xargs git remote set-url\"
        ```
Final alias in `~/.gitconfig` file,
```shell
    [alias]
    setworkmail = "config user.email '<your_work_email@workmail.com>'"
    setpersonalmail = "config user.email '<your_personal_email@youremail.com>'"
    changeremotehost = !sh -c \"git remote -v | grep '$1.*fetch' | sed s/..fetch.// | sed s/$1/$2/ | xargs git remote set-url\"
    work = !sh -c \"git changeremotehost github.com work.github.com && git setworkmail\"
    personal = !sh -c \"git changeremotehost github.com personal.github.com && git setpersonalmail\"
```

### Output
```shell
git clone git@github.com:username/repo.git
cd repo
git work
```

### Credits
- https://github.com/ArnaudRinquin/blog/blob/master/2014-03-11-one-command-github-account-switch.md
- https://gist.github.com/jexchan/2351996
- https://gist.github.com/yinzara/bbedc35798df0495a4fdd27857bca2c1

Cheers!
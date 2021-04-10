---
date: 2019-10-19
title: Cheatsheet Composer
template: post
thumbnail: '../../thumbnails/CheatSheet-icon.png'
slug: cs-composer
categories: Composer
tags:
  - Cheatsheet
  - Composer
---

## Installing dependency
>*This command doesn’t change any file. If composer.lock is not present, it will create it.*
- Downloads and installs all the libraries and dependencies outlined in the composer.lock                                      file. If the file does not exist it will look for composer.json and do the same, creating                                    a composer.lock file.

```sh
composer install
```
- Simulates the install without installing anything

```sh
composer install --dry-run
```

 `composer.lock` should always be committed to the repository. It has all the information needed to bring the local dependencies to the last committed state. If that file is modified on the repository, you will need to run `composer install` again after fetching the changes to update your local dependencies to those on that file.

## Adding packages
>*This command changes both the composer.json and composer.lock files.*
- Adds package from vendor to composer.json’s require section and installs it.
```sh
composer require vendor/package
```

- Adds package from vendor to composer.json’s require-dev section and installs it.
```sh
composer require vendor/package --dev
```

## Updating packages
>*This command changes only the composer.lock file.*
- Updates all packages
```sh
composer update
```

- Updates all packages and its dependencies
```sh
composer update --with-dependencies
```

- Updates a certain package from vendor
```sh
composer update vendor/package
```

- Updates all packages from vendor
```sh
composer update vendor/*
```

- Updates composer.lock hash without updating any packages
```sh
composer update --lock
```

## Removing packages
>*This command changes both the composer.json and composer.lock files.*
- Removes vendor/package from composer.json and uninstalls it
```sh
composer remove vendor/package
```

Happy Coding 🔥

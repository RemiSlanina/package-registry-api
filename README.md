# Package Registry API 

> work in progress 

A small REST API written in PHP for managing software package metadata.

## Features

- REST API
- PHP 8
- SQLite database
- Repository pattern
- Controller layer (wip)

## Running locally

Install dependencies

```bash
composer install
```

Start the development server

```bash
php -S localhost:8000 -t public
```

Open

```
http://localhost:8000/packages
```


## Project structure

```
public/
    index.php

src/
    Package.php
    PackageController.php
    PackageRepository.php

data/
    packages.db
```


## Roadmap

- [x] GET /packages
- [ ] GET /packages/{id}
- [ ] POST /packages
- [ ] PUT /packages/{id}
- [ ] DELETE /packages/{id}
- [ ] Validation
- [ ] Tests 

## Example

Example response:

```json
[
  {
    "id": 1,
    "name": "Composer",
    "description": "Dependency manager",
    "programming_language": "PHP",
    "repository_url": "https://...",
    "license": "MIT"
  }
]
```
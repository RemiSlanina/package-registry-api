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

### Use Browser
Open

```
http://localhost:8000/packages
```
or

### Use curl 

Read: 

```
curl http://localhost:8000/packages
```
or 
```
curl http://localhost:8000/packages/15
```

Delete: 

```
curl -X DELETE http://localhost:8000/packages/9
```


Create:

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Composer",
    "description":"Dependency manager",
    "programmingLanguage":"PHP",
    "repositoryUrl":"https://github.com/composer/composer",
    "license":"MIT"
  }' \
  http://localhost:8000/packages
```

Update:

```bash
curl \
  -X PUT \
  -H "Content-Type: application/json" \
  -d '{
    "id":15,
    "name":"Composer Updated",
    "description":"Dependency manager",
    "programmingLanguage":"PHP",
    "repositoryUrl":"https://github.com/composer/composer",
    "license":"MIT"
  }' \
  http://localhost:8000/packages/15
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
- [x] GET /packages/{id}
- [x] POST /packages
- [x] PUT /packages/{id}
- [x] DELETE /packages/{id}
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
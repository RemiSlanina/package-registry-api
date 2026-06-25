# Package Registry API

A small REST API written in PHP for managing software package metadata.

## Technologies

- REST API
- PHP 8
- SQLite database
- Router
- Controller layer
- Repository pattern 

## Why this project?

This project was built as a learning exercise to practice object-oriented PHP, HTTP request handling, repository-based architecture, SQLite, and automated testing.

## HTTP status codes

```text
GET    /packages      -> 200 OK
GET    /packages/{id} -> 200 OK
POST   /packages      -> 201 Created
PUT    /packages/{id} -> 200 OK
DELETE /packages/{id} -> 204 No Content
```

## Architecture

```
HTTP Request
↓
Router
↓
Controller
↓
Repository
↓
SQLite
```

## TODO

- Return Response objects instead of echoing in Router
- Better exception hierarchy
- Router could be table-driven
- Add OpenAPI/Swagger

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

http://localhost:8000/packages/15

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
    "name":"Composer Updated",
    "description":"Dependency manager",
    "programmingLanguage":"PHP",
    "repositoryUrl":"https://github.com/composer/composer",
    "license":"MIT"
  }' \
  http://localhost:8000/packages/15
```

Curl notes: 

```bash
curl -i # ... Show the HTTP response headers.

curl -v # ... Verbose. 

curl -X # ... Manually choose the HTTP method, instead of defaulting to GET. 

curl -H # ... Add an HTTP header. like curl \ -H "Content-Type: application/json" ("I'm sending JSON")

curl -d # ... The request body ("data") for input. 
# i.e.
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


## Tests

Using phpunit

```bash
composer require --dev phpunit/phpunit
```

Initialize it with:
```bash
vendor/bin/phpunit --generate-configuration
``` 
to create phpunit.xml.

Run tests with:
```bash
vendor/bin/phpunit
```
or
```bash
vendor/bin/phpunit tests
```
To run one file:
```bash
vendor/bin/phpunit tests/PackageRepositoryTest.php
```
To run one test method:
```bash
vendor/bin/phpunit --filter testCreatePackageAssignId
```


## Project structure

```
public/
    index.php                # Application entry point

src/                         # Core logic
    Package.php              # Model
    Router.php               # Routing logic  
    PackageController.php    # Handles HTTP requests
    PackageRepository.php    # Database operations

data/                        # SQLite database
    packages.db
```

## Roadmap

- [x] GET /packages
- [x] GET /packages/{id}
- [x] POST /packages
- [x] PUT /packages/{id}
- [x] DELETE /packages/{id}
- [ ] Validation
- [ ] PHPUnit tests  
- [ ] Small Frontend

## Example

Example response:


### GET /packages

```json
[
  {
    "id": 1,
    ...
  }
]
````

### GET /packages/1

```json
{
  "id": 1,
  ...
}
```

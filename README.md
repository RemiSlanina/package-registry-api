# Package Registry API

A small REST API written in PHP for managing software package metadata.

## Technologies

- REST API
- PHP 8
- SQLite database
- Router
- Controller layer
- Repository pattern 
- PHPUnit

## Why this project?

This project was built as a learning exercise to practice object-oriented PHP, HTTP request handling, repository-based architecture, SQLite, and automated testing.

## Project Structure

```text
.
├── src/          # PHP domain and application code
├── public/       # API entry point
├── tests/        # PHPUnit tests
├── data/         # SQLite database
├── frontend/     # React + Vite client
└── dev-notes/    # Development notes
```


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
- Current router tests focus on GET/DELETE routes. POST and PUT currently read 
  directly from php://input, which will be refactored alongside a future Request/Response abstraction.
- Better exception hierarchy
- Router could be table-driven
- Add OpenAPI/Swagger

## Database setup

Create the SQLite database from the provided schema and sample data.

```bash
sqlite3 data/packages.db < data/schema.sql
sqlite3 data/packages.db < data/seed.sql
```

The generated `packages.db` file is ignored by Git and can be recreated at any time.

## Running the PHP API

Install PHP dependencies:

```bash
composer install
```

Start the development server:

```bash
php -S localhost:8000 -t public
```

## React frontend

Run

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

## Requirements

- PHP 8.3+
- Composer 2
- Node.js 24 LTS (or newer)
- SQLite 3

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
curl -iX DELETE http://localhost:8000/packages/17
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
### Test coverage

- Repository unit tests
- Controller unit tests using PHPUnit mocks
- Router tests covering GET, DELETE, and unknown routes

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
- [x] PHPUnit tests
- [ ] Validation
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

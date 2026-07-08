# Backlog

## Roadmap

### Completed

- [x] REST CRUD endpoints
- [x] PHPUnit tests
- [x] React frontend

### Planned

- [ ] Request validation (url validation, ...)
- [ ] Response objects instead of echoing in Router
- [ ] Request/Response abstraction (POST/PUT currently read directly from php://input)
- [ ] Better exception hierarchy
- [ ] OpenAPI/Swagger
- [ ] Table-driven router, something like follows:

```
$routes = [
    ["GET", "/packages", [$controller, "getAll"]],
    ["POST", "/packages", [$controller, "create"]],
    ["DELETE", "/packages/{id}", [$controller, "delete"]],
];
```

then :

```
foreach ($routes as $route) {
    if (matches($request, $route)) {
        call($route);
    }
}

```

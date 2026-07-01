-- SQLite schema for the package registry.
CREATE TABLE packages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  programming_language TEXT NOT NULL,
  repository_url TEXT NOT NULL,
  license TEXT NOT NULL
)
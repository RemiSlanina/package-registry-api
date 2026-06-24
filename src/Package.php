<?php

namespace App;

readonly class Package  {
    public function __construct(
        public ?int $id,
        public string $name,
        public string $description,
        public string $programmingLanguage,
        public string $repositoryUrl,
        public string $license) {}
}
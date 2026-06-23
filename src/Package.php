<?php

namespace App;

class Package  {
    public ?int $id;
    public string $name;
    public string $description;
    public string $programmingLanguage;
    public string $repositoryUrl;
    public string $license;

    public function __construct(?int $id, string $name, string $description, string $programmingLanguage, string $repositoryUrl, string $license) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->programmingLanguage = $programmingLanguage;
        $this->repositoryUrl = $repositoryUrl;
        $this->license = $license;
    }
}
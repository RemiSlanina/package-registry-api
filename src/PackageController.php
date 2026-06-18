<?php

namespace App;

class PackageController {
    public array $packageRepositories = [];
    public function __construct(array $packageRepositories) {
        $this->packageRepositories = $packageRepositories;
    }
    function listPackages(): array {
        return $this->packageRepositories;
    }
}
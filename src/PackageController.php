<?php

namespace App;

class PackageController {
    private PackageRepository $repository;
    public function __construct(PackageRepository $repository) {
        $this->repository = $repository;
    }
    function listPackages(): array {
        return $this->repository->findAll();
    }

    public function getPackage(int $id): ?Package {
        return $this->repository->findById($id);
    }

    public function deletePackage(int $id): ?Package {
        return $this->repository->deletePackage($id);
    }

    /**
     * @throws RuntimeException
     */
    public function createPackage(Package $package): Package {
        return $this->repository->createPackage($package);
    }
    /**
     * @throws RuntimeException
     */
    public function updatePackage(Package $package): Package {
        return $this->repository->updatePackage($package);
    }
}

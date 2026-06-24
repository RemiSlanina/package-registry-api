<?php

namespace App;
use PDO;
use RuntimeException;

class PackageRepository {
    private PDO $pdo;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
        #die("Reached PackageRepository");
    }

    function findAll(): array {
        $stmt = $this->pdo->query("SELECT * FROM packages");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        # echo json_encode($rows);

        $packages = [];
        foreach ($rows as $row) {
            $package = new Package(
                $row['id'],
                $row['name'],
                $row['description'],
                $row['programming_language'],
                $row['repository_url'],
                $row['license']
            );
            $packages[] = $package;
        }

        return $packages;
    }

    public function findById(int $id): ?Package {
        $stmt = $this->pdo->prepare("SELECT * FROM packages WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            return null;
        }
        return new Package(
            $row['id'],
            $row['name'],
            $row['description'],
            $row['programming_language'],
            $row['repository_url'],
            $row['license']
        );
    }

    public function deletePackage(int $id): bool {
        $stmt = $this->pdo->prepare("DELETE FROM packages WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->rowCount() > 0;
    }

    /**
     * @throws RuntimeException
     */
    public function createPackage(Package $package): Package {
        $sql =  "
            INSERT INTO packages (
                name,
                description,
                programming_language,
                repository_url,
                license
            )
            VALUES (
                :name,
                :description,
                :programming_language,
                :repository_url,
                :license
            )
        ";
        $data = [
            'name' => $package->name,
            'description' => $package->description,
            'programming_language' => $package->programmingLanguage,
            'repository_url' => $package->repositoryUrl,
            'license' => $package->license,
        ];
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($data);

        $id = (int) $this->pdo->lastInsertId();
        if ($id <= 0) {
            throw new RuntimeException('Failed to create package.');
        }
        return new Package(
            $id,
            $package->name,
            $package->description,
            $package->programmingLanguage,
            $package->repositoryUrl,
            $package->license
        );
    }
}


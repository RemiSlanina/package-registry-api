<?php

namespace App;
use PDO;
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

        return $rows;
    }
}


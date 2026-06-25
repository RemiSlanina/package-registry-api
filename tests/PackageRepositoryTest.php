<?php
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use App\PackageRepository;
use App\Package;
use function PHPUnit\Framework\assertTrue;

#[CoversClass(PackageRepository::class)]
class PackageRepositoryTest extends TestCase {

    private PDO $pdo;
    private PackageRepository $repository;
    protected function setUp(): void {
        parent::setUp();
        //create fresh in memory sqlite database
        $this->pdo = new PDO('sqlite::memory:'); // only exists in RAM; testing db

        // exceptions should fail immediately during tests
        $this->pdo->setAttribute(
            PDO::ATTR_ERRMODE,
            PDO::ERRMODE_EXCEPTION);

        $this->createSchema($this->pdo); // setup db

        $this->repository = new PackageRepository($this->pdo);
    }

    public function testFindByIdReturnsNullWhenPackageDoesNotExist(): void {
        $package = $this->repository->findById(-1);
        $this->assertNull($package);
    }

    public function testCreatePackageAssignsId(): void {
        // Arrange
        $package = $this->createTestPackage();
        // Act
        $created = $this->repository->createPackage($package);
        // Assert
        $this->assertInstanceOf(Package::class, $created);
        $this->assertNotNull($created->id);
    }

    public function testFindByIdReturnsCreatedPackage(): void {
        $package = $this->createTestPackage();
        $created = $this->repository->createPackage($package);
        //var_dump($created);
        $found = $this->repository->findById($created->id);
        $this->assertNotNull($found);
        $this->assertInstanceOf(Package::class, $found);
        $this->assertNotNull($found->id);
        // assertSame also checks the type (contrast: assertEquals)
        $this->assertSame($package->name, $found->name);
        $this->assertSame($package->description, $found->description);
    }

    public function testFindByIdReturnsNull(): void {
        // empty entries ...
        $found = $this->repository->findById(1);
        $this->assertNull($found);
    }

    public function testFindAllReturnsAllPackages(): void
    {
        $packages = $this->createTestPackages();
        $created = [];
        foreach ($packages as $package) {
            $created[] = $this->repository->createPackage($package);
//            $createdOne = $this->repository->createPackage($package);
//            array_push($created, $createdOne);
        }
        $found = $this->repository->findAll();
        $this->assertNotNull($found);
        $this->assertCount(count($packages), $found);
        foreach ($found as $f) {
            $this->assertInstanceOf(Package::class, $f);
            $this->assertNotNull($f->id);
//            $isInCreated = count(array_filter($created, fn($c) => $c->id === $f->id)) > 0;
//            assertTrue($isInCreated);
            // the id of $f is in the column id of $created ...
            $this->assertTrue(in_array($f->id, array_column($created, 'id')));
        }
    }

    public function testUpdatePackageThrowsIfIdIsNull(): void {
        $package = $this->createTestPackage();
        $created = $this->repository->createPackage($package);

        // Expect a RuntimeException to be thrown
        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('The package id must not be null for updating.');

        // $package has id of null
        $this->repository->updatePackage($package);
    }

//    *************** HELPER FUNCTIONS ***************
    private function createSchema(PDO $pdo): void {
        $pdo->exec(
            "CREATE TABLE packages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    description TEXT NOT NULL,
                    programming_language TEXT NOT NULL,
                    repository_url TEXT NOT NULL,
                    license TEXT NOT NULL
                )
          ");
    }

    private function createTestPackage(): Package {
        return new Package(
            null,
            "Composer",
            "Dependency manager",
            "PHP",
            "https://github.com/composer/composer",
            "MIT"
        );
    }
    private function createTestPackages(): array {
        return [
            new Package(
                null,
                "Composer",
                "Dependency manager for PHP",
                "PHP",
                "https://github.com/composer/composer",
                "MIT"
            ),
            new Package(
                null,
                "Symfony",
                "PHP web framework",
                "PHP",
                "https://github.com/symfony/symfony",
                "MIT"
            ),
            new Package(
                null,
                "Laravel",
                "PHP web application framework",
                "PHP",
                "https://github.com/laravel/framework",
                "MIT"
            ),
            new Package(
                null,
                "Monolog",
                "Logging library for PHP",
                "PHP",
                "https://github.com/Seldaek/monolog",
                "MIT"
            ),
            new Package(
                null,
                "PHPUnit",
                "Unit testing framework for PHP",
                "PHP",
                "https://github.com/sebastianbergmann/phpunit",
                "BSD-3-Clause"
            )
        ];
    }
}

<?php
use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use App\Package;
use App\PackageController;
use App\PackageRepository;

#[CoversClass(PackageController::class)]
class PackageControllerTest extends TestCase {
    private PackageRepository $repository;
    private PackageController $controller;
    protected function setUp(): void {
        $this->repository = $this->createMock(PackageRepository::class);
        $this->controller = new PackageController($this->repository);
    }
    public function testListPackagesReturnsRepositoryResult(): void {
        $packages = [
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
            )
        ];

        $this->repository
            ->expects($this->once())
            ->method('findAll')
            ->willReturn($packages);

        $result = $this->controller->listPackages();
        $this->assertSame($packages, $result);

    }
    public function testGetPackageReturnsRepositoryResult(): void {
        $package = $this->createTestPackage();
        $this->repository
            ->expects($this->once())
            ->method('findById')
            ->with(1)
            ->willReturn($package);

        $result = $this->controller->getPackage(1);
        $this->assertSame($package, $result);
    }

    public function testCreatePackageReturnsCreatedPackage(): void {
        $package = $this->createTestPackage();
        $this->repository
            ->expects($this->once())
            ->method('createPackage')
            ->with($package)
            ->willReturn($package);
        $result = $this->controller->createPackage($package);
        $this->assertSame($package, $result);
    }

    public function testUpdatePackageReturnsUpdatedPackage(): void {
        $package = $this->createTestPackage();
        $this->repository
            ->expects($this->once())
            ->method('updatePackage')
            ->with($package)
            ->willReturn($package);
        $result = $this->controller->updatePackage($package);
        $this->assertSame($package, $result);
    }

    public function testDeletePackageReturnsRepositoryResult(): void {
        $package = $this->createTestPackage();
        $this->repository
            ->expects($this->once())
            ->method('deletePackage')
            ->with(1)
            ->willReturn($package);
        $result = $this->controller->deletePackage(1);
        $this->assertSame($package, $result);
    }

    public function testDeletePackageReturnsNullForNotFoundPackage(): void {
        $package = $this->createTestPackage();
        $this->repository
            ->expects($this->once())
            ->method('deletePackage')
            ->with(999)
            ->willReturn(null);
        $result = $this->controller->deletePackage(999);
        $this->assertNull($result);
    }

    public function testGetPackageReturnsNullWhenRepositoryReturnsNull(): void {
        $this->repository
            ->expects($this->once())
            ->method('findById')
            ->with(999)
            ->willReturn(null);
        $this->assertNull($this->controller->getPackage(999));
    }

    public function testCreatePackageForwardsRepositoryException(): void {
        $package = $this->createTestPackage();
        $this->repository
            ->expects($this->once())
            ->method('createPackage')
            ->with($package)
            ->willThrowException(
                new RuntimeException('Something went wrong')
            );
        $this->expectException(RuntimeException::class);
        $this->controller->createPackage($package);
    }

    public function testUpdatePackageForwardsRepositoryException(): void {
        $package = $this->createTestPackage();
        $this->repository
            ->expects($this->once())
            ->method('updatePackage')
            ->with($package)
            ->willThrowException(
                new RuntimeException('Something went wrong')
            );
        $this->expectException(RuntimeException::class);
        $this->controller->updatePackage($package);
    }

    //    *************** HELPER FUNCTIONS ***************
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
}



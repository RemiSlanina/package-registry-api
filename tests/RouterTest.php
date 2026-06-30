<?php

use PHPUnit\Framework\Attributes\CoversClass;
use PHPUnit\Framework\TestCase;
use App\Router;
use App\Package;
use App\PackageController;

#[CoversClass(Router::class)]
class RouterTest extends TestCase {
    private Router $router;
    private PackageController $controller;
    protected function setUp(): void {
        $this->controller = $this->createMock(PackageController::class);
        $this->router = new Router($this->controller);
    }
    public function testHandleGetPackageOutuptsJson(): void {
        $packages = [
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
        $this->controller
            ->expects($this->once())
            ->method('listPackages')
            ->willReturn($packages);
        ob_start();
        $this->router->handle(
            'GET', '/packages'
        );
        $output = ob_get_clean();

        $this->assertJsonStringEqualsJsonString(
            json_encode($packages),
            $output
        );

    }

    public function testHandleGetPackageIdParamsOutputJson(): void
    {
        $id = 1;
        $package = $this->createTestPackage($id);
        $this->controller
            ->expects($this->once())
            ->method('getPackage')
            ->with($id)
            ->willReturn($package);

        ob_start();
        $this->router->handle(
            'GET', '/packages/' . $id
        );
        $output = ob_get_clean();
        $this->assertJsonStringEqualsJsonString($output, json_encode($package));
    }
    public function testHandleGetPackageIdParamsReturnsNull(): void
    {
        $id = 999;
        $this->controller
            ->expects($this->once())
            ->method('getPackage')
            ->with($id)
            ->willReturn(null);

        ob_start();
        $this->router->handle(
            'GET', '/packages/999'
        );
        $output = ob_get_clean();

        $this->assertSame('', $output);
        $this->assertSame(404, http_response_code());
    }


//    *************** HELPER FUNCTIONS ***************
    private function createTestPackage(?int $id = null): Package {
        return new Package(
            $id,
            "Composer",
            "Dependency manager",
            "PHP",
            "https://github.com/composer/composer",
            "MIT"
        );
    }
}
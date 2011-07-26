<?php
/*When testing Zend Framework-driven applications, the primary purpose of the setUp() method is to
bootstrap your application environment so the tests can interact with the application code, it's a good
idea to DRY up the code and create a parent test case class which readies the environment for you.
You'll modify the generated test controller classes to extend this class, which will in turn subclass
Zend_Test_PHPUnit_ControllerTestCase. Here's what a basic parent test controller class looks
like, which I call ControllerTestCase.php (this file should be placed in the tests/application/
controllers directory):*/
require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';
abstract class ControllerTestCase extends Zend_Test_PHPUnit_ControllerTestCase
{
    public function setUp ()
    {
        $this->bootstrap = new Zend_Application(APPLICATION_ENV, 
        APPLICATION_PATH . '/configs/application.ini');
        parent::setUp();
    }
    public function tearDown ()
    {
        parent::tearDown();
    }
}

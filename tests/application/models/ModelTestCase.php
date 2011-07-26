<?php
class ModelTestCase extends PHPUnit_Framework_TestCase
{
    protected $em;
    public function setUp ()
    {
        $this->bootstrap = new Zend_Application(APPLICATION_ENV, 
        APPLICATION_PATH . '/configs/application.ini');
        $bootstrap = $application->bootstrap()->getBootstrap();
        $this->em = $bootstrap->getResource('entityManager');
        parent::setUp();
    }
    public function tearDown ()
    {
        parent::tearDown();
    }
}
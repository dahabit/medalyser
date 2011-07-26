<?php
// Define path to application directory
defined('APPLICATION_PATH') || define('APPLICATION_PATH', 
realpath(dirname(__FILE__) . '/../application'));
// Define application environment
defined('APPLICATION_ENV') || define('APPLICATION_ENV', 
(getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'development'));
// Ensure library/ is on include_path
set_include_path(
implode(PATH_SEPARATOR, 
array(realpath(APPLICATION_PATH . '/../library'), get_include_path())));
// Define path to public directory
defined('PUBLIC_PATH') ||
 define('PUBLIC_PATH', realpath(dirname(__FILE__) . '/../public'));
// Define path to base directory
defined('BASE_PATH') || define('BASE_PATH', realpath(dirname(__FILE__) . '/..'));
// Setup Zend Autoloader
require_once 'Zend/Loader/Autoloader.php';
Zend_Loader_Autoloader::getInstance();
//Setup MA NameSpace
$loader = Zend_Loader_Autoloader::getInstance();
$loader->registerNamespace('MA_');
/** Zend_Application */
// Create application, bootstrap, and run
$application = new Zend_Application(APPLICATION_ENV, 
APPLICATION_PATH . '/configs/application.ini');
$application->bootstrap()->run();
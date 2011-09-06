<?php
/**
 *THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION;LOSS OF HEALTH IN ANY FORM) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * @version 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
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
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
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    /*
	 * Access Configuration Parameters Globally Using Zend_Registry
	 *Desc:With the configuration object now residing in a registry variable, you'll be able to retrieve it within
	 *any controller action simply by calling the Zend_Registry component's static  get method. This
	 *means you won't have to repetitively retrieve the configuration data from within every controller
	 *init() method! Instead, you can just retrieve the configuration parameters like this:
	 *
	 *$this->view->supportEmail = Zend_Registry::get('config')->company->email->support;
	 */
    protected function _initConfig ()
    {
        $config = new Zend_Config($this->getOptions());
        Zend_Registry::set('config', $config);
        $globalSettings = new Zend_Config_Ini(
        APPLICATION_PATH . '/configs/globalsettings.ini', 'staging');
        Zend_Registry::set('globalsettings', $globalSettings);
    }
    protected function _initDoctrine ()
    {
        require_once ('Doctrine/Common/ClassLoader.php');
        $autoloader = Zend_Loader_Autoloader::getInstance();
        $classLoader = new \Doctrine\Common\ClassLoader('Entities', 
        realpath(
        Zend_Registry::get('config')->resources->entityManager->connection->entities), 
        'loadClass');
        $autoloader->pushAutoloader(array($classLoader, 'loadClass'), 
        'Entities');
        $classLoader = new \Doctrine\Common\ClassLoader('Repositories', 
        realpath(
        Zend_Registry::get('config')->resources->entityManager->connection->entities), 
        'loadClass');
        $autoloader->pushAutoloader(array($classLoader, 'loadClass'), 
        'Repositories');
    }
    /*	Firebug Console.Log for PHP using Zend Framework
	Source: http://www.websitefactors.co.uk/zend-framework/2011/05/firebug-console-log-for-php-using-zend-framework/
	Usage:
	Zend_Registry::get('logger')->emerg('Emergency firebug message');
    Zend_Registry::get('logger')->alert('Alert firebug message');
    Zend_Registry::get('logger')->crit('Critical firebug message');
    Zend_Registry::get('logger')->err('Error firebug message');
    Zend_Registry::get('logger')->warn('Warning firebug message');
    Zend_Registry::get('logger')->notice('Notice firebug message');
    Zend_Registry::get('logger')->info('Info firebug message');
    Zend_Registry::get('logger')->debug('Debug firebug message');
    */
    protected function _initLogging ()
    {
        $this->bootstrap('frontController');
        $logger = new Zend_Log();
        $env = $this->getEnvironment();
        $writer = 'production' == $env ? new Zend_Log_Writer_Stream(
        APPLICATION_PATH . "/data/logs/application.log") : new Zend_Log_Writer_Firebug();
        $logger->addWriter($writer);
        if ('production' == $env) {
            $writer->setEnabled(false);
        }
        Zend_Registry::set('logger', $logger);
    }
}


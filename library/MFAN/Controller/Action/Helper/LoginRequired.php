<?php
class MFAN_Controller_Action_Helper_LoginRequired extends Zend_Controller_Action_Helper_Abstract
{
    public function direct ()
    {
        $auth = Zend_Auth::getInstance();
        if (! $auth->hasIdentity()) {
            $flash = Zend_Controller_Action_HelperBroker::getStaticHelper(
            'flashMessenger');
            $flash->addMessage(
            Zend_Registry::get('config')->messages->login->required);
            $redirector = Zend_Controller_Action_HelperBroker::getStaticHelper(
            'redirector');
            Zend_Debug::dump($redirector);
            //The Redirector helper on zend documentation
            $redirector->setGotoSimple("login", "account");
            return 1;
        }
    }
}
?>S
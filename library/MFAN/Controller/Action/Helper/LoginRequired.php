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
            $redirector->gotoUrl('/account/login');
            return 1;
        }
    }
}
?>
<?php
class IndexController extends Zend_Controller_Action
{
    public function init ()
    {}
    public function indexAction ()
    { // Make sure the user is logged-in
        $this->_helper->LoginRequired();
    }
}


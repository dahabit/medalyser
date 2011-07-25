<?php
class AccountController extends Zend_Controller_Action
{
    public function init ()
    {
        /* Initialize action controller here */
    }
    public function indexAction ()
    {
        // Make sure the user is logged-in
        $this->_helper->LoginRequired();
    }
    public function loginAction ()
    {
        $this->view->pageTitle = 'Medalyser: Login to Your Account';
        $form = new Application_Form_Login();
        // Has the login form been posted?
        if ($this->getRequest()->isPost()) {
            // If the submitted data is valid, attempt to authenticate the user
            if ($form->isValid($this->_request->getPost())) {
                // Did the user successfully login?
                if ($this->_authenticate(
                $this->_request->getPost())) {
                    $account = $this->em->getRepository('Entities\Adminprofile')->findOneByPrimaryemail(
                    $form->getValue('primaryemail'));
                    // Save the account to the database
                    $this->em->persist($account);
                    $this->em->flush();
                    // Generate the flash message and redirect the user
                    $this->_helper->flashMessenger->addMessage(
                    Zend_Registry::get('config')->messages->login->successful);
                    return $this->_helper->redirector('index', 'index');
                } else {
                    $this->view->errors["form"] = array(
                    Zend_Registry::get('config')->messages->login->failed);
                }
            } else {
                $this->view->errors = $form->getErrors();
            }
        }
        $this->view->form = $form;
    }
}




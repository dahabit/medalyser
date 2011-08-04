<?php
class AccountController extends Zend_Controller_Action
{
    public function init ()
    {
        $this->em = $this->_helper->EntityManager();
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
                    $form->getValue('email'));
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
    //TODO: Create different doctrine processes for patient/admin
    public function registerAction ()
    {
        // Instantiate the registration form model
        $form = new Application_Form_Register();
        // Has the form been submitted?
        if ($this->getRequest()->isPost()) {
            // If the form data is valid, process it
            if ($form->isValid($this->_request->getPost())) {
                // Does an account associated with this username already exist?
                $account = $this->em->getRepository(
                'Entities\Adminprofile')->findOneBy(
                array('primaryemail' => $form->getValue('email'), 
                'username' => $form->getValue('username')));
                if (! is_object($account)) {
                    $account = new \Entities\Adminprofile();
                    // Assign the account attributes
                    $account->setNonNestedFormElements(
                    $form->getValues());
                    //convert date and time to object so doctrine doesn't echo errors
                    $account->created = new DateTime("now");
                    // Set the confirmation key
                    $account->setRecovery(
                    $this->_helper->generateID(32));
                    try {
                        // Save the account to the database
                        $this->em->persist($account);
                        $this->em->flush();
                    } catch (Exception $e) {
                        $this->view->errors = array(
                        array("There was a problem creating your account."));
                    }
                    // Create a new mail object
                    $mail = new Zend_Mail();
                    // Set the e-mail from address, to address, and subject
                    $mail->setFrom(
                    Zend_Registry::get('config')->email->support);
                    $mail->addTo($account->getEmail(), 
                    "{$account->getUsername()}");
                    $mail->setSubject('MedAlyser.com: Confirm Your Account');
                    // Retrieve the e-mail message text
                    include "_email_confirm_email_address.phtml";
                    // Set the e-mail message text
                    $mail->setBodyText($email);
                    // Send the e-mail
                    $mail->send();
                    // Set the flash message
                    $this->_helper->flashMessenger->addMessage(
                    Zend_Registry::get('config')->messages->register->successful);
                    // Redirect the user to the home page
                    $this->_helper->redirector('login', 
                    'account');
                } else {
                    $this->view->errors = array(
                    array(
                    "The desired username {$form->getValue('username')} has already been taken, or
              the provided e-mail address is already associated with a registered user."));
                }
            } else {
                $this->view->errors = $form->getErrors();
            }
        }
        $this->view->form = $form;
    }
    //TODO: Create different doctrine processes for patient/admin
    public function lostAction ()
    {
        $form = new Application_Form_Lost();
        if ($this->getRequest()->isPost()) {
            // If form is valid, make sure the e-mail address is associated
            // with an account
            if ($form->isValid(
            $this->_request->getPost())) {
                $account = $this->em->getRepository('Entities\Adminprofile')->findOneByprimaryEmail(
                $form->getValue('email'));
                // If account is found, generate recovery key and mail it to
                // the user
                if ($account) {
                    // Generate a random password
                    $account->setRecovery(
                    $this->_helper->generateID(32));
                    try {
                        $this->em->persist($account);
                        $this->em->flush();
                    } catch (Exception $e) {
                        Zend_Registry::get('logger')->crit(
                        'Caught exception: ' . $e->getMessage());
                        var_dump($e->getMessage());
                    }
                    // Create a new mail object
                    $mail = new Zend_Mail();
                    // Set the e-mail from address, to address, and subject
                    $mail->setFrom(
                    Zend_Registry::get('config')->email->support);
                    $mail->addTo($form->getValue('email'));
                    $mail->setSubject("GameNomad: Generate a new password");
                    // Retrieve the e-mail message text
                    include "_email_lost_password.phtml";
                    // Set the e-mail message text
                    $mail->setBodyText($email);
                    // Send the e-mail
                    $mail->send();
                    $this->_helper->flashMessenger->addMessage(
                    'Check your e-mail for further instructions');
                    $this->_helper->redirector('login', 'account');
                }
            } else {
                $this->view->errors = $form->getErrors();
            }
        }
        $this->view->form = $form;
    }
}




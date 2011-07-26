<?php
class Application_Form_NewPatientWizard extends Zend_Form
{
    public function __construct ($options = null)
    {
        parent::__construct($options);
        $this->setName('NewPatientWizard');
        $this->setMethod('post');
        $this->setAction('/newpatientwizard/submitform');
        $primaryemail = new Zend_Form_Element_Text('primaryemail');
        $primaryemail->setLabel('Your primaryemail:');
        $primaryemail->addValidator('EmailAddress');
        $primaryemail->setRequired(false);
        $primaryemail->addErrorMessage('Please enter a valid email address');
        $firstname = new Zend_Form_Element_Text('firstname');
        $firstname->setRequired(true);
        $firstname->addValidator('Alpha');
        $firstname->addErrorMessage(
        'Your firstname can consist solely of letters and should not be empty');
        $middlename = new Zend_Form_Element_Text('middlename');
        $middlename->addValidator('Alpha');
        $middlename->addErrorMessage(
        'Middlename can consist solely of letters and numbers');
        $lastname = new Zend_Form_Element_Text('lastname');
        $lastname->setRequired(true);
        $lastname->addValidator('Alpha');
        $lastname->addErrorMessage(
        'Lastname can consist solely of letters and should not be empty');
        $this->addElements(
        array($primaryemail, $firstname, $middlename, $lastname));
    }
}


<?php
class Application_Form_RegisterDoctor extends Zend_Form
{
    public function __construct ($options = null)
    {
        parent::__construct($options);
        $this->setName('registerdoctor');
        $this->setMethod('post');
        $this->setAction('/registerdoctor/register');
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
        $password = new Zend_Form_Element_Password('password');
        $password->setLabel('Password:');
        $password->setAttrib('size', 35);
        $password->setRequired(true);
        $password->addValidator('StringLength', false, array('min' => 6));
        $password->removeDecorator('label');
        $password->removeDecorator('htmlTag');
        $password->removeDecorator('Errors');
        $password->addErrorMessage('Please provide a valid password');
        $confirmPswd = new Zend_Form_Element_Password('confirm_pswd');
        $confirmPswd->setLabel('Confirm Password:');
        $confirmPswd->setAttrib('size', 35);
        $confirmPswd->removeDecorator('label');
        $confirmPswd->removeDecorator('htmlTag');
        $confirmPswd->addValidator('Identical', false, 
        array('token' => 'password'));
        $confirmPswd->removeDecorator('Errors');
        $confirmPswd->addErrorMessage('The passwords do not match');
        $submit = new Zend_Form_Element_Submit('submit');
        $submit->setLabel('Create Your Account');
        $this->addElements(
        array($primaryemail, $firstname, $middlename, $lastname, $password, 
        $confirmPswd));
        //CSRF Prpotection
        $amoodyhacker = new Zend_Form_Element_Hash('amoodyhacker');
        $this->addElement('hash', 'amoodyhacker', 
        array('salt' => 'Too much pain to see hackers all around@@..!'));
        $this->getElement('amoodyhacker')
            ->removeDecorator('amoodyhacker-label')
            ->removeDecorator('label')
            ->removeDecorator('htmlTag')
            ->removeDecorator('Errors')
            ->setAttrib('id', 'protection');
    }
}


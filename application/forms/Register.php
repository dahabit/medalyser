<?php
//first registeration page under which, user chooses her profile type:doctor or patient etc
class Application_Form_Register extends Zend_Form
{
    public function __construct ($options = null)
    {
        parent::__construct($options);
        $this->setName('login');
        $this->setMethod('post');
        //$this->setAction('/account/register');
        $username = new Zend_Form_Element_Text('username');
        $username->setLabel('Your Username:');
        $username->setAttrib('size', 35);
        $username->setRequired(true);
        $username->removeDecorator('label');
        $username->removeDecorator('htmlTag');
        $username->addValidator('Alnum');
        $username->removeDecorator('Errors');
        $username->addErrorMessage(
        'Your username can consist solely of letters and numbers');
        $zipCode = new Zend_Form_Element_Text('zip');
        $zipCode->setLabel('Your Zip Code:');
        $zipCode->setAttrib('size', 15);
        $zipCode->setRequired(true);
        $zipCode->removeDecorator('label');
        $zipCode->removeDecorator('htmlTag');
        $zipCode->removeDecorator('Errors');
        $zipCode->addErrorMessage('Please provide a valid zip code');
        $email = new Zend_Form_Element_Text('email');
        $email->setLabel('Your E-mail Address:');
        $email->setAttrib('size', 35);
        $email->setRequired(true);
        $email->addValidator('EmailAddress');
        $email->removeDecorator('label');
        $email->removeDecorator('htmlTag');
        $email->removeDecorator('Errors');
        $email->addErrorMessage('Please provide a valid e-mail address');
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
        /*        $profilephoto = new Zend_Form_Element_File('photo');
        $profilephoto->setLabel('Upload your photo.')
            ->setRequired(false)
            ->addValidator('Size', false, 102400)
            ->addValidator('Extension', false, 'jpg,png,gif,bmp')
            ->addValidator('Count', false, 1);*/
        $submit = new Zend_Form_Element_Submit('submit');
        $submit->setLabel('Create Your Account');
        $submit->removeDecorator('DtDdWrapper');
        $this->setDecorators(
        array(
        array('ViewScript', array('viewScript' => '_form_register.phtml'))));
        $this->setAttrib('enctype', 'multipart/form-data');
        $this->addElements(
        array($username, $zipCode, $email, $password, $confirmPswd, 
        $profilephoto, $submit));
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
    
<?php
class Application_Form_Login extends Zend_Form
{
    public function __construct ($options = null)
    {
        $this->setName('login');
        $this->setMethod('post');
        $primaryEmail = new Zend_Form_Element_Text('primaryemail');
        $primaryEmail->setAttrib('size', 35)->setAttrib('class', 'another_row');
        $primaryEmail->setRequired(true);
        $primaryEmail->addErrorMessage('Please provide a valid e-mail address');
        $primaryEmail->addValidator('EmailAddress');
        $primaryEmail->removeDecorator('label');
        $primaryEmail->removeDecorator('htmlTag');
        $primaryEmail->removeDecorator('Errors');
        $pswd = new Zend_Form_Element_Password('pswd');
        $pswd->setAttrib('size', 35)->setAttrib('class', 'one_more_row');
        $pswd->setRequired(true);
        $pswd->addValidator('StringLength', false, array(4, 15));
        $pswd->addErrorMessage('Please provide your password');
        $pswd->removeDecorator('label');
        $pswd->removeDecorator('htmlTag');
        $pswd->removeDecorator('Errors');
        $public = new Zend_Form_Element_Checkbox('public');
        $public->removeDecorator('label');
        $public->removeDecorator('htmlTag');
        $public->removeDecorator('Errors');
        $submit = new Zend_Form_Element_Submit('submit');
        $submit->setLabel('Sign In');
        $submit->removeDecorator('DtDdWrapper');
        $this->setDecorators(
        array(array('ViewScript', array('viewScript' => '_form_login.phtml'))));
        $this->addElements(array($primaryEmail, $pswd, $public, $submit));
    }
}


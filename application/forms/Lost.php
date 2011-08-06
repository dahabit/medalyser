<?php
class Application_Form_Lost extends Zend_Form
{
    public function __construct ($options = null)
    {
        $this->setName('contact');
        $this->setMethod('post');
        $this->setAction('/account/lost');
        $email = new Zend_Form_Element_Text('email');
        $email->setAttrib('size', 35);
        $email->setRequired(true);
        $email->addErrorMessage('Please provide a valid e-mail address');
        $email->addValidator('EmailAddress');
        $email->removeDecorator('label');
        $email->removeDecorator('htmlTag');
        $email->removeDecorator('Errors');
        $submit = new Zend_Form_Element_Submit('submit');
        $submit->setLabel('Recover your password');
        $submit->removeDecorator('DtDdWrapper');
        $this->setDecorators(
        array(array('ViewScript', array('viewScript' => '_form_lost.phtml'))));
        $this->addElements(array($email, $submit));
    }
}


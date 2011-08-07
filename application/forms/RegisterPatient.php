<?php
class Application_Form_RegisterPatient extends Zend_Form
{
    public function __construct ($options = null)
    {
        parent::__construct($options);
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
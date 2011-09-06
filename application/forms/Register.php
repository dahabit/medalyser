<?php
/**
 *THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION;LOSS OF HEALTH IN ANY FORM) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * @version 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
//first registeration page under which, user chooses her profile type:doctor or patient etc
class Application_Form_Register extends Zend_Form
{
    public function __construct ($options = null)
    {
        parent::__construct($options);
        $this->setName('login');
        $this->setMethod('post');
        //$this->setAction('/account/register');
        $username = new Zend_Form_Element_Text('userid');
        $username->setRequired(true);
        $username->removeDecorator('label');
        $username->removeDecorator('htmlTag');
        $username->addValidator('Alnum');
        $username->removeDecorator('Errors');
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
    }
}
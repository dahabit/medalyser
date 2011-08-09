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


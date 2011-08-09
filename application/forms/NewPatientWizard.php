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


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
class AccountController extends Zend_Controller_Action {
	/**
	 * FlashMessenger
	 *
	 * @var Zend_Controller_Action_Helper_FlashMessenger
	 */
	protected $_flashMessenger = null;
	public function init() {
		$this->_flashMessenger = $this->_helper->getHelper ( 'FlashMessenger' );
		$this->em = $this->_helper->EntityManager ();
		// check if the user is logged in.if not so,redirect the user to login
		if (! Zend_Auth::getInstance ()->hasIdentity () and $this->getRequest ()->getActionName () !== 'login') {
			return $this->_helper->redirector ( 'login', 'account' );
		}
	}
	public function indexAction() {
		$this->_helper->redirector ( 'login', 'account' );
	}
	public function loginAction() { // check if the user is logged in.if so,redirect the user to index
		if (Zend_Auth::getInstance ()->hasIdentity ()) {
			return $this->_helper->redirector ( 'index', 'index' );
		}
		$form = new Application_Form_Login ();
		// CSRF Prpotection
		$form->addElement ( 'hash', 'amoodyhacker', array ('salt' => 'Too much pain to see hackers all around' ) );
		$form->getElement ( 'amoodyhacker' )->removeDecorator ( 'amoodyhacker-label' )->removeDecorator ( 'label' )->removeDecorator ( 'htmlTag' );
		// intialize zend auth
		$adapter = new MFAN_Auth_Adapter ( $this->_getParam ( 'primaryemail' ), $this->_getParam ( 'pswd' ) );
		$result = Zend_Auth::getInstance ()->authenticate ( $adapter );
		// Has the login form been posted?
		if ($this->getRequest ()->isPost ()) {
			// If the submitted data is valid, attempt to authenticate the user
			if ($form->isValid ( $this->_request->getPost () )) {
				// Did the user successfully login?
				if (Zend_Auth::getInstance ()->hasIdentity ()) {
					// generate cookie on user browser for two weeks
					if ($this->_getParam ( 'public' ) == "1") {
						Zend_Session::rememberMe ( 1209600 );
					} else {
						Zend_Session::forgetMe ();
					}
					// Generate the flash message and redirect the user
					$this->_helper->flashMessenger->addMessage ( Zend_Registry::get ( 'config' )->messages->login->successful );
					return $this->_helper->redirector ( 'index', 'index' );
				} else {
					$this->view->authError = implode ( ' ', $result->getMessages () );
				}
			} else {
				$this->view->errors = $form->getErrors ();
			}
		}
		$this->view->form = $form;
	}
	// TODO: Create different doctrine processes for patient/admin
	public function registerAction() { // check if the user is logged in.if so,redirect the user to index
		if (Zend_Auth::getInstance ()->hasIdentity ()) {
			return $this->_helper->redirector ( 'index', 'index' );
		}
		// Instantiate the registration form model
		$form = new Application_Form_Register ();
		// Has the form been submitted?
		// CSRF Prpotection
		$form->addElement ( 'hash', 'amoodyhacker', array ('salt' => 'Too much pain to see hackers all around' ) );
		$form->getElement ( 'amoodyhacker' )->removeDecorator ( 'amoodyhacker-label' )->removeDecorator ( 'label' )->removeDecorator ( 'htmlTag' );
		if ($this->getRequest ()->isPost ()) {
			// If the form data is valid, process it
			if ($form->isValid ( $this->_request->getPost () )) {
				// Does an account associated with this username already exist?
				$account = $this->em->getRepository ( 'Entities\Adminprofile' )->findOneBy ( array ('primaryemail' => $form->getValue ( 'email' ), 'userid' => $form->getValue ( 'userid' ) ) );
				if (! is_object ( $account )) {
					$account = new \Entities\Adminprofile ();
					// Assign the account attributes
					$account->setNonNestedFormElements ( $form->getValues () );
					// convert date and time to object so doctrine doesn't echo
					// errors
					$account->created = new DateTime ( "now" );
					// Set the confirmation key
					$account->setRecovery ( $this->_helper->generateID ( 32 ) );
					try {
						// Save the account to the database
						$this->em->persist ( $account );
						$this->em->flush ();
					} catch ( Exception $e ) {
						$this->_helper->getHelper ( 'AjaxResponse' )->logFlushErrors ( $e->getMessage () );
						var_dump ( $e->getMessage () );
					}
					// Create a new mail object
					$mail = new Zend_Mail ();
					// Set the e-mail from address, to address, and subject
					$mail->setFrom ( Zend_Registry::get ( 'config' )->email->support );
					$mail->addTo ( $account->getEmail (), "{$account->getUsername()}" );
					$mail->setSubject ( 'MedAlyser.com: Confirm Your Account' );
					// Retrieve the e-mail message text
					include "_email_confirm_email_address.phtml";
					// Set the e-mail message text
					$mail->setBodyText ( $email );
					// Send the e-mail
					$mail->send ();
					// Set the flash message
					$this->_helper->flashMessenger->addMessage ( Zend_Registry::get ( 'config' )->messages->register->successful );
					// Redirect the user to the home page
					$this->_helper->redirector ( 'login', 'account' );
				} else {
					$this->view->errors = array (array ("The desired username {$form->getValue('username')} has already been taken, or
              the provided e-mail address is already associated with a registered user." ) );
				}
			} else {
				$this->view->errors = $form->getErrors ();
			}
		}
		$this->view->form = $form;
	}
	// TODO: Create different doctrine processes for patient/admin
	public function lostAction() { // check if the user is logged in.if so,redirect the user to index
		if (Zend_Auth::getInstance ()->hasIdentity ()) {
			return $this->_helper->redirector ( 'index', 'index' );
		}
		$form = new Application_Form_Lost ();
		// CSRF Prpotection
		$form->addElement ( 'hash', 'amoodyhacker', array ('salt' => 'Too much pain to see hackers all around' ) );
		$form->getElement ( 'amoodyhacker' )->removeDecorator ( 'amoodyhacker-label' )->removeDecorator ( 'label' )->removeDecorator ( 'htmlTag' );
		if ($this->getRequest ()->isPost ()) {
			// If form is valid, make sure the e-mail address is associated
			// with an account
			if ($form->isValid ( $this->_request->getPost () )) {
				$account = $this->em->getRepository ( 'Entities\Adminprofile' )->findOneByprimaryEmail ( $form->getValue ( 'email' ) );
				// If account is found, generate recovery key and mail it to
				// the user
				if ($account) {
					// Generate a random password
					$account->setRecovery ( $this->_helper->generateID ( 32 ) );
					try {
						$this->em->persist ( $account );
						$this->em->flush ();
					} catch ( Exception $e ) {
						$this->_helper->getHelper ( 'AjaxResponse' )->logFlushErrors ( $e->getMessage () );
					}
					// Create a new mail object
					$mail = new Zend_Mail ();
					// Set the e-mail from address, to address, and subject
					$mail->setFrom ( Zend_Registry::get ( 'config' )->email->support );
					$mail->addTo ( $form->getValue ( 'email' ) );
					$mail->setSubject ( "GameNomad: Generate a new password" );
					// Retrieve the e-mail message text
					include "_email_lost_password.phtml";
					// Set the e-mail message text
					$mail->setBodyText ( $email );
					// Send the e-mail
					$mail->send ();
					$this->_helper->flashMessenger->addMessage ( 'Check your e-mail for further instructions' );
					$this->_helper->redirector ( 'login', 'account' );
				}
			} else {
				$this->view->errors = $form->getErrors ();
			}
		}
		$this->view->form = $form;
	}
	public function logoutAction() {
		Zend_Auth::getInstance ()->clearIdentity ();
		$this->_helper->redirector ( 'login', 'account' );
	}
	// admin settings edit page
	public function adminsettingseditAction() {
		$submitedUserId = $this->getRequest ()->getParam ( 'userid' );
		// check if the user is logged in.if so,go on with form processing
		if (Zend_Auth::getInstance ()->hasIdentity ()) {
			if ($this->getRequest ()->isPost ()) {
				// If the form data is valid, process it
				
				if ($submitedUserId==Zend_Auth::getInstance ()->getIdentity ()->userid) 				// $form->isValid($this->_request->getPost())
				{ 				//process $profilephoto
				$ProfilePhotoUploader = new MFAN_Controller_Action_Helper_ProfilePhotoUploader ();
				$ProfilePhotoUploader->upload ( 'admin', $submitedUserId );
					$allFormElements = $this->getRequest ()->getParams ();
					$allFormElements ['updated'] = new DateTime ( "now" );
					//create a new password only if old one matches saved one
					//create a new password only if a new password is submitted
					// unset ZF array elements
					unset ( $allFormElements ['controller'], $allFormElements ['action'], $allFormElements ['module'],$allFormElements ['oldpassword'] );
					Zend_Registry::get ( 'logger' )->crit ( $allFormElements );
					// Does an account associated with this username already
					// exist?
					$account = $this->em->getRepository ( 'Entities\Adminprofile' )->findOneBy ( array ('userid' => $submitedUserId ) );
						// convert date and time to object so doctrine doesn't
						// echo errors
						$account->updated = new DateTime ( "now" );
						$entityUtil = new Cob\Doctrine\ORM\EntityUtil ( $this->em );
						$adminEntity = $entityUtil->createEntity ( $account, $allFormElements );
						if ($adminEntity == true) {
							$this->_helper->AjaxResponse ( TRUE, 'Admin data successfully updated.' );
						} else {
							$this->_helper->getHelper ( 'AjaxResponse' )->logFlushErrors ( $e->getMessage () );
						}
				} else {
					$this->_helper->AjaxResponse ( FALSE, $form->getErrors () );
					$this->view->errors = $form->getErrors ();
				}
			}
		}
	}
	/**
	 * Generate JSON type for AdminResources javascript store
	 */
	public function getadminstoresAction() { // disable view
		$this->_helper->viewRenderer->setNoRender ( true );
		// patients
		// fetch all patients from database
		$qb = $this->em->createQueryBuilder ();
		$qb->add ( 'select', 'a' )->add ( 'from', 'Entities\Patientprofile a' )->add ( 'orderBy', 'a.id ASC' );
		$query = $qb->getQuery ();
		$patients = $query->getArrayResult ();
		// unset unnecessary and secret patient table columns.
		// unset($patients['password'],$patients['recovery']);->not working
		// FIXME:search for a method on how to disable some columns in doctrine
		// while fetching data
		// FIXME:unset null and empty values for patients
		// inject patients into stores array
		// var_dump($patients);
		$stores ['Patients'] = $patients;
		
		// select currently logged in admin`s table data
		$adminSettings = $this->em->getRepository ( 'Entities\Adminprofile' )->findByUserid ( Zend_Auth::getInstance ()->getIdentity ()->userid );
		$stores ['WidgetSettings'] = unserialize ( $adminSettings ['0'] ['Setttingsviewallpatients'] );
		// unset unnecessary and secret admin table columns.
		unset ( $adminSettings [0] ['password'], $adminSettings [0] ['recovery'], $adminSettings [0] ['confirmed'], $adminSettings [0] ['created'], $adminSettings [0] ['updated'], $adminSettings [0] ['id'], $adminSettings['0'] ['Setttingsviewallpatients'] );
		// adminsettings
		$stores ['AdminSettings'] = $adminSettings;
		// countries
		$countries = Zend_Locale::getTranslationList ( 'Territory', null, 2 );
		// add countries store to the final store
		foreach ( $countries as $key => $value ) {
			$countriesStore [] = array ('id' => $key, 'name' => $value );
		}
		$stores ['Countries'] = $countriesStore;
		// languages
		$languages = Zend_Locale::getTranslationList ( 'language' );
		foreach ( $languages as $key => $value ) {
			$languagesStore [] = array ('id' => $key, 'name' => $value );
		}
		// add countries store to the final store
		$stores ['Languages'] = $languagesStore;
		$this->getResponse ()->appendBody ( Zend_Json::encode ( $stores ) );
	}
	public function resetAction(){
		$this->_helper->viewRenderer->setNoRender ( true );
		$currentUserId=Zend_Auth::getInstance ()->getIdentity ()->userid;
		$currentUserPass=Zend_Auth::getInstance ()->getIdentity ()->password;
		$currentPrimaryEmail=Zend_Auth::getInstance ()->getIdentity ()->primaryemail;
		//clear current session
		Zend_Auth::getInstance ()->clearIdentity ();
		//relogin
		$adapter = new MFAN_Auth_Adapter ( $currentPrimaryEmail,$currentUserPass );
		$result = Zend_Auth::getInstance ()->authenticate ( $adapter );
		$this->_helper->redirector ( 'login', 'account' );
	}
	private function _getAdminArray() {
		return array ('viewallpatients' => array () );
	}
}




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
class NewPatientWizardController extends Zend_Controller_Action {
	public function init() {
		$this->em = $this->_helper->EntityManager ();
		// Make sure the user is logged-in
		$this->_helper->LoginRequired ();
		$this->_helper->viewRenderer->setNoRender ( true );
	}
	public function indexAction() {
	}
	public function ttAction(){
		Doctrine\ORM\Mapping\ClassMetadata::FETCH_EAGER;
		$entitySerializer = new Bgy\Doctrine\EntitySerializer ( $this->em );
		$account = $this->em->getRepository ( 'Entities\Patientprofile' )->findOneByUserid ( '535203554',\Doctrine\ORM\Query::HYDRATE_ARRAY);
		
		$patientProfile = $entitySerializer->toArray ( $account );
		var_dump($account);
	}
	public function testAction() {
		Doctrine\ORM\Mapping\ClassMetadata::FETCH_EAGER;
		$patientId = $this->_request->getParam ( 'userid' );
		//$account = $this->em->getRepository ( 'Entities\Patientprofile' )->findOneById ( '110');
		//$entitySerializer = new Bgy\Doctrine\EntitySerializer ( $this->em );
		
		//$patientProfile = $entitySerializer->toArray ( $account );
		//array_merge($patientProfile,)
		//Working:
/* 	foreach ($account->getPatientaddress() AS $game)
		{
			printf("%s<br />", $game->zip);
		}  */
//$query = $this->em->createQuery("SELECT u, a FROM Patientprofile u JOIN u.Patientaddress a WHERE a.id = '110'");
/* $query = $this->em->createQuery("SELECT p, f FROM Entities\Patientprofile p JOIN p.Patientaddress f WHERE p.id = ?1");
$query->setParameter(1, 110);
$patient = $query->getArrayResult(); */
		$this->em->getConfiguration()->setSQLLogger(new \Doctrine\DBAL\Logging\EchoSQLLogger());
		$q = $this->em->createQuery ( "SELECT p, f FROM Entities\Patientprofile p JOIN p.Patientaddress f WHERE p.userid = ?1" );
		//$q = $this->em->createQuery ( "SELECT p FROM Entities\Patientprofile p  WHERE p.userid = ?1" );
		$q->setParameter ( 1, $patientId );
		//$q->setFetchMode('Entities\Patientprofile', 'Patientaddress', 3);
		$patientProfile=$q->getArrayResult();
		var_dump($patientProfile);
	//$this->getResponse()->appendBody(Zend_Json::encode($patientProfile));
	}
	public function getlanguagesAction() {
		$languages = Zend_Locale::getLanguageTranslationList ();
		$language = array ();
		for($i = 0; $i < count ( $languages ); $i ++) {
			$id = key ( $languages );
			$name = $languages [$id];
		}
		$this->_response->appendBody ( Zend_Json::encode ( $languages ) );
	}
	public function submiteformAction() {
		$allFormElements = $this->getRequest ()->getParams ();
		unset ( $allFormElements ['controller'], $allFormElements ['action'], $allFormElements ['module'] );
		$entityUtil = new Cob\Doctrine\ORM\EntityUtil ( $this->em );
		$account = new \Entities\Patientprofile ();
		
		$patientEntity = $entityUtil->createEntity ( $account, $allFormElements );
	
		//var_dump($patientEntity);
	

	}
	public function submitformAction() {
		// Instantiate the registration form model
		$form = new Application_Form_NewPatientWizard ();
		// Has the form been submitted?
		if ($this->getRequest ()->isPost ()) {
			// If the form data is valid, process it
			if ($form->isValid ( $this->_request->getPost () )) {
				Zend_Registry::get ( 'logger' )->debug ( 'validation was a success' );
				//generate random userid
				$this->_generateUserId ();
				//process $profilephoto
				$ProfilePhotoUploader = new MFAN_Controller_Action_Helper_ProfilePhotoUploader ();
				$ProfilePhotoUploader->upload ( 'patient', $this->userId );
				// Does an account associated with this email already exist?
				//TODO: If email field is empty then every time,doctor clicks on submit buttton a new patient is created with the same name
				$primaryEmail = $this->_request->getParam ( 'primaryemail' );
				if (! empty ( $primaryEmail )) {
					$account = $this->em->getRepository ( 'Entities\Patientprofile' )->findOneBy ( array ('primaryemail' => $primaryEmail ) );
				}
				if (! isset ( $account )) {
					$account = new \Entities\Patientprofile ();
					// Assign the account attributes
					/////////////////////PAGE 1//////////////////// 
					$allFormElements = $this->getRequest ()->getParams ();
					// unset ZF array elements
					unset ( $allFormElements ['controller'], $allFormElements ['action'], $allFormElements ['module'] );
					//convert date and time to object so doctrine doesn't echo errors
					//only new datetime if user$birthDate is submitted
					if ($birthDate = $this->_request->getParam ( 'birthdate' )) {
						$allFormElements ['birthdate'] = new DateTime ( $birthDate );
					} else {
						$allFormElements ['birthdate'] = null;
					}
					$allFormElements ['userid'] = $this->userId;
					$allFormElements ['created'] = new DateTime ( "now" );
					$allFormElements ['profilephoto'] = $ProfilePhotoUploader->getFileName ();
					$entityUtil = new Cob\Doctrine\ORM\EntityUtil ( $this->em );
					$patientEntity = $entityUtil->createEntity ( $account, $allFormElements );
					if ($patientEntity == true) {
						$this->_helper->AjaxResponse ( TRUE, 'New patient successfully created' );
					} else {
						$this->_helper->getHelper ( 'AjaxResponse' )->logFlushErrors ( $e->getMessage () );
					}
				} else {
					$this->_helper->AjaxResponse ( FALSE, 'This patient has already been registered with the  email entered.' );
				}
			} else { //Output validation error messagaes to firebug
				$this->_helper->getHelper ( 'AjaxResponse' )->logValidationErrors ( $form->getMessages () );
			}
		} else { //Output validation error messagaes as json format
			$this->_helper->AjaxResponse ( false, 'Invalid request.' );
		}
	}
	private function _generateUserId() {
		$userid = $this->getRequest ()->getParam ( 'userid' );
		//generate random userid only if no user id is submitted
		if (! $userid) {
			$finished = false; // we're not finished yet (we just started)
			while ( ! $finished ) : // while not finished
				$this->userId = mt_rand ( 100000000, 999999999 ); // random number
				if (! $this->em->getRepository ( 'Entities\Patientprofile' )->findOneByuserid ( $userid )) : // if User DOES NOT exist...
					$finished = true;
				
				
                    // ...we are finished
   endif;
			endwhile
			;
		} else { //check if suggested userid from client side is not already taken
			if (! $this->em->getRepository ( 'Entities\Patientprofile' )->findOneByuserid ( $this->getRequest ()->getParam ( 'userid' ) )) {
				$this->userId = $this->getRequest ()->getParam ( 'userid' );
			} else {
				$this->_helper->AjaxResponse ( FALSE, 'Entered userid already exists.' );
			}
		}
	}
}








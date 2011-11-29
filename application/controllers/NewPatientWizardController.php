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
class NewPatientWizardController extends Zend_Controller_Action
{
    public function init ()
    {
        $this->em = $this->_helper->EntityManager();
        // Make sure the user is logged-in
        $this->_helper->LoginRequired();
        $this->_helper->viewRenderer->setNoRender(true);
    }
    public function indexAction ()
    {}
    public function getlanguagesAction ()
    {
        $languages = Zend_Locale::getLanguageTranslationList();
        $language = array();
        for ($i = 0; $i < count($languages); $i ++) {
            $id = key($languages);
            $name = $languages[$id];
        }
        $this->_response->appendBody(Zend_Json::encode($languages));
    }
	public function submitformAction(){
		 $allFormElements = $this->getRequest()->getParams();
		// unset ZF array elements
		 unset($allFormElements['controller'],$allFormElements['action'],$allFormElements['module']);
		$entityUtil= new Cob\Doctrine\ORM\EntityUtil($this->em);
		$firstEntityObject = new \Entities\Patientprofile();
		$patientEntity=$entityUtil->createEntity($firstEntityObject,$allFormElements);
		//var_dump($patientEntity);
		
		}
    public function submiitformAction ()
    {
        // Instantiate the registration form model
        $form = new Application_Form_NewPatientWizard();
        // Has the form been submitted?
        if ($this->getRequest()->isPost()) {
            // If the form data is valid, process it
            if ($form->isValid($this->_request->getPost())) {
                Zend_Registry::get('logger')->debug('validation was a success');
                //generate random userid
                $this->_generateUserId();
                //process $profilephoto
                $ProfilePhotoUploader = new MFAN_Controller_Action_Helper_ProfilePhotoUploader();
                $ProfilePhotoUploader->upload('patient', $this->userId);
                // Does an account associated with this email already exist?
				//TODO: If email field is empty then every time,doctor clicks on submit buttton a new patient is created with the same name
                $primaryemail = $this->_request->getParam(
                'primaryemail');
                if (! empty($primaryemail)) {
                    $account = $this->em->getRepository(
                    'Entities\Patientprofile')->findOneBy(
                    array(
                    'primaryemail' => $this->_request->getParam('primaryemail')));
                }
                if (! isset($account)) {
                    $account = new \Entities\Patientprofile();
                    // Assign the account attributes
                    /////////////////////PAGE 1//////////////////// 
                    $allFormElements = $this->getRequest()->getParams();
                    $account->setNonNestedFormElements($allFormElements);
                    //convert date and time to object so doctrine doesn't echo errors
                    $birthDate = $this->_request->getParam(
                    'birthdate');
                    //only new datetime if user$birthDate is submitted
                    if ($birthDate) {
                        $account->birthdate = new DateTime($birthDate);
                    } else {
                        $account->birthdate = null;
                    }
                    $account->userid = $this->userId;
                    $account->created = new DateTime("now");
                    $account->profilephoto = $ProfilePhotoUploader->getFileName();
                    /////////////////////end of PAGE 1/////////////////////
                    /////////////////////PAGE 2/////////////////////
                    // Addresses
                    //TODO:code below must probably moved to the doctrine service layer??
                    $MAEntityHelper = new \Entities\MAEntityHelper();
                    $MAEntityHelper->setAllFormElements($allFormElements);
                    if ($MAEntityHelper->sortedArray) {
                        $entityObject = array();
                        $i = 1;
                        foreach ($MAEntityHelper->sortedArray as $key => $value) {
                            if ($i = 1) {
                                $xx = "\Entities\\" . $key;
                                $newEntityObject = new $xx();
                            }
                            foreach ($value as $key2 => $value2) {
                                // create array of objects here
                                $entityObject[$key2] = clone $newEntityObject;
                                foreach ($value2 as $key3 => $value3) {
                                    $entityObject[$key2]->$key3 = $value3;
                                    $i ++;
                                }
                            }
                        }
                        foreach ($entityObject as $key4 => $value4) {
                            Zend_Registry::get('logger')->crit(
                            $entityObject[$key4]);
                            $account->getAddresses()->add($entityObject[$key4]);
                            $this->em->persist($entityObject[$key4]);
                        }
                    }
                    /*					$address = new \Entities\Patientaddress ;
					$address->setAddress1 ( $this->_request->getParam ( 'address11' ) );
					$address->setAddress2 ( $this->_request->getParam ( 'address21' ) );
					$address->setCity ( $this->_request->getParam ( 'city1' ) );
					$address->setState ( $this->_request->getParam ( 'state1' ) );
					$address->setCountry ( $this->_request->getParam ( 'country1' ) );
					$address->setZip ( $this->_request->getParam ( 'zip1' ) );*/
                    //$account->getAddresses ()->add ( $address );
                    /////////////////////end of PAGE 2/////////////////////
                    /////////////////////PAGE 3/////////////////////
                    /////////////////////end of PAGE 3/////////////////////
                    /////////////////////PAGE 4/////////////////////
                    /////////////////////end of PAGE 4/////////////////////
                    try {
                        // Save the account to the database
                        $this->em->persist($account);
                        $this->em->flush();
                        $this->_helper->AjaxResponse(TRUE, 
                        'New patient successfully created');
                    } catch (Exception $e) {
                        $this->_helper->getHelper('AjaxResponse')->logFlushErrors(
                        $e->getMessage());
                    }
                } else {
                    $this->_helper->AjaxResponse(FALSE, 
                    'This patient has already been registered with the  email entered.');
                }
            } else { //Output validation error messagaes to firebug
                $this->_helper->getHelper('AjaxResponse')->logValidationErrors(
                $form->getMessages());
            }
        } else { //Output validation error messagaes as json format
            $this->_helper->AjaxResponse(false, 'Invalid request.');
        }
    }
    private function _generateUserId ()
    {$userid=$this->getRequest()->getParam('userid');
        //generate random userid only if no user id is submitted
        if (! $userid) {
            $finished = false; // we're not finished yet (we just started)
            while (! $finished) : // while not finished
                $this->userId = mt_rand(100000000, 999999999); // random number
                if (! $this->em->getRepository(
                'Entities\Patientprofile')->findOneByUserid($userid)) : // if User DOES NOT exist...
                    $finished = true;
                    // ...we are finished
   endif;
            endwhile
            ;
        } else { //check if suggested userid from client side is not already taken
            if (! $this->em->getRepository(
            'Entities\Patientprofile')->findOneByUserid(
            $this->getRequest()
                ->getParam('userid'))) {
                $this->userId = $this->getRequest()->getParam('userid');
            } else {
                $this->_helper->AjaxResponse(FALSE, 
                'Entered userid already exists.');
            }
        }
    }
}








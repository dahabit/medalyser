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
        $this->_helper->viewRenderer->setNoRender(true);
        $this->em = $this->_helper->EntityManager();
         //$this->getRequest ()->setParam ( 'format', 'json' );
    }
    public function indexAction ()
    {}
    public function getcountriesAction ()
    {
        $zendcountries = Zend_Locale::getTranslationList('Territory', null, 2);
        $countrytest = array(array('iso' => 'us', 'name' => 'united states'));
        $countries = array(array());
        for ($i = 0, $size = count($zendcountries); $i < $size; $i ++) {
            $iso = key($zendcountries);
            $country = $zendcountries[$iso];
            $countries[$i]['iso'] = $iso;
            $countries[$i]['name'] = $country;
            next($zendcountries);
        }
        $this->_response->appendBody(Zend_Json::encode($countries));
    }
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
    public function submitformAction ()
    {
        // Instantiate the registration form model
        $form = new Application_Form_NewPatientWizard();
        // Has the form been submitted?
        if ($this->getRequest()->isPost()) {
            // If the form data is valid, process it
            if ($form->isValid($this->_request->getPost())) {
                Zend_Registry::get('logger')->debug('validation was a success');
                //process $profilephoto
                $this->_helper->ProfilePhotoUploader('patient');
                // Does an account associated with this email already exist?
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
                    $account->birthdate = new DateTime(
                    $this->_request->getParam('birthdate'));
                    $account->created = new DateTime("now");
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
                    // contacts
                    $contact = new \Entities\Patientcontact();
                    $contact->homephone = $this->_request->getParam('homephone');
                    $account->getContacts()->add($contact);
                    $this->em->persist($contact);
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
                        $form = array('success' => true, 
                        'msg' => 'New patient successfully created');
                        $this->_response->appendBody(Zend_Json::encode($form));
                    } catch (Exception $e) {
                        $this->_helper->FlushLogger($e);
                    }
                } else {
                    $this->_response->appendBody(
                    Zend_Json::encode(
                    "The desired useremail has already been taken, or
              the provided e-mail address is already associated with a registered user."));
                }
            } else { //Output validation error messagaes to firebug
                Zend_Registry::get('logger')->crit(
                'validation was a failure');
                //Output validation error messagaes as json format
                $validationerror = array('success' => false, 
                'msg' => 'Some entered data are not acceptable. Please check back, correct them and try submitting the form again.', 
                'errors' => $form->getMessages());
                $this->_response->appendBody(
                Zend_Json::encode($validationerror));
            }
        } else { //Output validation error messagaes as json format
            $validationerror = array('success' => false, 
            'msg' => 'Invalid request.');
            $this->_response->appendBody(Zend_Json::encode($validationerror));
        }
    }
}








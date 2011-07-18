<?php
use Entities\Patientaddress;
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
                $profilephoto = new Zend_File_Transfer_Adapter_Http();
                $profilephoto->setDestination(
                PUBLIC_PATH . '\images\patient\profile');
                if ($profilephoto->receive()) {
                    $profilephotoname = $profilephoto->getFileName(null, FALSE);
                } else {
                    $profilephotoname = null;
                    Zend_Registry::get('logger')->crit(
                    $profilephoto->getMessages());
                }
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
                    $account->setAllFormElements($allFormElements);
                    //convert date and time to object so doctrine doesn't echo errors
                    $account->birthdate = new DateTime(
                    $this->_request->getParam('birthdate'));
                    $account->created=new DateTime("now");
                    /////////////////////end of PAGE 1/////////////////////
                    /////////////////////PAGE 2/////////////////////
                    // Addresses
                    $addressType = $this->_request->getParam(
                    'addresstype');
                    $address1 = $this->_request->getParam('address1');
                    $address2 = $this->_request->getParam('address2');
                    $city = $address1 = $this->_request->getParam('city');
                    $state = $this->_request->getParam('state');
                    $country = $this->_request->getParam('country');
                    $city = $this->_request->getParam('city');
                    $zip = $this->_request->getParam('zip');
                    $i = 0;
                    $addressObject = array();
                    // addresstype always has a value so we use it to define how many address forms are created on extjs
                    if (isset($addressType)) {
                        foreach ($addressType as $value) {
                            $addressObject[$i] = new \Entities\Patientaddress();
                            $addressObject[$i]->setAddressType($value);
                            $i ++;
                        }
                    }
                    $i = 0;
                    // addresstype always has a value so we use it to define how many address forms are created on extjs
                    if (isset($address1)) {
                        foreach ($address1 as $value) {
                            $addressObject[$i]->setAddress1($value);
                            $i ++;
                        }
                    }
                    $i = 0;
                    if (isset($address2)) {
                        foreach ($address2 as $value) {
                            $addressObject[$i]->setAddress2($value);
                            $i ++;
                        }
                    }
                    $i = 0;
                    if (isset($country)) {
                        foreach ($country as $value) {
                            $addressObject[$i]->setCountry($value);
                            $i ++;
                        }
                    }
                    $i = 0;
                    if (isset($city)) {
                        foreach ($city as $value) {
                            $addressObject[$i]->setCity($value);
                            $i ++;
                        }
                    }
                    $i = 0;
                    if (isset($zip)) {
                        foreach ($zip as $value) {
                            $addressObject[$i]->setZip($value);
                            $i ++;
                        }
                    }
                    /*					$address = new \Entities\Patientaddress ();
					$address->setAddress1 ( $this->_request->getParam ( 'address11' ) );
					$address->setAddress2 ( $this->_request->getParam ( 'address21' ) );
					$address->setCity ( $this->_request->getParam ( 'city1' ) );
					$address->setState ( $this->_request->getParam ( 'state1' ) );
					$address->setCountry ( $this->_request->getParam ( 'country1' ) );
					$address->setZip ( $this->_request->getParam ( 'zip1' ) );*/
                    if (! empty($addressObject)) {
                        for ($i = 0; $i < count($addressObject); $i ++) {
                            $account->getAddresses()->add($addressObject[$i]);
                            $this->em->persist($addressObject[$i]);
                        }
                    }
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
                        $error = array('success' => false, 
                        'msg' => 'Error saving data to the database.Please contact administrator.');
                        $this->_response->appendBody(Zend_Json::encode($error));
                        //log exception to firebug
                        $this->_response->appendBody(
                        Zend_Json::encode($error));
                        Zend_Registry::get('logger')->crit(
                        'Caught exception: ' . $e->getMessage());
                        var_dump($e->getMessage());
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








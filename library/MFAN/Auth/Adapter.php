<?php
class MFAN_Auth_Adapter implements Zend_Auth_Adapter_Interface
{
    const NOT_FOUND = 1;
    const WRONG_PW = 2;
    const NOT_FOUND_MESSAGE = "Account not found";
    const BAD_PW_MESSAGE = "Password is invalid";
    /**
     *
     * @var Model_User
     */
    protected $user;
    /**
     *
     * @var string
     */
    protected $primaryemail;
    /**
     *
     * @var string
     */
    protected $password;
    /**
     * accessing bootstrap via the front controller singleton:
     * @param url:http://stackoverflow.com/questions/5835506/zend-framework-doctrine-2-integration-where-to-store-the-entitymanager/5839066#5839066
     */
    public function __construct ($primaryemail, $password)
    {
        $this->em = Zend_Controller_Front::getInstance()->getParam('bootstrap')->getResource(
        'Entitymanager');
        $this->primaryemail = $primaryemail;
        $this->password = $password;
    }
    /**
     * Performs an authentication attempt
     *
     * @throws Zend_Auth_Adapter_Exception If authentication cannot be performed
     * @return Zend_Auth_Result
     */
    public function authenticate ()
    {
        try {
            $this->user = $this->authenticateModel($this->primaryemail, 
            $this->password);
        } catch (Exception $e) {
            if ($e->getMessage() == self::WRONG_PW)
                return $this->result(
                Zend_Auth_Result::FAILURE_CREDENTIAL_INVALID, 
                self::BAD_PW_MESSAGE);
            if ($e->getMessage() == self::NOT_FOUND)
                return $this->result(
                Zend_Auth_Result::FAILURE_IDENTITY_NOT_FOUND, 
                self::NOT_FOUND_MESSAGE);
        }
        return $this->result(Zend_Auth_Result::SUCCESS);
    }
    /**
     * Factory for Zend_Auth_Result
     *
     *@param integer    The Result code, see Zend_Auth_Result
     *@param mixed      The Message, can be a string or array
     *@return Zend_Auth_Result
     */
    public function result ($code, $messages = array())
    {
        if (! is_array($messages)) {
            $messages = array($messages);
        }
        return new Zend_Auth_Result($code, $this->user, $messages);
    }
    private function authenticateModel ($primaryemail, $password)
    {
        $user = $this->em->getRepository('Entities\Adminprofile')->findOneBy(
        array('primaryemail' => $primaryemail));
        if ($user) {
            if ($user->password == $password)
                return $user;
            throw new Exception(self::WRONG_PW);
        }
        throw new Exception(self::NOT_FOUND);
    }
}


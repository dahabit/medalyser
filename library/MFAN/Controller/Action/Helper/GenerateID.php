<?php
/**
 * Generate and return a unique subject identifier
 *
 * @param       int     $length  Length of string to be generated
 * @param       string  $seeds   Generation seed
 */
class MFAN_Controller_Action_Helper_GenerateID extends Zend_Controller_Action_Helper_Abstract
{
    public function direct ($length = 8)
    {
        // Define supported characters in the unique string
        $seeds = 'abcdefghijklmnopqrstuvwqyz0123456789';
        $code = '';
        $count = strlen($seeds);
        for ($i = 0; $i < $length; $i ++) {
            $code .= $seeds[mt_rand(0, $count - 1)];
        }
        return $code;
    }
}
?>



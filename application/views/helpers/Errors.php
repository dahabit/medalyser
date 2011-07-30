<?php

    class Zend_View_Helper_Errors extends Zend_View_Helper_Abstract
    {
    	
    	/**
    	 * Outputs errors using a uniform format
    	 * 
    	 * @param Array $errors
    	 * @return nil
    	 */
    	public function Errors($errors) 
    	{
    		
        if (!is_array($errors))
        {
            echo "<ul id='errors'>";
            echo "<li>$errors</li>";
        	  echo "</ul>";
        } else {
    
          if (count($errors) > 0) {
            echo "<ul id='errors'>";
            foreach ($errors AS $error) {
        	    if (isset($error[0])) {
                printf("<li>%s</li>", $error[0]);
              }
        	  }
        	  echo "</ul>";
          }

        }

    	}
    	
    }

?>

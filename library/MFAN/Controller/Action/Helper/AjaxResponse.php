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
 * @version $Id: AjaxResponce.php  Aug 11, 2011  11:15:52 AM 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
class MFAN_Controller_Action_Helper_AjaxResponse extends Zend_Controller_Action_Helper_Abstract
{
    public function direct ($success = TRUE, $message, $errors = array())
    {
        require_once 'Zend/Controller/Action/HelperBroker.php';
        Zend_Controller_Action_HelperBroker::getStaticHelper('viewRenderer')->setNoRender(
        true);
        if ($success == TRUE) {
            if (! $message) {
                $message = 'Action was a Success.';
            }
        } elseif ($success == FALSE) {
            if (! $message) {
                $message = 'Action was a Failure';
            }
        }
        $form = array('success' => $success, 'msg' => $message, 
        'errors' => $errors);
        $this->getFrontController()
            ->getResponse()
            ->appendBody(Zend_Json::encode($form));
        //log exception to firebug
        Zend_Registry::get('logger')->crit(
        'Caught exception: ' . $errors);
    }
    public function logFlushErrors ($e)
    {
        $this->direct(FALSE, 
        'Error saving data to the database.Please contact administrator.', $e);
    }
    public function logValidationErrors ($e)
    {
        $this->direct(FALSE, 
        'Some entered data are not acceptable. Please check back, correct them and try submitting the form again.', 
        $e);
        ;
    }
}
?>
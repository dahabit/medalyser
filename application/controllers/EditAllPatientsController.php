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
 * @version $Id: ViewAllPatients.php  Oct 10, 2011  5:15:18 PM 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
class EditAllPatientsController extends Zend_Controller_Action
{
    public function init ()
    {
        $this->em = $this->_helper->EntityManager();
        // Make sure the user is logged-in
        $this->_helper->LoginRequired();
        $this->_helper->viewRenderer->setNoRender(true);
    }
    public function getpatientprofilestoreAction ()
    {
        if ($this->getRequest()->isPost() and
         $this->_request->getParam('a_userid')) {
            $patientId = $this->_request->getParam('a_userid');
            $patientProfile = $this->em->getRepository(
            'Entities\Patientprofile')->findOneByUserid($patientId);
            //check if a patient with this id already exists
            if ($patientProfile) {
                $this->getResponse()->appendBody(
                Zend_Json::encode($patientProfile));
            } else {
                //no such patient exists.
                $this->_helper->AjaxResponse(FALSE, 
                'No such patient exists.');
            }
        }
    }
    public function submitformAction ()
    {}
}
?>
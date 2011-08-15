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
 * @version $Id: ProfilePhotoUploader.php  Aug 11, 2011  3:25:39 PM 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
class MFAN_Controller_Action_Helper_ProfilePhotoUploader extends Zend_Controller_Action_Helper_Abstract
{
    public function direct ($profileType = 'patient')
    { //TODO:create a profile like this:images/patient/id/randomprofilename.jpg
        //TODO: add validations and filtering and photo cropping
        $profilephoto = new Zend_File_Transfer_Adapter_Http();
        $profilephoto->setDestination(
        PUBLIC_PATH . '\images\\' . $profileType . '\profile');
        if ($profilephoto->receive()) {
            $profilephotoname = $profilephoto->getFileName(null, FALSE);
        } else {
            $profilephotoname = null;
            Zend_Registry::get('logger')->crit($profilephoto->getMessages());
        }
    }
}
?>
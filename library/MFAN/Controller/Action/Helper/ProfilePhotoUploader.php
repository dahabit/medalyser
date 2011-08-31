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
    private $fileName;
    public function upload ($profileType = 'patient', $patientName)
    {
        //create folder stracture for the new patient
        $structure = PUBLIC_PATH . '/documents/patients/' . $patientName .
         '/images/profile/';
        //only create folder structure if didnt exist
        if (! file_exists($structure)) {
            if (! mkdir($structure, 0755, true)) {
                die('Failed to create folders...');
            }
        }
        //FIXME:create a profile like this:images/patient/id/randomprofilename.jpg
        //FIXME:data are not checked if are valid or not.
        //TODO: add validations and filtering and photo cropping
        $profilephoto = new Zend_File_Transfer_Adapter_Http();
        // Set a file size with max 2mb and min 10kb
        $profilephoto->addValidator('Size', false, 
        array('min' => 10000, 'max' => 2100000)) //only allow one file to be uploaded
            ->addValidator('Count', false, 1)
            ->// Limit the extensions to graphics
        addValidator('Extension', false, 'jpg,png,gif,jpeg,bmp');
        if ($profilephoto->receive()) {
            if (!$profilephoto-> isValid($profilephoto->getFileName(null))) {
                die($profilephoto-> getMessages());
            }
            $profilePhotoName = $profilephoto->getFileName(null);
            $ext = $this->_findexts($profilephoto->getFileName(null));
            $this->fileName = $profileType . time() . mt_rand(1000, 9999) . "." .
             $ext;
            // Rename uploaded file using Zend Framework
            $filterFileRename = new Zend_Filter_File_Rename(
            array('target' => $structure . $this->fileName));
            $filterFileRename->filter($profilePhotoName);
        } else {
            $profilePhotoName = null;
            Zend_Registry::get('logger')->crit($profilephoto->getMessages());
        }
    }
    public function getFileName ()
    {
        return $this->fileName;
    }
    /**Find extension of a file 
     */
    protected function _findexts ($name)
    {
        $path_info = pathinfo($name);
        $exts = $path_info['extension'];
        return $exts;
    }
}
?>
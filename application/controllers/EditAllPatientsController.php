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
use Doctrine\ORM\Query\Expr;
class EditAllPatientsController extends Zend_Controller_Action {
	public function init() {
		$this->em = $this->_helper->EntityManager ();
		// Make sure the user is logged-in
		$this->_helper->LoginRequired ();
		$this->_helper->viewRenderer->setNoRender ( true );
	}
	public function getpatientprofilestoreAction() { //validate posted form
		

		$patientId = $this->_request->getParam ( 'userid' );
		$patientIdDigitsValidator = new Zend_Validate_Digits ();
		$patientIdLengthValidator = new Zend_Validate_StringLength ( array ('min' => 9, 'max' => 9 ) );
		//check if userid exists and is valid
		if ($this->getRequest ()->isPost () and $patientId and $patientIdDigitsValidator->isValid ( $patientId ) and $patientIdLengthValidator->isValid ( $patientId )) {
			//$q = $this->em->createQuery ( "SELECT p, f FROM Entities\Patientprofile p JOIN p.Patientaddress f WHERE p.userid = ?1" );
			$qb = $this->em->createQueryBuilder ();
			//left join:Each item in the left table will show up in a MySQL result, even if there isn't a match with the other table that it is being joined to.
			$qb->from ( 'Entities\Patientprofile', 'p' )->select ( 'p', 'e' )->where ( 'p.userid= ?1' )->leftJoin ( 'p.Patientaddress', 'e' )->setParameter ( 1, $patientId );
			$query = $qb->getQuery ();
			$patientProfile = $query->getArrayResult ();
			//check if such patient exists
			if ($patientProfile) {
				/*         $qb = $this->em->createQueryBuilder();
				 $qb->add('select', 'a')
				->add('from', 'Entities\Patientprofile a')
				->add('where', 'a.userid=?1')
				->setParameter(1, $patientId);
				;
				$query = $qb->getQuery();
				$patientProfile = $query->getArrayResult();*/
				/* 			$entitySerializer = new Bgy\Doctrine\EntitySerializer ( $this->em );
				
				$patientProfile = $entitySerializer->toArray ( $patientProfile ); */
				//Create correct arroy to be readable on Extjs Json reader
				$store ['PatientProfile' . $patientProfile [0] ['userid']] = array ($patientProfile [0] );
				//check if a patient with this id already exists
				$this->getResponse ()->appendBody ( Zend_Json::encode ( $store ) );
			} else {
				$this->_helper->AjaxResponse ( FALSE, 'No such patient exists.' );
			}
		
		} else { //no such patient exists.
			//TODO:logout user
			$this->_helper->AjaxResponse ( FALSE, 'Invalid user id' );
		}
	}
	public function submitformAction() {
	}
}
?>
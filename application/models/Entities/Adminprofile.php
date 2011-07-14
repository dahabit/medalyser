<?php

namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;

/** 
 * @Entity (repositoryClass="Repositories\Account") 
 * @Table(name="mc_admin_profile") 
 * @HasLifecycleCallbacks
 */
class Adminprofile {
	/**
	 * @Id @Column(type="integer")
	 * @GeneratedValue(strategy="AUTO")
	 */
	private $id;
	
	/** @Column(type="string", length=255) */
	private $primaryemail;
	
	/** @Column(type="string", length=32) */
	private $password;
	
	/** @Column(type="smallint") */
	private $confirmed;
	
	/** @Column(type="string", length=32) */
	private $recovery;
	
	/** @Column(type="datetime") */
	private $created;
	
	/** @Column(type="datetime") */
	private $updated;
	/**
	 * @return the $id
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * @return the $primaryemail
	 */
	public function getPrimaryemail() {
		return $this->primaryemail;
	}

	/**
	 * @return the $password
	 */
	public function getPassword() {
		return $this->password;
	}

	/**
	 * @return the $confirmed
	 */
	public function getConfirmed() {
		return $this->confirmed;
	}

	/**
	 * @return the $recovery
	 */
	public function getRecovery() {
		return $this->recovery;
	}

	/**
	 * @return the $created
	 */
	public function getCreated() {
		return $this->created;
	}

	/**
	 * @return the $updated
	 */
	public function getUpdated() {
		return $this->updated;
	}

	/**
	 * @param field_type $primaryemail
	 */
	public function setPrimaryemail($primaryemail) {
		$this->primaryemail = $primaryemail;
	}

	/**
	 * @param field_type $password
	 */
	public function setPassword($password) {
		$this->password = $password;
	}

	/**
	 * @param field_type $confirmed
	 */
	public function setConfirmed($confirmed) {
		$this->confirmed = $confirmed;
	}

	/**
	 * @param field_type $recovery
	 */
	public function setRecovery($recovery) {
		$this->recovery = $recovery;
	}

	/**
	 * @param field_type $created
	 */
	public function setCreated($created) {
		$this->created = $created;
	}

	/**
	 * @param field_type $updated
	 */
	public function setUpdated($updated) {
		$this->updated = $updated;
	}


}
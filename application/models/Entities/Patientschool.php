<?php

namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;

/** 
 * @Entity 
 * @Table(name="ma_patient_school") 
 */
class Patientschool {
	
	/**
	 * @Id @Column(type="integer")
	 * @GeneratedValue(strategy="AUTO")
	 */
	private $id;
	
	/**
	 * @ManyToMany(targetEntity="Patientprofile", mappedBy="schools")
	 */
	private $patients;
	public function __construct() {
		$this->patients = new \Doctrine\Common\Collections\ArrayCollection ();
	}
	/**
	 * @return the $id
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * @return the $patients
	 */
	public function getPatients() {
		return $this->patients;
	}

	/**
	 * @param field_type $patients
	 */
	public function setPatients($patients) {
		$this->patients = $patients;
	}

}

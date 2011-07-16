<?php

namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;

/** 
 * @Entity 
 * @Table(name="ma_insurance_company") 
 */
class Insurancecompany {
	
	/**
	 * @Id @Column(type="integer")
	 * @GeneratedValue(strategy="AUTO")
	 */
	private $id;
	
	/**
	 * @ManyToMany(targetEntity="Patientinsurance", mappedBy="patientinsurances")
	 */
	private $patientinsurances;
	public function __construct() {
		$this->patientinsurances = new \Doctrine\Common\Collections\ArrayCollection ();
	}
}
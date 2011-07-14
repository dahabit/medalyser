<?php

namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;

/** 
 * @Entity 
 * @Table(name="ma_patient_address") 
 */
class Patientaddress {
	
	/**
	 * @Id @Column(type="integer")
	 * @GeneratedValue(strategy="AUTO")
	 */
	private $id;
	
	/**
	 * @ManyToMany(targetEntity="Patientprofile", mappedBy="addresses")
	 */
	private $patients;
	
	/** @Column(type="integer", length=1) */
	private $addressType;
	
	/** @Column(type="string", length=255, nullable=true) */
	private $address1;
	
	/** @Column(type="string", length=255, nullable=true) */
	private $address2;
	
	/** @Column(type="string", length=20, nullable=true) */
	private $city;
	
	/** @Column(type="string", length=20, nullable=true) */
	private $state;
	
	/** @Column(type="string", length=2, nullable=true) */
	private $country;
	
	/** @Column(type="integer", length=10, nullable=true) */
	private $zip;
	
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
	 * @return the $address1
	 */
	public function getAddress1() {
		return $this->address1;
	}
	
	/**
	 * @return the $address2
	 */
	public function getAddress2() {
		return $this->address2;
	}
	
	/**
	 * @return the $city
	 */
	public function getCity() {
		return $this->city;
	}
	
	/**
	 * @return the $state
	 */
	public function getState() {
		return $this->state;
	}
	
	/**
	 * @return the $zip
	 */
	public function getZip() {
		return $this->zip;
	}
	
	/**
	 * @param field_type $patients
	 */
	public function setPatients($patients) {
		$this->patients = $patients;
	}
	
	/**
	 * @param field_type $address1
	 */
	public function setAddress1($address1) {
		$this->address1 = $address1;
	}
	
	/**
	 * @param field_type $address2
	 */
	public function setAddress2($address2) {
		$this->address2 = $address2;
	}
	
	/**
	 * @param field_type $city
	 */
	public function setCity($city) {
		$this->city = $city;
	}
	
	/**
	 * @param field_type $state
	 */
	public function setState($state) {
		$this->state = $state;
	}
	
	/**
	 * @param field_type $zip
	 */
	public function setZip($zip) {
		$this->zip = $zip;
	}
	/**
	 * @return the $country
	 */
	public function getCountry() {
		return $this->country;
	}
	
	/**
	 * @param field_type $country
	 */
	public function setCountry($country) {
		$this->country = $country;
	}
	/**
	 * @return the $addressType
	 */
	public function getAddressType() {
		return $this->addressType;
	}

	/**
	 * @param field_type $addressType
	 */
	public function setAddressType($addressType) {
		$this->addressType = $addressType;
	}


}
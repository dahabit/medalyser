<?php
namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;
/** 
 * @Entity 
 * @Table(name="ma_patient_address") 
 */
class Patientaddress extends MAEntityHelper
{
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
    public function __construct ()
    {
        $this->patients = new \Doctrine\Common\Collections\ArrayCollection();
    }
    public function __set ($key, $val)
    {
        if (property_exists($this, $key)) {
            $this->$key = $val;
        }
    }
    public function __get ($name)
    {
        if (property_exists($this, $name)) {
            return $this->$name;
        }
    }
}
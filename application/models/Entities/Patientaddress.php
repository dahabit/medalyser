<?php
namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;
/** 
 * @Entity 
 * @Table(name="ma_patient_address") 
 */
class Patientaddress
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
      if(property_exists($this, $name)){
    $this->$key = $val;
  }
    }
public function __get($name)
{
  if(property_exists($this, $name)){
    return $this->$name;
  }
}
    /**
     * Set all submitted form values at the same time.
     * @param field_type $allFormElements
     */
    public function setAllFormElements ($allFormElements)
    {
        foreach ($allFormElements as $name => $value1) {
            if (is_array($value1)) {
                foreach ($value1 as $name => $value2) {
                    if (property_exists(__CLASS__, $name)) {
                        $this->$name = $value2;
                    }
                }
            } else {
                if (property_exists(__CLASS__, $name)) {
                    $this->$name = $value1;
                }
            }
        }
    }
}
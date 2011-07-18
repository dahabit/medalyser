<?php
namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;
/** 
 * @Entity 
 * @Table(name="ma_patient_profile") 
 */
class Patientprofile
{
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;
    /** @Column(type="string", length=255) */
    private $firstname;
    /** @Column(type="string", length=255, nullable=true) */
    private $middlename;
    /** @Column(type="string", length=255) */
    private $lastname;
    /** @Column(type="date", nullable=true) */
    private $birthdate;
    /** @Column(type="string", length=30, nullable=true) */
    private $socialsecurity;
    /** @Column(type="string", length=30, nullable=true) */
    private $password;
    /** @Column(type="string", length=30, nullable=true) */
    private $primaryemail;
    /** @Column(type="string", length=30, nullable=true) */
    private $profilephoto;
    /** @Column(type="smallint", nullable=true) */
    private $sex;
    /** @Column(type="smallint", nullable=true) */
    private $maritalstatus;
    /** @Column(type="string", length=30, nullable=true) */
    private $homephone;
    /** @Column(type="string", length=30, nullable=true) */
    private $businessphone;
    /** @Column(type="string", length=30, nullable=true) */
    private $mobilephone;
    /** @Column(type="string", length=30, nullable=true) */
    private $faxphone;
    /** @Column(type="smallint", nullable=true) */
    private $confirmed;
    /** @Column(type="string", length=32, nullable=true) */
    private $recovery;
    // Date and time patient is created by admin
    /** @Column(type="datetime", nullable=true) */
    private $created;
    // Date and time patient is created by herself
    /** @Column(type="datetime", nullable=true) */
    private $registered;
    /** @Column(type="datetime", nullable=true) */
    private $updated;
    /**
     * @ManyToMany(targetEntity="Patientaddress", inversedBy="patients")
     * @JoinTable(name="ma_patients_addresses")
     */
    private $addresses;
    /** @Column(type="string", length=20, nullable=true) */
    private $race;
    /** @Column(type="string", length=20, nullable=true) */
    private $language;
    // Schools for less than 18 years students
    /**
     * @ManyToMany(targetEntity="Patientaddress", inversedBy="patients")
     * @JoinTable(name="ma_patients_schools")
     */
    private $schools;
    /**
     * @ManyToMany(targetEntity="Patientinsurance", inversedBy="patients")
     * @JoinTable(name="ma_patients_insurances")
     */
    private $insurances;
    public function __construct ()
    {
        $this->addresses = new \Doctrine\Common\Collections\ArrayCollection();
        $this->schools = new \Doctrine\Common\Collections\ArrayCollection();
    }
    public function __set ($key, $val)
    {
        if (property_exists($this, $name)) {
            $this->$key = $val;
        }
    }
    public function __get ($name)
    {
        if (property_exists($this, $name)) {
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

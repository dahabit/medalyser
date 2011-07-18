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
    public function getId ()
    {
        return $this->id;
    }
    /**
     * @return the $firstname
     */
    public function getFirstname ()
    {
        return $this->firstname;
    }
    /**
     * @return the $lastname
     */
    public function getLastname ()
    {
        return $this->lastname;
    }
    /**
     * @param field_type $firstname
     */
    public function setFirstname ($firstname)
    {
        $this->firstname = $firstname;
    }
    /**
     * @param field_type $lastname
     */
    public function setLastname ($lastname)
    {
        $this->lastname = $lastname;
    }
    /**
     * @return the $birthdate
     */
    public function getBirthdate ()
    {
        return $this->birthdate;
    }
    /**
     * @return the $socialsecurity
     */
    public function getSocialsecurity ()
    {
        return $this->socialsecurity;
    }
    /**
     * @return the $password
     */
    public function getPassword ()
    {
        return $this->password;
    }
    /**
     * @return the $primaryemail
     */
    public function getPrimaryemail ()
    {
        return $this->primaryemail;
    }
    /**
     * @return the $sex
     */
    public function getSex ()
    {
        return $this->sex;
    }
    /**
     * @return the $maritalstatus
     */
    public function getMaritalstatus ()
    {
        return $this->maritalstatus;
    }
    /**
     * @param field_type $birthdate
     */
    public function setBirthdate ($birthdate)
    {
        $this->birthdate = $birthdate;
    }
    /**
     * @param field_type $socialsecurity
     */
    public function setSocialsecurity ($socialsecurity)
    {
        $this->socialsecurity = $socialsecurity;
    }
    /**
     * @param field_type $password
     */
    public function setPassword ($password)
    {
        $this->password = $password;
    }
    /**
     * @param field_type $primaryemail
     */
    public function setPrimaryemail ($primaryemail)
    {
        $this->primaryemail = $primaryemail;
    }
    /**
     * @param field_type $sex
     */
    public function setSex ($sex)
    {
        $this->sex = $sex;
    }
    /**
     * @param field_type $maritalstatus
     */
    public function setMaritalstatus ($maritalstatus)
    {
        $this->maritalstatus = $maritalstatus;
    }
    /**
     * @return the $middlename
     */
    public function getMiddlename ()
    {
        return $this->middlename;
    }
    /**
     * @param field_type $middlename
     */
    public function setMiddlename ($middlename)
    {
        $this->middlename = $middlename;
    }
    /**
     * @return the $profilephoto
     */
    public function getProfilephoto ()
    {
        return $this->profilephoto;
    }
    /**
     * @param field_type $profilephoto
     */
    public function setProfilephoto ($profilephoto)
    {
        $this->profilephoto = $profilephoto;
    }
    /**
     * @return the $homephone
     */
    public function getHomephone ()
    {
        return $this->homephone;
    }
    /**
     * @return the $businessphone
     */
    public function getBusinessphone ()
    {
        return $this->businessphone;
    }
    /**
     * @return the $mobilephone
     */
    public function getMobilephone ()
    {
        return $this->mobilephone;
    }
    /**
     * @return the $faxphone
     */
    public function getFaxphone ()
    {
        return $this->faxphone;
    }
    /**
     * @return the $addresses
     */
    public function getAddresses ()
    {
        return $this->addresses;
    }
    /**
     * @param field_type $homephone
     */
    public function setHomephone ($homephone)
    {
        $this->homephone = $homephone;
    }
    /**
     * @param field_type $businessphone
     */
    public function setBusinessphone ($businessphone)
    {
        $this->businessphone = $businessphone;
    }
    /**
     * @param field_type $mobilephone
     */
    public function setMobilephone ($mobilephone)
    {
        $this->mobilephone = $mobilephone;
    }
    /**
     * @param field_type $faxphone
     */
    public function setFaxphone ($faxphone)
    {
        $this->faxphone = $faxphone;
    }
    /**
     * @param field_type $addresses
     */
    public function setAddresses ($addresses)
    {
        $this->addresses = $addresses;
    }
    /**
     * @return the $confirmed
     */
    public function getConfirmed ()
    {
        return $this->confirmed;
    }
    /**
     * @return the $recovery
     */
    public function getRecovery ()
    {
        return $this->recovery;
    }
    /**
     * @return the $created
     */
    public function getCreated ()
    {
        return $this->created;
    }
    /**
     * @return the $registered
     */
    public function getRegistered ()
    {
        return $this->registered;
    }
    /**
     * @return the $updated
     */
    public function getUpdated ()
    {
        return $this->updated;
    }
    /**
     * @param field_type $confirmed
     */
    public function setConfirmed ($confirmed)
    {
        $this->confirmed = $confirmed;
    }
    /**
     * @param field_type $recovery
     */
    public function setRecovery ($recovery)
    {
        $this->recovery = $recovery;
    }
    /**
     * @param field_type $created
     */
    public function setCreated ($created)
    {
        $this->created = $created;
    }
    /**
     * @param field_type $registered
     */
    public function setRegistered ($registered)
    {
        $this->registered = $registered;
    }
    /**
     * @param field_type $updated
     */
    public function setUpdated ($updated)
    {
        $this->updated = $updated;
    }
    /**
     * @return the $race
     */
    public function getRace ()
    {
        return $this->race;
    }
    /**
     * @return the $language
     */
    public function getLanguage ()
    {
        return $this->language;
    }
    /**
     * @return the $schools
     */
    public function getSchools ()
    {
        return $this->schools;
    }
    /**
     * @param field_type $race
     */
    public function setRace ($race)
    {
        $this->race = $race;
    }
    /**
     * @param field_type $language
     */
    public function setLanguage ($language)
    {
        $this->language = $language;
    }
    /**
     * @param field_type $schools
     */
    public function setSchools ($schools)
    {
        $this->schools = $schools;
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

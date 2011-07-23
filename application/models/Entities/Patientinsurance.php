<?php
namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;
/** 
 * @Entity 
 * @Table(name="ma_patient_insurance") 
 */
class Patientinsurance
{
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * @ManyToMany(targetEntity="Patientprofile", mappedBy="insurances")
     */
    private $patients;
    /**
     * @ManyToMany(targetEntity="Insurancecompany", inversedBy="patientinsurances")
     * @JoinTable(name="ma_insurances_companies")
     */
    private $insurancecompanies;
    /** @Column(type="integer", length=30) */
    private $insuredcode;
    /** @Column(type="integer", length=1) */
    private $insuredrel;
    /** @Column(type="string", length=30) */
    private $programname;
    /** @Column(type="integer", length=30) */
    private $idno;
    /** @Column(type="integer", length=30) */
    private $groupno;
    /** @Column(type="integer", length=1) */
    private $contracttype;
    //(in an insurance policy) A specified amount of money that the insured must pay before an insurance company will pay a claim 
    //The annual deductible is the fixed dollar amount you pay each calendar year before certain services are covered.
    /** @Column(type="integer", length=30) */
    private $annualdedtuctible;
    // private $deductiblepaid;
    /** @Column(type="date", nullable=true) */
    private $effectivedate;
    /** @Column(type="date", nullable=true) */
    private $expiredate;
    /** @Column(type="integer", length=10) */
    private $copay;
    public function __construct ()
    {
        $this->addresses = new \Doctrine\Common\Collections\ArrayCollection();
        $this->schools = new \Doctrine\Common\Collections\ArrayCollection();
        $this->insurancecompanies = new \Doctrine\Common\Collections\ArrayCollection();
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
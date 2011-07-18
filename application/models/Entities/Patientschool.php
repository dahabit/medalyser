<?php
namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;
/** 
 * @Entity 
 * @Table(name="ma_patient_school") 
 */
class Patientschool
{
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;
    /**
     * @ManyToMany(targetEntity="Patientprofile", mappedBy="schools")
     */
    private $patients;
    public function __construct ()
    {
        $this->patients = new \Doctrine\Common\Collections\ArrayCollection();
    }
    public function __set ($key, $val)
    {
        $this->$key = $val;
    }
    public function __get ($key)
    {
        return $this->$key;
    }
}

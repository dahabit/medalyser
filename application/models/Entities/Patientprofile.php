<?php
/**
 *THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION;LOSS OF HEALTH IN ANY FORM) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * @version 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
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
    /**
     * @ManyToOne(targetEntity="Patientcontact")
     * @JoinColumn(name="contact_id", referencedColumnName="id")
     */
    private $contacts;
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
    public function getAddresses ()
    {
        return $this->addresses;
    }
    public function getContacts ()
    {
        return $this->contacts;
    }
    /**
     * Set all submitted form values at the same time.
     * @param field_type $nonNestedFormElements
     */
    public function setNonNestedFormElements ($nonNestedFormElements)
    {
        foreach ($nonNestedFormElements as $name => $value1) {
            if (! is_array($value1)) {
                if (property_exists($this, $name)) {
                    $this->$name = $value1;
                }
            }
        }
    }
}

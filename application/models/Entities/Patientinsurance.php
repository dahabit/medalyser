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
 * @Entity (repositoryClass="Repositories\PatientinsuranceRepository") 
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
    private $insurancetype;
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
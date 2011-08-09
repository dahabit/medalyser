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
    private $addresstype;
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
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
 * @Entity (repositoryClass="Repositories\AdminprofileRepository")
 * @Table(name="ma_admin_profile") 
 */
class Adminprofile
{
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;
    /** @Column(type="integer", length=9) */
    private $userid;
    /** @Column(type="string", length=32) */
    private $primaryemail;
    /** @Column(type="string", length=32) */
    private $password;
    /** @Column(type="smallint") */
    private $confirmed;
    /** @Column(type="string", length=32) */
    private $recovery;
    /** @Column(type="datetime") */
    private $created;
    /** @Column(type="datetime") */
    private $updated;
    /** @Column(type="smallint", nullable=true) */
    private $extjstemplate;
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
    private $profilephoto;
    /** @Column(type="smallint", nullable=true) */
    private $sex;
    /** @Column(type="string", length=5) */
    private $language;
    /**
     * @ManyToMany(targetEntity="Adminaddress", inversedBy="admins")
     * @JoinTable(name="ma_admins_addresses")
     */
    private $addresses;
    /** @Column(type="string", length=255) */
    private $Setttingsviewallpatients;
    public function __construct ()
    {}
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
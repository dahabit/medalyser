<?php
namespace Entities;
use Doctrine\Common\Collections\ArrayCollection;
/** 
 * @Entity
 * @Table(name="ma_admin_profile") 
 */
class Adminprofile
{
    /**
     * @Id @Column(type="integer")
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;
    /** @Column(type="string", length=32) */
    private $primaryemail;
    /** @Column(type="string", length=32) */
    private $username;
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
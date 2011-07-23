<?php
namespace Entities;
class MAEntityHelper
{
    /**
     * Set all submitted form values at the same time.
     * @param field_type $allFormElements
     */
    public function setAllFormElements ($allFormElements)
    {
        foreach ($allFormElements as $name => $value1) {
            if (is_array($value1)) {
                foreach ($value1 as $name => $value2) {
                    if (property_exists($this, $name)) {
                        $this->$name = $value2;
                    }
                }
            } else {
                if (property_exists($this, $name)) {
                    $this->$name = $value1;
                }
            }
        }
    }
    /**
     * Set only  nested form values and not first level array elements
     * @param field_type $nestedFormElements
     */
    public function setNestedFormElements ($nestedFormElements)
    {
        foreach ($nestedFormElements as $name => $value1) {
            if (is_array($value1)) {
                foreach ($value1 as $name => $value2) {
                    if (property_exists($this, $name)) {
                        $this->$name = $value2;
                    }
                }
            }
        }
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
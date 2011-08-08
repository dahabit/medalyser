<?php
namespace Entities;
class MAEntityHelper
{
    public $sortedArray = null;
    /**
     * Set all submitted form values at the same time.
     * @param field_type $allFormElements
     */
    //TODO:automatically set addresses insurances etc on diffrenet arrays
    public function setAllFormElements ($allFormElements)
    {
        foreach ($allFormElements as $submittedGroupName => $submittedGroupValue) {
            if (is_array($submittedGroupValue)) {
                foreach ($submittedGroupValue as $key => $value) {
                    foreach ($value as $index => $name) {
                        $this->sortedArray[$submittedGroupName][$submittedGroupName .
                         $index][$key] = $name;
                    }
                }
            } else {
                if (property_exists($this, $submittedGroupName)) {
                    $this->$submittedGroupName = $submittedGroupValue;
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
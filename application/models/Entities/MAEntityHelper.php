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
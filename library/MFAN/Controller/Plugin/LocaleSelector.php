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
 * @version $Id: LocaleSelector.php  Aug 24, 2011  7:16:49 PM 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
class MFAN_Controller_Plugin_LocaleSelector extends Zend_Controller_Plugin_Abstract
{
    public function preDispatch (Zend_Controller_Request_Abstract $request)
    {
        $registry = Zend_Registry::getInstance();
        // Get our translate object from registry.
        $translate = $registry->get('Zend_Translate');
        $currLocale = $translate->getLocale();
        // Create Session block and save the locale
        $session = new Zend_Session_Namespace('session');
        $lang = $request->getParam('lang', '');
        $newLocale = new Zend_Locale();
        //get rid of getlocallist`s associative array and convert it to simple array so in_array() function could work.
        foreach ($newLocale->getLocaleList() as $key => $value) {
            $localeList[] = $key;
        }
        //Only assign user selected language if it exists in zend locales.
        if (in_array($lang, $localeList)) {
            $langLocale = $lang;
        } else {
            $langLocale = 'en_US';
        }
        $newLocale->setLocale($langLocale);
        $registry->set('Zend_Locale', $newLocale);
        $translate->setLocale($langLocale);
        $session->lang = $langLocale;
        // Save the modified translate back to registry
        $registry->set('Zend_Translate', $translate);
    }
}
?>
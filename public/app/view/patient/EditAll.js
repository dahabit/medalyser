/**
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION;LOSS OF HEALTH IN ANY FORM) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
Ext.define('MA.view.patient.EditAll', {
	extend : 'Ext.form.Panel',
	alias : 'widget.EditAllPatients',
	url : 'index.php/editallpatients/submitform',
	requires : [ 'Ext.ux.tab.VerticalPanel' ],
	// stateId : 'state.EditAllPatients',
	initComponent : function() {
		this.items = [ {
			xtype : 'tabpanel',
			items : [ {
				title : 'Basic Information'
			}, {
				title : 'PH/E',
				tabConfig : {
					tooltip : 'History & Physical Examinations'
				}
			}, {
				title : 'PNs & Vitals',
				tabConfig : {
					tooltip : 'Progress Notes & Vital Signs'
				},
				/*
				 * There should be a "add a new PN" combo with some templates
				 * created by the doctor.The PNs should be ordered by date/time
				 * and in an accordian layout with date/time to the current time
				 * Vital signs should be added as an editable grid on the second
				 * tab. vital signs must be demonstrated on a chart like
				 * this:http://localhost/extjs/ext-4.0.2a/examples/charts/LiveAnimated.js
				 */
				items : [ {
					xtype : 'tabpanel',
					items : [ {
						title : 'Progress Notes'
					}, {
						title : 'Vital signs'
					} ]
				} ]
			}, {
				title : 'Lab',
				/*
				 * tabConfig: { tooltip: 'Lab' }
				 */
				/*
				 * Display a combo:"Add a new Test" Get current patient's Lab
				 * Tests And create tabs on a-z order. Every lab test should be
				 * sorted by date/time.For some tests a grid might be enough but
				 * for some of them,a form layout might be appropriate.
				 */
				items : [],
				tabConfig : {
					tooltip : 'History & Physical Examinations'
				}
			} // eof Lab tab
			]
		} ];
		this.callParent(arguments);
	}
});
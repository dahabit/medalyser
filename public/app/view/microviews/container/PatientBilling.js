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
 * @version
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
Ext.define('app.view.microviews.container.PatientBilling', {
	extend : 'Ext.container.Container',
	alias : 'widget.patientbilling',
	height : 290,
	layout : {
		align : 'stretch',
		type : 'hbox'
	},
	items : [ {
		xtype : 'fieldset',
		flex : 1,
		items : [ {
			xtype : 'combo',
			name : 'Patientbilling[insurancecompany][]',
			fieldLabel : 'Insurance Company',
			store : 'MarriageStatus',
			queryMode : 'local',
			displayField : 'name',
			valueField : 'id',
			typeAhead : true,
			forceSelection : true
		}, {
			xtype : 'textfield',
			fieldLabel : 'Insured Code',
			name : 'Patientbilling[insuredcode][]'
		}, {
			xtype : 'combo',
			name : 'Patientbilling[insuredrel][]',
			fieldLabel : 'Insured relationship',
			store : 'Insurancerel',
			queryMode : 'local',
			displayField : 'name',
			valueField : 'name',
			typeAhead : true
		}, {
			xtype : 'textfield',
			fieldLabel : 'Program Name',
			name : 'Patientbilling[programname][]'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Id Number',
			name : 'Patientbilling[idno][]'
		}, {
			xtype : 'textfield',
			fieldLabel : 'Group Number',
			name : 'Patientbilling[groupno][]'
		}, {
			xtype : 'combo',
			name : 'Patientbilling[insurancetype][]',
			fieldLabel : 'Insurance Type',
			store : 'MarriageStatus',
			queryMode : 'local',
			displayField : 'name',
			valueField : 'id',
			typeAhead : true,
			forceSelection : true
		}, {
			xtype : 'combo',
			name : 'Patientbilling[contracttype][]',
			fieldLabel : 'Contract type',
			store : 'MarriageStatus',
			queryMode : 'local',
			displayField : 'name',
			valueField : 'id',
			typeAhead : true,
			forceSelection : true
		} ]
	}, {
		xtype : 'fieldset',
		flex : 1,
		items : [ {
			xtype : 'textfield',
			fieldLabel : 'Annual Deductible',
			name : 'Patientbilling[annualdedtuctible][]'
		}, {
			xtype : 'datefield',
			fieldLabel : 'Effective Date',
			name : 'Patientbilling[effectivedate][]',
			maxValue : new Date(), // limited to the
			// current
			// date or prior
			format : 'Y-m-d'

		}, {
			xtype : 'datefield',
			fieldLabel : 'Expire Date',
			name : 'Patientbilling[expiredate][]',
			maxValue : new Date(), // limited to the
			// current
			// date or prior
			format : 'Y-m-d'

		}, {
			xtype : 'textfield',
			fieldLabel : 'Co-pay per visit',
			name : 'Patientbilling[copay][]'
		}, {
			xtype : 'checkboxfield',
			name : 'Patientbilling[enabled][]',
			fieldLabel : 'Enabled',
			value : 1
		} ]
	} ]
});
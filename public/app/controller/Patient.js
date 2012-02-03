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
Ext.define('MA.controller.Patient', {
	extend : 'Ext.app.Controller',

	stores : [ 'Se', 'MarriageStatus', 'AddressType', 'Race','Tree','Insurancerel' ],
	views : [ 'patient.List', 'patient.Edit', 'patient.Overview',
			'patient.New','patient.Tree' ],
	/*
	 * refs: [ { ref: 'editform', selector: 'EditAllPatients > form' } ],
	 */
	init : function() {
		// this.counter=0;
		this.control({
			'ListPatients' : {
				itemdblclick : this.patientProfileStore,
				itemcontextmenu : this.gridContextMenu,
				activate : this.tabActive

			}
		});
		this.control({
			'EditPatient' : {
				destroy : this.tabDestroy,
				activate : this.editActive
			}
		});
		this.control({
			'PatientsOverview' : {
				activate : this.tabActive
			}
		});
		this.control({
			'EditPatientTree' : {
				itemclick : this.selectPanel

			}
		});
	},
	gridContextMenu : function(view, record, item, index, e, options) {
		e.stopEvent();
		Ext.create('Ext.menu.Menu', {
			width : 100,
			height : 100,
			scope : this,
			// margin: '0 0 10 0',
			items : [ {
				text : 'Edit Patient',
				cls : 'edit-icon',
				scope : this,
				handler : function() {
					this.patientProfileStore(view, record);
				}
			}/*, {
				text : 'New Patient',
				cls : 'add-icon',
				handler : function() {
					Ext.create('MA.view.patient.New').show();
				}
			}*/, {
				text : 'New Visit',
				cls : 'new-icon'
			}, {
				text : 'Remove Patient',
				cls : 'delete-icon'
			}  ]
		}).showAt(e.getXY());
	},
	editUser : function(grid, record) {
		this.rec = record;
		// only create a new tab if patient is not created
		// previously
		if (!Ext.getCmp('EditPatient' + record.get('userid'))) {
			Ext.getCmp('centertabpanel').add({
				xtype : 'EditPatient',
				id : 'EditPatient' + record.get('userid'),
				title : record.get('firstname') + ' ' + record.get('lastname'),
				tabConfig : {
					tooltip : 'Enter patient thumb+primitive data here.'
				},
				closable : true
			});
			//Method to dynamically add items to left panel(which left panel is useless for now)
			//Ext.getCmp('lefttreepanel').add({xtype:'EditPatientTree',id:'EditPatientTree'+record.get('userid')});
			//Ext.getCmp('lefttreepanel').doLayout();
		}
		;
		 Ext.getCmp('centertabpanel').doLayout();
		Ext.getCmp('centertabpanel').setActiveTab(
				'EditPatient' + record.get('userid'));
		// expand treepanel
		Ext.getCmp('EditPatientTree'
				+ record.get('userid')).expand();
		// view.down('form').loadRecord(record);
		Ext.getCmp(
				'generalprofilebasicinformation' + 'EditPatient'
						+ record.get('userid')).loadRecord(
				Ext.getStore('PatientProfile' + record.get('userid') + 'Store')
						.getAt('0'));
		return this;
	},
	patientProfileStore : function(grid, record) {
		// Only create store if it doesnt already exist
		if (!Ext.getStore('PatientProfile' + record.get('userid')
				+ 'Store')) {
			Ext.Ajax.request({
				url : './editallpatients/getpatientprofilestore',
				params : {
					userid : record.get('userid')
				},
				scope : this,
				callback : function(options, success, response) {
					var json = Ext.decode(response.responseText);
					// setup and intitialize on the fly stores
					for ( var key1 in json) {
						var storeFields = new Array();
						for ( var key2 in json[key1]) {// if
							// (i==1){break;}
							// console.log(key2);
							for ( var key3 in json[key1][key2]) {
								storeFields.push(key3);
							}
							break;
						}
						;
						Ext.define('MA.store.' + key1, {
							extend : 'Ext.data.Store',
							fields : storeFields,
							storeId : key1 + 'Store',
							data : json[key1]
						});
						Ext.create('MA.store.' + key1);
						// adminStores.push(Ext.create('MA.store.' +
						// key1));
						// console.log(storeFields);
						// xxx=new MA.store.AdminSettings();

					}
					this.editUser(grid, record);
				}
			});
		}else{this.editUser(grid, record);}
	},
	tabDestroy : function() {
		// automatically switch to appropriate patient on
		// closing a patients file
		var tabsCount = Ext.getCmp('centertabpanel').items.getCount();
		// console.log(tabsCount);
		if (tabsCount < 3) {
			Ext.getCmp('centertabpanel').setActiveTab(1);
		} else {
			Ext.getCmp('centertabpanel').setActiveTab(tabsCount - 1);
		}

	},
	tabActive : function() {
//disable left panel if not editing a patient
		var tree=Ext.getCmp('mainpaneltree');
		if (tree){tree.collapse();}
	},
	editActive: function(){
		
/*		var tree=Ext.getCmp('mainpaneltree');
		tree.store.load(Ext.getStore('mainpaneltree'));
		tree.expand();*/
	},	selectPanel : function(node, record, item, index, event) {
		//Currently active edittab
		var currentTab=Ext.getCmp('centertabpanel').getActiveTab();
		// generate current card's id
		var currentCard=record.data.id+currentTab.id;
		//console.log(currentTab.id);
		//TODO:if form contains unsubmitted values,display a warning to the user to save patient's data before leaving current tab
		var form=currentTab.down('form').getForm();
        if (form.isDirty()) {
            Ext.MessageBox.alert('Some Patient Data Has Been Modified','To switch to other tabs,please choose to undo changes or apply new changes to the current page.');
            return false;
        }
;
		currentTab.down('panel').getLayout().setActiveItem(currentCard);
		
	}

/*
 * ,refs: [ { ref: 'usersPanel', selector: 'panel' } ],
 */

});
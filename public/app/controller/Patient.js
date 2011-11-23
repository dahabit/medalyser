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

	stores : [ 'Se', 'MarriageStatus', 'AddressType', 'Race' ],
	views : [ 'patient.ViewAll', 'patient.Edit', 'patient.Overview',
			'patient.New' ],
	/*
	 * refs: [ { ref: 'editform', selector: 'EditAllPatients > form' } ],
	 */
	init : function() {
		// this.counter=0;
		this.control({
			'ViewAllPatients' : {
				itemdblclick : this.patientProfileStore,
				itemcontextmenu : this.gridContextMenu,
				activate : this.tabActive

			}
		});
		this.control({
			'EditPatient' : {
				destroy : this.tabDestroy,
				activate : this.tabActive
			}
		});
		this.control({
			'PatientsOverview' : {
				activate : this.tabActive
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
			}, {
				text : 'New Patient',
				cls : 'add-icon',
				handler : function() {
					Ext.create('MA.view.patient.New').show();
				}
			}, {
				text : 'New Visit',
				cls : 'new-icon'
			} ]
		}).showAt(e.getXY());
	},
	editUser : function(grid, record) {
		this.rec = record;
		// this.counter=this.counter+1;
		// console.log('Double clicked on ' +
		// record.get('firstname'));
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
		}
		;
		// Ext.getCmp('centertabpanel').doLayout();
		Ext.getCmp('centertabpanel').setActiveTab(
				'EditPatient' + record.get('userid'));
		// expand treepanel
		Ext.getCmp('mainpaneltree').expand();
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
			})
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

	}

/*
 * ,refs: [ { ref: 'usersPanel', selector: 'panel' } ],
 */

});
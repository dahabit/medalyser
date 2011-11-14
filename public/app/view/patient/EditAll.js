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
Ext
		.define(
				'MA.view.patient.EditAll',
				{
					extend : 'Ext.container.Container',
					alias : 'widget.EditAllPatients',
					requires : [ 'Ext.ux.tab.VerticalPanel' ],
					layout : 'card',
					// stateId : 'state.EditAllPatients',
					getFieldValue : function(name) {
						return Ext.getStore('PatientProfile').getAt('0').get(
								name);
					},
					initComponent : function() {
						var card_0_userpass_username = {
							xtype : 'textfield',
							fieldLabel : 'User name',
							name : 'patientusername',
							value : this.getFieldValue('patientusername')
						};
						var card_0_userpass_pass = {
							xtype : 'textfield',
							fieldLabel : 'Password',
							inputType : 'password',
							id : 'password',
							name : 'patientpassword',
							minLength : 6,
							maxLength : 32,
							minLengthText : 'Password must be at least 6 characters long.',
							maxLengthText : 'Maximum Password length is 36 characters.'
						};
						var card_0_userpass_name = [ {
							xtype : 'textfield',
							name : 'firstname',
							fieldLabel : 'First Name',
							msgTarget : 'side',
							allowBlank : false,
							value : this.getFieldValue('firstname')
						}, {
							xtype : 'textfield',
							flex : .4,
							name : 'middlename',
							fieldLabel : 'Middle Name',
							value : this.getFieldValue('middlename')
						}, {
							xtype : 'textfield',
							name : 'lastname',
							msgTarget : 'side',
							fieldLabel : 'Last Name',
							allowBlank : false,
							value : this.getFieldValue('lastname')
						} ];
						var card_0_userpass_userid = {
							xtype : 'numberfield',
							fieldLabel : 'Patient Code',
							// Remove spinner buttons, and arrow key and mouse
							// wheel listeners
							hideTrigger : true,
							keyNavEnabled : false,
							mouseWheelEnabled : false,
							allowBlank : true,
							maxValue : 999999999,
							minValue : 100000000,
							emptyText : 'Leave empty',
							name : 'userid',
							value : this.getFieldValue('userid')
						};
						var card_0_sex = {
							xtype : 'combo',
							name : 'sex',
							fieldLabel : 'Sex',
							store : 'Se',
							queryMode : 'local',
							displayField : 'name',
							valueField : 'id',
							typeAhead : true,
							forceSelection : true,
							value : this.getFieldValue('sex')
						};
						var card_0_birthdate = {
							xtype : 'datefield',
							fieldLabel : 'Birthdate',
							name : 'birthdate',
							maxValue : new Date(), // limited to the current
							// date or prior
							format : 'Y-m-d',
							value : this.getFieldValue('birthdate')

						};
						var card_0_photo = {
							xtype : 'filefield',
							// fieldLabel : 'Photo',
							id : 'newPic',
							name : 'profilephoto',
							inputType : 'file',
							buttonOnly : true
						};
						// Only load patient`s real photo if
						// already exists in data store
						if (!this.getFieldValue('profilephoto')) {
							var profilePhoto = './assets/icons/patient/profile.png';
						} else {
							var profilePhoto = './documents/patients/'
									+ getFieldValue('userid')
									+ '/images/profile/'
									+ getFieldValue('profilephoto');
						}
						var card_0_photo_box = {
							xtype : 'container',
							html : '<div><img src="' + profilePhoto
									+ '"  /></div>'
						};
						;
						var card_0_socialsecnumber = {
							xtype : 'textfield',
							fieldLabel : 'Social security #',
							name : 'socialsecurity',
							value : this.getFieldValue('socialsecurity')
						};
						var card_0_marital_status = {
							xtype : 'combo',
							name : 'maritalstatus',
							fieldLabel : 'Marital Status',
							store : 'MarriageStatus',
							queryMode : 'local',
							displayField : 'name',
							valueField : 'id',
							typeAhead : true,
							forceSelection : true,
							value : this.getFieldValue('maritalstatus')
						};
						var card_0_race = {
							xtype : 'combo',
							name : 'race',
							fieldLabel : 'Race',
							store : 'Race',
							queryMode : 'local',
							displayField : 'name',
							valueField : 'id',
							typeAhead : true,
							forceSelection : true,
							value : this.getFieldValue('race')
						};
						var card_0_language = {
							xtype : 'combo',
							name : 'language',
							fieldLabel : 'Language',
							store : Ext.create('MA.store.Languages'),
							queryMode : 'local',
							displayField : 'name',
							valueField : 'id',
							typeAhead : true,
							forceSelection : true,
							value : this.getFieldValue('language')
						};
						var card_0_primary_care_doctor = {
							xtype : 'textfield',
							fieldLabel : 'Primary Care Doctor',
							name : 'primarydoctor',
							value : this.getFieldValue('primarydoctor')
						};
						var card_0 = {
							layout : 'auto',
							items : [ {
								xtype : 'fieldset',
								title : 'Primary Information',
								items : [ {
									xtype : 'container',
									layout : 'hbox',
									items : [
											{
												xtype : 'container',
												flex : 1,
												items : [

												card_0_userpass_name ]
											},
											{
												xtype : 'container',
												flex : 1,
												items : [ card_0_birthdate,
														card_0_sex,
														card_0_marital_status,
														card_0_language,
														card_0_race ]
											},
											{
												xtype : 'container',
												flex : 1,
												items : [
														card_0_socialsecnumber,
														card_0_primary_care_doctor,
														card_0_userpass_userid ]
											},
											{
												xtype : 'container',
												flex : 1,
												items : [ card_0_photo_box,
														card_0_photo ]
											} ]
								} ]
							} ]
						};// eof CARD 0
						// ////////////////CARD1////////////////

						function addressCounter(incr) {
							if (!this.no) {
								this.no = 0;
							} else {
								this.no = this.no + 1;
							}
							;
						}
						;
						var counter = new addressCounter();
						console.log(counter.no);
						var card_1 = [
								{
									title : 'Address',
									id : 'paddress',
									autoScroll : true,
									defaultType : 'textfield',
									labelAlign : 'right',
									xtype : 'fieldset',
									items : [ {
										xtype : 'fieldcontainer',
										// combineErrors : true,
										msgTarget : 'side',
										items : [
												{
													xtype : 'button',
													// text : 'Add address ',
													id : 'addpaddress',
													cls : 'add-icon',
													tooltip : 'Add a new address',
													handler : function() {
														counter.no = counter.no + 1;
														console.log(counter.no);
														Ext
																.getCmp(
																		'paddress')
																.add(
																		[
																				{
																					xtype : 'combo',
																					store : 'AddressType',
																					displayField : 'name',
																					valueField : 'id',
																					fieldLabel : 'Address Type',
																					id : 'addresstype'
																							+ counter.no,
																					name : "Patientaddress[addresstype][]",
																					value : '0',
																					forceSelection : true,
																					typeAhead : true,
																					queryMode : 'local'
																				},
																				{
																					fieldLabel : 'Zip',
																					width : 160,
																					maxLength : 10,
																					enforceMaxLength : true,
																					maskRe : /[\d\-]/,
																					regex : /^\d{5}(\-\d{4})?$/,
																					regexText : 'Must be in the format xxxxx or xxxxx-xxxx',
																					name : "paddress[zip][]",
																					id : 'zip'
																							+ counter.no
																				},
																				{
																					fieldLabel : 'Address 1',
																					name : "paddress[address1][]",
																					id : 'address1'
																							+ counter.no
																				},
																				{
																					fieldLabel : 'Address 2',
																					name : "paddress[address2][]",
																					id : 'address2'
																							+ counter.no
																				},
																				{
																					fieldLabel : 'City',
																					name : "paddress[city][]",
																					id : 'city'
																							+ counter.no
																				// TODO:add
																				// default
																				// city,state
																				// and
																				// country
																				// to
																				// user
																				// settings
																				// form
																				// and
																				// then
																				// load
																				// default
																				// value
																				// here.
																				// ,value:
																				// 'Ext
																				// JS'
																				},
																				{
																					fieldLabel : 'State',
																					name : "paddress[state][]",
																					id : 'state'
																							+ counter.no
																				},
																				{
																					xtype : 'combo',
																					store : Ext
																							.create('MA.store.Countries'),
																					displayField : 'name',
																					valueField : 'id',
																					forceSelection : true,
																					fieldLabel : 'Country',
																					typeAhead : true,
																					queryMode : 'local',
																					name : "paddress[country][]",
																					id : 'country'
																							+ counter.no
																				} // eof
																				// countries;
																				,
																				Ext
																						.getCmp('addpaddress'),
																				{
																					xtype : 'button',
																					cls : 'delete-icon',
																					tooltip : 'Remove Address',
																					id : 'removeaddress'
																							+ counter.no,
																					handler : function(
																							thisButton,
																							eventObject) {

																						activeRemoveButtonId = thisButton
																								.getId()
																								.split(
																										'removeaddress')[1];

																						console
																								.log('activeRemoveButtonID:'
																										+ activeRemoveButtonId);
																						Ext
																								.getCmp(
																										'paddress')
																								.remove(
																										'address1'
																												+ activeRemoveButtonId);
																						Ext
																								.getCmp(
																										'paddress')
																								.remove(
																										'address2'
																												+ activeRemoveButtonId);
																						Ext
																								.getCmp(
																										'paddress')
																								.remove(
																										'city'
																												+ activeRemoveButtonId);
																						Ext
																								.getCmp(
																										'paddress')
																								.remove(
																										'state'
																												+ activeRemoveButtonId);
																						Ext
																								.getCmp(
																										'paddress')
																								.remove(
																										'country'
																												+ activeRemoveButtonId);
																						Ext
																								.getCmp(
																										'paddress')
																								.remove(
																										'removeaddress'
																												+ activeRemoveButtonId);
																						Ext
																								.getCmp(
																										'paddress')
																								.remove(
																										'addresstype'
																												+ activeRemoveButtonId);
																						Ext
																								.getCmp(
																										'paddress')
																								.remove(
																										'zip'
																												+ activeRemoveButtonId);

																						Ext
																								.getCmp(
																										'paddress')
																								.doLayout();
																					}
																				} ]);
														Ext.getCmp('paddress')
																.doLayout();

													}// eof function
												}, // eof Add button
										]
									// eof items
									} // eof fieldcontainer

									]
								} // eof address
								, {
									xtype : 'fieldset',
									title : 'Contact info',
									items : [ {
										xtype : 'container',
										layout : 'hbox',
										Align : 'top',
										items : [ {
											xtype : 'container',
											flex : .3,
											defaults : {
												width : 230
											},
											defaultType : 'textfield',
											items : [ {
												fieldLabel : 'Home',
												name : 'homephone',
												emptyText : 'xxx-xxx-xxxx',
												maskRe : /[\d\-]/
											}, {
												fieldLabel : 'Business',
												name : 'businessphone',
												emptyText : 'xxx-xxx-xxxx',
												maskRe : /[\d\-]/
											}, {
												fieldLabel : 'Mobile',
												name : 'mobilephone',
												emptyText : 'xxx-xxx-xxxx',
												maskRe : /[\d\-]/
											}, {
												fieldLabel : 'Fax',
												name : 'faxphone',
												emptyText : 'xxx-xxx-xxxx',
												maskRe : /[\d\-]/
											}, {
												fieldLabel : 'Primary Email',
												vtype : 'email',
												name : 'primaryemail',
												allowBlank : true
											} ]
										}, {
											xtype : 'container',
											flex : 1,
											items : [ {
												xtype : 'radio',
												checked : true,
												boxLabel : 'Preferred',
												name : 'prefcontactmethod',
												inputValue : '0',
												style : {
													width : '95%',
													marginBottom : '10px'
												}

											}, {
												xtype : 'radio',
												boxLabel : 'Preferred',
												name : 'prefcontactmethod',
												inputValue : '1',
												style : {
													width : '95%',
													marginBottom : '9px'
												}

											}, {
												xtype : 'radio',
												boxLabel : 'Preferred',
												name : 'prefcontactmethod',
												inputValue : '2',
												style : {
													width : '95%',
													marginBottom : '9px'
												}

											}, {
												xtype : 'radio',
												boxLabel : 'Preferred',
												name : 'prefcontactmethod',
												inputValue : '3',
												style : {
													width : '95%',
													marginBottom : '9px'
												}
											}, {
												xtype : 'radio',
												boxLabel : 'Preferred',
												name : 'prefcontactmethod',
												inputValue : '4'
											} ]
										} ]
									} ]
								} ];
						this.items = [
								// Basic information=Card number 0
								{
									xtype : 'form',
									url : 'index.php/editallpatients/submitform',
									autoScroll : true,
									id : 'generalprofilebasicinformation'
											+ this.getId(),
									// Reset and Submit buttons
									buttons : [
											{
												text : 'Reset',
												handler : function() {
													this.up('form').getForm()
															.reset();
												}
											},
											{
												text : 'Apply',
												formBind : true, // only
												// enabled
												// once the
												// form is
												// valid
												disabled : true,
												handler : function() {
													var form = this.up('form')
															.getForm();
													if (form.isValid()) {
														form
																.submit({
																	success : function(
																			form,
																			action) {
																		Ext.Msg
																				.alert(
																						'Success',
																						action.result.msg);
																	},
																	failure : function(
																			form,
																			action) {
																		Ext.Msg
																				.alert(
																						'Failed',
																						action.result.msg);
																	}
																});
													}
												}
											} ],
									items : [ card_0, card_1 ]
								},
								{
									id : 'medicalprofileoverview'
											+ this.getId(),
									html : 'hjghjgjhg'
								} ];
						this.callParent(arguments);
					}
				});
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
Ext
		.define(
				'app.view.microviews.container.PrimaryPatientInformation',
				{
					extend : 'Ext.container.Container',
					alias : 'widget.primarypatientinformation',
					layout : 'auto',
					autoScroll:true,
					addressCounter:function(incr) {
						if (typeof this.no === "undefined") {
							this.no = 0;
						} else {
							this.no = this.no + 1;
						}
						//console.log(this.no);
						return this;
					},
					construct:function(){this.addressCounter();},
					initComponent : function() {
						// load patientProfile store which is belonged to the
						// current form
						/*	var patientProfile = Ext.getStore(
								'PatientProfile' + this.getId().substring(11)
										+ 'Store').getAt('0');

						// Only load patient`s real photo if
						// already exists in data store
						if (!patientProfile.get('profilephoto')) {
							var profilePhoto = './assets/icons/patient/profile.png';
						} else {
							var profilePhoto = './documents/patients/'
									+ patientProfile.get('userid')
									+ '/images/profile/'
									+ patientProfile.get('profilephoto');
						}*/
						//var counter = new addressCounter();
					this.items = [{
						xtype : 'fieldset',
						title : 'Primary Information',
						items : [ {
							xtype : 'container',
							layout : 'hbox',
							items : [
										{
											xtype : 'container',
											flex : 1,
											items : [ {
												xtype : 'textfield',
												name : 'firstname',
												fieldLabel : 'First Name',
												msgTarget : 'side',
												allowBlank : false
											}, {
												xtype : 'textfield',
												flex : .4,
												name : 'middlename',
												fieldLabel : 'Middle Name'
											}, {
												xtype : 'textfield',
												name : 'lastname',
												msgTarget : 'side',
												fieldLabel : 'Last Name',
												allowBlank : false
											} ]
										},
										{
											xtype : 'container',
											flex : 1,
											items : [
													{
														xtype : 'datefield',
														fieldLabel : 'Birthdate',
														name : 'birthdate',
														maxValue : new Date(), // limited
														// to
														// the
														// current
														// date or prior
														format : 'Y-m-d'

													},
													{
														xtype : 'combo',
														name : 'sex',
														fieldLabel : 'Sex',
														store : 'Se',
														queryMode : 'local',
														displayField : 'name',
														valueField : 'id',
														typeAhead : true,
														forceSelection : true
													},
													{
														xtype : 'combo',
														name : 'maritalstatus',
														fieldLabel : 'Marital Status',
														store : 'MarriageStatus',
														queryMode : 'local',
														displayField : 'name',
														valueField : 'id',
														typeAhead : true,
														forceSelection : true
													},
													{
														xtype : 'combo',
														name : 'language',
														fieldLabel : 'Language',
														store : Ext
																.create('MA.store.Languages'),
														queryMode : 'local',
														displayField : 'name',
														valueField : 'id',
														typeAhead : true,
														forceSelection : true
													}, {
														xtype : 'combo',
														name : 'race',
														fieldLabel : 'Race',
														store : 'Race',
														queryMode : 'local',
														displayField : 'name',
														valueField : 'id',
														typeAhead : true,
														forceSelection : true
													} ]
										},
										{
											xtype : 'container',
											flex : 1,
											items : [
													{
														xtype : 'textfield',
														fieldLabel : 'Social security #',
														name : 'socialsecurity'
													},
													{
														xtype : 'textfield',
														fieldLabel : 'Primary Care Doctor',
														name : 'primarydoctor',
														disabled:true
													},
													{
														xtype : 'numberfield',
														fieldLabel : 'Patient Code',
														// Remove spinner buttons,
														// and arrow key and mouse
														// wheel listeners
														hideTrigger : true,
														keyNavEnabled : false,
														mouseWheelEnabled : false,
														allowBlank : true,
														maxValue : 999999999,
														minValue : 100000000,
														emptyText : 'Leave empty',
														name : 'userid'
													},
													{
														xtype : 'textfield',
														fieldLabel : 'User name',
														name : 'userid'
													},
													{
														xtype : 'textfield',
														fieldLabel : 'Password',
														inputType : 'password',
														id : 'password',
														name : 'patientpassword',
														minLength : 6,
														maxLength : 32,
														minLengthText : 'Password must be at least 6 characters long.',
														maxLengthText : 'Maximum Password length is 36 characters.',
														disabled : true
													} ]
										},
										{
											xtype : 'container',
											flex : 1,
											items : [
													{
														xtype : 'container',
														html : '<div><img src="'
																+// profilePhoto
																+ '"  /></div>'
													}, {
														xtype : 'filefield',
														// fieldLabel : 'Photo',
														id : 'newPic',
														name : 'profilephoto',
														inputType : 'file',
														buttonOnly : true
													} ]
										}]
					}  ]
				},{
					title : 'Address',
					id : this.getId().substring(15)
							+ 'paddress',
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
									id : this.getId()
											.substring(15)
											+ 'addpaddress',
									cls : 'add-icon',
									tooltip : 'Add a new address',
									scope : this,
									handler : function() {
										// this.no =
										// this.no + 1;
										this.addressCounter();
										Ext
												.getCmp(
														this
																.getId()
																.substring(
																		15)
																+ 'paddress')
												.add(
														[
																{
																	xtype : 'combo',
																	store : 'AddressType',
																	displayField : 'name',
																	valueField : 'id',
																	fieldLabel : 'Address Type',
																	id : this
																			.getId()
																			.substring(
																					15)
																			+ 'addresstype'
																			+ this.no,
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
																	id : this
																			.getId()
																			.substring(
																					15)
																			+ 'zip'
																			+ this.no
																},
																{
																	fieldLabel : 'Address 1',
																	name : "paddress[address1][]",
																	id : this
																			.getId()
																			.substring(
																					15)
																			+ 'address1'
																			+ this.no
																},
																{
																	fieldLabel : 'Address 2',
																	name : "paddress[address2][]",
																	id : this
																			.getId()
																			.substring(
																					15)
																			+ 'address2'
																			+ this.no
																},
																{
																	fieldLabel : 'City',
																	name : "paddress[city][]",
																	id : this
																			.getId()
																			.substring(
																					15)
																			+ 'city'
																			+ this.no
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
																	id : this
																			.getId()
																			.substring(
																					15)
																			+ 'state'
																			+ this.no
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
																	id : this
																			.getId()
																			.substring(
																					15)
																			+ 'country'
																			+ this.no
																} // eof
																// countries;
																,
																Ext
																		.getCmp(this
																				.getId()
																				.substring(
																						15)
																				+ 'addpaddress'),
																{
																	xtype : 'button',
																	cls : 'delete-icon',
																	tooltip : 'Remove Address',
																	id : this
																			.getId()
																			.substring(
																					15)
																			+ 'removeaddress'
																			+ this.no,
																	scope : this,
																	handler : function(
																			thisButton,
																			eventObject) {

																		var activeRemoveButtonId = thisButton
																				.getId()
																				.split(
																						'removeaddress')[1];
																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.remove(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'address1'
																								+ activeRemoveButtonId);
																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.remove(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'address2'
																								+ activeRemoveButtonId);
																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.remove(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'city'
																								+ activeRemoveButtonId);
																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.remove(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'state'
																								+ activeRemoveButtonId);
																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.remove(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'country'
																								+ activeRemoveButtonId);
																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.remove(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'removeaddress'
																								+ activeRemoveButtonId);
																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.remove(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'addresstype'
																								+ activeRemoveButtonId);
																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.remove(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'zip'
																								+ activeRemoveButtonId);

																		Ext
																				.getCmp(
																						this
																								.getId()
																								.substring(
																										15)
																								+ 'paddress')
																				.doLayout();
																	}
																} ]);
										Ext
												.getCmp(
														this
																.getId()
																.substring(
																		15)
																+ 'paddress')
												.doLayout();

									}// eof function
								}, // eof Add button
						]
					// eof items
					} // eof fieldcontainer

					]
				} // eof address
				,{
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
				} //eod contacts
				]
					this.callParent(arguments);
					}})
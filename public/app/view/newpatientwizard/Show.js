Ext
		.define(
				'MA.view.newpatientwizard.Show',
				{
					extend : 'Ext.window.Window',
					requires : [ 'Ext.form.Panel',
							'Ext.layout.container.Column',
							'Ext.form.field.HtmlEditor', 'Ext.form.FieldSet',
							'Ext.form.field.Date', 'Ext.form.RadioGroup',
							'Ext.form.field.ComboBox', 'Ext.form.field.Radio' ],
					alias : 'widget.newpatientwizardshow',
					id : 'newpatientwizardshow',
					title : 'New Patient Registration Wizard',
					layout : 'fit',
					initComponent : function() {
						var cardNav = function(incr) {
							// Returns total count of pages created on our
							// wizard.
							var itemsCount = Ext.getCmp('card-wizard-panel').items
									.getCount();
							var prevItem = Ext.getCmp('card-wizard-panel').items
									.indexOf(Ext.getCmp('card-wizard-panel')
											.getLayout().activeItem);
							/*
							 * The parseInt global function has two arguments: a
							 * required numeric string, and an optional radix
							 * (base). If the radix is not provided, it’s
							 * assumed to be 10, for decimal.
							 */
							var activeItem = parseInt(prevItem, 10) + incr;
							console.log(activeItem);
							Ext.getCmp('card-wizard-panel').getLayout()
									.setActiveItem(activeItem);
							// Ext.Msg.alert('active
							// item:'+activeItem,'itemsCount:'+itemsCount);
							if (activeItem !== 0) {
								// Ext.getCmp('card-prev').enable();
								Ext.getCmp('card-prev').show();
							} else {
								// Ext.getCmp('card-prev').disable();
								Ext.getCmp('card-prev').hide();
							}
							var onClickSubmit = function() {
								// Ext.getCmp('card-wizard-panel').el.mask('Please
								// wait','x-mask-loading');
								Ext
										.getCmp('card-wizard-panel')
										.getForm()
										.submit(
												{
													url : 'index.php/newpatientwizard/submitform',
													method : 'POST',
													fileUpload : true,
													submitEmptyText : false,
													// waitMsg : 'Saving data',
													success : function(form,
															action) {
														// Ext.getCmp('card-wizard-panel').el.unmask();
														Ext.Msg
																.alert({
																	title : 'Success',
																	icon : Ext.window.MessageBox.INFO,
																	msg : "Patient data saved successfully"
																});
														Ext
																.getCmp(
																		'newpatientwizardshow')
																.destroy();

														// TODO:addautoclosefunctionality
														// so when success,close
														// the window and
														// destroyit.//Ext.getCmp('MA.view.newpatientwizard.Show').destroy();
													},
													failure : function(form,
															action) {
														// Ext.getCmp('card-wizard-panel').el.unmask();
														switch (action.failureType) {
														case Ext.form.Action.CLIENT_INVALID:
															Ext.Msg
																	.alert(
																			'Failure',
																			'Form fields may not be submitted with invalid values');
															break;
														case Ext.form.Action.CONNECT_FAILURE:
															Ext.Msg
																	.alert(
																			'Failure',
																			'Ajax communication failed');
															break;
														case Ext.form.action.Action.LOAD_FAILURE:
															Ext.Msg
																	.alert(
																			'Failure',
																			'Load Failure');
															break;
														case Ext.form.Action.SERVER_INVALID:
															Ext.Msg
																	.alert(
																			'Server Failure',
																			action.result.msg);
														} // eof
														// switch
													} // eof
												// failure
												}); // eof
								// submit
								// url
							}
							// itemsCount counts items from 1 but activeItem is
							// from 0.
							if (activeItem == itemsCount - 1) {
								Ext.getCmp('card-next').setText(
										'Finish &raquo;');
								Ext.getCmp('card-next').addListener('click',
										onClickSubmit);
							} // eof if
							else {
								Ext.getCmp('card-next').setText('Next &raquo;');
								// remove onClickSubmit when user is not on the
								// last page
								if (Ext.getCmp('card-next')
										.hasListener('click')) {
									/*
									 * Ext.getCmp('card-next').removeListener('click',onClickSubmit);
									 * and Ext.getCmp('card-next').un('click');
									 * recommended method in forum was:
									 * 
									 * function foo(){console.log("click");};
									 * Ext.getBody().on("click", foo);
									 * Ext.getBody().un("click", foo); didn`t
									 * work. using alternate method:
									 */
									Ext.getCmp('card-next').events['click']
											.clearListeners();
									/*
									 * If a function expects no arguments, you
									 * still need the parentheses:
									 * functionName(); Also, if a function
									 * returns a value, you can use that
									 * function call wherever you would use any
									 * other text or numeric value. For
									 * instance, you can assign the value to a
									 * variable: var variableName =
									 * functionName();
									 */
								} // eof if
							} // eof else
						}
						/*
						 * ================ CardLayout config (Wizard)
						 * =======================
						 */
						// ////////////////CARD0////////////////
						var card_0_userpass_username = {
							xtype : 'textfield',
							fieldLabel : 'User name',
							name : 'patientusername'
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
						var card_0_userpass_email = {
							xtype : 'textfield',
							fieldLabel : 'Primary Email',
							vtype : 'email',
							name : 'primaryemail',
							msgTarget : 'under',
							allowBlank : true
						};
						var card_0_userpass_name = {
							xtype : 'fieldcontainer',
							layout : {
								type : 'hbox',
								defaultMargins : {
									top : 0,
									right : 5,
									bottom : 0,
									left : 0
								}
							},
							fieldLabel : 'Name',
							items : [ {
								xtype : 'textfield',
								flex : 1,
								name : 'firstname',
								emptyText : 'First',
								msgTarget : 'under',
								allowBlank : false
							}, {
								xtype : 'textfield',
								flex : .4,
								name : 'middlename',
								emptyText : 'Middle'
							}, {
								xtype : 'textfield',
								flex : 1,
								name : 'lastname',
								msgTarget : 'under',
								emptyText : 'Last',
								allowBlank : false
							} ]
						};
						var card_0_userpass = {
							xtype : 'fieldset',
							title : 'Patient Login Data',
							defaults : {
								allowBlank : false
							},
							items : [ card_0_userpass_name,
									card_0_userpass_email ]
						};
						var card_0_sex = {
							xtype : 'radiogroup',
							fieldLabel : "Sex",
							id : 'sex',
							items : [ {
								boxLabel : 'Female',
								name : 'sex',
								inputValue : '0'
							}, {
								boxLabel : 'Male',
								name : 'sex',
								inputValue : '1'
							}, {
								boxLabel : 'Ambigous',
								name : 'sex',
								inputValue : '2'
							} ]
						};
						var card_0_birthdate = {
							xtype : 'datefield',
							fieldLabel : 'Birthdate',
							name : 'birthdate',
							maxValue : new Date(), // limited to the current
							// date or prior
							format : 'Y-m-d'

						};
						var card_0_photo = {
							xtype : 'textfield',
							fieldLabel : 'profile photo',
							name : 'profilephoto',
							inputType : 'file'
						};
						var card_0_socialsecnumber = {
							xtype : 'textfield',
							fieldLabel : 'Social security #',
							name : 'socialsecurity'
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
							forceSelection : true
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
							forceSelection : true
						};
						var card_0_language = {
							xtype : 'combo',
							name : 'language',
							fieldLabel : 'Language',
							store : Ext.create('MA.store.Language'),
							queryMode : 'local',
							displayField : 'name',
							valueField : 'id',
							typeAhead : true,
							forceSelection : true
						};
						var card_0_primary_care_doctor = {
							xtype : 'textfield',
							fieldLabel : 'Primary Care Doctor',
							name : 'primarydoctor'
						};
						var card_0 = {
							id : 'card-0',
							html : '<h1>Welcome to the New Patient Wizard!</h1><p>Step 1 of 4</p><p>Please click the "Next" button to continue...</p>',
							title : 'Step 1',
							items : [
									{
										xtype : 'fieldset',
										defaults : {
											anchor : '100%',
											labelStyle : 'padding-left:4px;'
										},
										title : 'Primary Information',
										items : [ {
											layout : 'column',
											border : false,
											items : [
													{
														columnWidth : '.5',
														border : false,
														items : [ {
															layout : 'anchor',
															border : false,
															defaults : {
																anchor : '65%',
																labelStyle : 'padding-left:4px;'
															},
															items : [
																	card_0_birthdate,
																	card_0_sex,
																	card_0_marital_status,
																	card_0_language,
																	card_0_race ]
														} ]
													},
													{
														columnWidth : '.5',
														border : false,
														items : [ {
															layout : 'anchor',
															border : false,
															defaults : {
																anchor : '65%',
																labelStyle : 'padding-left:4px;'
															},
															items : [
																	card_0_photo,
																	card_0_socialsecnumber,
																	card_0_primary_care_doctor ]
														} ]
													} ]
										} ]
									}, {
										border : false,
										items : [ card_0_userpass ]
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
						var card_1_address_address1 = {
							fieldLabel : 'Address 1',
							name : 'address1',
							id : 'address1' + counter.no
						};

						var card_1_address_address2 = {
							fieldLabel : 'Address 2',
							name : 'address2',
							id : 'address2' + counter.no
						};

						var card_1_address_city = {
							fieldLabel : 'City',
							name : 'city',
							id : 'city' + counter.no
						// TODO:add default city,state and country
						// to
						// user settings form and then load default
						// value here.
						// ,value: 'Ext JS'
						};
						var card_1_address_state = {
							fieldLabel : 'State',
							name : 'state',
							id : 'state' + counter.no
						};

						var removeButton = {
							xtype : 'button',
							text : 'Remove address',
							handler : function() {
							}
						};

						var card_1_address_country = {
							xtype : 'combo',
							store : 'Countries',
							displayField : 'name',
							valueField : 'iso',
							forceSelection : true,
							fieldLabel : 'Country',
							typeAhead : true,
							queryMode : 'local',
							id : 'country' + counter.no
						}; // eof countries;

						var card_1_address = {
							xtype : 'tabpanel',
							plain : true,
							activeTab : 0,
							height : 300,
							/*
							 * By turning off deferred rendering we are
							 * guaranteeing that the form fields within tabs
							 * that are not activated will still be rendered.
							 * This is often important when creating
							 * multi-tabbed forms.
							 */
							deferredRender : false,
							defaults : {
								bodyStyle : 'padding:10px'
							},
							items : [
									{
										title : 'Addresses',
										id : 'patientaddress',
										autoScroll : true,
										defaultType : 'textfield',
										labelAlign : 'right',
										items : [ {
											xtype : 'fieldcontainer',
											// combineErrors : true,
											msgTarget : 'side',
											items : [
													{
														xtype : 'button',
														text : 'Add address ',
														id : 'addaddress',
														handler : function() {
															counter.no = counter.no + 1;
															console
																	.log(counter.no);
															Ext
																	.getCmp(
																			'patientaddress')
																	.add(
																			[
																					{
																						xtype : 'combo',
																						store : 'AddressType',
																						displayField : 'name',
																						valueField : 'name',
																						fieldLabel : 'Address Type',
																						id : 'addresstype'
																								+ counter.no,
																						name : "Patientaddress[addresstype][]",
																						value : 'Home'
																					},
																					{
																						fieldLabel : 'zip',
																						width : 160,
																						maxLength : 10,
																						enforceMaxLength : true,
																						maskRe : /[\d\-]/,
																						regex : /^\d{5}(\-\d{4})?$/,
																						regexText : 'Must be in the format xxxxx or xxxxx-xxxx',
																						name : "Patientaddress[zip][]",
																						id : 'zip'
																								+ counter.no
																					},
																					{
																						fieldLabel : 'Address 1',
																						name : "Patientaddress[address1][]",
																						id : 'address1'
																								+ counter.no
																					},
																					{
																						fieldLabel : 'Address 2',
																						name : "Patientaddress[address2][]",
																						id : 'address2'
																								+ counter.no
																					},
																					{
																						fieldLabel : 'City',
																						name : "Patientaddress[city][]",
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
																						name : "Patientaddress[state][]",
																						id : 'state'
																								+ counter.no
																					},
																					{
																						xtype : 'combo',
																						store : 'Countries',
																						displayField : 'name',
																						valueField : 'iso',
																						forceSelection : true,
																						fieldLabel : 'Country',
																						typeAhead : true,
																						queryMode : 'local',
																						name : "Patientaddress[country][]",
																						id : 'country'
																								+ counter.no
																					} // eof
																					// countries;
																					,
																					Ext
																							.getCmp('addaddress'),
																					{
																						xtype : 'button',
																						text : 'Remove address',
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
																											'patientaddress')
																									.remove(
																											'address1'
																													+ activeRemoveButtonId);
																							Ext
																									.getCmp(
																											'patientaddress')
																									.remove(
																											'address2'
																													+ activeRemoveButtonId);
																							Ext
																									.getCmp(
																											'patientaddress')
																									.remove(
																											'city'
																													+ activeRemoveButtonId);
																							Ext
																									.getCmp(
																											'patientaddress')
																									.remove(
																											'state'
																													+ activeRemoveButtonId);
																							Ext
																									.getCmp(
																											'patientaddress')
																									.remove(
																											'country'
																													+ activeRemoveButtonId);
																							Ext
																									.getCmp(
																											'patientaddress')
																									.remove(
																											'removeaddress'
																													+ activeRemoveButtonId);
																							Ext
																									.getCmp(
																											'patientaddress')
																									.remove(
																											'addresstype'
																													+ activeRemoveButtonId);
																							Ext
																									.getCmp(
																											'patientaddress')
																									.remove(
																											'zip'
																													+ activeRemoveButtonId);

																							Ext
																									.getCmp(
																											'patientaddress')
																									.doLayout();
																						}
																					} ]);
															Ext
																	.getCmp(
																			'patientaddress')
																	.doLayout();

														}// eof function
													}, // eof Add button
											]
										// eof items
										} // eof fieldcontainer

										]
									} // eof address
									, {
										title : 'Phone Numbers',
										// layout : 'form',
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
										} ]
									}, {
										cls : 'x-plain',
										title : 'Biography',
										layout : 'fit',
										items : {
											xtype : 'htmleditor',
											id : 'bio2',
											fieldLabel : 'Biography',
											name : 'bio2'
										}
									} ]
						};
						// ////////////////CARD2////////////////

						// ////////////////CARD3////////////////
						var card_1 = {
							id : 'card-1',
							html : '<p>Step 2 of 4</p><p>Almost there.  Please click the "Next" button to continue...</p>',
							items : [ card_1_address ]
						};

						var card_2 = {
							id : 'card-2',
							html : '<p>Step 3 of 4</p><p> Please enter patient insurance data and the click the "Next" button to continue...</p>'
						};

						var card_3 = {
							id : 'card-3',
							html : '<h1>Congratulations!</h1><p>Step 4 of 4 - Complete.add this tick: View newly created patient profile.</p>'
						// ,
						// items : [ {} ]
						};

						this.items = [ {
							xtype : 'form',
							layout : 'card',
							id : 'card-wizard-panel',
							activeItem : 0,
							bodyStyle : 'padding:25px',
							defaults : {
								xtype : "container",
								border : false
							},
							bbar : [
									'->',
									{
										id : 'card-prev',
										text : '&laquo; Previous',
										handler : Ext.Function.bind(cardNav,
												this, [ -1 ]),
										hidden : true
									},
									{
										id : 'card-next',
										text : 'Next &raquo;',
										handler : Ext.Function.bind(cardNav,
												this, [ 1 ])
									} ] // ef bbar
							,
							items : [ card_0, card_1, card_2, card_3 ]
						} // eof form
						]; // eof this.items
						this.maximized = true;
						this.callParent(arguments);
					}
				});
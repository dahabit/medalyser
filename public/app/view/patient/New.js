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
				'MA.view.patient.New',
				{
					extend : 'Ext.window.Window',
					requires : [ 'Ext.form.Panel',
							'Ext.layout.container.Column',
							'Ext.form.field.HtmlEditor', 'Ext.form.FieldSet',
							'Ext.form.field.Date', 'Ext.form.RadioGroup',
							'Ext.form.field.ComboBox', 'Ext.form.field.Radio',
							'app.view.microviews.container.PatientBilling' ],
					alias : 'widget.newpatient',
					id : 'newpatient',
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
								function validateFileExtension(fileName) {
									var exp = /^.*\.(jpg|JPG|png|PNG|gif|GIF)$/;
									return exp.test(fileName);
								}
								  if
								  (!validateFileExtension(Ext.getCmp('newPic').value)) {
								  Ext.MessageBox .alert('Change Picture', 'Only Photos with JPG GIF or PNG extension are supported.'); return; }
									var wizardPanel = Ext.getCmp(
									'card-wizard-panel').getForm();
								wizardPanel
										.submit({
											url : 'index.php/newpatientwizard/submitform',
											method : 'POST',
											fileUpload : true,
											submitEmptyText : false,
											// waitMsg : 'Saving data',
											success : function(form, action) {
												// Ext.getCmp('card-wizard-panel').el.unmask();
												Ext
														.create(
																'widget.uxNotification',
																{
																	corner : 'br',
																	manager : 'demo2panel1',
																	cls : 'ux-notification-light',
																	iconCls : 'ux-notification-icon-information',
																	closable : false,
																	title : '',
																	html : 'Patient data saved to the database successfully.',
																	slideInDelay : 800,
																	slideDownDelay : 1500,
																	autoDestroyDelay : 4000,
																	slideInAnimation : 'elasticIn',
																	slideDownAnimation : 'elasticIn'
																}).show();
// Reload Patient store to reflect changes to the store
												Ext.getStore('Patients').removeAll();
												Ext.getStore('Patients').load({
												    scope   : this,
												    callback: function(records, operation, success) {
												    }});
												Ext.getCmp('newpatient')
														.destroy();

											},
											failure : function(form, action) {
												// Ext.getCmp('card-wizard-panel').el.unmask();
												switch (action.failureType) {
												case Ext.form.Action.CLIENT_INVALID:
													Ext.Msg
															.alert('Failure',
																	'Form fields may not be submitted with invalid values');
													break;
												case Ext.form.Action.CONNECT_FAILURE:
													Ext.Msg
															.alert('Failure',
																	'Ajax communication failed');
													break;
												case Ext.form.action.Action.LOAD_FAILURE:
													Ext.Msg.alert('Failure',
															'Load Failure');
													break;
												case Ext.form.Action.SERVER_INVALID:
													Ext.Msg.alert(
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
						var card_0 = {
							xtype : 'primarypatientinformation',
							id : 'card-0',
							html : '<p>Step 1 of 4</p><p>Please click the "Next" button to continue...</p>',
							title : 'Step 1'
						};// eof CARD 0

						// ////////////////CARD1////////////////

					
						// ////////////////CARD2////////////////
						var card_1_billing = {
							xtype : 'patientbilling'
						};
						var card_1_billing0 = {
							layout : 'fit',
							items : [ {
								xtype : 'fieldset',
								items : []
							}, {
								xtype : 'fieldset',
								items : []
							}, ]
						};
						// ////////////////CARD3////////////////
						var card_1 = {
							id : 'card-1',
							html : '<p>Step 3 of 4</p><p> Enter patient\'s primary insurance and billing data and then click  "Next" to continue...</p>',
							items : [ card_1_billing ]
						};

						var card_2 = {
							id : 'card-2',
							html : '<p>Step 3 of 4</p><p> click  "Next" to continue...</p>',
							items : []
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
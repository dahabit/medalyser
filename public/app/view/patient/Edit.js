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
				'MA.view.patient.Edit',
				{
					extend : 'Ext.container.Container',
					alias : 'widget.EditPatient',
					requires : [ 'app.view.microviews.container.PrimaryPatientInformation' ],
					layout : 'border',
					// stateId : 'state.EditPatient',
					getStore : function(fieldName) {
						return Ext.getStore(
								'PatientProfile' + this.getId().substring(11)
										+ 'Store').getAt('0').get(fieldName);
					},
					getAge : function(decorate) {
						// Do not calculate age if age is null.
						if (Ext.getStore(
								'PatientProfile' + this.getId().substring(11)
										+ 'Store').getAt('0').get('birthdate') == null) {
							return '';
						}
						// load current patient's store's birthdate
						var birthDate = Ext.getStore(
								'PatientProfile' + this.getId().substring(11)
										+ 'Store').getAt('0').get('birthdate').date
								.substring(0, 10);
						// var age = Ext.getCmp('age-id');
						var currentTime = new Date();
						var cmonth = Ext.Date.format(currentTime, 'm');
						var cdate = Ext.Date.format(currentTime, 'd');
						var cyear = Ext.Date.format(currentTime, 'Y');
						// var parseddate = Date.parse(birthDate,
						// 'Y-m-d');
						parseBirthDate = new Date(birthDate);
						var month = Ext.Date.format(parseBirthDate, 'm') - 1;

						var date = Ext.Date.format(parseBirthDate, 'd');
						var year = Ext.Date.format(parseBirthDate, 'Y');
						var theYear = cyear - year;
						var theMonth = cmonth - month;
						var theDate = cdate - date;
						if (cmonth == 0 || cmonth == 2 || cmonth == 4
								|| cmonth == 6 || cmonth == 7 || cmonth == 9
								|| cmonth == 11)
							days = 31;
						if (cmonth == 3 || cmonth == 5 || cmonth == 8
								|| cmonth == 10)
							days = 30;
						if (cmonth == 1)
							days = 28;

						if (month < cmonth && date > cdate) {
							theYear = theYear + 1;
						} else if (month > cmonth && date <= cdate) {
							theYear = theYear - 1;
							theMonth = ((12 - -(theMonth)) + 1);
						} else if (month > cmonth && date > cdate) {
							theMonth = ((12 - -(theMonth)));
						}
						if (date < cdate) {
							theDate = theDate;
						} else if (date == cdate) {
							theDate = 0;
						} else {
							theYear = theYear - 1;
						}
						// Do not add ' Y, ' if decorate is false
						if (decorate = false) {
							return theYear;
						} else {
							return theYear + ' Y,  ';
						}

					},
					getSex : function(decorate) {
						var sexStore = Ext.getStore(
								'PatientProfile' + this.getId().substring(11)
										+ 'Store').getAt('0').get('sex');
						switch (sexStore) {

						case 0:
							var sex = 'Female';

							break;
						case 1:
							var sex = 'Male';
							break;
						case 2:
							var sex = 'Ambigous';
							break;
						case null:
							var sex = '';
							return sex;
							break;
						}// Do not add ' , ' decoration if decorate
						// is false
						if (decorate = false) {
							return sex;
						} else {
							return sex + '   ,   ';
						}

					},
					initComponent : function() {
						var profilePhoto = '';
						var patientSummaryTag = {
							xtype : 'container',
							html : '<div style="background-color:#FFC;border-bottom:dotted;border-bottom:dotted; border-bottom-color:#666;border-right:dotted;border-right:dotted; border-right-color:#666; padding-bottom:10px"><div style="float:left;margin-right:10px"><img  id="pic" src="'
									+ profilePhoto
									+ '"  /></div><div style="font-family:Geneva;float:left;margin-top:15px;margin-left:5px;margin-right:50px;color:#66AB16; font-size: medium">'
									+ this.getStore('firstname')
									+ ' '
									+ this.getStore('middlename')
									+ ' '
									+ this.getStore('lastname')
									+ '</div><div style="padding-top:10px;font-family: cursive;color:#929292; font-size: small">'
									+ this.getAge()
									+ this.getSex()
									+ 'Patient Id:'
									+ this.getStore('userid')
									+ '</div></div>',
							width : 900
						};
						this.items = [
								{
									layout : 'card',
									collapsible : false,
									region : 'center',
									margins : '5 0 0 0',
									items : [
											// Basic information=Card number 0
											{
												xtype : 'form',
												url : 'index.php/editallpatients/submitform',
												autoScroll : true,
												trackResetOnLoad : true,
												id : 'generalprofilebasicinformation'
														+ this.getId(),
												// Reset and Submit buttons
												buttons : [
														{
															text : 'Reset',
															id : 'generalprofilebasicinformationresetbutton'
																	+ this
																			.getId(),
																			disabled : true,
															handler : function() {
																this
																		.up(
																				'form')
																		.getForm()
																		.reset();
															}
														},
														{
															text : 'Apply',
															id : 'generalprofilebasicinformationapplybutton'
																	+ this
																			.getId(),
															formBind : true, // only
															// enabled
															// once the
															// form is
															// valid
															disabled : true,
															handler : function() {
																var form = this
																		.up(
																				'form')
																		.getForm();
																if (form
																		.isValid()) {
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
												items : [ {
													xtype : 'primarypatientinformation'
												} ]
											},
											{
												id : 'medicalprofileoverview'
														+ this.getId(),
												items : [ patientSummaryTag ]
											} ]
								},
								{
									xtype : 'EditPatientTree',
									id : 'EditPatientTree'
											+ this.getId().substring(11),
									region : 'west',
									margins : '5 0 0 0',
									cmargins : '5 5 0 0',
									width : 150,
									minSize : 100,
									maxSize : 150,
									title : 'Manage Patient',
									collapsible : true,
								} ];
						this.callParent(arguments);
					}
				});
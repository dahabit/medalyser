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
				'MA.view.settings.Edit',
				{
					extend : 'Ext.window.Window',
					requires : [],
					alias : 'widget.settingsEdit',
					title : 'Settings panel',
					id : 'settingseditpanel',
					layout : 'fit',
					width : 800,
					height : 520,
					closable : true,
					initComponent : function() {
						// photo upload and display:
						var picBox = {
							columnWidth : '100 px',
							bodyStyle : 'padding:10px',
							items : [ {
								xtype : 'box',
								autoEl : {
									tag : 'div',
									html : '<img id="pic" src="" class="img-contact" />'
								}
							} ]
						};
						this.items = [ {
							xtype : 'form',
							id : 'adminsettingsedit',
							frame : true,
							items : [ {
								xtype : 'tabpanel',
								plain : true,
								activeTab : 0,
								defaults : {
									bodyStyle : 'padding:10px'
								},
								items : [
										{
											title : 'Practice Information',
											frame : true,

											defaults : {
												width : 300
											},
											defaultType : 'textfield',

											items : [
													{
														xtype : 'hiddenfield',
														name : 'personaldetails[userid]',
														value : '',
														allowBlank : false
													},
													picBox/*
															 * , { xtype:
															 * 'textfield',
															 * fieldLabel:
															 * 'Current',
															 * labelSeparator:
															 * '', name:
															 * 'personaldetails[currPic]',
															 * id:'currPic',
															 * readOnly: true,
															 * disabled:true,
															 * anchor:'100%' }
															 */,
													{
														xtype : 'textfield',
														fieldLabel : 'Profile photo',
														labelSeparator : '',
														name : 'personaldetails[newPic]',
														id : 'newPic',
														style : 'width: 300px',
														inputType : 'file',
														allowBlank : false
													},
													{
														xtype : 'datefield',
														fieldLabel : 'Birthdate',
														name : 'personaldetails[birthdate]',
														maxValue : new Date(), // limited
														// to
														// the
														// current
														// date or prior
														format : 'Y-m-d'

													},
													{
														xtype : 'radiogroup',
														fieldLabel : "Sex",
														id : 'sex',
														items : [
																{
																	boxLabel : 'Female',
																	name : 'personaldetails[sex]',
																	inputValue : '0'
																},
																{
																	boxLabel : 'Male',
																	name : 'personaldetails[sex]',
																	inputValue : '1'
																} ]
													},
													{
														xtype : 'textfield',
														fieldLabel : 'Social security #',
														name : 'socialsecurity'
													},
													{
														xtype : 'textfield',
														flex : 1,
														name : 'personaldetails[firstname]',
														emptyText : 'First',
														msgTarget : 'under',
														allowBlank : false
													},
													{
														xtype : 'textfield',
														flex : .4,
														name : 'personaldetails[middlename]',
														emptyText : 'Middle'
													},
													{
														xtype : 'textfield',
														flex : 1,
														name : 'personaldetails[lastname]',
														msgTarget : 'under',
														emptyText : 'Last',
														allowBlank : false
													},
													{
														xtype : 'textfield',
														inputType : 'password',
														fieldLabel : 'Password',
														name : 'personaldetails[password]',
														minLength : 6,
														maxLength : 32,
														minLengthText : 'Password must be at least 6 characters long.',
														maxLengthText : 'Maximum Password length is 36 characters.',
														msgTarget : 'under'

													},
													{
														xtype : 'textfield',
														fieldLabel : 'Email',
														name : 'personaldetails[email]',
														vtype : 'email',
														allowBlank : false,
														value : 'sdf',
														msgTarget : 'under'
													},
													{
														xtype : 'combo',
														name : 'personaldetails[language]',
														fieldLabel : 'Language',
														mode : 'local',
														store : 'Language',
														displayField : 'name',
														valueField : 'id',
														value : 'sdfsdf',
														queryMode : 'local',
														forceSelection : true,
														typeAhead : true,
														msgTarget : 'under'
													},
													{
														xtype : 'combo',
														name : 'personaldetails[country]',
														fieldLabel : 'Country',
														mode : 'local',
														store : 'Countries',
														displayField : 'name',
														valueField : 'id',
														value : 'sdfsdf',
														queryMode : 'local',
														typeAhead : true,
														forceSelection : true,
														msgTarget : 'under'
													} ]
										},
										{
											title : 'Appearance',
											frame : true,
											defaults : {
												width : 300
											},
											defaultType : 'textfield',

											items : [ {
												xtype : 'combo',
												name : 'Appearance[extjstemplate]',
												fieldLabel : 'Template',
												mode : 'local',
												store : 'ExtjsTemplate',
												displayField : 'name',
												valueField : 'id',
												value : '0',
												queryMode : 'local',
												typeAhead : true,
												forceSelection : true,
												msgTarget : 'under'
											} ]

										} ]
							} ],
							buttons : [
									{
										text : 'Save',
										handler : function() {
											// TODO:validation is not working
											// correctly.rejects valid file
											// types.
											function validateFileExtension(
													fileName) {
												var exp = /^.*\.(jpg|JPG|png|PNG|gif|GIF)$/;
												return exp.test(fileName);
											}
											var settingsForm = Ext.getCmp(
													'adminsettingsedit')
													.getForm();
											if (!validateFileExtension(Ext
													.getDom('newPic').value)) {
												Ext.MessageBox
														.alert(
																'Change Picture',
																'Only Photos with JPG GIF or PNG extension are supported.');
												return;
											}
											settingsForm
													.submit({
														url : 'index.php/account/adminsettingsedit',
														method : 'POST',
														fileUpload : true,
														submitEmptyText : false,
														// waitMsg :
														// 'Saving
														// data',

														success : function(
																form, action) {
															// Show a dialog
															// using config
															// options:
															Ext.Msg
																	.show({
																		title : 'Make changes?',
																		msg : 'You will need to re sign in to make changes in effect. Would you like to save your changes?',
																		buttons : Ext.Msg.YESNO,
																		fn : function(
																				btn,
																				text) {
																			if (btn == 'YES') {
																				window.location = './account/logout';
																			}
																		},
																		animateTarget : 'elId',
																		icon : Ext.window.MessageBox.QUESTION
																	});
														},
														failure : function(
																form, action) {
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
										}
									},
									{
										text : 'Cancel',
										handler : function() {
											Ext.getCmp('settingseditpanel')
													.destroy();

										}
									} ]
						} ];
						this.callParent(arguments);
					}

				});
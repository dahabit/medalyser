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
				'MA.view.maintoolbar.List',
				{
					extend : 'Ext.toolbar.Toolbar',
					requires : [ 'Ext.container.ButtonGroup',
							'Ext.layout.container.Table', 'Ext.button.Split' ],
					alias : 'widget.maintoolbarlist',
					id : 'maintoolbarlist',
					currTime : function() {
						var date=new Date();
						var date=Ext.Date.format(date, 'l, F j, Y h:i:s');
						return date;
					},
					realTime:function(){
						var task = {
							    run: function(){
							    	var date=new Date();
									var date=Ext.Date.format(date, 'l, F j, Y h:i:s');
							    	Ext.fly('clock').update(date);
							    	
							    },
							    interval: 1000 //1 second
							};
							Ext.TaskManager.start(task);
						
					},
					initComponent : function() {
						this.items = [
								{
									xtype : 'buttongroup',
									// title : '',
									columns : 2,
									items : [ {
										xtype : 'button',
										text : null,
										iconCls : 'icon-startbutton',
										width : 64,
										height : 64,
										menu : {
											xtype : 'menu',
											items : [
													{
														xtype : 'menuitem',
														text : 'Settings',
														handler : function() {
															Ext
																	.create(
																			'MA.view.settings.Edit')
																	.show();
														}
													},
													{
														xtype : 'menuitem',
														text : 'Logout',
														handler : function() {
															Ext.Ajax
																	.request({
																		url : './account/logout',
																		success : function() {
																			window.location = './account/login';
																		},
																		failure : function() {
																			window.location = './account/login';
																		}
																	});
														}
													} ]
										}
									} ]
								},
								{
									xtype : 'tabpanel',
									activeTab : 1,
									height : 100,
									width : 600,
									border : false,
									defaults : {
										border : false
									},
									items : [
											{
												xtype : 'panel',
												title : 'Home',
												tbar : {
													xtype : 'toolbar',
													items : [
															{
																xtype : 'splitbutton',
																text : 'New',
																menu : {
																	xtype : 'menu',
																	items : [
																			{
																				xtype : 'menuitem',
																				text : 'Patient'
																			},
																			{
																				xtype : 'menuitem',
																				text : 'Visit'
																			},
																			{
																				xtype : 'menuitem',
																				text : 'Appointment'
																			} ]
																}
															},
															{
																xtype : 'buttongroup',
																title : 'Buttons',
																columns : 2,
																items : [
																		{
																			xtype : 'button',
																			text : 'Button 1'
																		},
																		{
																			xtype : 'button',
																			text : 'Button 2'
																		} ]
															},
															{
																xtype : 'buttongroup',
																title : 'Buttons',
																columns : 2,
																items : [
																		{
																			xtype : 'button',
																			text : 'Button 1',
																			handler : function() {
																			}
																		},
																		{
																			xtype : 'button',
																			text : 'Button 2'
																		} ]
															} ]
												}
											},
											{
												xtype : 'panel',
												title : 'Patient',
												tbar : {
													xtype : 'toolbar',
													height : 87,
													items : [
															{
																xtype : 'buttongroup',
																title : 'Profile',
																columns : 2,
																items : [
																		{
																			xtype : 'button',
																			text : 'New patient',
																			handler : function() {
																				Ext
																						.create(
																								'MA.view.newpatientwizard.Show')
																						.show();
																			}
																		},
																		{
																			xtype : 'button',
																			text : 'View all patients',
																			handler : function() {
																				Ext
																						.getCmp(
																								'centertabpanel')
																						.setActiveTab(
																								'ViewAllPatients');
																			}
																		} ]
															},
															{
																xtype : 'buttongroup',
																title : 'Appointments',
																columns : 2,
																items : [
																		{
																			xtype : 'button',
																			text : 'New appointment'
																		},
																		{
																			xtype : 'button',
																			text : 'View all appointments'
																		} ]
															},
															{
																xtype : 'buttongroup',
																title : 'Medical records',
																columns : 2,
																items : [
																		{
																			xtype : 'button',
																			text : 'Physical exams'
																		},
																		{
																			xtype : 'splitbutton',
																			text : 'ParaClinic',
																			menu : {
																				xtype : 'menu',
																				items : [
																						{
																							xtype : 'menuitem',
																							text : 'Laboratory'
																						},
																						{
																							xtype : 'menuitem',
																							text : 'Imaging'
																						},
																						{
																							xtype : 'menuitem',
																							text : 'Menu Item'
																						} ]
																			}
																		},
																		{
																			xtype : 'button',
																			text : 'View all records'
																		} ]
															} ]
												}
											} ]
								},
								{
									xtype : 'container',
									height : 100,
									width : 500,
									layout : {
										align : 'stretch',
										type : 'vbox'
									},
									items : [
											{
												xtype : 'container',
												height : 100,
												width : 500,
												layout : {
													align : 'stretch',
													type : 'hbox'
												},
												flex : 1,
												items : [
														{
															xtype : 'container',
															width : 250
														},
														{
															xtype : 'container',
															html : '<div style="float:left;margin-right:10px"><img  id="pic" src="./images/admin/profile/6939.jpg" width="30" height="40" /></div><div style="margin-top:3px;margin-left:50px"><h5>Welcome Dr.Kate smith</h5></div><div  style="color:#333" id="clock">'+this.realTime()+'</div>',
															width : 250
														} ]
											}, {
												xtype : 'container',
												height : 120,
												html : '',
												width : 400,
												flex : 1
											} ]
								} ];
						this.callParent(arguments);
					}

				});
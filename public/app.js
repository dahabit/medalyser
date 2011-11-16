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
		.application({
			name : 'MA',

			appFolder : 'app',
			requires : [ 'Ext.ux.TabScrollerMenu' ],
			controllers : [ 'MainPanel', 'NewPatientWizard', 'History',
					'Settings', 'Patient' ],
			currTime : function() {
				var date = new Date();
				var date = Ext.Date.format(date, 'l, F j, Y h:i:s');
				return date;
			},
			realTime : function() {
				var task = {
					run : function() {
						var date = new Date();
						var date = Ext.Date.format(date, 'l, F j, Y h:i:s');
						Ext.fly('clock').update(date);

					},
					interval : 1000
				// 1 second
				};
				Ext.TaskManager.start(task);

			},
			launch : function() {
				// console.log(Ext.getStore('AdminSettings'));
				// setup the state provider, all state information will be saved
				// to a cookie
				Ext.state.Manager.setProvider(Ext
						.create('Ext.state.CookieProvider'));
				Ext
						.create(
								'Ext.container.Viewport',
								{
									layout : 'border',
									items : [
											{
												region : 'north',
												xtype : 'maintoolbarlist',
												border : false,
												collapsible : true,
												id: 'region-north',
												margins : '5 0 5 0',
												split : true/*,
												placeholder: Ext.create('Ext.panel.Panel', {
													  height: 5,
													  listeners: {
													    mouseover : {
													      element : 'el',
													      fn : function(){
													        //Expand the north region on mouseover
													        Ext.getCmp('region-north').expand();
													      }
													    }
													  }
													}),
													
												  preventHeader: true,
												  listeners: {
												    mouseleave: {
												      element: 'el',
												      fn: function() {
												       Ext.getCmp('region-north').collapse();
												      }
												    }
												  }*/
											},
											{
												region : 'west',
												xtype : 'mainpaneltree',
												collapsible : true,
												title : 'Navigation',
												width : 150,
												collapsed : true,
												stateId : 'stateWest',
												border : false

											// could use a TreePanel or
											// AccordionLayout for
											// navigational items
											},
											{
												region : 'center',
												xtype : 'tabpanel',
												activeTab : 1,
												id : 'centertabpanel',
												enableTabScroll : true,
												resizeTabs : true,
												plugins : [
														{
															ptype : 'tabscrollermenu',
															maxText : 15,
															pageSize : 5
														},
														Ext
																.create(
																		'Ext.ux.TabCloseMenu',
																		{
																			extraItemsTail : [
																					'-',
																					{
																						text : 'Closable',
																						checked : true,
																						hideOnClick : true,
																						handler : function(
																								item) {
																							currentItem.tab
																									.setClosable(item.checked);
																						}
																					} ],
																			listeners : {
																				aftermenu : function() {
																					currentItem = null;
																				},
																				beforemenu : function(
																						menu,
																						item) {
																					var menuitem = menu
																							.child('*[text="Closable"]');
																					currentItem = item;
																					menuitem
																							.setChecked(item.closable);
																				}
																			}
																		}) ],
												items : [ {
													xtype:'PatientsOverview'
												} /*
													 * , { xtype :
													 * 'ViewAllPatients' }
													 */]
											} ]
								});
				Ext.Ajax
						.request({
							url : './account/getadminstores',
							callback : function(options, success, response) {
								var json = Ext.decode(response.responseText);
								var adminStores = new Array();
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
										storeId : key1,
										data : json[key1]
									});
									Ext.create('MA.store.' + key1);
									// adminStores.push(Ext.create('MA.store.' +
									// key1));
									// console.log(storeFields);
									// xxx=new MA.store.AdminSettings();
									// console.log(key1);
								}
								;
								Ext
										.onReady(function() {
											Ext.getCmp('centertabpanel').add({
												xtype : 'ViewAllPatients'
											});
											Ext.getCmp('centertabpanel')
													.doLayout();
											Ext.getCmp('centertabpanel')
													.setActiveTab(
															'ViewAllPatients');
											
											// render righttoolbar
											function realTime() {
												var task = {
													run : function() {
														var date = new Date();
														var date = Ext.Date
																.format(date,
																		'l, F j, Y h:i:s');
														Ext.fly('clock')
																.update(date);

													},
													interval : 1000
												// 1 second
												};
												Ext.TaskManager.start(task);

											}
											;
											// Only load dr`s real photo if
											// already exists in data store
											if (!Ext.getStore('AdminSettings')
													.getAt('0').get(
															'profilephoto')) {
												var profilePhoto = './assets/icons/admin/profile.png';
											} else {
												var profilePhoto = './documents/admins/'
														+ +Ext
																.getStore(
																		'AdminSettings')
																.getAt('0')
																.get('userid')
														+ '/images/profile/'
														+ Ext
																.getStore(
																		'AdminSettings')
																.getAt('0')
																.get(
																		'profilephoto');
											};
											Ext
													.getCmp('rightpanelbar1')
													.add(
															{
																xtype : 'container',
																html : '<div style="float:left;margin-right:10px"><img  id="pic" src="'
																		+ profilePhoto
																		+ '"  /></div><div style="margin-top:3px;margin-left:50px"><h5>Welcome  '
																		+ Ext
																				.getStore(
																						'AdminSettings')
																				.getAt(
																						'0')
																				.get(
																						'firstname')
																		+ ' '
																		+ Ext
																				.getStore(
																						'AdminSettings')
																				.getAt(
																						'0')
																				.get(
																						'middlename')
																		+ ' '
																		+ Ext
																				.getStore(
																						'AdminSettings')
																				.getAt(
																						'0')
																				.get(
																						'lastname')
																		+ '</h5></div><div  style="color:#333" id="clock">'
																		+ realTime()
																		+ '</div>',
																width : 250
															});
											Ext.getCmp('rightpanelbar1')
													.doLayout();
											   //Remove loading panel and display viewport
										      var loading = Ext.get('x-loading-panel');
										      var mask = Ext.get('x-loading-mask');
										      loading.hide();
										      mask.hide();
										});

							}
						});

			}
		});
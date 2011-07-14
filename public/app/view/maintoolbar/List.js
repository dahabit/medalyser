Ext.define('MA.view.maintoolbar.List', {
    extend: 'Ext.toolbar.Toolbar',
    requires: ['Ext.container.ButtonGroup','Ext.layout.container.Table','Ext.button.Split'],
    	alias : 'widget.maintoolbarlist',
    		width: 900,
    initComponent: function() {
    this.items = [
                  {
                      xtype: 'buttongroup',
                      title: '',
                      columns: 2,
                      items: [
                          {
          xtype: 'button',
          text: '',
          icon: '',
          iconCls: 'startbutton',
          width: 64,
          height: 64,
          id: 'startbutton',
          menu: {
              xtype: 'menu',
              items: [
                  {
                      xtype: 'menuitem',
                      text: 'Settings',
                      handler: function(){
      	            	userSettingsWindow.show();
      		            }
                  },
                  {
                      xtype: 'menuitem',
                      text: 'Logout'
                  }
              ]
          }
      }
                      ]
                  },
                  {
                      xtype: 'tabpanel',
                      activeTab: 1,
                      height: 100,
                      border: false,
                      items: [
                          {
                              xtype: 'panel',
                              title: 'Home',
                              tbar: {
                                  xtype: 'toolbar',
                                  items: [
                                      {
                                          xtype: 'splitbutton',
                                          text: 'New',
                                          menu: {
                                              xtype: 'menu',
                                              items: [
                                                  {
                                                      xtype: 'menuitem',
                                                      text: 'Patient'
                                                  },
                                                  {
                                                      xtype: 'menuitem',
                                                      text: 'Visit'
                                                  },
                                                  {
                                                      xtype: 'menuitem',
                                                      text: 'Appointment'
                                                  }
                                              ]
                                          }
                                      },
                                      {
                                          xtype: 'buttongroup',
                                          title: 'Buttons',
                                          columns: 2,
                                          items: [
                                              {
                                                  xtype: 'button',
                                                  text: 'Button 1'
                                              },
                                              {
                                                  xtype: 'button',
                                                  text: 'Button 2'
                                              }
                                          ]
                                      },
                                      {
                                          xtype: 'buttongroup',
                                          title: 'Buttons',
                                          columns: 2,
                                          items: [
                                              {
                                                  xtype: 'button',
                                                  text: 'Button 1'
                                              },
                                              {
                                                  xtype: 'button',
                                                  text: 'Button 2'
                                              }
                                          ]
                                      }
                                  ]
                              }
                          },
                          {
                              xtype: 'panel',
                              title: 'Patient',
                              tbar: {
                                  xtype: 'toolbar',
                                  height: 87,
                                  items: [
                                      {
                                          xtype: 'buttongroup',
                                          title: 'Profile',
                                          columns: 2,
                                          items: [
                                              {
                                                  xtype: 'button',
                                                  text: 'New patient',
                                                  handler: function(){
                                                	  Ext.create('MA.view.newpatientwizard.Show').show();
      		            }
                                              },
                                              {
                                                  xtype: 'button',
                                                  text: 'View all patients'
                                              }
                                          ]
                                      },
                                      {
                                          xtype: 'buttongroup',
                                          title: 'Appointments',
                                          columns: 2,
                                          items: [
                                              {
                                                  xtype: 'button',
                                                  text: 'New appointment'
                                              },
                                              {
                                                  xtype: 'button',
                                                  text: 'View all appointments'
                                              }
                                          ]
                                      },
                                      {
                                          xtype: 'buttongroup',
                                          title: 'Medical records',
                                          columns: 2,
                                          items: [
                                              {
                                                  xtype: 'button',
                                                  text: 'Physical exams'
                                              },
                                              {
                                                  xtype: 'splitbutton',
                                                  text: 'ParaClinic',
                                                  menu: {
                                                      xtype: 'menu',
                                                      items: [
                                                          {
                                                              xtype: 'menuitem',
                                                              text: 'Laboratory'
                                                          },
                                                          {
                                                              xtype: 'menuitem',
                                                              text: 'Imaging'
                                                          },
                                                          {
                                                              xtype: 'menuitem',
                                                              text: 'Menu Item'
                                                          }
                                                      ]
                                                  }
                                              },
                                              {
                                                  xtype: 'button',
                                                  text: 'View all records'
                                              }
                                          ]
                                      }
                                  ]
                              }
                          },
                          {
                              xtype: 'panel',
                              title: 'Tab 3',
                              headerAsText: false
                          }
                      ]
                  }
              ];
    this.callParent(arguments);
          }
    	
});
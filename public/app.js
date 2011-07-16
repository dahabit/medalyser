Ext.application({
	name : 'MA',

	appFolder : 'app',

	controllers : ['MainToolbar', 'NewPatientWizard', 'History'],
	launch : function() {
		Ext.create('Ext.container.Viewport', {
			layout : 'border',
			items : [{
						xtype : 'maintoolbarlist',
						region : 'north',
						autoHeight : true,
						border : false,
						collapsible : true,
						margins : '0 0 5 0'
					}, {
						region : 'west',
						collapsible : true,
						title : 'Navigation',
						width : 150,
						collapsed : true
						// could use a TreePanel or AccordionLayout for
						// navigational items
				}	, {
						region : 'center',
						xtype : 'tabpanel', // TabPanel itself has no title
						activeTab : 0, // First tab active by default
						items : {
							title : 'Dashboard',
							html : 'The first tab\'s content. Others may be added dynamically'
						}
					}]
		});
	}
});
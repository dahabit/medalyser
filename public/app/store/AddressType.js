Ext.define('MA.store.AddressType', {
			extend : 'Ext.data.Store',
			// model:'NewPatientWizard',
			fields : ['name'],
			data : [{
						name : 'Home'
					}, {
						name : 'Work'
					}, {

						name : 'School'
					}]
		});
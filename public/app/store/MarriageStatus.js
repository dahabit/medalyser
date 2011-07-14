Ext.define('MA.store.MarriageStatus', {
			extend : 'Ext.data.Store',
			// model:'NewPatientWizard',
			fields : [{
				name : 'id'
			}, {
				name : 'name'
			}],
			data : [{
						id : '0',
						name : 'Single'
					}, {
						id : '1',
						name : 'Married'
					}, {

						id : '2',
						name : 'Divorced'
					}, {
						id : '3',
						name : 'Separated'
					}, {
						id : '4',
						name : 'Widow'
					}, {
						id : '5',
						name : 'Widower'
					}]
		});
Ext.define('MA.store.Race', {
	extend : 'Ext.data.Store',
	// model:'NewPatientWizard',
	fields : [ {
		name : 'id'
	}, {
		name : 'name'
	} ],
	data : [ {
		'id' : 0,
		name : 'Asian'
	}, {
		'id' : 1,
		name : 'American Indian'
	}, {
		'id' : 2,
		name : 'Black'
	}, {
		'id' : 3,
		name : 'Caucasian'
	}, {
		'id' : 4,
		name : 'Hispanic'
	}, {
		'id' : 5,
		name : 'Pacific Islander'
	}, {
		'id' : 6,
		name : 'Other'
	} ]
});
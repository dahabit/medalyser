Ext.define('MA.controller.NewPatientWizard', {
    extend: 'Ext.app.Controller',

    stores: ['MarriageStatus','Countries','AddressType','Race','Language'],

   // models: ['NewPatientWizard'],

    views: ['newpatientwizard.Show']

 /*   ,refs: [
        {
            ref: 'usersPanel',
            selector: 'panel'
        }
    ],*/

});
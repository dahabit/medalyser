Ext.define('MA.controller.NewPatientWizard', {
    extend: 'Ext.app.Controller',

    stores: ['MarriageStatus','Countries','AddressType','Race'],

   // models: ['NewPatientWizard'],

    views: ['newpatientwizard.Show']

 /*   ,refs: [
        {
            ref: 'usersPanel',
            selector: 'panel'
        }
    ],*/

});
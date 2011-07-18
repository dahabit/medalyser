Ext.define('MA.store.Language', {
extend : 'Ext.data.Store',
fields : [ {
    name : 'id'
}, {
    name : 'name'
} ],
data : [ {
    "aa" : "Afar",
    "ab" : "Abkhazian",
    "ace" : "Achinese",
    "ach" : "Acoli",
    "ada" : "Adangme",
    "ady" : "Adyghe",
    "ae" : "Avestan",
    "af" : "Afrikaans",
    "afa" : "Afro-Asiatic Language",
    "afh" : "Afrihili",
    "ain" : "Ainu",
    "ak" : "Akan"
} ],

read : function() {
 var me = this; 
 var oldData = me.getProxy().data[0];
 var data = [];
 for (var prop in oldData) {
    if (oldData.hasOwnProperty(prop)) {
    	data.push({
    	    id: prop,
    	    value: oldData[prop]
    	  });
    }
 } 
 me.loadData(data);
}

});
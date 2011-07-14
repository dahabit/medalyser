/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('MA.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: ['Ext.layout.container.Border','Ext.tab.Panel' ],
    initComponent: function() {
    }
});
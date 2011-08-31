Ext.define('Ext.ux.Clock', {
	extend : 'Ext.Button',
	style: 'background-color:red',
	currTime : function() {
		var date=new Date();
		var date=Ext.Date.format(date, 'l, \\t\\he jS \\of F Y h:i:s A');
		return date;
	},
	alias: ['widget.ux_clock'],
	initComponent : function() {
		Ext.apply(this, {
			text : this.currTime(),
			cls : "x-btn-text-icon",
			icon : "clock.png" // Lick to a clock icon
		});
		Ext.ux.Clock.superclass.initComponent.apply(this, arguments);

		this.clock_updater = {
			run : this.update,
			scope : this,
			interval : 1000
		// 1 second
		}
		Ext.TaskManager.start(this.clock_updater);
	},
	update : function() {
		this.setText(this.currTime())
	}
});
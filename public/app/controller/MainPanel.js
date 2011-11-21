/**
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION;LOSS OF HEALTH IN ANY FORM) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * @version
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
Ext.define('MA.controller.MainPanel', {
	extend : 'Ext.app.Controller',

	// stores: ['Users'],

	models : [ 'MainToolbar' ],

	views : [ 'mainpanel.Toolbar', 'mainpanel.Tree' ],
	init : function() {
		this.control({
			'mainpaneltree' : {
				itemclick : this.selectPanel

			}
		});
		// if
		// (Ext.ClassManager.isCreated('MA.store.AdminSettings')){console.log('class
		// is created')}
		// Ext.create('MA.store.Patients',{storeId:'Patients'});
		// console.log(mystore);
		// Ext.data.StoreManager.register(mystore);
		// this.stores=
		// new MA.store.AdminSettings;
		// if
		// (Ext.ClassManager.isCreated('MA.store.AdminSettings')){console.log('class
		// is created')}else{console.log('class is undefined')}
		// console.log(Ext.getStore('AdminSettings'));
	}// eof init function
	,
	selectPanel : function(node, record, item, index, event) {
		
		// get current active tab's child id
		var currentCard=record.data.id+Ext.getCmp('centertabpanel').getActiveTab().id;
		//console.log(node.getId());
		Ext.getCmp('centertabpanel').getActiveTab().getLayout()
				.setActiveItem(currentCard);
		//TODO:if form contains unsubmitted values,display a warning to the user to save patient's data before leaving current tab
	},
	// get All the child elements or id of a Panel in Extjs 4
	getAllChilden : function(panel) {
		/*
		 * Get children of passed panel or an empty array if it doesn't have
		 * thems.
		 */
		var children = panel.items ? panel.items.items : [];
		/* For each child get their children and concatenate to result. */
		Ext.each(children, function(child) {
			children = children.concat(getAllChilden(child));
		});
		return children;
	},
	// This will return ids of children. USES PREVIOUS FUNTCION -
	// getAllChilden
	getAllChildenIds : function(panel) {
		/* Get all child items. */
		var children = getAllChilden(panel);
		/* Replace items with their ids. */
		for ( var i = 0, l = children.length; i < l; i++) {
			children[i] = children[i].getId();
		}
		return children;
	}
});
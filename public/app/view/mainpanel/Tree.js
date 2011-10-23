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
 * @author Mehdi Fanai
 * @copyright Copyright (C) 2011 Mehdi Fanai. All rights reserved.
 * @license GNU GPLv3 <http://www.gnu.org/licenses/gpl.html>
 * @link http://www.MedAlyser.com
 */
Ext.define('MA.view.mainpanel.Tree', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.mainpaneltree',
	id : 'mainpaneltree',
	title : 'Simple Tree',
	width : 150,
	store : Ext.create('Ext.data.TreeStore', {
		root : {
			expanded : true,
			children : [{
				text : "General Profile",
				expanded : true,
				children : [ {
					text : "Basic Information",
					leaf : true
				}]
			}, {
				text : "Medical Profile",
				expanded : true,
				children : [ {text:'Overview',leaf:true},{
					text : 'Histories',
					children: [{text:'Drug History',leaf:true},{text:'Family History',leaf:true},{text:'Past Medical History',leaf:true},{text:'Social History',leaf:true}]
				}, {//TODO:physical data should be created by sorted dates
					text : 'ROS & PH/E',
					children:[{text:'Overview',leaf:true}]
				},{
					text : 'Progress Notes',
					leaf : true
				}, {
					text : 'Fluid In/Out',
					leaf : true
				} , {
					text : 'Lab'
						//TODO:lab data should be loaded only if they already exist
				}  ]
			}]
		}
	}),
	 dockedItems: [{
         xtype: 'toolbar',
         items: [{
             text: 'Expand All',
             handler: function(){
            	 Ext.getCmp('mainpaneltree').expandAll();
             }
         }, {
             text: 'Collapse All',
             handler: function(){
                 Ext.getCmp('mainpaneltree').collapseAll();
             }
         }]
     }],
	rootVisible : false,
	initComponent : function() {
		// this.items = [];
		this.callParent(arguments);
	}
});
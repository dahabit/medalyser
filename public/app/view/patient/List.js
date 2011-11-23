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
Ext
		.define(
				'MA.view.patient.List',
				{
					extend : 'Ext.grid.Panel',
					alias : 'widget.ListPatients',
					id : 'ListPatients',
					// requires : [],
					title : 'All Patients',
					plugins : [ Ext.create('Ext.ux.grid.HeaderFilter'),
							'headertooltip' ],
					/*
					 * dockedItems : [ { xtype : 'toolbar', dock : 'top', items : [ {
					 * text : 'Docked to the top' } ] } ],
					 */
					stateId : 'state.ListPatients',
					getSex : function(sexStore) {
						switch (sexStore) {

						case 0:
							var sex = 'Female';

							break;
						case 1:
							var sex = 'Male';
							break;
						case 2:
							var sex = 'Ambigous';
							break;
						case null:
							var sex = '';
							break;
						}
						return sex;
					},
					initComponent : function() {
								Ext.apply(this, {
									store : 'Patients'
								}),

								this.columns = [
										{
											header : 'Patient Id',
											dataIndex : 'userid',
											flex : .5,
											filter : {
												xtype : 'numberfield',
												emptyText : 'ID...',
												minValue : 0,
												maxValue : 999999999, // Remove
												// spinner
												// buttons,
												// and
												// arrow key and mouse wheel
												// listeners
												hideTrigger : true,
												keyNavEnabled : false,
												mouseWheelEnabled : false
											}
										}/*
											 * , { header : 'Photo', dataIndex :
											 * 'profilephoto', flex : 1 }
											 */,
										{
											header : 'First',
											dataIndex : 'firstname',
											filter : {
												xtype : 'textfield',
												emptyText : 'First name...'
											}
										},
										{
											header : 'Middle',
											dataIndex : 'middlename',
											tooltip : 'Some tooltip',
											filter : {
												xtype : 'textfield',
												emptyText : 'Middle name...'
											}
										},
										{
											header : 'Last',
											dataIndex : 'lastname',
											filter : {
												xtype : 'textfield',
												emptyText : 'Last name...'
											}
										},
										{
											header : 'Birth Date & Time',
											dataIndex : 'birthdate',
											renderer : function(value) {
												if (value) {
													dt = Ext.Date.parse(
															value.date,
															"Y-m-d h:i:s");
													return Ext.Date.format(dt,
															'Y-m-d H:i:s')
												}
											},
											// renderer
											// :Ext.util.Format.dateRenderer('m/d/Y'),
											flex : 1,
											format : 'Y/m/d',
											filter : {
												xtype : 'textfield',
												emptyText : 'Date...'
											}
										},
										{
											header : 'Registeration Date & Time',
											dataIndex : 'created',
											renderer : function(value) {
												if (value) {
													dt = Ext.Date.parse(
															value.date,
															"Y-m-d h:i:s");
													return Ext.Date.format(dt,
															'Y-m-d H:i:s')
												}
											},
											flex : 1,
											filter : {
												xtype : 'datefield',
												emptyText : 'Date...'
											}
										},
										{
											header : 'SS#',
											dataIndex : 'socialsecurity',
											flex : 1,
											filter : {
												xtype : 'numberfield',
												emptyText : 'Social Sec#...',
												minValue : 0, // Remove
												// spinner
												// buttons, and
												// arrow key
												// and mouse wheel listeners
												hideTrigger : true,
												keyNavEnabled : false,
												mouseWheelEnabled : false
											}
										},
										{
											header : 'Sex',
											dataIndex : 'sex',
											flex : 1,
											renderer : function(value) {
												return this.getSex(value);
											}
										},
										{
											header : 'Marital status',
											dataIndex : 'maritalstatus',
											hidden : true,
											flex : 1
										},
										{
											// TODO: remove preferred contact
											// method and
											// highlight preferred
											// contact phone number
											// automatically
											header : 'Email',
											dataIndex : 'primaryemail',
											renderer : function(value,
													metaData, record) {
												var prefcontactmethod = record
														.get('prefcontactmethod');
												if (prefcontactmethod == 4) {
													return '<div style="background-color:#f2e8da">'
															+ value + '</div>';
												} else {
													return value;
												}
											},
											filter : {
												xtype : 'textfield',
												emptyText : 'Email...'
											}
										},
										{
											header : 'Home',
											dataIndex : 'homephone',
											renderer : function(value,
													metaData, record) {
												var prefcontactmethod = record
														.get('prefcontactmethod');
												if (prefcontactmethod == 0) {
													return '<div style="background-color:#f2e8da">'
															+ value + '</div>';
												} else {
													return value;
												}
											},
											filter : {
												xtype : 'textfield',
												emptyText : 'xxx-xxx-xxxx',
												maskRe : /[\d\-]/
											}
										},
										{
											header : 'Business',
											dataIndex : 'businessphone',
											renderer : function(value,
													metaData, record) {
												var prefcontactmethod = record
														.get('prefcontactmethod');
												if (prefcontactmethod == 1) {
													return '<div style="background-color:#f2e8da">'
															+ value + '</div>';
												} else {
													return value;
												}
											},
											filter : {
												xtype : 'textfield',
												emptyText : 'xxx-xxx-xxxx',
												maskRe : /[\d\-]/
											}
										},
										{
											header : 'Mobile',
											dataIndex : 'mobilephone',
											renderer : function(value,
													metaData, record) {
												var prefcontactmethod = record
														.get('prefcontactmethod');
												if (prefcontactmethod == 2) {
													return '<div style="background-color:#f2e8da">'
															+ value + '</div>';
												} else {
													return value;
												}
											},
											filter : {
												xtype : 'textfield',
												emptyText : 'xxx-xxx-xxxx',
												maskRe : /[\d\-]/
											}
										},
										{
											header : 'Fax',
											dataIndex : 'faxphone',
											renderer : function(value,
													metaData, record) {
												var prefcontactmethod = record
														.get('prefcontactmethod');
												if (prefcontactmethod == 3) {
													return '<div style="background-color:#f2e8da">'
															+ value + '</div>';
												} else {
													return value;
												}
											},
											filter : {
												xtype : 'textfield',
												emptyText : 'xxx-xxx-xxxx',
												maskRe : /[\d\-]/
											}
										} ];

						this.callParent(arguments);

					}
				});
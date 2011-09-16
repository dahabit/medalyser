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
				'MA.view.patient.ViewAll',
				{
					extend : 'Ext.grid.Panel',
					alias : 'widget.ViewAllPatients',
					id : 'ViewAllPatients',
					// requires : [],
					title : 'All Patients',
					dockedItems : [ {
						xtype : 'toolbar',
						dock : 'top',
						items : [ {
							text : 'Docked to the top'
						} ]
					} ],
					stateId : 'state.ViewAllPatients',
					initComponent : function() {//new MA.store.Patients();
						patientsStore = Ext.create('MA.store.Patients');
						//patientsStore=Ext.data.StoreManager.lookup('Patients');
					this.store = patientsStore;
						Ext.apply(this, {
						    store: 'Patients'
							}),

						this.columns = [
								{
									header : 'Patient Id',
									dataIndex : 'a_userid',
									flex : .5
								}/*
									 * , { header : 'Photo', dataIndex :
									 * 'a_profilephoto', flex : 1 }
									 */,
								{
									header : 'Name',

									columns : [ {
										header : 'First',
										dataIndex : 'a_firstname'
									}, {
										header : 'Middle',
										dataIndex : 'a_middlename'
									}, {
										header : 'Last',
										dataIndex : 'a_lastname'
									} ]
								},
								{
									header : 'Birth Date & Time',
									dataIndex : 'a_birthdate',
									renderer : function(value) {
										if (value) {
											dt = Ext.Date.parse(value.date,
													"Y-m-d h:i:s");
											return Ext.Date.format(dt,
													'Y-m-d H:i:s')
										}
									},
									// renderer
									// :Ext.util.Format.dateRenderer('m/d/Y'),
									flex : 1
								},
								{
									header : 'Registeration Date & Time',
									dataIndex : 'a_created',
									renderer : function(value) {
										if (value) {
											dt = Ext.Date.parse(value.date,
													"Y-m-d h:i:s");
											return Ext.Date.format(dt,
													'Y-m-d H:i:s')
										}
									},
									flex : 1
								},
								{
									header : 'SS#',
									dataIndex : 'a_socialsecurity',
									flex : 1
								},
								{
									header : 'Sex',
									dataIndex : 'a_sex',
									flex : 1
								},
								{
									header : 'Marital status',
									dataIndex : 'a_maritalstatus',
									hidden : true,
									flex : 1
								},
								{
									// TODO: remove preferred contact method and
									// highlight preferred
									// contact phone number automatically
									header : 'Phone',
									columns : [
												{
										header : 'Email',
										dataIndex : 'a_primaryemail',
										renderer : function(value,
												metaData, record) {
											var prefcontactmethod = record
													.get('a_prefcontactmethod');
											if (prefcontactmethod == 4) {
												return '<div style="background-color:#f2e8da">'
														+ value
														+ '</div>';
											}else {return value;}
										}
									},
											{
												header : 'Home',
												dataIndex : 'a_homephone',
												renderer : function(value,
														metaData, record) {
													var prefcontactmethod = record
															.get('a_prefcontactmethod');
													if (prefcontactmethod == 0) {
														return '<div style="background-color:#f2e8da">'
																+ value
																+ '</div>';
													}else {return value;}
												}
											}, {
												header : 'Business',
												dataIndex : 'a_businessphone',
												renderer : function(value,
														metaData, record) {
													var prefcontactmethod = record
															.get('a_prefcontactmethod');
													if (prefcontactmethod == 1) {
														return '<div style="background-color:#f2e8da">'
																+ value
																+ '</div>';
													}else {return value;}
												}
											}, {
												header : 'Mobile',
												dataIndex : 'a_mobilephone',
												renderer : function(value,
														metaData, record) {
													var prefcontactmethod = record
															.get('a_prefcontactmethod');
													if (prefcontactmethod == 2) {
														return '<div style="background-color:#f2e8da">'
																+ value
																+ '</div>';
													}else {return value;}
												}
											}, {
												header : 'Fax',
												dataIndex : 'a_faxphone',
												renderer : function(value,
														metaData, record) {
													var prefcontactmethod = record
															.get('a_prefcontactmethod');
													if (prefcontactmethod == 3) {
														return '<div style="background-color:#f2e8da">'
																+ value
																+ '</div>';
													}else {return value;}
												}
											} ]
								} ];

						this.callParent(arguments);

					}
				});
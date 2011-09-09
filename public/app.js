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
Ext
		.application({
			name : 'MA',

			appFolder : 'app',

			controllers : [ 'MainToolbar', 'NewPatientWizard', 'History',
					'Settings', 'Patient' ],
			launch : function() {
				Ext.Ajax.request({
					url : './account/getadminstores',
					success : function(response) {
						var json = Ext.decode(response.responseText);
						var adminStores = new Array();
						// setup and intitialize on the fly stores
						for ( var key1 in json) {
							var storeFields = new Array();
							for ( var key2 in json[key1]) {// if (i==1){break;}
								// console.log(key2);
								for ( var key3 in json[key1][key2]) {
									storeFields.push(key3);
								}
								break;
							}
							;
							Ext.define('MA.store.' + key1, {
								extend : 'Ext.data.Store',
								fields : storeFields,
								data : json[key1]
							});
							// adminStores.push(Ext.create('MA.store.' + key1));
							console.log(storeFields);

						}
						;

					}
				});

				Ext
						.create(
								'Ext.container.Viewport',
								{
									layout : 'border',
									items : [
											{
												xtype : 'maintoolbarlist',
												region : 'north',
												autoHeight : true,
												border : false,
												collapsible : true,
												margins : '0 0 5 0'
											},
											{
												region : 'west',
												collapsible : true,
												title : 'Navigation',
												width : 150,
												collapsed : true
											// could use a TreePanel or
											// AccordionLayout for
											// navigational items
											},
											{
												region : 'center',
												xtype : 'tabpanel',
												activeTab : 1,
												id : 'centertabpanel',
												items : [
														{
															title : 'Overview',
															html : 'The first tab\'s content. Others may be added dynamically'
														},
														{
															xtype : 'ViewAllPatients'
														} ]
											} ]
								});
			}
		});
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

			controllers : [ 'MainToolbar', 'NewPatientWizard', 'History' ],
			launch : function() {
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
												xtype : 'tabpanel', // TabPanel
												// itself
												// has no
												// title
												activeTab : 0, // First tab
												// active by
												// default
												items : {
													title : 'Overview',
													html : 'The first tab\'s content. Others may be added dynamically'
												}
											} ]
								});
			}
		});
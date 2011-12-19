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
Ext.define('MA.store.Tree', {
	extend : 'Ext.data.TreeStore',
	root : {
		expanded : true,
		children : [ {
			text : "General Profile",
			expanded : true,
			children : [ {
				text : "Basic Information",
				leaf : true,
				id : 'generalprofilebasicinformation'
			},{
				text : "Insurance",
				leaf : true,
				id : 'generalprofileinsuranse'
			} ]
		}, {
			text : "Medical Profile",
			expanded : true,
			children : [ {
				text : 'Overview',
				leaf : true,
				id : 'medicalprofileoverview'
			}, {
				text : 'Histories',
				children : [ {
					text : 'Drug History',
					leaf : true,
					id : 'historiesdrughistory'
				}, {
					text : 'Family History',
					leaf : true,
					id : 'historiesfamilyhistory'
				}, {
					text : 'Past Medical History',
					leaf : true,
					id : 'historiespastmedical'
				}, {
					text : 'Social History',
					leaf : true,
					id : 'historiessocialhistory'
				} ]
			}, {// TODO:physical data should be created by sorted dates
				text : 'ROS & PH/E',
				children : [ {
					text : 'Overview',
					leaf : true,
					id : 'rosoverview'
				} ]
			}, {
				text : 'Progress Notes',
				leaf : true,
				id : 'rosprogressnotes'
			}, {
				text : 'Fluid In/Out',
				leaf : true,
				id : 'rosfluids'
			}, {
				text : 'Lab'
			// TODO:lab data should be loaded only if they already exist
			} ]
		} ]
	}
});
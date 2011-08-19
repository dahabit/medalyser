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
// TODO: add correct licensing fromextjs forum
Ext.define('Ext.ux.Notification', {
	extend : 'Ext.window.Window',
	initComponent : function() {
		NotificationMgr = {
			positions : []
		};
		Ext.apply(this, {
			iconCls : this.iconCls || 'icon-information',
			width : 200,
			autoHeight : true,
			closable : true,
			plain : false,
			draggable : false,
			bodyStyle : 'text-align:left;padding:10px;',
			resizable : false,
			shadow : false
		});
		if (this.autoDestroy) {
			this.task = new Ext.util.DelayedTask(this.close, this);
		} else {
			this.closable = true;
		}
		Ext.ux.Notification.superclass.initComponent.call(this);
	}

	,
	setMessage : function(msg) {
		this.body.update(msg);
	}

	,
	setTitle : function(title, iconCls) {
		Ext.ux.Notification.superclass.setTitle.call(this, title, iconCls
				|| this.iconCls);
	}

	,
	onRender : function(ct, position) {
		Ext.ux.Notification.superclass.onRender.call(this, ct, position);
	}

	,
	onDestroy : function() {
		NotificationMgr.positions.remove(this.pos);
		Notification.superclass.onDestroy.call(this);
	}

	,
	afterShow : function() {
		Ext.ux.Notification.superclass.afterShow.call(this);
		this.on('move', function() {
			NotificationMgr.positions.remove(this.pos);
			if (this.autoDestroy) {
				this.task.cancel();
			}
		}, this);
		if (this.autoDestroy) {
			this.task.delay(this.hideDelay || 5000);
		}
	}

	,
	animShow : function() {
		this.pos = 0;
		while (NotificationMgr.positions.indexOf(this.pos) > -1) {
			if (this.animateFrom === 'top') {
				this.pos--;
			} else {
				this.pos++;
			}
		}
		NotificationMgr.positions.push(this.pos);
		this.setSize(200, 100);
		this.el.alignTo(this.animateTarget || document,
				(this.animateFrom === 'top' ? 'tr-br' : 'br-tr'), [ -1,
						-1 - ((this.getSize().height + 10) * this.pos) ]);
		this.el.slideIn((this.animateFrom === 'top' ? 't' : 'b'), {
			duration : .7,
			callback : this.afterShow,
			scope : this
		});
	}

	,
	animHide : function() {
		NotificationMgr.positions.remove(this.pos);
		this.el.ghost((this.animateFrom === 'top' ? 't' : 'b'), {
			duration : 1,
			remove : true
		});
	}
});
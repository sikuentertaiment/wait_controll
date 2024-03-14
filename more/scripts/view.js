const view = {
	getDocument(){
		return Object.assign(document,toInject);
	},
	makeRoot(){
		return makeElement('div',{
			id:'root',
			innerHTML:'<div id=container></div>',
			onadded(){
				this.container = this.find('#container');
				console.log(this);
			}
		})
	},
	header(){
		return makeElement('header',{
			id:'header',
			innerHTML:`
				<div>Jago Antri</div>
			`,
		})
	},
	nav(){
		return makeElement('nav',{
			id:'nav',
			innerHTML:`
				<div class="item" id=scan style=border-left:none;>
					<img>
					<div>Scan QR</div>
				</div>
				<div class=item id=manual style=border-right:none;>
					<img>
					<div>Ambil Manual</div>
				</div>
			`,
			onadded(){
				this.initEventItem();
			},
			initEventItem(){
				this.items = this.findall('.item');
				this.items.forEach((item)=>{
					item.onclick = ()=>{
						this.controlls[item.id]();
					}
				})
			},
			controlls:{
				scan(){
					app.view.openScene();
				},
				manual(){
					app.view.openScene('manual');
				}
			}
		})
	},
	view(){
		return makeElement('div',{
			id:'view',
			innerHTML:`
				<div id=scan class=page>
					<div>Scan untuk melihat nomor!</div>
					<div id=qr style="
						background:whitesmoke;
						width:100%;
						height:100%;
						border:1px solid gainsboro;
						border-radius:10px;
					">
						<img src=./more/media/img.png>
					</div>
				</div>
				<div id=manual class=page>
					<div>Klik untuk ambil antrian!</div>
					<div id=getAntrian>Ambil Antrian</div>
					<div style=margin-top:10px;height:100%;>
						<div>Nomor Antrian Anda</div>
						<div style="
						background:whitesmoke;
						width:100%;
						height:90%;
						border:1px solid gainsboro;
						border-radius:10px;
						margin-top:10px;
						align-items:center;
						display:flex;
						font-size:72px;
						justify-content:center;
					">19</div>
					</div>
				</div>
			`,
			onadded(){
				this.findall('.page').forEach((page)=>{
					this[page.id] = page;
				})
				this.openScene();
			},
			openScene(scene='scan'){
				const toclose = scene === 'scan' ? 'manual' : 'scan';
				this[toclose].hide();
				this[scene].show('flex');
			}
		})
	}
}
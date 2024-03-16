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
				<div class="item" id=scan style="border-left:none;border-radius:10px 0 0 10px;">
					<img src=./more/media/scanicon.png>
					<div>Scan Qr</div>
				</div>
				<div class=item id=manual style="border-right:none;border-radius:0 10px 10px 0">
					<img src=./more/media/pushicon.png style=width:24px;height:24px;>
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
						background:white;
						width:100%;
						height:100%;
						border:1px solid gainsboro;
						border-radius:10px;
						display:flex;
						align-items:center;
						justify-content:center;
					">
						<img src="./more/media/initloading.gif" style="
						  object-fit: cover;
					    width: 32px;
					    height: 32px;
					    opacity:.2;
						">
						<img src="${app.getUrl()}" style="
						  object-fit: cover;
					    width: 300px;
					    height: 300px;
					    display:none;
						">
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
						font-size:84px;
						justify-content:center;
					">
						<img src="./more/media/initloading.gif" style="
						  object-fit: cover;
					    width: 32px;
					    height: 32px;
					    opacity:.2;
					    display:none;
						">
						<div id=numberdisplay>?</div>
					</div>
					</div>
				</div>
			`,
			onadded(){
				this.images = this.findall('img');
				this.getNumber = this.find('#getAntrian');
				this.numberDisplay = this.find('#numberdisplay');
				this.findall('.page').forEach((page)=>{
					this[page.id] = page;
				})
				this.openScene();
				this.generateImage();

				// working with get antrian button
				this.initGetAntrianButton();
			},
			openScene(scene='scan'){
				const toclose = scene === 'scan' ? 'manual' : 'scan';
				this[toclose].hide();
				this[scene].show('flex');
			},
			generateImage(){
				this.images[1].src = app.getUrl();
				this.images[1].onload = ()=>{
					this.images[0].hide();
					this.images[1].show();
				}
			},num:0,
			getPosition(){
				return new Promise((resolve,reject)=>{
					setTimeout(()=>{
						this.num += 1;
						this.numberDisplay.innerHTML = this.num;
						resolve();
					},1000)
				})
			},setNormal:true,
			initGetAntrianButton(){
				this.getNumber.onclick = async ()=>{
					if(!this.setNormal)
						return;
					this.setNormal = false;
					// show the loading, hide the number
					this.numberDisplay.hide();
					this.images[2].show();
					await this.getPosition();
					this.numberDisplay.show();
					this.images[2].hide();

					this.forceAwait();
				}
			},
			forceAwait(){
				setTimeout(()=>{
					this.numberDisplay.innerHTML = '?';
					this.setNormal = true;
				},2000);
			}
		})
	}
}
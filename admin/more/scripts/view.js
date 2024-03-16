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
					<img src=../more/media/homeicon.png style=width:24px;height:24px;>
				</div>
				<div class=item id=details style=border-radius:0;>
					<img src=../more/media/infoicon.png style=width:24px;height:24px;>
				</div>
				<div class=item id=settings style="border-right:none;border-radius:0 10px 10px 0">
					<img src=../more/media/settingsicon.png style=width:24px;height:24px;>
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
				details(){
					app.view.openScene('details');
				},
				settings(){
					app.view.openScene('settings');
				}
			}
		})
	},
	view(){
		return makeElement('div',{
			id:'view',
			innerHTML:`
				<div id=beranda class=page>
					<div>Klik untuk memanggil!</div>
					<div style=display:flex;gap:10px;>
						<div id=getAntrian style=display:flex;gap:10px;justify-content:center;align-items:center;width:100%;>
							<img src=../more/media/nexticon.png style=width:24px;height:24px;>
							<div>Antrian Selanjutnya</div>
						</div>
						<div id=getAntrian style=display:flex;gap:10px;justify-content:center;align-items:center;>
							<img src=../more/media/speakericon.png style=width:24px;height:24px;>
						</div>
					</div>
					<div style=margin-top:10px;height:100%;>
						<div>Antrian Selanjutnya</div>
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
							<img src="../more/media/initloading.gif" style="
							  object-fit: cover;
						    width: 32px;
						    height: 32px;
						    opacity:.2;
						    display:none;
							">
							<div id=numberdisplay>1</div>
						</div>
					</div>
				</div>
				<div id=details class=page>
					<div>Details Pengunjung</div>
				</div>
				<div id=settings class=page>
					<div>Pengaturan Antrian</div>
					<div>
						<div class=whitebutton style=display:flex;gap:10px;align-items:center;justify-content:center;>
							<img src=../more/media/saveicon.png style=width:32px;height:32px;>
							<div>Simpan Perubahan</div>
						</div>
					</div>
					<div class=flexcol>
						<div>Praktik Status</div>
						<div>
							<select>
								<option value=0>Tutup</option>
								<option value=1>Buka</option>
							</select>
						</div>
					</div>
					<div class=flexcol>
						<div>Text Panggilan</div>
						<div class=flex>
							<textarea placeholder="Masukan teks panggilan..."></textarea>
						</div>
					</div>
					<div class=flexcol>
						<div>Varian Suara Panggilan</div>
						<div>
							<select>
								<option value=0>Varian 1</option>
								<option value=1>Varian 2</option>
							</select>
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

				// working with get antrian button
				this.initGetAntrianButton();
			},
			openScene(scene='beranda'){
				const toclose = ['beranda','details','settings'];
				toclose.forEach((close)=>{
					if(close !== scene)
						this[close].hide();
				})
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
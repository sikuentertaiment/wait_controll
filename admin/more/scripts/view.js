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
						<div id=call class=whitebutton style=display:flex;gap:10px;justify-content:center;align-items:center;>
							<img src=../more/media/speakericon.png style=width:24px;height:24px;>
							<img src=../more/media/initloading.gif style=width:24px;height:24px;display:none;>
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
					<div>Informasi Pengunjung</div>
					<div class=whitebutton style="display:flex;flex-direction:column;align-items:flex-start;">
						<div>Total Pasien</div>
						<div class=boldfont>0</div>
					</div>
					<div class=whitebutton style="display:flex;flex-direction:column;align-items:flex-start;">
						<div>Pasien Selesai</div>
						<div class=boldfont>0</div>
					</div>
					<div class=whitebutton style="display:flex;flex-direction:column;align-items:flex-start;">
						<div>Pasien Menunggu</div>
						<div class=boldfont>0</div>
					</div>
					<div class=whitebutton style="display:flex;flex-direction:column;align-items:flex-start;">
						<div>Antrian Saat Ini</div>
						<div class=boldfont>0</div>
					</div>
					<div class=whitebutton style="display:flex;flex-direction:column;align-items:flex-start;">
						<div>Waktu Tunggu Rata2</div>
						<div class=boldfont>0</div>
					</div>
				</div>
				<div id=settings class=page>
					<div>Pengaturan Antrian</div>
					<div>
						<div id=savebutton class=whitebutton style=display:flex;gap:10px;align-items:center;justify-content:center;>
							<img src=../more/media/saveicon.png style=width:32px;height:32px;>
							<div>Simpan Perubahan</div>
						</div>
					</div>
					<div class=flexcol>
						<div>Praktik Status</div>
						<div>
							<select id=workingstatus>
								<option value=0>Tutup</option>
								<option value=1>Buka</option>
							</select>
						</div>
					</div>
					<div class=flexcol>
						<div>Text Panggilan</div>
						<div class=flex>
							<textarea placeholder="Masukan teks panggilan..." id=messagevalue spellcheck=false></textarea>
						</div>
					</div>
					<div class=flexcol>
						<div>Varian Suara Panggilan</div>
						<div>
							<select id=voicevarian>
								<option value=0>Varian Perempuan</option>
								<option value=1>Varian Laki-laki</option>
							</select>
						</div>
					</div>
				</div>
			`,
			onadded(){
				this.images = this.findall('img');
				this.getNumber = this.find('#getAntrian');
				this.numberDisplay = this.find('#numberdisplay');
				this.callbutton = this.find('#call');
				this.savebutton = this.find('#savebutton');
				this.findall('.page').forEach((page)=>{
					this[page.id] = page;
				})
				this.callbutton.onclick = ()=>{
					this.call();
				}
				this.savebutton.onclick = ()=>{
					this.saveData();
				}
				this.openScene();

				// working with get antrian button
				this.initGetAntrianButton();

				// force the init button
				this.initData();
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
						app.settings.variables.antrian += 1;
						this.numberDisplay.innerHTML = app.settings.variables.antrian;
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
					this.images[3].show();
					await this.getPosition();
					this.numberDisplay.show();
					this.images[3].hide();

					this.forceAwait();
				}
			},
			forceAwait(){
				setTimeout(()=>{
					this.setNormal = true;
				},2000);
			},
			call(){
				this.images[1].hide();
				this.images[2].show();
				app.callWaiter(()=>{
					this.images[1].show();
					this.images[2].hide();
				});
			},
			initData(){
				// working status
				this.workingstatusoptions = this.findall('#workingstatus option');
				this.workingstatusoptions.forEach((option,i)=>{
					if(i===app.settings.status){
						option.selected = true;
					}
				})
				// message value
				this.messagevalue = this.find('#messagevalue');
				this.messagevalue.value = app.settings.voiceMessage;
				// voice varian
				this.voicevarianoptions = this.findall('#voicevarian option');
				this.voicevarianoptions.forEach((option,i)=>{
					if(i===app.settings.varianIndex){
						option.selected = true;
					}
				})
			},
			saveData(){
				// working status
				app.settings.status = Number(this.find('#workingstatus').value);
				// message value
				app.settings.voiceMessage = this.find('#messagevalue').value;
				// voice varian
				app.settings.varianIndex = Number(this.find('#voicevarian').value);

				// force the notif
				app.forceNotif('Data berhasil disimpan!');
			}
		})
	},
	notificationBar(message){
		return makeElement('div',{
			style:`
				padding:10px;
				display:flex;
				align-items:center;
				justify-content:center;
				gap:10px;
				border:1px solid gainsboro;
				border-radius:10px;
				position:absolute;
				top:10px;
				right:10px;
				background:whitesmoke;
				z-index:2;
				cursor:pointer;
				font-weight:bold;
			`,
			innerHTML:`
				<img src=../more/media/infoicon.png style=width:24px;height:24px;>
				<div>${message}</div>
			`,
			onadded(){
				setTimeout(()=>{this.remove()},2000)
			}
		})
	}
}
const app = {
	doc:document.body,
	qrUrl:'https://sikuentertaiment.github.io/jagoantri/scan',
	getUrl(){
		return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${this.qrUrl}`
	},
	init(){
		console.log('app, i am awake!');
		this.addRoot();
		this.setupDisplay();

		if(responsiveVoice){
			this.speaker = responsiveVoice;
		}else{
			alert('Terjadi kesalahan saat memuat speaker, mohon reload kembali.');
		}
	},
	addRoot(){
		// adding root el to document
		this.root = view.makeRoot();
		this.doc.appendChild(this.root);
		this.root.onadded();
	},
	initHeader(){
		this.header = view.header();
		this.root.container.addChild(this.header);
	},
	initNav(){
		this.nav = view.nav();
		this.root.container.addChild(this.nav);
	},
	initView(){
		this.view = view.view();
		this.root.container.addChild(this.view);
	},
	setupDisplay(){
		// header
		this.initHeader();
		// nav
		this.initNav();
		// view
		this.initView();
	},
	settings:{
		varians:['Indonesian Female','Indonesian Male'],
		varianIndex:1,
		voiceMessage:'Nomor Antrian $antrian silahkan masuk!',
		status:1,
		onCall:false,
		variables:{
			antrian:1
		}
	},
	stringManipulation(src,data){
		// Antrian $antrian silahkan masuk!

		// algoritma
		// simply sepate it by space

		const words = src.split(' ');
		let strings = '';
		// looping the words, detect it's variable's or not.
		words.forEach((word)=>{
			if(word.indexOf('$') !== -1){
				strings += ` ${data[word.slice(1)]}`;
			}else
				strings += ` ${word}`;
		})

		return strings;
	},
	callWaiter(callback){
		if(this.settings.onCall)
			return
		// apply the variable
		const strings = this.stringManipulation(this.settings.voiceMessage,this.settings.variables);
		this.speaker.speak(strings,this.settings.varians[this.settings.varianIndex],{onend:()=>{this.settings.onCall = false;callback();}})
		this.settings.onCall = true;
	},
	forceNotif(message){
		this.root.container.addChild(view.notificationBar(message));
	}
}

app.init();
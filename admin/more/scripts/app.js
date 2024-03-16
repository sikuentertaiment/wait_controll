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
	}
}

app.init();
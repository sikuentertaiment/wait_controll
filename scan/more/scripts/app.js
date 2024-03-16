const app = {
	init(){
		// init the el
		this.number = find('#number');
		this.loading = find('#loading');

		this.processTheNumber();
	},
	async processTheNumber(){
		// getting the latest one
		const number = 1;
		setTimeout(()=>{
			this.number.innerHTML = number;
			this.number.show();
			this.loading.hide();
		},1000)
	}
}
app.init();
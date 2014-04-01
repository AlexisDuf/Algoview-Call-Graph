function Program(text) {
	this.text = text;
}

Program.prototype.getText = function(){
		return this.text;
}

Program.prototype.setText = function(text){
		this.text = text;
}

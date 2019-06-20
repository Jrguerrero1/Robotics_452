
class Light{

	constructor(dirX, dirY){
		this.intensity = 100;
		this.xcoord = dirX;
		this.ycoord = dirY;
	}
	getIntensity(x,y){
		var dist = Math.sqrt(Math.pow(x - this.xcoord, 2) + Math.pow(y - this.ycoord, 2) );
		var relIntensity = this.intensity / dist;
		return relIntensity;
	}
	draw(){
		fill(255, 255, 0);
		ellipse(this.xcoord, this.ycoord, 30, 30);
	}
}
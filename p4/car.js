class Car
{


	constructor(xValue, yValue, rValue, scale) {
		this.x = parseFloat(xValue);
		this.y = parseFloat(yValue);
		this.r = parseFloat(rValue) * (Math.PI / 180.0);
		this.s1 = parseFloat(scale); //scale
		this.turnSpeed = 0.0;
		this.velocity = 0.0;
	}

	draw(canvas,image){
		
		var x = this.x;
		var y = this.y;
		var r = this.r;
		var s_ = this.s1;
		var w=image.width*s_;
		var h=image.height*s_;

		if(play) {
			if (this.velocity) {
				this.x += this.velocity * Math.cos(this.r) * dt;
				this.y += this.velocity * Math.sin(this.r) * dt;	
			}
			this.r += this.turnSpeed * dt;

		}
		canvas.push();
		//canvas.fill(canvas.random(255), canvas.random(255), 192, 127);
    	//canvas.ellipse(x, y,20,20);
		canvas.translate(x,y);

		canvas.rotate(r);
		canvas.translate(0,0);
		canvas.image(image, 0, 0,w,h);
		canvas.pop();

	}
	circle(canvas){
		canvas.fill(canvas.random(255), canvas.random(255), 192, 127);
    	canvas.ellipse(this.x, this.y,20,20);

	}

}


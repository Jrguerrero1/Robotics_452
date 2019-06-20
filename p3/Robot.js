class Robot{

	constructor(xValue, yValue, rValue, Kvalue,s1Value,colorValue,robotNumber) {
		this.x = parseFloat(xValue);
		this.y = parseFloat(yValue);
		this.r = parseFloat(rValue);
		this.r *= (Math.PI / 180.0);
		this.K = Kvalue;
		this.s1 = parseFloat(s1Value);
		this.c = colorValue.toString();//color set
		this.n = parseFloat(robotNumber);//robot number
	}

	draw(){

		push();

		stroke(255);

		var x = this.x;
		var y = this.y;
		var r = this.r;
		var s_ = this.s1;
		var color= this.c;
		var r_number= this.n;
		translate(x, y);
		rotate(r);
		scale(s_);
		fill(color);
		rect(0, 0, 50, 50);				// base rectangle, origin of robot
		rect(-25, -25, 25, 10);			// Wheel 1
		rect(-25, 25, 25, 10);			// Wheel 2
		fill(255, 255, 255);
		arc(43 , -15, 13, 13, HALF_PI, -HALF_PI);	// headlight 1
		line(25, -15, 35, -15);						// headlight 1 connector
		arc(43, 15, 13, 13, HALF_PI, -HALF_PI);		// headlight 2
		line(25, 15, 35, 15);						// headlight 2 connector
		fill('white');
		stroke('black');
		text(r_number, -4 , 3);					// robot number
		pop();

	}

}
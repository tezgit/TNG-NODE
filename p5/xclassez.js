console.log("ENTERED CLASSEZ");


class Pulser {
    //The constructor (note no variable declarations above the constructor)  
    constructor(x, y, w, h) { //pulser has 4 arguments 
        this.x = x; //this refers to the variables in the class. Need to use this in front of all variables.
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red";
        this.n = Math.random() * 2;//generate a random starting noise variable; 
        this.p = 0; //position variable
        this.inc = 0.005; //noise variable increment
    }

    //Functions 
    display() {
        fill(255, 0, 0, 100);
        ellipse(this.x, this.y, this.w, this.h);
        this.w += Math.random(-1, 1);
        this.h += Math.random(-1, 1);

    }


    //     move() {
    //         this.p = noise(this.n);
    //         this.x = map(this.p, 0, 1, 0, width);
    //         this.n = this.n + this.inc;
    //     }

}


module.exports = Pulser;


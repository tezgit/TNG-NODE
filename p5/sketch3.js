///// P5 specific ///////////////////////////

// https://breaksome.tech/coding-a-particle-effect-in-p5js/

//Diameter of one particle
var particleSize = 3;
//Total particles
var particleSum = 30;
//Distance between particles a line gets drawn
var lineMaxDist = 200;
//Holds particles
var particles = [];


module.exports = (p) => {

    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('my-canvas');

        p.frameRate(120);
        p.textSize(14);
        p.textFont('Helvetica');
        button = p.createButton('click me');
        let bx = 600 // p.windowWidth - 100
        button.position(bx, 0);

        // button.mousePressed(mouzeme);


        //Fills the array "particles" with particles
        for (let i = 0; i < particleSum; i++) {
            particles.push(new Particle());
        }

    }

    p.draw = () => {
        // p.background([0, 40, 0, 255]);

        p.background(0, 150);
        //Move and display particles
        particles.forEach(particle => {
            particle.move();
            particle.connect();
            // particle.repel();
            particle.reconnect();
            particle.display();
        });
    }

    ///////// CLASS PARTICLE ///////////////////
    class Particle {
        constructor() {
            this.pos = p.createVector(Math.floor(Math.random() * p.windowWidth), Math.floor(Math.random() * p.windowHeight));
            this.direction = p.createVector(Math.random() * 0.7, Math.random() * 0.7);
        }

        //Moves the particles and bounces them off the edges
        move() {
            this.pos = this.pos.add(this.direction);
            if (this.pos.x <= 0) this.direction.x *= -1;
            if (this.pos.x > p.windowWidth) this.direction.x *= -1;
            if (this.pos.y <= 0) this.direction.y *= -1;
            if (this.pos.y > p.windowHeight) this.direction.y *= -1;
        }

        //Mouse repels particles
        //Also makes sure they don't leave the canvas
        repel() {
            this.pos.x = p.constrain(this.pos.x, 0, p.windowWidth);
            this.pos.y = p.constrain(this.pos.y, 0, p.windowHeight);
            let distance = p.dist(this.pos.x, this.pos.y, p.mouseX, p.mouseY);
            let mouse = p.createVector(p.mouseX, p.mouseY);
            let difference = p5.Vector.sub(mouse, this.pos);
            difference.setMag(1);
            //If the mouse comes near a particle, it moves away
            if (distance < lineMaxDist) {
                this.pos.sub(difference);
            }
        }

        connect() {
            particles.forEach(particle => {
                let distance = p.dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
                if (distance < lineMaxDist) {
                    p.stroke(p.color(255, 255, 255, p.map(distance, 0, lineMaxDist, 255, 0)));
                    p.strokeWeight(p.map(distance, 0, lineMaxDist, 2, 0));
                    p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
                }
            })
        }

        reconnect() {
            particles.forEach(particle => {
                let maxDist = 100;
                let distance = p.dist(p.windowWidth / 2, p.windowHeight / 2, particle.pos.x, particle.pos.y);
                if (distance < maxDist) {
                    p.stroke(p.color(100, 0, 0, p.map(distance, 0, maxDist, 150, 0)));
                    p.strokeWeight(p.map(distance, 0, maxDist, 2, 0));
                    p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
                }
            })

        }


        display() {
            p.noStroke();
            p.ellipse(this.pos.x, this.pos.y, particleSize)
        }

    }

}



/////////// TEZ TIMERS /////////////////////
/*

const ciccioTimer = setInterval(
    () => {
        console.log('ciccioTimer called!');
    },
    1000
);

const alfaTimer = setInterval(
    () => {
        console.log('alfaTimer called!');

    },
    3000
);

*/


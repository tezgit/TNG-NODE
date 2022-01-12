///// P5 specific ///////////////////////////

var t_y = 100;
var dir = 1;
var datext = "- - -";
var alfaline = 10;
var alfadir = 1;
var alfainc = 5;
var sininc = 0.1;


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
        button.mousePressed(playVid);
    }

    p.draw = () => {
        p.background([0, 40, 0, 255]);

        p.stroke(0, 0, 0, 0);
        p.fill([150, 150, 0, 200]);
        var ss = 650;
        var tp = p.text(datext, p.windowWidth - ss, t_y);
        datext = String(alfaline);


        p.fill([150, 00, 0, 100]);
        p.ellipse(200 + Number(Math.sin(sininc) * 50 + alfaline), 200 + Number(Math.cos(sininc) * 50), 100, 100);

        // p.stroke(Math.random() * 150);
        p.stroke(alfaline);
        p.line(1, tp.windowHeight / 2, tp.windowWidth - ss, t_y);
        p.line(tp.windowWidth / 2, tp.windowHeight, tp.windowWidth - ss, t_y);
        p.line(tp.windowWidth / 2, tp.windowHeight, tp.windowWidth - ss, t_y);
        p.line(tp.windowWidth / 2, 1, tp.windowWidth - ss, t_y);

        sininc += 0.02;
    }

}

const ciccioTimer = setInterval(
    () => {
        // console.log('Ciao every 3 seconds');
        if (t_y < 600 && dir == 1) {
            t_y += 1;
        } else {
            dir = -1;
        }
        if (t_y > 0 && dir == -1) {
            t_y -= 1;
        } else {
            dir = 1;
        }

    },
    10
);

const alfaTimer = setInterval(
    () => {
        if (alfaline < 200 && alfadir == 1) {
            alfaline += alfainc;
        } else {
            alfadir = -1;
            alfainc = 1 + Math.random() * 20;
        }
        if (alfaline > 0 && alfadir == -1) {
            alfaline -= alfainc;
        } else {
            alfadir = 1;
            alfainc = 1 + Math.random() * 20;
        }

    },
    100
);


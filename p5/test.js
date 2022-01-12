const { BrowserWindow } = require('electron');
///// MQTT specific /////////////////////////

module.exports = (p) => {

    // var pg;

    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth / 2, p.windowHeight / 2);
        canvas.parent('my-canvas');

        // this.imgt = p.createImg(
        //     './p5/aster.png',
        //     'da p5 asterisk'
        // );


        this.imgt = p.createImg(
            './p5/transp.png',
        );

        this.imgt.position(0, 0);
        this.imgt.size(100, 100);

        // pg = p.createGraphics(100, 100);
        // pg.parent('my-canvas');
        this.imgt.mousePressed(prezzami);
    }


    p.draw = () => {
        p.background(200, 0, 0);

        // pg.background(0, 100, 0);

        // // pg.noStroke();
        // pg.ellipse(25, 25, 50, 50);
        // p.image(pg, 50, 50);
        // p.image(pg, 0, 0, 50, 50);
    }

    function prezzami() {
        console.log("pressed me");
    }

}



// module.exports = (p) => {

//     let pg;
//     p.setup = () => {
//         const canvas = p.createCanvas(400, 400);
//         p.pg = createGraphics(100, 100);
//     }

//     p.setup = () => {
//         p.background(200);
//         p.pg.background(100);
//         p.pg.noStroke();
//         p.pg.ellipse(p.pg.width / 2, p.pg.height / 2, 50, 50);
//         image(p.pg, 50, 50);
//         image(p.pg, 0, 0, 50, 50);
//     }

// }

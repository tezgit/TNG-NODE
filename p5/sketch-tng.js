var pulzi = [];
var pulti = [];
var rezet = false;

const { BrowserWindow } = require('electron');
///// MQTT specific /////////////////////////
const mqtt = require('mqtt')
// const client = mqtt.connect('mqtt://tngplay:mgtcePFrKT2lNXKe@tngplay.cloud.shiftr.io')
const client = mqtt.connect('mqtt://saplay:lLH036OTCfVqF7hD@saplay.cloud.shiftr.io')
// const client = mqtt.connect('mqtt://playatez:Jb7rCWYAM98RaNWT@playatez.cloud.shiftr.io')

// PLAYER VARS
var vPlayers = ["V1", "V2", "V3", "V4", "V5", "V6", "V7"];


var explayer = vPlayers[0]
var nextplayer = vPlayers[0]
var vSequence = [0, 1, 2]
var totplayers = vPlayers.length
var currSeq = -1
var currFile = 1
var maxSeq = 2
var maxFiles = 2
var ISPLAY = false
var consline = 0
var constext = []
var maxconslines = 9


var dastatus = "init status"
var debagtext = " : : : "
var playing = false;

client.on('connect', function () {
    playVid()
})

client.subscribe('events/ended');

client.on('message', function (topic, message) {
    console.log(topic + " " + message.toString())
    if (topic == "events/ended") {
        dastatus = topic.toString() + " " + message.toString()
        playing = false
    } else if (topic == "presence") {
        dastatus = topic.toString() + " " + message.toString()
    }
    // client.end()
})


/////// TNG SPECIFIC ///////////////////////////
function playVid() {
    client.subscribe('presence', function (err) {
        if (!err) {
            let myvids = ['v_1_01.mp4', 'v_2_02.mp4', 'v_3_03.mp4', 'v_1_02.mp4', 'v_3_02.mp4']
            let rr = Math.floor(Math.random() * 5)
            let myvid = rr.toString() + " " + myvids[2]
            dastatus = "now playing >> " + myvid
            client.publish('V1/url', 'http://www.phonomena.net/test/' + myvids[rr])
            playing = true
        }
    })

    // SHUFFLE PLAYERS LIST
    vPlayers = reshuffle(vPlayers);

}

///////////////////////////////
function cons(datext) {
    if (constext[consline] != datext) {
        if (consline > 0) {
            consline--;
        } else {
            // consline = constext.length - 1;
            consline = constext.length - 1;
        }
        constext[consline] = datext;
    }
}



function v_play_next() {


    if (currSeq >= 0) {
        explayer = vPlayers[vSequence[currSeq]]
    } else {
        explayer = vPlayers[vSequence[0]]
    }

    if (currSeq < maxSeq) {
        currSeq += 1
    } else {
        vSequence = shuffle(3) /// SHUFLLE HERE
        print("vSequence" + str(vSequence))
        currSeq = 0
        if (currFile <= maxFiles) {
            currFile += 1
        } else {
            currFile = 1
        }

    }

    debagtext = ("currSeq: " + str(currSeq) + " currFile: " + str(currFile))

    // # reshuffle_sequence()

    let nextplayer = vPlayers[vSequence[currSeq]]
    debagtext = ("nextplayer: " + nextplayer)
    let nextFile = nextFileName(vSequence[currSeq] + 1, currFile)
    debagtext = ("nextFile: " + nextFile)

    // client1.publish(nextplayer + "/url", nextFile)
    // pyg.filebar(nextplayer + " now playing >> " + nextFile)
    // client1.publish(nextplayer + "/status")
    // myFile = str(nextFile).split("/")
    // client1.publish(nextplayer + "/overlay", str(myFile[4]))

}

/*
# ---------- DO NOT TOUCH THIS -------------------------#


def nextFileName(nn, cs):
    file_dir = "http://www.phonomena.net/test/"
    if(cs < 10):
        ns = "0"+str(cs)
    else:
        ns = str(cs)
    myfilename = file_dir + "v_" + str(nn) + "_" + ns + ".mp4"
    print("myFileName: " + myfilename)
    return myfilename

*/

/////////////////////////
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

/////////////////////////
function reshuffle(array) {
    let len = array.length;
    let numarray = [];
    let shuffled = [];

    let n = 0;
    array.forEach(element => {
        numarray.push(n);
        // console.log("numarray element " + element + " = " + numarray[n]);
        n += 1;
    });
    numarray.sort(() => Math.random() - 0.5);

    n = 0;
    array.forEach(element => {
        shuffled.push(array[numarray[n]]);
        // console.log("shuffled element " + n + " = " + shuffled[n]);
        n += 1;
    });

    return (shuffled);

    // n = 0;
    // array = [];

    // shuffled.forEach(element => {
    //     array.push(shuffled[n]);
    //     console.log("array element " + n + " = " + array[n]);
    //     n += 1;
    // });


}

///// OSC specific /////////////////////////
const osc = require("osc");
const p5 = require('p5');

var posX = 760;
var posY = 500;

const udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 57121,
    metdata: true
});

udpPort.on('message', (oscMessage) => {
    switch (oscMessage.address) {
        case '/pos_x':
            posX = Number(oscMessage.args[0]);
            // console.log("posX = " + String(posX));
            break;


        case '/pos_y':
            posY = Number(oscMessage.args[0]);
            // console.log("posY = " + String(posY));
            break;
    }
    console.log(oscMessage);
    dastatus = ("posX: " + String(posX) + "   " + "posY: " + posY);

});

udpPort.open();


///// P5 specific ///////////////////////////

module.exports = (p) => {

    ///// --- P5 SETUP --- /////
    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('my-canvas');

        for (let n = 1; n < maxconslines; n++) {
            constext.push("-*-");
        }

        button = p.createButton('t e s t');
        button.position(20, 350);
        button.mousePressed(playVid);

        button = p.createButton('reset');
        button.position(p.windowWidth - 80, 350);
        button.mousePressed(rezet);

        vPlayers = reshuffle(vPlayers);
        // console.log("vPlayers array = " + vPlayers);

        rezet(); // int and activate pulzi objects

        // p.noLoop();
    }


    ///// --- P5 DRAW --- /////
    p.draw = () => {
        p.background([0, 50, 50, 255]);

        cons(dastatus);
        consdraw(); // display console lines
        debag(); // display debagtext

        // display all instances of pulzi 
        let n = 0;
        for (n = 0; n < pulzi.length; n++) {
            pulzi[n].disp();
        };


        // display center circle
        p.fill(200);
        p.ellipse(p.windowWidth / 2, p.windowHeight / 3, 20, 20);


        oscboxdraw();


        // video play looper    
        // if (playing == false) {
        //     playVid()
        // }

    }


    function oscboxdraw() {

        let mytopx = p.windowWidth - 120;
        let mytopy = 20;

        p.strokeWeight(1);
        p.stroke(0, 100, 0, 100);
        p.fill(0, 0, 0, 30);
        let myrect = p.rect(mytopx, mytopy, 100, 40, 10);
        console.log("mytopy: " + mytopy);
        p.noStroke();
        p.textSize(12);
        p.textFont('Helvetica');
        p.fill(150, 150, 150, 150);
        p.text("osc posX : " + String(posX), mytopx + 10, mytopy + 15);
        p.text("osc posY : " + String(posY), mytopx + 10, mytopy + 32);
    }

    ///////////////////////////////
    function consdraw() {
        let yline = 18; // height of textline
        // draw bg console rectangle
        p.fill(100, 0, 0, 100);
        p.noStroke();
        p.rect(0, p.windowHeight - (yline * maxconslines), p.windowWidth, (yline * maxconslines));

        // display console text
        p.textFont('Courier');
        p.fill([0, 150, 0, 255]);
        let n = 0;
        for (n = 0; n < constext.length; n++) {
            if (consline == n) {
                p.fill([0, 0, 0, 60]);
                let rly = p.windowHeight - (yline * (n + 1));
                p.rect(0, rly - 12, p.windowWidth - 140, 16, 30);
                p.textSize(16);
                p.fill([0, 150, 0, 255]);
            } else {
                p.textSize(12);
                p.fill([200, 200, 200, 99]);
            }
            p.text(constext[n], 10, p.windowHeight - yline * (n + 1));
        };
    }
    ///////////////////////////////
    function debag() {

        let yline = 18;
        p.fill(0, 0, 0, 60);
        p.noStroke();
        p.rect(0, p.windowHeight - (yline * maxconslines) - yline, p.windowWidth, yline);

        p.textSize(12);
        p.textFont('Courier');
        p.fill([150, 150, 150, 205]);

        // debagtext = thistext;
        p.text("§ :  " + debagtext, 10, p.windowHeight - (yline * maxconslines) - 6);

    }

    ///////////////////////////////
    function rezet() {
        debagtext = "reset";

        pulzi = [];
        pulti = [];
        let n = 0;
        for (n = 0; n < vPlayers.length; n++) {
            let stepangle = 360 / vPlayers.length;
            let cCoord = circumPoint(150, n * stepangle, p.windowWidth / 2, p.windowHeight / 3);
            let rx = (cCoord[0]); // Math.random() * 500;
            let ry = (cCoord[1]); // Math.random() * 500;
            let rs = 50; //  + Math.random() * 5;
            let pulzid = pulzi.length + 1;
            let puz = new Pulzer(rx, ry, rs, rs, pulzid)
            pulzi.push(puz);

            // let neopu = p.createImg('./p5/aster.png');
            // pulti.push(neopu);
            // pulti[n].position(rx, ry);
            // pulti[n].mousePressed(prezzme);

        };

        console.log("reset >> pulzi >> " + String(pulzi));

    }


    function prezzme() {
        debagtext = (this);
        console.log(this);
        // console.log("prezzato # " + String(iddio));
        debagtext = "prezzato # " + String(Math.random());
    }

    ///////////////////////////////
    function circumPoint(radius, angle, cx, cy) {
        angle = angle * (Math.PI / 180); // Convert from Degrees to Radians
        const x = cx + radius * Math.sin(angle);
        const y = cy + radius * Math.cos(angle);
        return [x, y];
    }



    /////// CLASSES /////////////////////////
    class Pulzer {
        //constructor
        constructor(x, y, w, h, id) { //pulser has 4 arguments 
            this.x = x; //this refers to the variables in the class. Need to use this in front of all variables.
            this.y = y;
            this.w = w;
            this.h = h;
            this.origx = x;
            this.origy = y;
            this.id = id;
            this.rotangle = 0;

        }


        disp() {
            // this.rotangle += 0.001;
            // p.rotate(this.rotangle, 2);
            p.stroke(0, 255, 0, 150);
            p.line(this.x, this.y, p.windowWidth / 2, p.windowHeight / 3);
            p.stroke(0, 255, 0, 255);
            p.fill(0, 100, 100, 60);
            p.ellipse(this.x, this.y, this.w, this.h);
            let factu = 3;
            if (Math.random() * 5 <= 1) {
                this.x = this.origx + Math.random() * factu - factu / 2;
                this.y = this.origy + Math.random() * factu - factu / 2;
            }
            p.fill(250, 250, 250, 180);
            p.textSize(11);
            p.textFont('Helvetica');
            p.text("V_" + String(this.id), this.x, this.y);

        }

    }

}

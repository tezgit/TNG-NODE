


///// MQTT specific /////////////////////////
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://tngplay:mgtcePFrKT2lNXKe@tngplay.cloud.shiftr.io')

var dastatus = " - - - "
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
}



///// OSC specific /////////////////////////
const osc = require("osc");

var posX = 430;
var posY = 270;

const udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 57121,
    metdata: true
});

udpPort.on('message', (oscMessage) => {
    switch (oscMessage.address) {
        case '/pos_x':
            posX = Number(oscMessage.args[0]);
            console.log("posX = " + posX.toString());
            break;


        case '/pos_y':
            posY = Number(oscMessage.args[0]);
            console.log("posY = " + posY.toString());
            break;
    }
    console.log(oscMessage);

});

udpPort.open();


///// P5 specific ///////////////////////////



module.exports = (p) => {

    p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('my-canvas');
        p.textSize(20);
        p.textFont('Helvetica');

        button = p.createButton('click me');
        let bx = 600 // p.windowWidth - 100
        button.position(bx, 0);
        button.mousePressed(playVid);


    }

    p.draw = () => {
        p.background([50, 0, 0, 255]);

        p.fill(Math.random() * 200);
        p.ellipse(window.posX, window.posY, 90, 90);


        p.fill([0, 150, 0, 255]);
        p.text("x : " + window.posX.toString(), 400, 250);
        p.text("y : " + window.posY.toString(), 400, 300);

        p.fill([150, 150, 150, 255]);
        p.text(dastatus, 20, 20);

        // video play looper    
        // if (playing == false) {
        //     playVid()
        // }


    }
}
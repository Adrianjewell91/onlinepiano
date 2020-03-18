
document.querySelector('button').addEventListener('click',() => {

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var keys = new Array(88).fill(() => audioCtx.createOscillator());
keys = keys.map(f => f());

// var oscillator = audioCtx.createOscillator();
// oscillator.type = 'sine';

//When I push down a key, turn on the oscillator.
//When the key is lifted, create a new oscillator. 

function _mtof(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}

function _onmidimessage(e) {
    /**
    * e.data is an array
    * e.data[0] = on (144) / off (128) / detune (224)
    * e.data[1] = midi note
    * e.data[2] = velocity || detune
    */
    switch (e.data[0]) {
        case 144:
            // Play the note: 
            note = keys[e.data[1] - 21];
            note.frequency.value = _mtof(e.data[1]); // value in hertz
            note.connect(audioCtx.destination);
            note.start(); 
            console.log(e);
            break;
        case 128:
            console.log(e);
            note = keys[e.data[1]-21];
            note.stop();
            keys[e.data[1] - 21] = audioCtx.createOscillator();
            // oscillator.type = 'sine';
            break;
    }

}

// Just do this now. 

// console.log(e);
let device;
window.navigator.requestMIDIAccess().then(access => {
    device = access.inputs.values().next().value;
    device.onmidimessage = _onmidimessage;
});

});
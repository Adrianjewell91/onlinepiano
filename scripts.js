
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
var oscillator = audioCtx.createOscillator();
oscillator.type = 'sine';

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
            oscillator.frequency.value = _mtof(e.data[1]); // value in hertz
            oscillator.connect(audioCtx.destination);
            oscillator.start(); 
            console.log(e);
            break;
        case 128:
            console.log(e);
            oscillator.stop();
            oscillator = audioCtx.createOscillator();
            oscillator.type = 'sine';
            break;
    }

}
let device;
window.navigator.requestMIDIAccess().then(access => {
    device = access.inputs.values().next().value;
    device.onmidimessage = _onmidimessage;
});

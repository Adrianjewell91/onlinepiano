// I want to be able to hear the music and see what happens. 

// How sensitive is the MIDI input?
function _onmidimessage(e) {
    /**
    * e.data is an array
    * e.data[0] = on (144) / off (128) / detune (224)
    * e.data[1] = midi note
    * e.data[2] = velocity || detune
    */
    switch (e.data[0]) {
        case 144:
            console.log(e.data[2]);
            break;
        case 128:
            // console.log(e.data[2]);
            break;
    }

}

let access;
window.navigator.requestMIDIAccess().then(access => {
    let input = access.inputs.values().next().value;
    input.onmidimessage = _onmidimessage;
});
var HOST = location.origin.replace(/^http/, 'ws')
var websocket = new WebSocket(HOST); 

websocket.onmessage = function (event) {
    console.log(event);
}

console.log(websocket);

document.querySelector('#play').addEventListener('click', () => {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var keys = new Array(88).fill(() => audioCtx.createOscillator());
    keys = keys.map(f => f());

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
                websocket.send(JSON.stringify(e.data));
                var gainNode = audioCtx.createGain();
                note = keys[e.data[1] - 21];
                note.frequency.value = _mtof(e.data[1]); // value in hertz
                note.connect(gainNode); 
                gainNode.gain.setValueAtTime(e.data[2] / 100, audioCtx.currentTime);
                gainNode.connect(audioCtx.destination);
                note.start(); 
                console.log(e);
                break;
            case 128:
                console.log(e);
                websocket.send(JSON.stringify(e.data));
                note = keys[e.data[1]-21];
                note.stop();
                keys[e.data[1] - 21] = audioCtx.createOscillator();
                break;
        }
    }

    let device;
    window.navigator.requestMIDIAccess().then(access => {
        device = access.inputs.values().next().value;
        device.onmidimessage = _onmidimessage;
    });
});

document.querySelector('#listen').addEventListener('click', () => {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    var keys = new Array(88).fill(() => audioCtx.createOscillator());
    keys = keys.map(f => f());

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
                websocket.send(JSON.stringify(e.data));
                var gainNode = audioCtx.createGain();
                note = keys[e.data[1] - 21];
                note.frequency.value = _mtof(e.data[1]); // value in hertz
                note.connect(gainNode);
                gainNode.gain.setValueAtTime(e.data[2] / 100, audioCtx.currentTime);
                gainNode.connect(audioCtx.destination);
                note.start();
                console.log(e);
                break;
            case 128:
                console.log(e);
                websocket.send(JSON.stringify(e.data));
                note = keys[e.data[1] - 21];
                note.stop();
                keys[e.data[1] - 21] = audioCtx.createOscillator();
                break;
        }
    }

    websocket.onmessage = function (event) {
        console.log(event);
        payload = {
            data: JSON.parse(event.data)
        }
        _onmidimessage(payload);
    };
});

    // var piano = Synth.createInstrument('piano');
    // var map = {
    //     21: ["A", 1],
    //     22: ["A#", 1], 
    //     23: ["B", 1], 
    //     24: ["C", 1], 
    //     25: ["C#", 1], 
    //     26: ["D", 1], 
    //     27: ["D#", 1], 
    //     28: ["E", 1], 
    //     29: ["F", 1], 
    //     30: ["F#", 1], 
    //     31: ["G", 1], 
    //     32: ["G#", 1], 
    //     33: ["A", 2], 
    //     34: ["A#", 2], 
    //     35: ["B", 2], 
    //     36: ["C", 2], 
    //     37: ["C#", 2], 
    //     38: ["D", 2], 
    //     39: ["D#", 2], 
    //     40: ["E", 2], 
    //     41: ["F", 2], 
    //     42: ["F#", 2], 
    //     43: ["G", 2], 
    //     44: ["G#", 2], 
    //     45: ["A", 3], 
    //     46: ["A#", 3], 
    //     47: ["B", 3], 
    //     48: ["C", 3], 
    //     49: ["C#", 3], 
    //     50: ["D", 3], 
    //     51: ["D#", 3], 
    //     52: ["E", 3], 
    //     53: ["F", 3], 
    //     54: ["F#", 3], 
    //     55: ["G", 3], 
    //     56: ["G#", 3], 
    //     57: ["A", 4], 
    //     58: ["A#", 4], 
    //     59: ["B", 4], 
    //     60: ["C", 4], 
    //     61: ["C#", 4], 
    //     62: ["D", 4], 
    //     63: ["D#", 4], 
    //     64: ["E", 4], 
    //     65: ["F", 4], 
    //     66: ["F#", 4], 
    //     67: ["G", 4], 
    //     68: ["G#", 4], 
    //     69: ["A", 5], 
    //     70: ["A#", 5], 
    //     71: ["B", 5], 
    //     72: ["C", 5], 
    //     73: ["C#", 5], 
    //     74: ["D", 5], 
    //     75: ["D#", 5], 
    //     76: ["E", 5], 
    //     77: ["F", 5], 
    //     78: ["F#", 5], 
    //     79: ["G", 5], 
    //     80: ["G#", 5], 
    //     81: ["A", 6], 
    //     82: ["A#", 6], 
    //     83: ["B", 6], 
    //     84: ["C", 6], 
    //     85: ["C#", 6], 
    //     86: ["D", 6], 
    //     87: ["D#", 6], 
    //     88: ["E", 6], 
    //     89: ["F", 6], 
    //     90: ["F#", 6], 
    //     91: ["G", 6], 
    //     92: ["G#", 6], 
    //     93: ["A", 7], 
    //     94: ["A#", 7], 
    //     95: ["B", 7], 
    //     96: ["C", 7], 
    //     97: ["C#", 7], 
    //     98: ["D", 7], 
    //     99: ["D#", 7], 
    //     100: ["E", 7], 
    //     101: ["F", 7], 
    //     102: ["F#", 7], 
    //     103: ["G", 7], 
    //     104: ["G#", 7], 
    //     105: ["A", 8], 
    //     106: ["A#", 8], 
    //     107: ["B", 8], 
    //     108: ["C", 8]
    // }

let amSynth = new Tone.AMSynth().toDestination();
let duSynth = new Tone.DuoSynth().toDestination();
let fmSynth = new Tone.FMSynth().toDestination();
let mbSynth = new Tone.MembraneSynth().toDestination();
let mtSynth = new Tone.MetalSynth().toDestination();
let mnSynth = new Tone.MonoSynth().toDestination();
let noSynth = new Tone.NoiseSynth().toDestination();
let plSynth = new Tone.PluckSynth().toDestination();
let poSynth = new Tone.PolySynth().toDestination();
let synth   = new Tone.Synth().toDestination();

const notes = [ "D3",  "D4",  "D5",  "D6",
                "F#3", "F#4", "F#5", "F#6",
                "A3",  "A4",  "A5",  "A6",
                "Db3", "Db4", "Db5", "Db6"];

const keycodes = [49, 50, 51, 52,
                  81, 87, 69, 82,
                  65, 83, 68, 70,
                  90, 88, 67, 86];

const noteDown = (key) => {
    poSynth.triggerAttackRelease(key, "16n");
};

const loadPad = () => {
    let pads = "";

    notes.forEach((note, index) => {
        pads += `<div class="pad">
                    <strong class="pad-num"
                            id="pad-num-${index}">
                        #${index}
                    </strong>
                            
                    <strong class="note-keyboard"
                            id="note-keyboard-${index}">
                        ${String.fromCharCode(keycodes[index])}
                    </strong>

                    <strong class="note-assigned">${note}</strong>
                 </div>`;
    });

    document.getElementById("container").innerHTML = pads;
};

const toggleShortcut = (element) => {
    const shortcuts = document.querySelectorAll(".note-keyboard");

    if (element.checked == false) {
        shortcuts.forEach(shortcut => {
            shortcut.style.display = "none";
        });
    } else {
        shortcuts.forEach(shortcut => {
            shortcut.style.display = "block";
        });
    }
};

const toggleNumber = (element) => {
    const numbers = document.querySelectorAll(".pad-num");

    if (element.checked == false) {
        numbers.forEach(number => {
            number.style.display = "none";
        });
    } else {
        numbers.forEach(number => {
            number.style.display = "block";
        });
    }
};

const toggleMenu = () => {
    let menu = document.getElementById('option');

    if (menu.style.display == 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

document.addEventListener("keydown", (event) => {
    let buttons = document.getElementById("container").children;

    for (let i = 0; i < buttons.length; i++) {
        if (event.keyCode == keycodes[i]) {
            noteDown(notes[i]);

            buttons[i].style.animation = 'synthClicked .1s ease';       
            setTimeout(() => {
                buttons[i].style.animation = 'none'
            }, 100);
        }
    }
});

let noteForm = document.getElementById("assign");

const setNote = (note, newNote) => {
    notes[notes.indexOf(note)] = newNote;
};

noteForm.addEventListener("submit", (event) => {
    let oldNote = document.setNote.note.value;
    let newNote = document.setNote.newNote.value;

    event.preventDefault();
    setNote(oldNote, newNote);

    document.setNote.note.value = "";
    document.setNote.newNote.value = "";

    loadPad();
});
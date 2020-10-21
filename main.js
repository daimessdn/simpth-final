let synth = new Tone.PolySynth().toDestination();

const notes = [ "C4",  "C5",  "C6",  "C7",
                "G4",  "G5",  "G6",  "G7",
                "Bb4", "Bb5", "Bb6", "Bb7",
                "F4",  "F5",  "F6",  "F7"];

const keycodes = [49, 50, 51, 52,
                    81, 87, 69, 82,
                    65, 83, 68, 70,
                    90, 88, 67, 86];

const noteDown = (key) => {
    synth.triggerAttackRelease(key, "16n");
};

const loadPad = () => {
    let pads = "";

    notes.forEach((note, index) => {
        pads += `<div class="pad"
                        onclick="
                        noteDown('${note}');
                        this.style.animation = 'synthClicked .1s ease';       
                        setTimeout(() => {this.style.animation = 'none'}, 100);
                    ">
                    <strong class="pad-num"
                            id="pad-num-${index}"
                    >
                        #${index}
                    </strong>

                    <strong class="note-assigned">${note}</strong>
                    </div>`;
    });

    document.getElementById("container").innerHTML = pads;
}

document.addEventListener("keydown", (event) => {
    let buttons = document.getElementById("container").children;

    for (let i = 0; i < buttons.length; i++) {
        if (event.keyCode == keycodes[i]) {
            buttons[i].click();
        }
    }
});
import { soundManager } from "soundmanager2";
import sounds from "./sounds";

loadSounds();


document.addEventListener("keypress", function(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-rt-z0-9]/i.test(charStr)) {
        let matchbutton = document.getElementById(charStr);
        console.log("Key press event - " & charStr)
        if (matchbutton) {
            // we don't get here if some_variable is null, undefined, 0, NaN, false, or ""
            console.log("Document Object - " & matchbutton.type & " - " & matchbutton.textContent)
            matchbutton.click();
        }
    }
    if (charStr == "s") {
        soundManager.stopAll();
    }
})


function playshortcut(shortcutKey) {

}

function loadSounds() {
    soundManager.setup({
        debugMode: false,
        onready: () => sounds.forEach(loadSound)
    });
}

function setupOverlay() {
    document.getElementById("OverlayButton").onclick = () => {
        ToggleButton();
    }

}


function ToggleButton() {

    document.getElementById("OverlayButton").prop('disabled', function(i, v) { return !v; });
}



function stopallSounds() {
    soundManager.stopAll();
}




function loadSound(sound) {
    let button = document.createElement("button");
    button.type = "button";
    button.innerHTML = `<span><i class="fa fa-cog fa-spin"></i> ESR is Loading&hellip;</span>`;
    document.querySelector("#sounds").appendChild(button);

    soundManager.createSound({
        id: sound.name,
        url: `sounds/${sound.file}`,
        onload: () => {
            button.querySelector("span").innerHTML = sound.name;
            button.onclick = () => {
                // soundManager.stopAll();
                soundManager.getSoundById(sound.name).play();
            };
            button.id = sound.shortcut;
        },
        onplay: () => button.classList.add("fade"),
        onstop: () => button.classList.remove("fade"),
        onfinish: () => button.classList.remove("fade")
    });

    // For some reason, mobile browsers don't handle loading all sounds simultaneously.
    // So load the sounds at random intervals instead.
    setTimeout(() => soundManager.getSoundById(sound.name).load(), Math.random() * 10000);
}

// Google Analytics.
// (function(i, s, o, g, r, a, m) {
//     i["GoogleAnalyticsObject"] = r;
//     i[r] = i[r] || function() {
//         (i[r].q = i[r].q || []).push(arguments)
//     }, i[r].l = 1 * new Date();
//     a = s.createElement(o),
//         m = s.getElementsByTagName(o)[0];
//     a.async = 1;
//     a.src = g;
//     m.parentNode.insertBefore(a, m)
// })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");
// ga("create", "UA-24505142-5", "auto");
// ga("send", "pageview");
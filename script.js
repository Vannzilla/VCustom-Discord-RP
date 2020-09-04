const fs = require("fs")
const { ipcRenderer } = require('electron')
var open = require("open");

function endRP () {
    alert("Quiting RP");
    ipcRenderer.send('endDRP')
}

function startRP () {
    alert("Starting RP")

    var ncid = document.getElementById('clientid').value;
    fs.writeFile('./pcid.txt', ncid, (err) => {
        if (err) throw err;
        console.log('Updated pcid')
    });

    var details = document.getElementById('details').value;
    var state = document.getElementById('state').value;
    var largeImage = document.getElementById('largeimage').value;
    var smallImage = document.getElementById('smallimage').value;
    var timeStamp = document.getElementById("stcb").checked;
    var clientID = document.getElementById("clientid").value;

    ipcRenderer.send('startDRP', details, state, largeImage, smallImage, timeStamp, clientID)
}

function openDevPortalLink () {
    open("https://discord.com/developers/applications")
}

function openGitHubLink () {
    open("https://github.com/Vannzilla/VCustomDRP")
}

function openDiscordLink () {
    open("https://discord.gg/52KqEXM")
}

fs.readFile('./pcid.txt', (err, pcid) => {
    if (err) throw err;

    document.getElementById('clientid').value = pcid;
});
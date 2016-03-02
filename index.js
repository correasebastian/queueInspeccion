var Queue = require('firebase-queue');
var rp = require('request-promise');
var Firebase = require('firebase');
var rootRef = new Firebase('https://scm-queue-inspeccion.firebaseio.com/');
var randomString = require('random-string');
var request = require('request');
var RSVP = require('rsvp')


function toTest() {
    var obj = {
        idInspeccion: randomString(),
        placa: randomString()
    }
    rootRef.child('workers').child('inspecciones').child('queue').child('tasks').push(obj)
}

function start() {
    console.log('started');


    var queueRef = rootRef.child('workers').child('inspecciones').child('queue');

    var queue = new Queue(queueRef, function(data, progress, resolve, reject) {
        // Read and process task data
        console.log(data);

        // Do some work
        progress(50);

        // Finish the task asynchronously
        setTimeout(function() {
            resolve();
        }, 5000);
    });

}




start();

toTest()

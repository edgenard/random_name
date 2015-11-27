/**
 * Created by Emmanuel on 11/27/15.
 */


(function(){
    "use strict";
    var studentNames = ["Emmanuella", "Dishelle", "Da'Ron", "Patience", "Travis", "Jemar", "Tia", "Garyl", "Mohammed",
    "Maximilian", "Zaire", "Araceli", "Ashley", "Alaya", "Trevon"];

    var weightedNames = [];

    studentNames.forEach(function(name){
        for(var i = 0; i < 3; i++){
            weightedNames.push(name);
        }
    });

    window.picker = function studentPicker(){
        var choice = Math.round(Math.random() * weightedNames.length);
        console.log(weightedNames);
        return weightedNames.splice(choice, 1);
    }





})();
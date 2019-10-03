const fs = require('fs');

// this is to be used with the Scatter plot

let originalData = require('/Users/codenation/Documents/Projects/latest_pos.json')
let newData = {
    "coordinates": [
    ]
        
}

const dataLoop = () => {
    for (i = 0; i < originalData.data.length; i++) {
        let lat = parseFloat(originalData.data[i].lat)
        let lng = parseFloat(originalData.data[i].lng
        
        newData.coordinates.push('[' + [lng2, lat2] + ']')
    }

    console.log(newData.coordinates)
    fs.writeFile("data.json",  newData.coordinates , function(err) {
        if(err) {
            return console.log(err);
        }
    
        console.log("The file was saved!");
    }); 
}

dataLoop()



// console.log(originalData.data[1].id)


const fs = require('fs');

class ManiplateJson {
   constructor(path) {
      this.path = path;
    }

   //Create and write a new json file from the first alarm
   writeData(data) {
      const json = JSON.stringify(data);
      fs.writeFile(this.path, json, err => {
         if (err) {
            console.log('Error writing file', err);
         } else {
            console.log('Successfully wrote file');
         }
      });
   }

   //Append your new alarm into the array of existing json
   appendDataToJson() {
      fs.readFile(this.path, (err, data) => {
         let json = JSON.parse(data)
         //json.push('search result: ' + currentSearchResult)
         fs.writeFile("results.json", JSON.stringify(json))
      })
   }

   //Reading an existing alarms json file
   loadData() {
      try {
         return fs.readFileSync(this.path, 'utf8')
      } catch (err) {
         console.error(err)
         return false
      }
   }
}

module.exports = ManiplateJson;
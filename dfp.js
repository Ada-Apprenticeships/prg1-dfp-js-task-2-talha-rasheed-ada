const fs = require('fs');

function parseFile (indata, outdata, delimiter = ';') {
  
  if (!fs.existsSync(indata)) {
    return -1;
  }

  //Delete the output file 
  if (fs.existsSync(outdata)) {
    fs.unlinkSync(outdata);
  }

  //Read input file 
  const fileContent = fs.readFileSync(indata, 'utf-8')

  //Split the input file into different lines
  const lines = fileContent.split(/\n/)

  //Count number of records
  let recordCount = 0

  //Run through each line and trim
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === ''){
      continue;
    }

  //Split it into 2 columns, sentiment and review
  let column = lines[i].split(delimiter)
  let sentiment = column[0].trim()
  let review = column[1].trim()

  //Shorten review to 20 characters
  review = review.substring(0,20)

  //Add new line to output file using append
  let newColumn = `${sentiment}${delimiter}${review}\n`
  fs.appendFileSync(outdata, newColumn, 'utf-8');
  recordCount++ ;

  //return total number of records
  return recordCount;
  }
  //Error checks
}



  



// Leave this code here for the automated tests
module.exports = {
  parseFile,
}
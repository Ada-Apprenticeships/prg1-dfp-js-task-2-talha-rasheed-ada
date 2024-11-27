const fs = require('fs');

function parseFile(indata, outdata, delimiter = ';') {
  
  // Return -1 if input file does not exist
  if (!fs.existsSync(indata)) return -1;

  // Delete the output file if it exists
  if (fs.existsSync(outdata)) fs.unlinkSync(outdata);
  
  let recordCount = 0;
  try {
    // Read input file
    const fileContent = fs.readFileSync(indata, 'utf-8');

    // Split the input file into different lines
    const lines = fileContent.split(/\n/);
    
    // Run through each line and trim
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') continue;

      const [review, sentiment] = line.split(delimiter).map(item => item.trim());

      // Shorten review to 20 characters
      const shortReview = review.substring(0, 20);

      // Add new line to output file using append (Corrected line)
      fs.appendFileSync(outdata, `${sentiment}${delimiter}${shortReview}\n`, 'utf-8'); 
      recordCount++;
    }
    // Returns -1 if there is an error in the try block
  } catch (err) {
    console.error('Error parsing file:', err); 
    return -1; 
  }

  // Return total number of records
  return recordCount;
}

parseFile('./datafile.csv' , './outputfile.csv')

// Leave this code here for the automated tests
module.exports = {
  parseFile,
}
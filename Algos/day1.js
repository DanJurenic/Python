/**
 * Turns the given str into an acronym.
 * - Time: O(?).
 * - Space: O(?).
 * @param {string} wordsStr A string to be turned into an acronym.
 * @returns {string} The acronym.
 * 
 * define new string var
 * define tempArray
 * 
 * iterate through the string and use an if statement to find blank space
 * if not a blank space, push to a temp string
 * if it is a blank space, push the whole temp string to the array outside of loop (to split words)
 * 
 * loop through the tempArray and take the index=i string index=0 values and add them to new string array
 * capitalize the entire string using .toUpper()
 * 
 */

 function acronymize(str) {
    var capString = ""
    var stringArray = []
    var tempString = ""
    for (var i=0; i<str.length; i++) {
        if (str[i] != ' ') {
            tempString+=str[i];
        }
        else {
            stringArray.push(tempString);
            tempString = ""
        }
    }
    stringArray.push(tempString)
    for (var i=0; i<stringArray.length; i++) {
        capString += stringArray[i][0];
    }
    capString = capString.toUpperCase();
    return capString; 
}

var string = acronymize(two_str2);
console.log(string)
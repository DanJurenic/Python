/*
Sum To One Digit
Implement a function sumToOne(num)​ that,
given a number, sums that number’s digits
repeatedly until the sum is only one digit. Return
that final one digit result.
Tips:
to access digits from a number, need to convert it .toString() to access each digit via index
parseInt(arg) returns arg parsed as an integer, or NaN if it couldn't be converted to an int
isNaN(arg) used to check if something is NaN
*/

const num1 = 5;
const expected1 = 5;

const num2 = 10;
const expected2 = 1;

const num3 = 25;
const expected3 = 7;

/**
 * Sums the given number's digits until the number becomes one digit.
 * @param {number} num The number to sum to one digit.
 * @returns {number} One digit.
 */
function sumToOneDigit(num) {
    let result = num.toString()
    let total = 0;
    console.log(num);
    if(result.length == 1) {
        return num
    }
    if(result.length > 1) {
        for(let i = 0; i < result.length; i++) {
            total += parseInt(result[i]);
        }
    }

    return sumToOneDigit(total)
}

console.log(sumToOneDigit(num1))
console.log(sumToOneDigit(num2))
console.log(sumToOneDigit(num3))

// *****************************************************************

/* 
String Anagrams
Given a string,
return array where each element is a string representing a different anagram (a different sequence of the letters in that string).
Ok to use built in methods
*/

const two_str1 = "lim";
const two_expected1 = ["ilm", "iml", "lim", "lmi", "mil", "mli"];
// Order of the output array does not matter

/**
 * Add params if needed for recursion.
 * Generates all anagrams of the given str.
 * - Time: O(?).
 * - Space: O(?).
 * @param {string} str
 * @returns {Array<string>} All anagrams of the given str.
 */
// function generateAnagrams(str) { }

function generateAnagrams(str, solutions=[], partial="") {
    if (!str){
        console.log("found one");
        solutions.push(partial)
    }

    for (let i=0; i<str.length; i++){
        const leftSlice = str.slice(0, i)
        const rightSlice = str.slice(i+1)
        console.log(`str: ${str} || leftSlice: ${leftSlice} || rightSlice: ${rightSlice} || partial: ${partial} || solutions: ${solutions}`);
        generateAnagrams(leftSlice + rightSlice, solutions, partial + str[i])
    }

    return solutions
}

console.log(generateAnagrams(two_str1));
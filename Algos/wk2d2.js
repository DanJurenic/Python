// /* 
//   String: Reverse
//   Given a string,
//   return a new string that is the given string reversed
// */

// const str1 = "creature";
// const expected1 = "erutaerc";

// const str2 = "dog";
// const expected2 = "god";

// const str3 = "hello";
// const expected3 = "olleh";

// const str4 = "";
// const expected4 = "";

// /**
//  * Reverses the given str.
//  * - Time: O(?).
//  * - Space: O(?).
//  * @param {string} str String to be reversed.
//  * @returns {string} The given str reversed.
//  */
// function reverseString(str) {}

/*****************************************************************************/

/* 
Given a string containing space separated words
Reverse each word in the string.
If you need to, use .split to start, then try to do it without.
*/

const two_str1 = "hello";
const two_expected1 = "olleh";

const two_str2 = "hello world";
const two_expected2 = "olleh dlrow";

const two_str3 = "abc def ghi";
const two_expected3 = "cba fed ihg";

/**
 * Reverses the letters in each words in the given space separated
 * string of words. Does NOT reverse the order of the words themselves.
 * - Time: O(?).
 * - Space: O(?).
 * @param {string} str Contains space separated words.
 * @returns {string} The given string with each word's letters reversed.
 */
function reverseWords(str) {}
/* 
Reverse Word Order
Given a string of words (with spaces)
return a new string with words in reverse sequence.
*/

const three_str1 = "This is a test";
const three_expected1 = "test a is This";

const three_str2 = "hello";
const three_expected2 = "hello";

const three_str3 = "   This  is a   test  ";
const three_expected3 = "test a is This";

/**
 * Reverses the order of the words but not the words themselves form the given
 * string of space separated words.
 * - Time: O(?).
 * - Space: O(?).
 * @param {string} wordsStr A string containing space separated words.
 * @returns {string} The given string with the word order reversed but the words
 *    themselves are not reversed.
 */
function reverseWordOrder(wordsStr) {}






function reverseString(str) {
    let rightIndex = str.length - 1
    let result = ""

    while (rightIndex >= 0) {
    result += str[rightIndex]
    rightIndex--
    }
    return result
}

function reverseWords(str) {
    let words = str.split(" ")
    let result = ""
    words.forEach((word) => {
    result += reverseString(word) + " "
    })
    return result.trim()
}

function reverseWordOrder(wordsStr) {
    wordsStr = wordsStr.trim()
    let words = wordsStr.split(" ")
    let result = []

    words.forEach((word) => {
    let trimmedWord = word.trim()
    if (trimmedWord != "") {
        result.push(trimmedWord)
    }
    })
    return result.reverse().join(" ")
}
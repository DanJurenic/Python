/* 
Given a string that may have extra spaces at the start and the end,
return a new string that has the extra spaces at the start and the end trimmed (removed)
do not remove any other spaces.
*/

const str1 = "   hello world     ";
const expected1 = "hello world";

const str2 = "   hello    world     ";
const expected2 = "hello    world";

/**
 * Trims any leading or trailing white space from the given str.
 * - Time: O(?).
 * - Space: O(?).
 * @param {string} str
 * @returns {string} The given string with any leading or trailing white space
 *    stripped.
 */
//function trim(str) {}

function trim(str) {
    let left_index = 0; // 1st pointer
    let right_index = str.length-1; // 2nd pointer
    while ((str[left_index] === " ") || (str[right_index] === " ")){ // or statement to check for spaces
        if (str[left_index] === " ") {
            left_index++
        }
        if (str[right_index] === " ") {
            right_index--
        }
    }
    return str.substring(left_index, right_index+1); // function becomes what we return
}

/*****************************************************************************/

/* 
An anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.
Is there a quick way to determine if they aren't an anagram before spending more time?
Given two strings
return whether or not they are anagrams
*/

const two_strA1 = "yes";
const two_strB1 = "eys";
const two_expected1 = true;

const two_strA2 = "yes";
const two_strB2 = "eYs";
const two_expected2 = true;

const two_strA3 = "no";
const two_strB3 = "noo";
const two_expected3 = false;

const two_strA4 = "silent";
const two_strB4 = "listen";
const two_expected4 = true;

/**
 * Determines whether s1 and s2 are anagrams of each other.
 * Anagrams have all the same letters but in different orders.
 * - Time: O(?).
 * - Space: O(?).
 * @param {string} s1
 * @param {string} s2
 * @returns {boolean} Whether s1 and s2 are anagrams.
 */
// function isAnagram(s1, s2) {}

function isAnagram(s1, s2) {
    if (s1.length != s2.length) {
        return false
    }
    obj1 = {};
    obj2 = {};
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    for (let i=0; i<s1.length; i++) {
        if (obj1[s1[i]]) {
        obj1[s1[i]] += 1;
        }
        else {
            obj1[s1[i]] = 1;
        }
        if (obj2[s2[i]]) {
        obj2[s2[i]] += 1;
        }
        else {
            obj2[s2[i]] = 1;
        }
    }
    for (key in obj1) {
        if (obj1[key] != obj2[key]) {
            return false
        }
    }
    return true
}
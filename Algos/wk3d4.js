/* 
Given an int to represent how much change is needed
calculate the fewest number of coins needed to create that change,
using the standard US denominations
*/

const cents1 = 25;
const expected1 = { quarter: 1 };

const cents2 = 50;
const expected2 = { quarter: 2 };

const cents3 = 9;
const expected3 = { nickel: 1, penny: 4 };

const cents4 = 99;
const expected4 = { quarter: 3, dime: 2, penny: 4 };

/**
 * Calculates the fewest coins of the standard American denominations needed
 *    to reach the given cents amount.
 * - Time: O(?).
 * - Space: O(?).
 * @param {number} cents
 * @param {string} sick
 * @returns {Object<string, number>} - A denomination table where the keys are
 *    denomination names and the value is the amount of that denomination
 *    needed.
 */

/* find amount of largest coin, if remainder > 0, check next coin
*/
// function fewestCoinChange(cents) {}
function fewestCoinChange(cents) {
    var change = {}
    var quarter = Math.floor(cents / 25);
    cents -=quarter*25
    if (quarter > 0){
        change['quarter'] = quarter
    }
    var dime = Math.floor(cents/10)
    cents -=dime*10
    if (dime > 0){
        change['dime'] = dime
    }
    var nickel = Math.floor(cents/5)
    cents -=nickel*5
    if (nickel > 0){
        change['nickel'] = nickel
    }
    var pennies = cents
    if (pennies > 0){
        change['pennies'] = pennies
    }
    cents-=pennies
    console.log(change)
    return change
}

/* 
Missing Value
You are given an array of length N that contains, in no particular order,
integers from 0 to N . One integer value is missing.
Quickly determine and return the missing value.
*/

const two_nums1 = [3, 0, 1];
const two_expected1 = 2;

const two_nums2 = [3, 0, 1, 2];
const two_expected2 = null;
// Explanation: nothing is missing

/* 
Bonus: now the lowest value can now be any integer (including negatives),
instead of always being 0. 
*/

const two_nums3 = [2, -4, 0, -3, -2, 1];
const two_expected3 = -1;

const two_nums4 = [5, 2, 7, 8, 4, 9, 3];
const two_expected4 = 6;

/**
 * Determines what the missing int is in the given unordered array of ints
 *    which spans from 0 to N where only one int is missing. With this missing
 *    int, a consecutive sequence of ints could be formed from the array.
 * Bonus: Given ints can span from N to M (start and end anywhere).
 * - Time: O(?).
 * - Space: O(?).
 * @param {Array<number>} unorderedNums
 * @returns {number|null} The missing integer needed to be able to form an unbroken
 *    consecutive set of integers from the given array or null if none is missing.
 */
// function missingValue(unorderedNums) {}

function missingValue(unorderedNums) {
    let min = unorderedNums[0]
    let max = unorderedNums[0]
    let expectedSum = 0
    let sum = 0

    for (const num of unorderedNums){
        if (num < min) min = num
        if (num > max) max = num
        sum += num
    }

    for (let i=min; i<=max; i++){
        expectedSum += i
    }
    // console.log(`min: ${min} | max: ${max} | sum: ${sum} | expectedSum: ${expectedSum} | difference: ${expectedSum - sum}`);
    return sum === expectedSum ? null : expectedSum - sum
}
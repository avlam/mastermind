const passwordLength = 4;
const passwordDigits = ['0','1','2','3','4','5','6','7','8','9'];

var game = {
    // 'playerName' : [],
    // 'gameId' : [],
    'guessNumber': [],
    'guess' : [],
    'rightDigitRightPlace' : [],
    'rightDigitWrongPlace' : [],
    'password' : []
}

var guessCounter = 0;

let $history = d3
        .select('#guess-history')


function generatePassword(){
    // code to randomly generate a password based on parameters defined
    // reset guessCounter whenever generatingg a new password
    guessCounter = 0;
    var pw = []
    for(var i = 0; i < passwordLength; i++){
        var digit = passwordDigits[Math.floor(Math.random() * passwordDigits.length)];
        pw.push(digit)
    }
    return pw
}

function checkAnswer(guess, password){
    // code to check 
    $guessText.node().value = '';
    if(validateAnswer(guess)){
        // console.log(`${guess}: ${password}`);
        // create dictionary of guess
        var pwRemainder = [];
        var guessRemainder = [];
        var rightPlace = 0;
        var rightDigit = 0;
        for(var n=0; n<guess.length; n++){
            if(guess[n]==password[n]){
                rightPlace++;
            }
            else{
                pwRemainder.push(password[n]);
                guessRemainder.push(guess[n]);
            }
        }
        // console.log(pwRemainder)
        // console.log(guessRemainder)
        if(guessRemainder.length > 0){
            for(var m=0; m<guessRemainder.length; m++){
                if(pwRemainder.includes(guessRemainder[m])){
                    rightDigit++;
                } 
            }
        }
        var output = [rightPlace, rightDigit]
        console.log(output)
        return output
    }
    else{alert('Invalid Guess!\nTry Again')}
}

function validateAnswer(guess){
    var validFormat = new RegExp(`[0-9]{${passwordLength}}`);
    console.log(validFormat.test(guess));
    return validFormat.test(guess)
}

function updateGuessHistory(guess,rightPlace,rightDigit){
    guessCounter++
    $history.select('tbody')
        .append('tr')
        .selectAll('td')
        .data([guessCounter,guess,rightPlace,rightDigit])
        .enter()
        .append('td')
        .text(function(data){return data});
        // .text(`${guessCounter}: ${guess}| ${rightPlace}-${rightDigit}`)
}

function writeGameRecord(guess,rightDigit,rightPlace){
    game['guessNumber'].push(guessCounter);
    game['guess'].push(guess);
    game['rightDigitRightPlace'].push(rightPlace);
    game['rightDigitWrongPlace'].push(rightDigit);
    game['password'].push(password.join(''));
}

function gameWon(rightPlace){
    if(rightPlace == passwordLength){
        $guess.attr('disabled');
        $history.append('p').text('You Won!');
        $headline
            .html('')
            .append('h1')
            .text(password.join(''));
        $headline
            .append('h2')
            .text(`guessed in ${guessCounter} attempts`);
    }
}

function displayFeedback(guess, rightPlace, rightDigit){
    d3.select('#guess-result')
        .select('p')
        .text(`${guess} has ${rightPlace} correct digits \
        in the right place, ${rightDigit} correct digits in the wrong place.`)
}

// Not Used
function createLock(){
    let $guess = d3.select('#comboLock')
    for(var i = 0; i < passwordLength; i++){
        var $selectDigit = $guess
            .append('select')
            .attr('name',`digit${i}_select`)
            .attr('id',`digit${i}`);
        addDigitWheel($selectDigit);
    } 
}

function addDigitWheel(parent){
    parent
        .selectAll('option')
        .data(passwordDigits)
        .enter()
        .append('option')
        .attr('value',function(data){return data})
        .text(function(data){return data})
}


// Script for page

// createLock(); Alternate input style
var password = generatePassword();
// console.log(password);

var $guessText = d3
    .select('#guess-text')
    .attr('maxlength',`${passwordLength}`)
    .attr('autocomplete','off')

var $guess = d3
    .select('#guess')
    .on('submit',function(){
        d3.event.preventDefault();
        var guess = $guessText.node().value;
        var feedback = checkAnswer(guess,password);
        updateGuessHistory(guess,feedback[0],feedback[1]);
        writeGameRecord(guess,feedback[0],feedback[1]);
        displayFeedback(guess,feedback[0],feedback[1]);
        gameWon(feedback[0])
    })

// Explain the rules
var $headline = d3.select('#pw-display');
$headline
    .append('h1')
    .text('Guess My Password!')
$headline
    .append('p')
    .text(`It's ${passwordLength} digits long, using 0-9 with potential repeats`);

// Give up button
d3
    .select('#forfeit')
    .attr('style','margin-top:1em;')
    .on('click',function(){
        $headline
            .html('')
            .append('h1')
            .text(`You gave up after ${guessCounter} attempts`);
        $headline
            .append('p')
            .text(`(the password was ${password.join('')}, by the way)`);
    })




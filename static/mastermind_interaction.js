const passwordLength = 4;
const passwordDigits = ['0','1','2','3','4','5','6','7','8','9'];
const randomIdMax = 10000; // max random number to assign to generic player

var game = {
    'playerName' : [],
    'guessNumber': [],
    'guess' : [],
    'rightDigitRightPlace' : [],
    'rightDigitWrongPlace' : [],
    'password' : []
}

var playerNameSet = false;
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
        var pwRemainder = {};
        var guessRemainder = [];
        var rightPlace = 0;
        var rightDigit = 0;
        for(var n=0; n<guess.length; n++){
            if(guess[n]==password[n]){
                rightPlace++;
            }
            else{
                // pwRemainder.push(password[n]);
                if(pwRemainder[password[n]] == undefined){pwRemainder[password[n]] = 1}
                else{pwRemainder[password[n]] += 1}
                guessRemainder.push(guess[n]);
            }
        }
        // console.log(pwRemainder)
        // console.log(guessRemainder)
        if(guessRemainder.length > 0){
            for(var m=0; m<guessRemainder.length; m++){
                if(pwRemainder[guessRemainder[m]] != undefined & pwRemainder[guessRemainder[m]] != 0){
                    rightDigit++;
                    pwRemainder[guessRemainder[m]] -= 1;
                }
                // if(pwRemainder.includes(guessRemainder[m])){
                //     rightDigit++;
                // } 
            }
        }
        var output = [rightPlace, rightDigit]
        // console.log(output)git pull
        return output
    }
    else{alert('Invalid Guess!\nTry Again')}
}

function validateAnswer(guess){
    var validFormat = new RegExp(`[0-9]{${passwordLength}}`);
    // console.log(validFormat.test(guess));
    return validFormat.test(guess)
}

function updateGuessHistory(guess,rightPlace,rightDigit){
    guessCounter++
    $history.select('tbody')
        // .append('tr')
        .insert('tr','tr')
        .selectAll('td')
        .data([
            ['guess-counter',guessCounter],
            ['guess',guess],
            ['right-place',rightPlace],
            ['right-digit',rightDigit]
        ])
        .enter()
        .append('td')
        .attr('class',function(data){return data[0]})
        .text(function(data){return data[1]});
        // .text(`${guessCounter}: ${guess}| ${rightPlace}-${rightDigit}`)
}

function writeGameRecord(guess,rightPlace,rightDigit){
    game['playerName'].push(playerName);
    game['guessNumber'].push(guessCounter);
    game['guess'].push(guess);
    game['rightDigitRightPlace'].push(rightPlace);
    game['rightDigitWrongPlace'].push(rightDigit);
    game['password'].push(password.join(''));
}

function gameWon(rightPlace){
    if(rightPlace == passwordLength){
        d3
            .select('#guess-result')
            .select('p')
            .text('You Won!');
        $headline
            .html('')
            .append('h1')
            .text(password.join(''));
        $headline
            .append('h2')
            .text(`guessed in ${guessCounter} attempts`);
        endGame();
    }
}

function disableInputs(){
    // $guess.attr('disabled',null);
    d3.select('#guess-text').attr('disabled',true);
    d3.select('#guess-submit').attr('disabled',true);
    d3.select('#forfeit').attr('disabled',true);
}

function provideDownload(){
    // Download game history as csv
    const csvHeaders = Object.keys(game);
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += csvHeaders.join(',') + '\r\n';
        for(var j=0; j<guessCounter; j++){
            var this_row = []
            for(var k=0; k<Object.keys(game).length; k++){
                var this_field = csvHeaders[k];
                this_row.push(game[this_field][j]);
            }
            csvContent += this_row.join(',') + '\r\n';
        }
    var encodedUri = encodeURI(csvContent);
    // console.log(csvContent);
    $headline
        .append('a')
        .attr('href',encodedUri)
        .attr('class','btn btn-secondary btn-sm m-3')
        .attr('role','button')
        .attr("download", "my_game.csv")
        .text('Download your game');
}

function displayFeedback(guess, rightPlace, rightDigit){
    d3.select('#guess-result')
        .select('p')
        .text(`${guess} has ${rightPlace} correct digits \
        in the right place, ${rightDigit} correct digits in the wrong place.`)
}

function setPlayerName(){
    var inputName = $playerName.node().value;
    var validPlayer = new RegExp(`[a-zA-Z]+`);
    if(validPlayer.test(inputName)){
        playerName = inputName;
    }
    else{
        playerName = `player${Math.floor(Math.random()*randomIdMax
    )}`;
    }
    $playerName.node().value = playerName;
    if(playerNameSet === false){
        playerNameSet = true;
        $playerName.attr('readonly',true)
    }
}

function endGame(){
    provideDownload();
    disableInputs();
    colorFeedback();
    colorGuess();
    $headline
        .append('a')
        .attr('href','/')
        .attr('class','btn btn-sm btn-primary m-3')
        .attr('role','button')
        .text('Play Again');
    //Write game record to database
    fetch('/log',{
        method: 'POST',
        body: JSON.stringify(game),
        headers: {
            'content-type': 'application/json'
        }
    });
    $guess.style('display','none');
    $forfeit.style('display','none');
    histotwo(guessCounter);
    pinGauge(password.join(''));
    var thisGame={}
    for(var i=0;i<Object.keys(game).length;i++){
        thisGame[Object.keys(game)[i]] = game[Object.keys(game)[i]].slice(-1);
    }
    console.log('this game:')
    console.log(thisGame)
    generateHall(thisGame);
}

function colorFeedback(){
    d3
    .select('#guess-history')
    .select('tbody')
    .selectAll('.right-digit')
    .each(function(data){
        var thisElement = d3.select(this);
        if(data[1]>0){thisElement.classed('almost',true)}
        thisElement.classed('feedback',true)
    });
    d3
    .select('#guess-history')
    .select('tbody')
    .selectAll('.right-place')
    .each(function(data){
        var thisElement = d3.select(this);
        if(data[1]>0){thisElement.classed('perfect',true)}
        thisElement.classed('feedback',true)
    });
}

function colorGuessController(candidate,index,reference){
    let feedback;
    if(candidate[index] == reference[index]){
        reference[index] = -1;
        feedback = 'perfect';
    }
    else if(reference.includes(candidate[index])){
        reference[reference.indexOf(candidate[index])] = -1;
        feedback = 'almost';
    }
    else{feedback = 'feedback';}
    return [feedback,reference]
}

function colorGuess(){
    d3
    .select('#guess-history')
    .select('tbody')
    .selectAll('.guess')
    .each(function(data,index){
        var thisElement = d3.select(this);
        thisElement.html('');
        let reference
        reference = password.slice(0); // slice makes a copy of password rather than linking the variables
        // console.log(`password is ${password}`);
        // console.log(`reset reference to ${reference}`);
        for(var i=0; i<data[1].length;i++){
            response = colorGuessController(data[1],i,reference)
            reference = response[1];
            // console.log(reference)
            thisElement
                .append('span')
                .classed('feedback',true)
                .classed(response[0],true)
                .text(data[1][i]);
        }
    });
}

// Script for page
// d3.select('body')
//     .insert('h1','div')
//     .attr('style','font-size:1em; background-color: #ff0800; text-align:center;')
//     .text('This game is in Beta. Come back again later for visualizations!')

var password = generatePassword();
// console.log(password);

var $playerName = d3
    .select('#player-name')
    .attr('autocomplete','off');

var $guessText = d3
    .select('#guess-text')
    .attr('maxlength',`${passwordLength}`)
    .attr('autocomplete','off');

var $guess = d3
    .select('#guess')
    .on('submit',function(){
        d3.event.preventDefault();
        setPlayerName();
        var guess = $guessText.node().value;
        var feedback = checkAnswer(guess,password);
        updateGuessHistory(guess,feedback[0],feedback[1]);
        writeGameRecord(guess,feedback[0],feedback[1]);
        displayFeedback(guess,feedback[0],feedback[1]);
        gameWon(feedback[0]);
    })

// Explain the rules
var $headline = d3.select('#pw-display');
$headline
    .append('h1')
    .text('Guess My PIN !')
//$headline
//    .append('p')
//    .text(`It's ${passwordLength} digits long, using 0-9 with potential repeats`);

// Give up button
var $forfeit = d3
    .select('#forfeit')
    // .attr('style','margin-top:1em;')
    .on('click',function(){
        $headline
            .html('')
            .append('h1')
            .text(`You gave up after ${guessCounter} attempts`);
        $headline
            .append('p')
            .text(`(the password was ${password.join('')}, by the way)`);
        endGame();
    })







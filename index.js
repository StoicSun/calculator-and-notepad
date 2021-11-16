let usrInput = document.querySelector('#number-in');
const clrBtn = document.querySelector('.clear');
const calcBtn = document.querySelectorAll('.calc-btn');
const factBtn = document.querySelector('.factorial');
const equalBtn = document.querySelector('.equal');
const divText = document.querySelector('.text');

// regex expression for only allowing numbers and operators
const re = new RegExp('^[0-9*()+\/.-]*$');

window.onload = () => usrInput.value = 0;

function cursorEnd() {
    //returning focus to input box
    const end = usrInput.value.length;
    usrInput.setSelectionRange(end, end);
    usrInput.focus();
}

// calcing result 
function calcResult() {
    let result = eval(usrInput.value);
    usrInput.value = result;
}

// submit event on Enter key
function enterKeyPressed(event) {
    if (event.keyCode === 13 && re.test(usrInput.value)) {
        calcResult();
        cursorEnd();
    }
    // Stopping the use of space and tab keys
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
}

// Clear btn event
clrBtn.addEventListener('click', e => {
    // reseting value of input to 0
    usrInput.value = '0'
    cursorEnd()
})

// Getting the value from the calc btns
calcBtn.forEach(item => {
    item.addEventListener('click', e => {
        if (item.value === '') {
            return
        } else {
            if (usrInput.value === '0' && !isNaN(item.value)) { /*checking to see if the calc is in intial state and pressed
        button is a number */
                usrInput.value = item.value;
                cursorEnd();
            } else { // if calc is not in initial state user's input is concatenated to the previous input
                usrInput.value += item.value;
                cursorEnd();
            }
        }
    })
})

// factorial function
function factorial(x) {
    inputDigit = parseFloat(x)
    let factorial = 1;
    if (inputDigit === 0 || inputDigit === 1) {
        usrInput.value = '1';
    }
    for (let i = 1; i <= inputDigit; i++) {
        factorial *= i;
    }
    usrInput.value = `${factorial}`;
}

// calculating factorial from input
factBtn.addEventListener('click', e => {
    calcResult()
    try {
        factorial(usrInput.value);
    }
    catch (error) {
        console.error(error);
    }
})

// equal to button
equalBtn.addEventListener('click', e => {
    if (re.test(usrInput.value)) {
        calcResult();
        cursorEnd();
    }
})

const eraserBtn = document.querySelector('.eraser-btn')
// removes animation after 900ms courtsey of nitesh
eraserBtn.addEventListener('click', e => {
    eraserBtn.classList.add('eraser-ani');
    setTimeout(() => {eraserBtn.classList.remove('eraser-ani')}, 900);
    divText.innerHTML = '';
    //returning focus to input box
    placeCaretAtEnd(divText)
    })

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
    
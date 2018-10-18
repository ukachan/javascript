"use strict";

// vue.js
var app = new Vue({
    el: '#app',
    data: {
        message: '',
        task: '',
        time: '0.00',
        correct: '0',
        miss: '0',
        seen: false,
        clear: 20
    }
})

// initialize
const enterKey = 13;
const str = taskCreate();
const maxNum = str.length;
const input_r = bid('input_r');
const prev = bid('prev');
const resetButton = bid('reset');
const guage = bid('guage');
const correctSound = new Audio();
const missSound = new Audio();
const clearSound = new Audio();
correctSound.src = './sound/correct.mp3';
missSound.src = './sound/miss.mp3';
clearSound.src = './sound/clear.mp3';
let setTime;
let start;
ael(input_r, 'keyup', pressEve);
ael(resetButton, 'click', resetFunc);

// task string set
app.task = str[random()];

// functions
function timer() {
    setTime = setTimeout(function() {
        let t = Date.now() - start;
        input_r.placeholder = '';
        app.time = (t / 1000).toFixed(2);
        timer();
    }, 10);
}
function pressEve(eve) {
    if(app.time === '0.00' && eve.currentTarget.value !== '') {
        if(zenkakuCheck(eve.currentTarget.value)) {
            start = Date.now();
            timer();
        }else{
            alert('このゲームは半角入力しか出てきませんので半角入力に切り換えて下さい。');
            reset();
        }
    }
    if(eve.keyCode === enterKey) {
        let correct = app.task;
        let ans = input_r.value;
        if(correct === ans){
            let elm = document.createElement('span');
            elm.setAttribute('class', 'correct');
            elm.innerText = '○：' + ans;
            prev.appendChild(elm);
            app.message = '';
            app.task = str[random()];
            app.correct = parseInt(app.correct) + 1;
            gauge.style.width = (parseInt(app.correct) / app.clear * 100) + "%";
            if(parseInt(app.correct) === app.clear) {
                clearSound.play();
                clearTimeout(setTime);
                input_r.placeholder = 'If you try it again Please Press resetButton';
                input_r.disabled = true;
                app.seen = true;
                alert('clear!' + '\n' + 'clear time: ' + time.innerText);
            }else {
                correctSound.play();
            }
        }else {
            missSound.play();
            let elm = document.createElement('span');
            elm.setAttribute('class', 'miss');
            elm.innerText = '×：' + ans;
            app.message = '';
            app.miss = parseInt(app.miss) + 1;
            prev.appendChild(elm);
            eve.currentTarget.value = '';
            eve.currentTarget.value = '';
        }
    }
}
function random() {
    return Math.floor(Math.random() * maxNum);
}
function resetFunc(eve) {
    reset();
}
function reset() {
    app.correct = '0';
    app.miss = '0';
    app.time = '0.00';
    app.message = '';
    app.seen = false;
    gauge.style.width = '0';
    prev.innerHTML = '';
    input_r.placeholder = 'Here to enter the character';
    input_r.value = '';
    input_r.disabled = false;
    clearTimeout(setTime);
}
function zenkakuCheck(value) {
    if(!value.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) {
        return true;
    }else{
        return false;
    }
}
function taskCreate() {
    let arr = [
        'div',
        'span',
        'input',
        'html',
        'lang="ja"',
        'header',
        'footer',
        'article',
        'section',
        'class',
        'html5',
        'href',
        'link',
        'aside',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'nav',
        '<ul><li>',
        '<ol><li>',
        'source',
        'button',
        'textarea',
        'stylesheet',
        'css3',
        'background',
        'text-shadow',
        'box-shadow',
        '@media',
        '@keyframes',
        'font-size',
        'color',
        'width',
        'height',
        'margin',
        'padding',
        'border',
        'position',
        'display',
        'left',
        'right',
        'top',
        'bottom',
        'text-align',
        'cursor',
        'line-height',
        'font-family',
        '<?php',
        'var_dump',
        'substr',
        'mb_strlen',
        'include_once',
        '$_POST',
        '$_GET',
        'intval',
        'strval',
        'foreach',
        '$key',
        '$value',
        'strpos',
        'explode',
        'implode',
        'strlen',
        'switch',
        'default',
        'break',
        'array_push',
        'str_replace',
        'substr_replace',
        'preg_match',
        'strtotime',
        'javascript',
        'null',
        'undefined',
        'empty',
        'function',
        'let',
        'var',
        'const',
        'ajax',
        'console.log',
        'alert',
        'length',
        'addEventListener',
        'document.getElementById',
        'document.getElementsByClassName',
        'document.getElementsByTagName',
        'object',
        'new Object',
        'getFullYear()',
        'getYear()',
        'getMonth()',
        'parseInt',
        'createElement',
        'appendChild',
        'removeChild',
        'Math.random()',
        'Math.floor',
        'script',
    ];
    return arr;
}


function bid(id) {
    return document.getElementById(id);
}
function ael(elm, type, func) {
    elm.addEventListener(type, func, {once:false, passive: false, capture: false});
}
const container = document.querySelector('#container');
const asciiArt = document.querySelector('#asciiArt');
const winOrLose = document.querySelector('#result');
const inputText = document.querySelector('#inputText');
const timeLeft = document.querySelector('#timeLeft');
//html 연결

const asciiArtData = [
    `
  (| /)
  ( . .)
 c(")(")
 `,
    `                _
            ,.-" "-.,
           /   ===   \\
          /  =======  \\
       __|  (o)   (0)  |__
      / _|    .---.    |_ \\
     | /.----/ O O \----.\\ |
      \\/     |     |     \\/
      |                   |
      |                   |
      |                   |
      _\\   -.,_____,.-   /_
  ,.-"  "-.,_________,.-"  "-.,
 /          |       |          \\
|           l.     .l           |
|            |     |            |
l.           |     |           .l
 |           l.   .l           | \\,
 l.           |   |           .l   \\,
  |           |   |           |      \\,
  l.          |   |          .l        |
   |          |   |          |         |
   |          |---|          |         |
   |          |   |          |         |
   /"-.,__,.-"\\   /"-.,__,.-"\\"-.,_,.-"\\
  |            \\ /            |         |
  |             |             |         |
   \\__|__|__|__/ \\__|__|__|__/ \\_|__|__/ `,
    `
      .-.          _,-.
   ,--',-."--~"~--"_,-.'-.
  / ,'    '        '    '. \\
,','       )      (       '.'.
',-       (d ,==. b)        _/
/          > ,--. <        -.\\
'-,'      /  ,--.  \\         _)
 (  /    (__\\,--./__)     \\_/
  '-._, / /| ==.|\\ \\-._,-'
        / / |,--.| \\ \\
       | |  | =- |  | |
        \\ \\ |,--.| / /
         '.\\| -= |/.'
            |'-='|
            |,--.|
            ;'-=.;
           /'==./
          /'=-,'
        ,''=,'
       /'-./
     (_,-'
    `,
    `   ,
_,,)\\.~,,._
(()'  '')\\))),,_
 |     \\ ''((\\)))),,_          ____
 |6'   |   ''((\\())) "-.____.-"    '-.-,
 |    .'\\    ''))))'                  \\)))
 |   |   ''.     ''                     ((((
 \\, _)     \\/                          |))))
  ''        |                          (((((
            \                  |       ))))))
             '|    |           ,\\     /((((((
              |   / '-.______.<  \\   |  )))))
              |   |  /         '. \\  \\  ((((
              |  / \\ |           '.\  | (((
              \\  | | |             )| |  ))
               | | | |            / | |  '
               | | /_(           /_(/ /
               /_(/__]           \\_/_(
              /__]                /__]
              `,
    `
      /)---(\\          /~~~\\
\\\\   (/ . . \\)        /  .. \\
 \\\\__)-\\(*)/         (_,\\  |_)
 \\_       (_         /   \\@/    /^^^\\
 (___/-(____) _     /      \\   / . . \\
              \\\\   /  '    |   V\\ Y /V
               \\\\/  \\   | _\\    / - \\
                \\   /__'|| \\\\_  |    \\
                 \\_____)|_).\\_).||(__V
              `,
    `
   ("'-/")_.-'"''-._
    . . '; -._    )-;-,_')
   (v_,)'  _  )'-.\\  ''-'
  _.- _..-_/ / ((.'
((,.-'   ((,/
              `,
    `
                 ,  ,, ,
           , ,; ; ;;  ; ;  ;
        , ; ';  ;  ;; .-''\\ ; ;
     , ;  ;'  ; ,; . / /8b \\ ; ;
     '; ; .;'         ;,\\8 |  ;  ;
      ' ;/   / '_      ; ;;    ;  ; ;
         |/.'  /9)    ;  ; '    ;  ; ;
        ,/'          ; ; ;  ;   ; ; ; ;
       /_            ;    ;  '    ;  ;
      '?8P"  .      ;  ; ; ; ;     ;  ;;
      | ;  .:: '     ;; ; ;   '  ;  ;
      ' '--._      ;;  ;;  ; ;   ;   ;
       '-..__..--''   ; ;    ;;   ; ;   ;
                   ;    ; ; ;   ;     ;
                   `,
    `
  _      _      _
>(.)__ <(.)__ =(.)__
 (___/  (___/  (___/ 
               `,
    `
             .-=-.
           .'     \\_
        __.|    9 )_\\
   _.-''          /
<''     ..._    <'
 '._ .-'    '.  |
  ; '.    .-'  /
   \\  '~~'  _.'
    '"..."'% _
      \\__  |'.
      /'.
      `,
    `                         _.'.__
                      _.'      .
':'.               .''   __ __  .
  '.:._          ./  _ ''     "-'.__
.'''-: """-._    | .                "-"._
 '.     .    "._.'                       "
    '.   "-.___ .        .'          .  :o'.
      |   .----  .      .           .'     (
       '|  ----. '   ,.._                _-'
        .' .---  |.""  .-:;.. _____.----'
        |   .-""""    |      '
      .'  _'         .'    _'
     |_.-'            '-.'
     `
]
// asciiArtDada 아스키아트들 모음

const timeLimits = [20, 70, 70, 60, 50, 40, 60, 25, 50, 60];

let asciiString = []; //배열. 수정가능
let timeLeftValue = 30; //시간제한 초기값 지정
let timerInterval; //타이머 저장 변수
let timeOut = false; //게임 상태
let result = '';
let lastInputValue = '';
//전역변수 선언


if (inputText) {
    startGame();
}
function startGame() { //게임시작 함수
    const randomIndex = Math.floor(Math.random() * asciiArtData.length);
    const nowAsciiString = asciiArtData[randomIndex]; //nowAsciiArt에 원본 아스키아트 저장
    timeLeftValue = timeLimits[randomIndex]; //아스키아트에 맞는 시간제한 설정
    asciiString = nowAsciiString.split(''); //전역함수 asciiString에 배열로 저장
    asciiArt.textContent = nowAsciiString; //html asciiArt에 nowAsciiString 내용 반영
    lastInputValue = '';
    if (inputText) { //인풋이 있다면 > 게임 시작
        inputText.addEventListener('input', typing); //inputText에 저장
        inputText.focus(); //타이핑할 수 있도록 화면키보드 준비
    }
    startTimer();
}

function endGame() { //게임끝 함수
    timeOut = true; //타임아웃
    clearInterval(timerInterval); //타이머 중지
    if (inputText) {
        inputText.removeEventListener('input', typing);
    }
    if (result === 'win') {
        asciiArt.textContent = '';
        winOrLose.textContent = "승리";
        container.style.width = '70%';
        container.style.height = '70%';
        inputText.placeholder = '';
        timeLeft.textContent = `남은 시간 : ${timeLeftValue}`;
    } else {
        asciiArt.textContent = '';
        winOrLose.textContent = "패배 (시간초과)";
        container.style.width = '70%';
        container.style.height = '70%';
        inputText.placeholder = '';
    }
}

function typing(event) { //타이핑 된 문자 지우기 함수
    if (timeOut) return;
    const currentText = event.target.value;
    const typedChar = currentText.length > lastInputValue.length
        ? currentText.slice(-1)  // 새로 입력된 마지막 한 글자
        : ''; //마지막 문자만 typedChar에 저장
    event.target.value = ''; //입력칸 비우기
    lastInputValue = '';

    if (typedChar && typedChar !== '\n') {
        const textString = asciiString.join(''); //배열을 문자열로. indexOf 쓰기 위해!
        const targetIndex = textString.indexOf(typedChar); //입력된 문자(같은게여러개라면가장앞)의 인덱스를 targetIndex에 저장
        if (targetIndex !== -1) { //문자가 존재한다면
            asciiString[targetIndex] = ' '; //asciiString에서 targetIndex자리 공백처리
            asciiArt.textContent = asciiString.join(''); //html asciiArt에 반영
            const checkText = asciiString.join('').replace(/\s/g, '');
            if (checkText.length === 0) {
                result = 'win';
                endGame();
            }
        }
    }
}

function startTimer() { //타이머 시작
    showTimeLeft(); //초기 시간 표시
    timerInterval = setInterval(() => {
        if (timeOut) {
            return clearInterval(timerInterval);
        }
        timeLeftValue--; //시간 줄이기
        showTimeLeft(); //남은 시간 표기
        if (timeLeftValue <= 0) {
            result = 'lose';
            endGame();
        }

    }, 1000);
}

function showTimeLeft() { //시간제한 표시
    if (timeLeft) {
        timeLeft.textContent = `제한 시간 : ${timeLeftValue}`;
    }
}
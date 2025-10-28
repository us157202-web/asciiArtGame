const asciiArt = document.querySelector('#asciiArt');
const inputText = document.querySelector('#inputText');
const timeLeft = document.querySelector('#timeLeft');
//html 연결

const asciiArtData = [
    `
   (| /)
   ( . .)
 c(")(")
 `,
    `
yes            yes                  yesyes   
yesyes       yes              yes         yes
yes   yes    yes             yes           yes
yes     yes  yes             yes           yes  
yes       yes yes             yes         yes
yes            yes                  yesyes
`,
    `
Y
   E
     S
      s
       s
       s
       s
      o
     o
    .
    .
     .
      .
`,
    `
 6(^______^)9
 `,
    `
  /|_/|
 (  '_' )
 /(   )|
   / |
 `
] // asciiArtDada 아스키아트들 모음

let asciiString = []; //배열. 수정가능
let timeLeftValue = 30; //시간제한 초기값 지정
let timerInterval; //타이머 저장 변수
let timeOut = false; //게임 상태
let result = '';
//전역변수 선언


if (inputText) {
    startGame();
}
function startGame() { //게임시작 함수
    const randomIndex = Math.floor(Math.random() * asciiArtData.length);
    const nowAsciiString = asciiArtData[randomIndex]; //nowAsciiArt에 원본 아스키아트 저장
    asciiString = nowAsciiString.split(''); //전역함수 asciiString에 배열로 저장
    asciiArt.textContent = nowAsciiString; //html asciiArt에 nowAsciiString 내용 반영
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
        asciiArt.textContent = "승리";
    } else {
        asciiArt.textContent = "패배 (시간초과)";
    }
}

function typing(event) { //타이핑 된 문자 지우기 함수
    if (timeOut) return;
    const typedText = event.target.value; //입력된 값 typedText에 저장
    if (typedText.length == 1) { //한글자씩 처리
        event.target.value = ''; //입력칸 비우기
        const textString = asciiString.join(''); //배열을 문자열로. indexOf 쓰기 위해!
        const targetIndex = textString.indexOf(typedText); //입력된 문자(같은게여러개라면가장앞)의 인덱스를 targetIndex에 저장
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
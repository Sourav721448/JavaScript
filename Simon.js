let gameSeq=[];
let userSeq=[];

let btns=["yellow","green","sky","purple"];
let h2=document.querySelector("h2");

let started=false;
let level=0;
let username="";
let highScore = JSON.parse(localStorage.getItem("highScore")) || { name: "", score: 0 };


document.addEventListener("keypress",function(){
    if(started==false){
        username=prompt("eneter the user name");
        if(username){
        started=true;
        levelUp();
    }
}
});

function displayHighScore() {
    const highScoreText = `High Score: ${highScore.name} - Level ${highScore.score}`;
    const highScoreElement = document.createElement("div");
    highScoreElement.innerText = highScoreText;
    document.body.appendChild(highScoreElement);
}

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;
    let randIndx=Math.floor(Math.random()*4);
    let randColor=btns[randIndx];
    let randBtn=document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp(),1000);    
        }
    }
    else{
        h2.innerHTML=`Game over. <b>${username} your score is ${level}</b>.<br>Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
    
        if (level > highScore.score) {
            document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
            highScore ={ name: username, score: level };
            localStorage.setItem("highScore", JSON.stringify(highScore));
            alert(`New High Score! ${username}:you score Level ${level}`);
        }
        displayHighScore();
        reset();
        }
    }




function btnPress(){
    console.log("button was pressed");
    let btn=this;
     btnFlash(btn);

    let userColor=btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(let btn of allBtns){
btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
}
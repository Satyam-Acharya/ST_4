//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let li=[-1,-1,-1,-1,-1]

// if continueQuiz button clicked
start_btn.onclick = ()=>{
    start_btn.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz");
    next_btn.classList.add("show");
    showQuetions(0);
    queCounter(1);
    currQues(1);
    startTimer(30);
}

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;

const quit_quiz = result_box.querySelector(".buttons .quit");


// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload();
}

const next_btn = document.querySelector("footer .next_btn");
const prev_btn = document.querySelector("footer .prev_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuetions(que_count);
        queCounter(que_numb);
        currQues(que_numb);
    }
    else{
        clearInterval(counter);
        showResult();
    }
}

prev_btn.onclick = ()=>{
    if(que_count > 0){
        que_count--;
        que_numb--;
        showQuetions(que_count);
        queCounter(que_numb);
        currQues(que_numb);
    }
}

function tglQuetions(index){
        que_count=index;
        que_numb=index+1;
        showQuetions(que_count);
        queCounter(que_numb);
        currQues(que_numb);
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
        if(option[i].textContent==li[index]){
            option[i].classList.add("select");
        }else if(li[index]!=-1){
            option_list.children[i].classList.add("disabled");
        }

    }
    if(index==4){
        next_btn.textContent="Submit";
    }else{
        next_btn.textContent="Next";
    }
    
}

//if user clicked on option
function optionSelected(answer){
    let userAns = answer.textContent;
    const allOptions = option_list.children.length;
    answer.classList.add("select");
    li[que_count]=userAns;

    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult(){
    for(i=0;i<5;i++){
        if(questions[i].answer==li[i]){
            userScore++;
        }
    }
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '<span>You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
    scoreText.innerHTML = scoreTag;
    
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            showResult();
        }
    }
}


function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}

function currQues(index){
    for(i=1;i<=5;i++){
        document.getElementById("q"+i).classList.remove("select");
    }
    document.getElementById("q"+index).classList.add("select");
}
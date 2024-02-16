let questions = [
    {
    numb: 1,
    question: "Which European city is renowned for its canals and gondolas?",
    answer: "A) Venice",
    options: [
      "A) Venice",
      "B) Amsterdam",
      "C) Prague",
      "D) Barcelona"
    ]
  },
    {
    numb: 2,
    question: "What is the capital city of Japan?",
    answer: "B) Tokyo",
    options: [
      "A) Beijing",
      "B) Tokyo",
      "C) Seoul",
      "D) Bangkok"
    ]
  },
    {
    numb: 3,
    question: "Which country is famous for its ancient archaeological site of Machu Picchu?",
    answer: "A) Peru",
    options: [
      "A) Peru",
      "B) Egypt",
      "C) Greece",
      "D) Mexico"
    ]
  },
    {
    numb: 4,
    question: "Which African country is known for its abundant wildlife and safari tours?",
    answer: "A) Kenya",
    options: [
      "A) Kenya",
      "B) Brazil",
      "C) New Zealand",
      "D) Canada"
    ]
  },
    {
    numb: 5,
    question: "What is the tallest mountain in the world?",
    answer: "B) Mount Everest",
    options: [
      "A) Mount Kilimanjaro",
      "B) Mount Everest",
      "C) Mount McKinley",
      "D) Mount Fuji"
    ]
  },
  {
    numb: 6,
    question: "What is the currency used in Switzerland?",
    answer: "C) Swiss Franc",
    options: [
      "A) Euro",
      "B) Pound Sterling",
      "C) Swiss Franc",
      "D) Yen"
    ]
  },
  {
    numb: 7,
    question: "Which U.S. state is famous for its entertainment capital, Hollywood?",
    answer: "A) California",
    options: [
      "A) California",
      "B) New York",
      "C) Texas",
      "D) Florida"
    ]
  },
  {
    numb:8,
    question: "Which island in the Mediterranean Sea is divided into Greek and Turkish parts?",
    answer: "A) Cyprus",
    options: [
      "A) Cyprus",
      "B) Sicily",
      "C) Crete",
      "D) Corsica"
    ]
  },
  {
    numb: 9,
    question: "Which famous rock fortress is located in Sri Lanka, offering stunning panoramic views of the surrounding area?",
    answer: "C) Swiss Franc",
    options: [
      "A) Machu Picchu",
      "B) Petra",
      "C) Sigiriya (Lion Rock)",
      "D) Acropolis"
    ]
  },
  {
    numb: 10,
    question: "In which country would you find the famous landmark, the Taj Mahal?",
    answer: "A) India",
    options: [
      "A) India",
      "B) Egypt",
      "C) China",
      "D) Greece"
    ]
  },
  
];

const start_btn = document.querySelector(".start_btn button");
const rule_area = document.querySelector(".rule_area");
const exit_btn = rule_area.querySelector(".buttons .exit");
const continue_btn = rule_area.querySelector(".buttons .restart");
const quiz_area = document.querySelector(".quiz_area");
const result_area = document.querySelector(".result_area");
const answerx = document.querySelector(".answerx");
const timeText = document.querySelector(".timer .time_over");
const timeCount = document.querySelector(".timer .timer_count");       


start_btn.onclick = ()=>{
    rule_area.classList.add("activeRule");
}

exit_btn.onclick = ()=>{
    rule_area.classList.remove("activeRule"); 
}

continue_btn.onclick = ()=>{
  rule_area.classList.remove("activeRule"); 
    quiz_area.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(10);
}

let timeValue =  10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_area.querySelector(".buttons .restart");
const exit_quiz = result_area.querySelector(".buttons .exit");

restart_quiz.onclick = ()=>{
    quiz_area.classList.add("activeQuiz"); 
    result_area.classList.remove("activeResult"); 
    timeValue = 10; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); 
}


exit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}


function showQuetions(index){
    const questionsx = document.querySelector(".questionsx");

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    questionsx.innerHTML = que_tag; 
    answerx.innerHTML = option_tag; 
    
    const option = answerx.querySelectorAll(".option");

    
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = answerx.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(answerx.children[i].textContent == correcAns){ 
              answerx.children[i].setAttribute("class", "option correct"); 
              answerx.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
      answerx.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show"); 
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
            timeText.textContent = "Time End"; 
            const allOptions = answerx.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(answerx.children[i].textContent == correcAns){ 
                  answerx.children[i].setAttribute("class", "option correct"); 
                  answerx.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time End: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
              answerx.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); 
        }
    }
}
function showResult(){
    rule_area.classList.remove("activeRule"); 
    quiz_area.classList.remove("activeQuiz"); 
    result_area.classList.add("activeResult"); 
    const scoreText = result_area.querySelector(".score_text");
    if (userScore > 8){ 
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 5){ 
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}
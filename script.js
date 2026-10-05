const menuToggle=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");
menuToggle.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const duas=[
 {arabic:"رَبِّ زِدْنِي عِلْمًا",title:"Dua for Beneficial Knowledge",meaning:"“My Lord, increase me in knowledge.”",source:"Quran 20:114"},
 {arabic:"رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",title:"Dua for Goodness",meaning:"“Our Lord, give us good in this world.”",source:"Quran 2:201"},
 {arabic:"رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",title:"Dua for Parents",meaning:"“My Lord, forgive me and my parents.”",source:"Quran 71:28"}
];
let duaIndex=0;
document.getElementById("newDua").addEventListener("click",()=>{
 duaIndex=(duaIndex+1)%duas.length;
 const d=duas[duaIndex];
 document.getElementById("duaArabic").textContent=d.arabic;
 document.getElementById("duaTitle").textContent=d.title;
 document.getElementById("duaMeaning").textContent=d.meaning;
 document.querySelector(".source").textContent=d.source;
});

const questions=[
 {q:"Which is the first month of the Islamic calendar?",a:["Muharram","Ramadan","Shawwal","Rajab"],correct:0},
 {q:"How many obligatory prayers are there in a day?",a:["3","4","5","6"],correct:2},
 {q:"Which is the holy book of Islam?",a:["Torah","Quran","Bible","Zabur"],correct:1},
 {q:"Which month do Muslims fast in?",a:["Muharram","Shaban","Ramadan","Safar"],correct:2},
 {q:"What is the direction Muslims face during Salah called?",a:["Qiblah","Hijrah","Miqat","Madinah"],correct:0}
];
let qIndex=0,points=0,answered=false;
const questionEl=document.getElementById("question"),answersEl=document.getElementById("answers"),nextBtn=document.getElementById("nextQuestion"),resultEl=document.getElementById("quizResult");
function loadQuestion(){
 answered=false;
 const item=questions[qIndex];
 document.getElementById("questionNumber").textContent=`Question ${qIndex+1} of ${questions.length}`;
 document.getElementById("score").textContent=`Score: ${points}`;
 questionEl.textContent=item.q; answersEl.innerHTML="";
 nextBtn.classList.add("hidden"); resultEl.classList.add("hidden");
 item.a.forEach((answer,i)=>{
   const btn=document.createElement("button"); btn.className="answer"; btn.textContent=answer;
   btn.addEventListener("click",()=>chooseAnswer(i,btn)); answersEl.appendChild(btn);
 });
}
function chooseAnswer(i,btn){
 if(answered)return; answered=true;
 const correct=questions[qIndex].correct;
 [...answersEl.children].forEach((b,n)=>{if(n===correct)b.classList.add("correct")});
 if(i===correct){points++;btn.classList.add("correct")}else btn.classList.add("wrong");
 document.getElementById("score").textContent=`Score: ${points}`;
 nextBtn.textContent=qIndex===questions.length-1?"See Result":"Next Question";
 nextBtn.classList.remove("hidden");
}
nextBtn.addEventListener("click",()=>{
 if(qIndex<questions.length-1){qIndex++;loadQuestion()}
 else{
   questionEl.textContent=`You scored ${points} out of ${questions.length}!`;
   answersEl.innerHTML="";
   resultEl.textContent=points===questions.length?"🌟 Excellent! MashaAllah!":"🌸 Keep learning — every question is a new opportunity!";
   resultEl.classList.remove("hidden"); nextBtn.textContent="Try Again"; nextBtn.onclick=()=>{qIndex=0;points=0;nextBtn.onclick=null;loadQuestion()};
 }
});
loadQuestion();

document.getElementById("year").textContent=new Date().getFullYear();
const topBtn=document.getElementById("topBtn");
window.addEventListener("scroll",()=>{topBtn.style.display=window.scrollY>500?"block":"none"});
topBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

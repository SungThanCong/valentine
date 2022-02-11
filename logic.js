const input = document.querySelector('#nhapten-input');
const btn_add = document.querySelector('#nhapten-btn');
const show_list = document.querySelector('#list_name');
const show_quantity = document.querySelector('#part-1-soluong');
const start_icon = document.querySelector('.part2-icon');
const show_question = document.querySelector('.part2-question');
const show_answer = document.querySelector('.part2-answer');
const count_question = document.querySelector('#so-cau-hoi');
const result = document.querySelector('#part-3');

var list_name = [];
const value_list_name = new Map();
var questions = [];
var count = 0;

btn_add.onclick = () =>{
    if(list_name.length >= 9){
        alert('Thương ít thôi bạn ơi! :>');
        return;
    }
    let new_name = input.value;
    if(new_name !== ''){
        list_name.push(new_name);
        value_list_name.set(new_name, 0);
    
        const new_child = document.createElement('div');
        new_child.innerHTML = new_name;
        new_child.setAttribute('class','name_item')
        show_list.appendChild(new_child)

        show_answer.innerHTML += `<div class='name_item answer'>${new_name}</div>`

        input.value = "";
        show_quantity.textContent = list_name.length + "/9";
    }
}

start_icon.onclick = async () =>{
    if(start_icon.classList.contains('unactive') && list_name.length > 0){
        start_icon.classList.remove('unactive');
        start_icon.classList.add('active');
        questions = await GetQuestion()
        const answers = document.querySelectorAll('.answer');
        AnswerQuestion();  

        answers.forEach((value,index)=>{
            value.onclick = () => {
                    value_list_name.set(value.textContent,value_list_name.get(value.textContent)+1);
                    AnswerQuestion();
                    console.log(value_list_name);
            }
        })
    }else{
        alert("Nhập thêm người đã bạn ơi!");
    }
}

function AnswerQuestion(){
    if(questions.length > 0){
        count++;
        count_question.textContent ="Câu hỏi số " +count + '/'+ 11;
        let randomIndex = Math.floor(Math.random()*questions.length);
        show_question.textContent = questions[randomIndex].cauhoi;
        questions.splice(randomIndex,1);
    }
   else{
        show_question.textContent = "Kéo xuống để xem kết quả nhé";
        setTimeout(function(){
          result.innerHTML = `<h1>Tớ nghĩ cậu đã thích <strong>${findMax(list_name,1)}</strong></h1>
          <h2>Hệ thống gợi ý ngẫu nhiên cho cậu ${list_name[Math.floor(Math.random() * list_name.length)]}</h2>
          <p>Nếu khớp thì đó là duyên phận! Còn chờ gì nữa :>!</p>`
          return;
        },3000);
       
   }

}

function findMax(array,type){
    var max = value_list_name.get(array[0]);
    var name = array[0];
    for(let i =1; i< array.length; i++){
        if(max< array[i]){
            max = value_list_name.get(array[i]);
            name = array[i];
        } 
    }
    return name;
}

async function GetQuestion(){
    const list_question = await fetch("./data.json");
    const data = await list_question.json();
    return data.data;
}
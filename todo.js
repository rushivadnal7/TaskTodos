let create = document.querySelector(".createbtn");
let add = document.querySelector(".addbtn");
let deleteButton = document.querySelector(".deletebtn-main");
let popupDelbtn = document.querySelector(".popup-delbtn");
let taskid = JSON.parse(localStorage.getItem("id")) || 0;
let add_popup = document.querySelector(".addTask-popup");

const icon = document.querySelector('.icon');
const sidebaricon = document.querySelector('.sidebaricon');
let sideNavbar = document.querySelector('.respNavbar');

icon.addEventListener('click', ()=>{
    sideNavbar.style.display = "block";
})
sidebaricon.addEventListener('click', ()=>{
    sideNavbar.style.display = "none";
})








create.addEventListener('click', () => {
    document.querySelector('header').classList.add("active-modal");
    document.querySelector('.main').classList.add("active-modal");
    add_popup.style.display = "block"
    document.querySelector('body').style.overflow = "hidden"
})
add.addEventListener('click', () => {
    document.querySelector('header').classList.remove("active-modal");
    document.querySelector('.main').classList.remove("active-modal");
    document.querySelector('body').style.overflowY = "scroll"
    let task_value = document.getElementById("task-input").value;
    let dateAndTime = document.getElementById("date-input").value;
    add_popup.style.display = "none"
    
    
    let date_value = dateAndTime.replace("T", " > ")
    
    console.log(typeof (task_value) + `${task_value}`)
    
    if (task_value == "" || date_value == "") {
        alert("Empty Task !!")
    }
    else {
        const taskArray = JSON.parse(localStorage.getItem("Tasks")) || []
        const obj = {
            task: task_value,
            date_time: date_value,
            id: ++taskid
        }
        taskArray.push(obj)
        localStorage.setItem("Tasks", JSON.stringify(taskArray))
        localStorage.setItem("id", taskid)
    }
    document.getElementById("task-input").value = "";
    document.getElementById("date-input").value = " ";
    
})

let del_popup = document.querySelector(".delTask-popup");
deleteButton.addEventListener('click', () => {
    document.querySelector('header').classList.add("active-modal");
    document.querySelector('.main').classList.add("active-modal");
    del_popup.style.display = "block"
    document.querySelector('body').style.overflow = "hidden"
    const taskArray = JSON.parse(localStorage.getItem("Tasks")) || []

    if (taskArray.length === 0) {
        return alert("No Task Added!!")
    }
    let checkbox = taskArray.map(task => {
        return ` <div>  <input type="checkbox" class="checkboxes" id="checkbox" name="checkbox1" ><label for="checkbox1"> ${task.task} | ${task.date_time}</label>  </div> `
    }).join("")

    document.querySelector('.data').innerHTML = checkbox;
})


popupDelbtn.addEventListener('click', () => {
    document.querySelector('header').classList.remove("active-modal");
    document.querySelector('.main').classList.remove("active-modal");
    del_popup.style.display = "none"
    document.querySelector('body').style.overflowY = "scroll"

    const taskArray = JSON.parse(localStorage.getItem("Tasks")) || []

    if (taskArray.length === 0) {
        return alert("No Task Added!!")
    }
    const checkboxes = document.querySelectorAll('.checkboxes');
    checkboxes.forEach((box, i) => {
        if (box.checked) {
            console.log(box, taskArray[i])
            taskArray.splice(i, 1)
        }
    })
    localStorage.setItem("Tasks", JSON.stringify(taskArray))
})


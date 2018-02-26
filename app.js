const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');

const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

//Load all event Listners
loadEventListners();

function loadEventListners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);  

  //Add task Event
  form.addEventListener('submit',addTask);

  //Remove task
  taskList.addEventListener('click',removeTask);

  //clear task 
  clearBtn.addEventListener('click',clearTasks);

  //filter task
  filter.addEventListener('keyup',filterTasks);

}

//getting task from local storage
function getTasks(){
  let tasks;

  //checking if task present in local storage
  if(localStorage.getItem('tasks') === ''){
    tasks = []
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){

    const li = document.createElement('li');

   li.className = 'collection-item';

   li.appendChild(document.createTextNode(task));

   const link = document.createElement('a');

   link.className = 'delete-item secondary-content';

   link.innerHTML = '<i class="fa fa-remove"></i>';

   li.appendChild(link);

   //Append child

   taskList.appendChild(li);
  });
}

//Add Tasks
function addTask(e){
  if(taskInput.value === ''){
    alert('Please enter a task and then submit')
  }else{
   const li = document.createElement('li');

   li.className = 'collection-item';

   li.appendChild(document.createTextNode(taskInput.value));

   const link = document.createElement('a');

   link.className = 'delete-item secondary-content';

   link.innerHTML = '<i class="fa fa-remove"></i>';

   li.appendChild(link);

   //Append child

   taskList.appendChild(li);

   //console.log(li);

   //store task in local storage
   storeTaskInLocalStorage(taskInput.value);

   //clear the input text box

   taskInput.value = '';
  }


  e.preventDefault();
}

//remove individual Tasks
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    //remove task from local storage 
    removeTaskFromLocalStorage( e.target.parentElement.parentElement);
    }
  }
}

//Reomve from local storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));



}

//clear Task
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clear all task from local storage
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  //clears out everything from local storage
  localStorage.clear();
}

//filter tasks

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    //filtering through tasks
     document.querySelectorAll('.collection-item').forEach(function(task){

      //console.log(task);
       const item = task.firstChild.textContent;
       if(item.toLowerCase().indexOf(text) != -1){
          task.style.display = 'block';
       }else{
        task.style.display = 'none';
       }
     }) 
}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

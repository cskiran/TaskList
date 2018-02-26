const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');

const taskInput = document.querySelector('#task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

loadEventListners();

function loadEventListners(){
  form.addEventListener('submit',addTask);

  taskList.addEventListener('click',removeTask);

  clearBtn.addEventListener('click',clearTasks);

  filter.addEventListener('keyup',filterTasks);

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
  }


  e.preventDefault();
}

//remove individual Tasks
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    }
  }
}

//clear Task
function clearTasks(){
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
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

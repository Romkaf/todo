'use strict';

const mainInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const todoItems = todoList.children;
const todoCounter = document.querySelector('.todo__counter b');
const filterAll = document.querySelector('.filter-all');
const filterActive = document.querySelector('.filter-active');
const filterCompleted = document.querySelector('.filter-completed');
const footer = document.querySelector('.todo__footer');
const btnClearCompleted = footer.querySelector('.todo__clear-completed');


// Создаём задания после ввода в mainInput
const createTodoItem = () => {
  const Template = document.querySelector('template');
  const todoElement = Template.content.querySelector('.todo__item').cloneNode(true);
  todoElement.querySelector('.todo__item-task').value = mainInput.value;
  mainInput.value = "";
  todoList.appendChild(todoElement);
  // console.dir(todoElement);
}

let counter;
let allItems = [];
const keyEnter = 13;

const checkCounter = () => {
  if (localStorage.getItem('counter')) {
     counter = Number(localStorage.getItem('counter'));
  } else {
    counter = 0;
  }
}

checkCounter();

const count = (number) => {
  counter = counter + number;
  todoCounter.textContent = counter;
};

// const createCompletedItems = () => {
//   let todoItem = todoList.querySelectorAll('.todo__item');
//   for (let elem of todoItem) {
//     if (elem.classList.contains('todo__item--completed')) {
//       completedItems.push(elem);
//     } else {
//       activeItems.push(elem);
//     }
//   }
// }


const createAllItems = () => {
  // let todoItem = todoList.querySelectorAll('.todo__item');
  for (let elem of todoItems) {
    if (!(allItems.includes(elem, 0))) {
      allItems.push(elem);
      // console.log(allItems);
    }
  }
}

// const createArraysOfItems = () => {
//   let todoItem = todoList.querySelectorAll('.todo__item');
//   for (let elem of todoItem) {
//     if (!(allItems.includes(elem, 0))) {
//             allItems.push(elem);
//     }
//     if (elem.classList.contains('todo__item--completed')) {
//       if (!(completedItems.includes(elem, 0))) {
//         completedItems.push(elem);
//       }
//     } else {
//       if (!(activeItems.includes(elem, 0))) {
//         activeItems.push(elem);
//       }
//     }
//   }
// }

const showFooter = () => {
  if (footer.classList.contains('hidden')) {
    footer.classList.remove('hidden');
  }
}

const hideFooter = () => {
  if (todoItems.length === 0) {
    footer.classList.add('hidden');
  }
}

const mainInputHandler = (evt) => {
  if ((evt.keyCode === keyEnter || evt.type === 'blur') && mainInput.value) {
    createTodoItem();
    count(1);
    showFooter();
    createAllItems();
    onLocalStorage();
  }
};

mainInput.addEventListener('keydown', mainInputHandler);

mainInput.addEventListener('blur', mainInputHandler);

// удаляем задания поcле нажатия на крестик

const deleteTodoItem = (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-delete")) { 
    target.parentNode.remove();
    if (!target.parentNode.classList.contains('todo__item--completed')) {
      count(-1);
    }
  }
}

todoList.addEventListener('click', (evt) => {
  deleteTodoItem(evt);
  // onLocalStorage();
  hideFooter();
});

// Редактирование при двойном клике

let itemInputs = todoList.getElementsByClassName('.todo__item-task');

const onEditingItemInputs = function(evt) {
  const target = evt.target;
  const length = target.value.length;
  if (target.classList.contains("todo__item-task")) {
    target.removeAttribute('disabled');
    document.getSelection().empty();
    target.focus();
    target.setSelectionRange(length, length);
    target.parentNode.classList.add('todo__item--editing');
  }
};

const offEditingItemInputs = (evt) => {
  if (evt.keyCode === keyEnter || evt.type === 'blur') {
    evt.target.parentNode.classList.remove('todo__item--editing');
    evt.target.setAttribute('disabled', 'disabled');
  }
}

todoList.addEventListener('dblclick', function(evt) {
  onEditingItemInputs(evt);
  evt.target.addEventListener('blur', offEditingItemInputs);
  evt.target.addEventListener('keydown', offEditingItemInputs);
});

// Переключаем задания из активных в завершенные

const choiceItem = (evt) => {
  let item = evt.target.parentNode;
  if (item.classList.contains('todo__item--completed')) {
    item.classList.remove('todo__item--completed');
    count(1);
    if (filterCompleted.checked) {
      item.classList.add('hidden');
    }
    
  } else {
    item.classList.add('todo__item--completed');
    count(-1);
    if (filterActive.checked) {
      item.classList.add('hidden');
    }
  }
}

const changeVisibilityBtnClearCompleted = () => {
  btnClearCompleted.style.visibility = "visible";
  const checkCompletedItems = ()=> {
    let items = Array.from(todoItems);
    return items.every((item) => {
      return !(item.classList.contains("todo__item--completed"));  
    });
  }
  if (checkCompletedItems()) {
    btnClearCompleted.style.visibility = "hidden";
  }
}

todoList.addEventListener('click', (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-choice")) { 
    choiceItem(evt);
    changeVisibilityBtnClearCompleted();
    // onLocalStorage();
  }
});

// Показываем все задания при нажатии на "Все", активные задания при нажатии на "Активные" и завершенные при нажатии на "Завершенные"

const showAll = () => {
  for (let elem of todoItems) {
      elem.classList.remove('hidden');
  }
}

filterAll.addEventListener('click', showAll);
  
const showActive = () => {
  for (let elem of todoItems) {
    if (elem.classList.contains('todo__item--completed')) {
      elem.classList.add('hidden');
    } else {
      elem.classList.remove('hidden');
    }
  }  
}

filterActive.addEventListener('click', showActive);

const showCompleted = () => {
  for (let elem of todoItems) {
    if (elem.classList.contains('todo__item--completed')) {
      elem.classList.remove('hidden');
    } else {
      elem.classList.add('hidden');
    }
  }  
}

filterCompleted.addEventListener('click', showCompleted);

// Удаляем завершенные после нажатия на "удалить завершенные"



const clearCompletedItems = () => {
  let items = todoList.querySelectorAll('.todo__item')
  for (let elem of items) {
    if (elem.classList.contains('todo__item--completed')) {
      elem.remove(elem);
    }
  }
  btnClearCompleted.style.visibility = "hidden";
}

btnClearCompleted.addEventListener('click' , () => {
  clearCompletedItems();
  hideFooter();
});

// LocalStorage

document.querySelector('.todo__heading').addEventListener('click', () => {
  const counter = footer.querySelector('.todo__counter b');
  localStorage.removeItem('todos', todoList.innerHTML);
  localStorage.removeItem('values', todoItems);
  localStorage.removeItem('counter', counter.innerHTML);
})

const onLocalStorage = () => {
  // const counter = footer.querySelector('.todo__counter b');
  // localStorage.setItem('todos', todoList.innerHTML);
  // localStorage.setItem('todos', todoItems);
  // const tasks = todoList.querySelectorAll('.todo__item-task');
  // localStorage.setItem('values', tasks);
  let hp = JSON.stringify(allItems);
  console.log(hp);
  localStorage.setItem('todos', hp);
  // localStorage.setItem('counter', counter.innerHTML);
  // console.log(localStorage.todos);
}

const remember = () => {
  // const itemsLocStor = localStorage.getItem('todos');
  console.log(itemsLocStor);
  for (let i = 0; i < itemsLocStor.length-1; ++i) {
    createTodoItem();
    console.log(itemsLocStor);
    // todoItems[i].children[2].value = itemsLocStor[i].children[2].value;
    // todoItems[i].children[0].checked = itemsLocStor[i].children[0].checked;
  }  
}

function loadTodos() {
  const itemsLocStor = JSON.parse(localStorage.getItem('todos'));
  // const counterLocStor = localStorage.getItem('counter');
  if (itemsLocStor) {
    // footer.querySelector('.todo__counter b').innerHTML = counterLocStor;
    // showFooter();
    // console.dir(itemsLocStor); 
  }
  console.dir(itemsLocStor); 
  // const deleteButtons = document.querySelectorAll("span.todo-trash");
  // for (const button of deleteButtons) {
  //     listenDeleteTodo(button);
  // }
}

loadTodos();

//  function ft() {
//    let data = [];

//   for (let elem of todoItems) {
//     let value = elem.children[2].value;
//     let checkbox = elem.children[0].checked;
//   }
//  };   
let array = [1, 2, 3];

localStorage.setItem('array', JSON.stringify(array));
console


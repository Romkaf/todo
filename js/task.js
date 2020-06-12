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
}

let counter = 0
let allItems = [];
let completedItems = [];
let activeItems = [];
const keyEnter = 13;

const count = (number) => {
  counter = counter + number;
  // counter = allItems.length
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
  }
};

mainInput.addEventListener('keydown', mainInputHandler);

mainInput.addEventListener('blur', mainInputHandler);

// удаляем задания поcле нажатия на крестик

const deleteTodoItem = (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-delete")) { 
    console.log(target.parentNode);

    target.parentNode.remove();
    if (!target.parentNode.classList.contains('todo__item--completed')) {
      count(-1);
    }
  }
}

todoList.addEventListener('click', (evt) => {
  deleteTodoItem(evt);
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

    
  


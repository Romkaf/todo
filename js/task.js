'use strict';

const mainInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const todoCounter = document.querySelector('.todo__counter b');
const filters = document.querySelectorAll('.todo__filter-button')

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



// const createAllItems = () => {
//   let todoItem = todoList.querySelectorAll('.todo__item');
//   for (let elem of todoItem) {
//     if (!(allItems.includes(elem, 0))) {
//       allItems.push(elem);
//     }
//   }
// }

const createArraysOfItems = () => {
  let todoItem = todoList.querySelectorAll('.todo__item');
  for (let elem of todoItem) {
    if (!(allItems.includes(elem, 0))) {
            allItems.push(elem);
    }
    if (elem.classList.contains('todo__item--completed')) {
      if (!(completedItems.includes(elem, 0))) {
        completedItems.push(elem);
      }
    } else {
      if (!(activeItems.includes(elem, 0))) {
        activeItems.push(elem);
      }
    }
  }
}

mainInput.addEventListener('keydown', (evt) => {
  if (evt.keyCode === keyEnter && mainInput.value) {
    createTodoItem();
    count(1);
    createArraysOfItems();
    // createAllItems();
    console.log(activeItems);
    console.log(allItems);
  }
});

mainInput.addEventListener('blur', (evt) => {
  if (mainInput.value) {
    createTodoItem();
    count(1);
    createArraysOfItems();
    // createAllItems()
  } 
});

// удаляем задания поcле нажатия на крестик

const deleteTodoItem = (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-delete")) { 
    target.parentNode.remove();
    count(-1);
  }
}

todoList.addEventListener('click', (evt) => {
  deleteTodoItem(evt);
  // if (todoList.children.length < 1) {
  //   document.querySelector('.todo__footer').style.display = "none";
  // }
});

// Редактирование при двойном клике
// let itemInputs = todoList.querySelectorAll('.todo__item-task');
// console.log(itemInputs);

// const editingItemInputs = function(evt) {
//   console.log('Привет');
//   let target = evt.target;
//   if (target.classList.contains("todo__item-task")) {
//     target.removeAttribute('disabled');
//   }
// };

// todoList.addEventListener('click', function(evt) {
//   editingItemInputs(evt);
// });

// Переключаем задания из активных в завершенные

const choiceItem = (evt) => {
  let item = evt.target.parentNode;
  if (item.classList.contains('todo__item--completed')) {
    item.classList.remove('todo__item--completed');
    count(1);
    
    // if (filters[2].classList.contains('todo__filter-button--marked')) {
      
    // }
  } else {
    item.classList.add('todo__item--completed');
    count(-1);
  }
}

todoList.addEventListener('click', (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-choice")) { 
    choiceItem(evt)
    createArraysOfItems();
  }
  console.log(completedItems);
});







    
  


'use strict';

const mainInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const todoCounter = document.querySelector('.todo__counter b');
const filterAll = document.querySelector('.filter-all');
const filterActive = document.querySelector('.filter-active');
const filterCompleted = document.querySelector('.filter-completed');
const footer = document.querySelector('.todo__footer');


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
  let todoItem = todoList.querySelectorAll('.todo__item');
  for (let elem of todoItem) {
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
  if (todoList.children.length === 0) {
    footer.classList.add('hidden');
  }
}

mainInput.addEventListener('keydown', (evt) => {
  if (evt.keyCode === keyEnter && mainInput.value) {
    createTodoItem();
    count(1);
    // createArraysOfItems();
    showFooter();
    createAllItems();
    
    console.log(activeItems);
    console.log(allItems);
  }
});

mainInput.addEventListener('blur', (evt) => {
  if (mainInput.value) {
    createTodoItem();
    count(1);
    // createArraysOfItems();
    showFooter();
    createAllItems()
  } 
});

// удаляем задания поcле нажатия на крестик

const deleteTodoItem = (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-delete")) { 
    target.parentNode.remove();
    if ((!target.parentNode.classList.contains('todo__item--completed'))) {
      count(-1);
    }
  }
}

todoList.addEventListener('click', (evt) => {
  deleteTodoItem(evt);
  hideFooter();
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
    if (filterCompleted.checked) {
      item.classList.add('hidden');
    }
    
  } else {
    item.classList.add('todo__item--completed');
    count(-1);
    // buttonClearCompleted.classList.remove('hidden');
    if (filterActive.checked) {
      item.classList.add('hidden');
    }
  }
}

// const changeVisibilityBtnClearCompleted = () => {
//   // for(let elem of todoList.children) {
//   //     if(elem.classList.contains('todo__item--completed')) {
//   //       btnClearCompleted.style.opacity = 1;
//   //     } else {
//   //       btnClearCompleted.style.opacity = 0;
//   //     }
//   //   }
//   todoList.children.every(()=> {

//   })
// }

todoList.addEventListener('click', (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-choice")) { 
    choiceItem(evt);
    changeVisibilityBtnClearCompleted();
  }

});

// Показываем активные задания при нажатии на "активные" и "завершенные" при нажатии на завершенные

const showAll = () => {
  let todoItem = todoList.querySelectorAll('.todo__item');
  for (let elem of todoItem) {
      elem.classList.remove('hidden');
  }
}

filterAll.addEventListener('click', showAll);
  
const showActive = () => {
  let todoItem = todoList.querySelectorAll('.todo__item');
  for (let elem of todoItem) {
    if (elem.classList.contains('todo__item--completed')) {
      elem.classList.add('hidden');
    } else {
      elem.classList.remove('hidden');
    }
  }  
}

filterActive.addEventListener('click', showActive);

const showCompleted = () => {
  let todoItem = todoList.querySelectorAll('.todo__item');
  for (let elem of todoItem) {
    if (elem.classList.contains('todo__item--completed')) {
      elem.classList.remove('hidden');
    } else {
      elem.classList.add('hidden');
    }
  }  
}

filterCompleted.addEventListener('click', showCompleted);

// Удаляем завершенные после нажатия на "удалить завершенные"

const btnClearCompleted = footer.querySelector('.todo__clear-completed');

// const clearCompletedItems = () => {

// }


// btnClearCompleted.addEventListener('click' , )

    
  


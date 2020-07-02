'use strict';

const mainInput = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const todoCounter = document.querySelector('.todo__counter b');
const filterAll = document.querySelector('.filter-all');
const filterActive = document.querySelector('.filter-active');
const filterCompleted = document.querySelector('.filter-completed');
const footer = document.querySelector('.todo__footer');
const btnClearCompleted = footer.querySelector('.todo__clear-completed');

let allItems = [];
let activeItems;
let completedItems;
let counter;
const keyEnter = 13;

// Создаём задания после ввода в mainInput

const createTodoItem = (itemInfo) => {
  const Template = document.querySelector('template');
  const todoElement = Template.content.querySelector('.todo__item').cloneNode(true);
  todoElement.querySelector('.todo__item-task').value = itemInfo.value;
  todoElement.querySelector('.todo__item-choice').checked =  itemInfo.checked;
  const newClass = itemInfo.classOfItem ? itemInfo.classOfItem : "";
  todoElement.classList += ` ${newClass}`;
  todoElement.id = itemInfo.id;
  return todoElement;
}

const renderTodoItems = (array) => {
  todoList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  // let array;
  if (filterAll.checked) {
    array = allItems;
  } else if (filterActive.checked) {
    array = activeItems;
  } else if (filterCompleted.checked) {
    array = completedItems;
  }

  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(createTodoItem(array[i]));
  }
  todoList.appendChild(fragment);
};

const checkCounter = () => {
  if (localStorage.getItem('counter')) {
     counter = Number(localStorage.getItem('counter'));
  } else {
    counter = 0;
  }
}

const count = () => {
  checkCounter();
  allItems.forEach((item) => {
    if (!item.checked) {
      counter += 1;
    }
  });
  todoCounter.textContent = counter;
};

const createAllItems = () => {
  let itemInfo = {};
  itemInfo.checked = false;
  itemInfo.value = mainInput.value;
  itemInfo.id = allItems.length ? allItems[allItems.length-1].id + 1 : 1;
  itemInfo.classOfItem ="";
  allItems.push(itemInfo);
  mainInput.value = "";
}

const createActiveItems = () => {
  return activeItems = allItems.filter((item) => !item.checked);
};

const createCompletedItems = () => {
  return completedItems = allItems.filter((item) => item.checked);
};

const visibilityFooter = () => {
  if (footer.classList.contains('hidden')) {
    footer.classList.remove('hidden');
  }
  if (allItems.length === 0) {
    footer.classList.add('hidden');
  }
}

const mainInputHandler = (evt) => {
  if ((evt.keyCode === keyEnter || evt.type === 'blur') && mainInput.value) {
    createAllItems();
    createActiveItems();
    createCompletedItems();
    renderTodoItems();
    count();
    checkChoiseAllItems();
    visibilityChoiseAllItems();
    visibilityFooter();
    onLocalStorage();
  }
};

mainInput.addEventListener('keydown', mainInputHandler);
mainInput.addEventListener('blur', mainInputHandler);

// Переключаем задания из активных в завершенные

const selectItem = (evt) => {
  let item = evt.target.parentNode;
  const selectedTodoIndex = allItems.findIndex(element => element.id == item.id);
  if (item.classList.contains('todo__item--completed')) {
    item.classList.remove('todo__item--completed');
    allItems[selectedTodoIndex].checked = false;
    allItems[selectedTodoIndex].classOfItem = "";
  } else {
    item.classList.add('todo__item--completed');
    allItems[selectedTodoIndex].checked = true;
    allItems[selectedTodoIndex].classOfItem = "todo__item--completed";
  }
  renderActiveAndCompleted();
}

const renderActiveAndCompleted = () => {
  createActiveItems();
  createCompletedItems();
  if (filterActive.checked || filterCompleted.checked) {
    renderTodoItems();
  }
};

const visibilityBtnClearCompleted = () => {
  btnClearCompleted.style.visibility = (completedItems.length === 0) ? "hidden" : "visible";
}

todoList.addEventListener('click', (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-choice")) { 
    selectItem(evt);
    count();
    checkChoiseAllItems();
    visibilityBtnClearCompleted();
    onLocalStorage();
  }
});

// удаляем задания поcле нажатия на крестик

const deleteTodoItem = (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-delete")) { 
    const deletedTodoIndex = allItems.findIndex(item => item.id == target.parentNode.id);
    allItems.splice(deletedTodoIndex, 1);
  }
}

todoList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains("todo__item-delete")) {
    deleteTodoItem(evt);
    createActiveItems();
    createCompletedItems();
    renderTodoItems();
    count();
    onLocalStorage();
    visibilityChoiseAllItems();
    visibilityFooter();
  }
});

// Редактирование при двойном клике

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
    allItems.forEach((item) => {
      if (item.id == evt.target.parentNode.id) {
        item.value = evt.target.value;
      }
    });
    evt.target.parentNode.classList.remove('todo__item--editing');
    evt.target.setAttribute('disabled', 'disabled');
    onLocalStorage();
  }
}

todoList.addEventListener('dblclick', function(evt) {
  onEditingItemInputs(evt);
  evt.target.addEventListener('blur', offEditingItemInputs);
  evt.target.addEventListener('keydown', offEditingItemInputs);
});

// Показываем все задания при нажатии на "Все", активные задания при нажатии на "Активные" и завершенные при нажатии на "Завершенные"

const showAll = () => {
  renderTodoItems();
}

filterAll.addEventListener('click', showAll);
  
const showActive = () => { 
  renderTodoItems(createActiveItems());
}

filterActive.addEventListener('click', showActive);

const showCompleted = () => { 
  renderTodoItems(createCompletedItems());
}

filterCompleted.addEventListener('click', showCompleted);

// Удаляем завершенные после нажатия на "удалить завершенные"

const clearCompletedItems = () => {
  for (let i = allItems.length - 1; i >=0 ; i--) {
    if (allItems[i].checked) {
          allItems.splice(i, 1);
    }
  }
  createCompletedItems();
  btnClearCompleted.style.visibility = "hidden";
}

btnClearCompleted.addEventListener('click' , () => {
  clearCompletedItems();
  renderTodoItems();
  visibilityChoiseAllItems();
  visibilityFooter();
  onLocalStorage();
});

// Отмечаем все задания при нажатии на .choice-all

const choiseAllItems = document.querySelector('.todo__choice-all');
const labelOfChoiseAllItems = document.querySelector('.todo__choice-all + label');

const selectAllItems = () => {
  if (allItems.every((item) => item.checked == true)) {
    allItems.forEach((item) => {
      item.checked = false;
      item.classOfItem = "";
    });
    for (let elem of todoList.children) {
      elem.classList = ' todo__item';
      elem.children[0].checked = false;
    }
  } else {
    allItems.forEach((item) => {
      item.checked = true;
      item.classOfItem = "todo__item--completed";
    });
    for (let elem of todoList.children) {
      elem.classList += ' todo__item--completed';
      elem.children[0].checked = true;
    }
  }
  renderActiveAndCompleted();
};

const visibilityChoiseAllItems = () => {
  labelOfChoiseAllItems.style.visibility = (allItems.length === 0) ? "hidden" : "visible";
};

const checkChoiseAllItems = () => {
  labelOfChoiseAllItems.style.opacity = allItems.every((item) =>  item.checked === true) ? 0.8 : 0.2;
};

choiseAllItems.addEventListener('click', () => {
  selectAllItems();
  visibilityBtnClearCompleted();
  count();
  checkChoiseAllItems();
  onLocalStorage();
});

// LocalStorage

document.querySelector('.todo__heading').addEventListener('click', () => {
  localStorage.removeItem('todos');
})

const onLocalStorage = () => {
  const tasks = JSON.stringify(allItems);
  localStorage.setItem('todos', tasks);
}

const loadTodos = () => {
  const tasks = JSON.parse(localStorage.getItem('todos'));
  if (tasks) {
    allItems = tasks;
    renderTodoItems(tasks);
    console.log(allItems);
    count();
    visibilityChoiseAllItems();
    checkChoiseAllItems();
    visibilityFooter();
    createCompletedItems();
    visibilityBtnClearCompleted();
  }
}

loadTodos();



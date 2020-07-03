'use strict';

const showAll = () => {
  renderTodoItems();
}

filterAll.addEventListener('click', showAll);
  
const showActive = () => {
  createActiveItems(); 
  renderTodoItems();
}

filterActive.addEventListener('click', showActive);

const showCompleted = () => { 
  createCompletedItems();
  renderTodoItems();
}

filterCompleted.addEventListener('click', showCompleted);
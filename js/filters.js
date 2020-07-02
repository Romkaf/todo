'use strict';

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
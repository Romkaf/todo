'use strict';

const showAllItems = () => {
  renderTodoItems();
}

filterAll.addEventListener('click', showAllItems);
  
const showActiveItems = () => {
  createActiveItemsArray(); 
  renderTodoItems();
}

filterActive.addEventListener('click', showActiveItems);

const showCompletedItems = () => { 
  createCompletedItemsArray();
  renderTodoItems();
}

filterCompleted.addEventListener('click', showCompletedItems);
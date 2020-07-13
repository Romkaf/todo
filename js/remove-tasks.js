'use strict';

const deleteTodoItem = (evt) => { 
  if (evt.target.parentNode.classList.contains("todo__item")) {
    const deletedTodoIndex = itemsArray.findIndex(item => item.id == evt.target.parentNode.id);
    itemsArray.splice(deletedTodoIndex, 1); 
  }
  createActiveItemsArray();
  createCompletedItemsArray();
  renderTodoItems();
  countActiveItems();
  setChoiseAllItemsVisibility();
  setFooterVisibility();
  setLocalStorage();
}

todoList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains("todo__item-delete")) { 
    deleteTodoItem(evt);
  }
});

const clearCompletedItems = (evt) => {
  itemsArray = itemsArray.filter((item) => !item.checked);
  
  deleteTodoItem(evt);
  btnClearCompleted.style.visibility = "hidden";
}

btnClearCompleted.addEventListener('click', clearCompletedItems);
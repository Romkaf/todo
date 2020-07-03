'use strict';

const deleteTodoItem = (evt) => { 
  const deletedTodoIndex = allItems.findIndex(item => item.id == evt.target.parentNode.id);
  allItems.splice(deletedTodoIndex, 1);
  createActiveItems();
  createCompletedItems();
  renderTodoItems();
  count();
  visibilityChoiseAllItems();
  visibilityFooter();
  onLocalStorage();
}

todoList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains("todo__item-delete")) { 
    deleteTodoItem(evt);
  }
});

const clearCompletedItems = (evt) => {
  for (let i = allItems.length - 1; i >=0 ; i--) {
    if (allItems[i].checked) {
          allItems.splice(i, 1);
    }
  }
  
  deleteTodoItem(evt);
  btnClearCompleted.style.visibility = "hidden";
}

btnClearCompleted.addEventListener('click', clearCompletedItems);
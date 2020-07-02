'use strict';

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
    visibilityChoiseAllItems();
    visibilityFooter();
    onLocalStorage();
  }
});

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
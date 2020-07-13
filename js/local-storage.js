'use strict';

const setLocalStorage = () => {
  const tasks = JSON.stringify(itemsArray);
  localStorage.setItem('todos', tasks);
}

const loadTodos = () => {
  const tasks = JSON.parse(localStorage.getItem('todos'));
  if (tasks) {
    itemsArray = tasks;
    createCompletedItemsArray();
    renderTodoItems();
    countActiveItems();
    setChoiseAllItemsVisibility();
    setChoiseAllItemsOpacity();
    setFooterVisibility();
    setBtnClearCompletedVisibility();
  }
}

loadTodos();
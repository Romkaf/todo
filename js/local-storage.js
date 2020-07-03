'use strict';

const onLocalStorage = () => {
  const tasks = JSON.stringify(allItems);
  localStorage.setItem('todos', tasks);
}

const loadTodos = () => {
  const tasks = JSON.parse(localStorage.getItem('todos'));
  if (tasks) {
    allItems = tasks;
    renderTodoItems();
    count();
    visibilityChoiseAllItems();
    checkChoiseAllItems();
    visibilityFooter();
    createCompletedItems();
    visibilityBtnClearCompleted();
  }
}

loadTodos();
'use strict';

const selectTodoItem = (evt) => {
  let item = evt.target.parentNode;
  const selectedTodoIndex = itemsArray.findIndex(element => element.id == item.id);
  if (item.classList.contains('todo__item--completed')) {
    itemsArray[selectedTodoIndex].checked = false;
  } else {
    itemsArray[selectedTodoIndex].checked = true;
  }
}

const setBtnClearCompletedVisibility = () => {
  btnClearCompleted.style.visibility = (completedItemsArray.length === 0) ? "hidden" : "visible";
}

todoList.addEventListener('click', (evt) => {
  let target = evt.target; 
  if (target.classList.contains("todo__item-choice")) { 
    selectTodoItem(evt);
    createActiveItemsArray();
    createCompletedItemsArray();
    renderTodoItems();
    countActiveItems();
    setChoiseAllItemsOpacity();
    setBtnClearCompletedVisibility();
    setLocalStorage();
  }
});

const selectAllItems = () => {
  if (itemsArray.every((item) => item.checked == true)) {
    itemsArray.forEach((item) => {
      item.checked = false;
    });
  } else {
    itemsArray.forEach((item) => {
      item.checked = true;
    });
  }
};

const setChoiseAllItemsVisibility = () => {
  labelOfChoiseAllItems.style.visibility = (itemsArray.length === 0) ? "hidden" : "visible";
};

const setChoiseAllItemsOpacity = () => {
  labelOfChoiseAllItems.style.opacity = itemsArray.every((item) =>  item.checked === true) ? 0.8 : 0.2;
};

choiceAllItems.addEventListener('click', () => {
  selectAllItems();
  createActiveItemsArray();
  createCompletedItemsArray();
  renderTodoItems();
  countActiveItems();
  setChoiseAllItemsOpacity();
  setBtnClearCompletedVisibility();
  setLocalStorage();
});
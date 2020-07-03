'use strict';

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
  count();
  checkChoiseAllItems();
  visibilityBtnClearCompleted();
  onLocalStorage();
});
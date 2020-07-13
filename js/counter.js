'use strict';
  
const countActiveItems = () => {
  let counter = 0;
  createActiveItemsArray();
  counter = activeItemsArray.length;
  todoCounter.textContent = counter;
};
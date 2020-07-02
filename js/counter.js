'use strict';

const checkCounter = () => {
  if (localStorage.getItem('counter')) {
    counter = Number(localStorage.getItem('counter'));
  } else {
    counter = 0;
  }
}
  
const count = () => {
  checkCounter();
  allItems.forEach((item) => {
    if (!item.checked) {
      counter += 1;
    }
  });
  todoCounter.textContent = counter;
};
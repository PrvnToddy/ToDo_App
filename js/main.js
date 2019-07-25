const clear = document.querySelector('.clear');

const dateElement = document.getElementById('date');

const list = document.getElementById('list');

const input = document.getElementById('input');

// ClassNames

const CHECK = 'fa-check-circle';
const UNCHECH = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// variables

let List = [],
  id = 0;

let data = localStorage.getItem('TODO');

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach(item => {
    addToDo(item.name, item.id, item.done, item.target);
  });
}

clear.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});

//Date
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: 'numeric'
};
const today = new Date();
console.log(dateElement);
console.log(today);

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

//addToDo

function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECH;
  const Line = done ? LINE_THROUGH : '';
  const item = `<li class="item">
  <i class="fa ${DONE} co" job="complete" id=${id}></i>
    <p class="text ${Line}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="0"></i>
    </li>`;
  const position = 'beforeend';
  list.insertAdjacentHTML(position, item);
}

//add item on list

document.addEventListener('keyup', event => {
  if (event.keyCode == 13) {
    const toDo = input.value;
    if (toDo) {
      addToDo(toDo, 1, false, false);
      List.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
      id++;
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
    input.value = '';
  }
});

// complete to do

function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECH);
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);

  LIST[element.id].done = List[element.id].done ? false : true;
}

//remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//target the item

list.addEventListener('click', event => {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == 'complete') {
    completeToDo(element);
  } else if (elementJob == 'delete') {
    removeToDo(element);
  }
  localStorage.setItem('TODO', JSON.stringify(LIST));
});

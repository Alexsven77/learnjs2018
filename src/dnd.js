/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
  const element = document.createElement('div');
  const randelem = Math.floor(Math.random() * 100);

  const randcolor = () => {
          let r=Math.floor(Math.random() * (256));
          let g=Math.floor(Math.random() * (256));
          let b=Math.floor(Math.random() * (256));
          console.log(`${r} ${g} ${b}`)
         // let a = '#' + r.toString(16) + g.toString(16) + b.toString(16);
          let a = 'rgb(' + r + ',' + g + ',' + b + ')';
          console.log(a);
          return a;
        
      }
      element.style.width = randelem+'px';
      element.style.height = randelem+'px';
      element.style.backgroundColor = randcolor();
      element.style.left = randelem+'px';
      element.style.top = randelem+'px'
      element.className = 'draggable-div';

      return element;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.onmousedown = (e) => {
      target.style.position = 'absolute';
      moveAt(e);
      // переместим в body, чтобы div был точно не внутри position:relative
      document.body.appendChild(target);

      target.style.zIndex = 0; // показывать div над другими элементами

      // передвинуть div под координаты курсора
      // и сдвинуть на половину ширины/высоты для центрирования
      function moveAt(e) {
      target.style.left = e.pageX - target.offsetWidth / 2 + 'px';
      target.style.top = e.pageY - target.offsetHeight / 2 + 'px';
    }

      // 3, перемещать по экрану
      document.onmousemove = function(e) {
      moveAt(e);
    }

    // 4. отследить окончание переноса
    target.onmouseup = function() {
      document.onmousemove = null;
      target.onmouseup = null;
    }
  }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};

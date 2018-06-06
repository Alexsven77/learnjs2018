/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
const errDiv = document.createElement('div');
var arr = [];
/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return new Promise((resolve, reject) => {

    let req = new XMLHttpRequest();
    req.open('GET', 'https://raw.githubuserconten.com/smelukov/citiesTest/master/cities.json', true);
    req.timeout = 0;
    
    req.onload = ()=> {
      if(req.status == 200){
      arr = JSON.parse(req.response);
      arr.sort((a, b) => a.name.localeCompare(b.name));
      loadingBlock.style.display = 'none';
      filterBlock.style.display = 'block';
      resolve(arr);
      }
      else {
        loadingBlock.style.display = 'none';
        errDiv.innerHTML = "<p>Не удалось загрузить города</p><button id ='but'>Повторить</button>";
        homeworkContainer.appendChild(errDiv);
        const but = homeworkContainer.querySelector('#but');

        but.addEventListener('click', function(evt){
        homeworkContainer.removeChild(errDiv);
        loadingBlock.style.display = 'block';
        reject(req.status)
        loadTowns();
        });
      }
     };
     
     req.onerror = ()=> {
      loadingBlock.style.display = 'none';
      errDiv.innerHTML = "<p>Не удалось загрузить города</p><button id ='but'>Повторить</button>";
      homeworkContainer.appendChild(errDiv);
      const but = homeworkContainer.querySelector('#but');

      but.addEventListener('click', function(evt){
      homeworkContainer.removeChild(errDiv);
      loadingBlock.style.display = 'block';
      reject(req.status)
      loadTowns();
      });
      
     };
  
    req.send();
    });

};

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  full = full.toUpperCase();
  chunk = chunk.toUpperCase();
 return (full.indexOf(chunk) != -1)
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

//const newDiv = document.createElement('div');
   

filterInput.addEventListener('keyup', function(evt) {

  filterResult.innerHTML = '';

    // это обработчик нажатия кливиш в текстовом поле
  if (filterInput.value.trim().length !==0){

    arr.forEach((item) => {
     if(isMatching(item.name, filterInput.value)){
          
      const cityDiv = document.createElement('div');
      cityDiv.innerHTML = item.name
     filterResult.appendChild(cityDiv);
     }
  })
  }

});


(()=> loadTowns())();
export {
    loadTowns,
    isMatching
};

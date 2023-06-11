const searchResult = document.querySelector(".main-container_search-result"); //находим разметку, где будет отражаться результат поиска
let btn = document.querySelector(".button"); // находим кнопку и задаем переменную
const errorMessage = document.querySelector(".error-message"); //находим разметку, где будет отражаться сообщение об ошибке
const spinner = document.querySelector(".spinner"); //находим разметку для спиннера во время загрузки
spinner.style.display = "none"; //убираем отображение спиннера в обычном режиме

let getPicture = () => {
  //создаем функцию, которая будет выбирать рандомную картинку их массива
  const arr = [
    //создаем массив из картинок, которые будут выводиться в рандомном порядке
    "assets/characters.png",
    "assets/darth.png",
    "assets/grogu.jpeg",
    "assets/luke.jpg",
    "assets/starWarsFilm.jpg",
  ];
  let i = Math.floor(Math.random() * 5); // задаем переменную для вычисления рандомного номера картинки
  let randomPic = arr[i]; // задаем переменную для рандомной картинки
  return `<img src="${randomPic}" alt="starWarsImage" class="main-container_resultImage" />`; //возвращаем рандомную картинку
};

btn.onclick = function (e) {
  //создаем функцию, которая будет срабатывать при клике на кнопку
  e.preventDefault(); //отменяем дефолтное submit у кнопки
  spinner.style.display = "block"; //отображаем спиннер загрузки при клике на кнопку
  document.querySelector(".main-container_search-result").innerHTML = " "; //очищаем поле результата поиска
  document.querySelector(".main-container_image").innerHTML = " "; //убираем отображение картинки
  errorMessage.innerHTML = " "; //очищаем поле с сообщением об ошибке
  let option = document.getElementById("item_option").value; //задаем переменyю для значение инпута option
  let number = document.getElementById("input_number").value; //задаем переменyю для значение инпута number
  if (option == "Please select an option" || number.length === 0) {
    //создаем условие, которое проверяет, заполнены ли инпуты
    document.querySelector(
      //если хотя бы один из инпутов не заполнен, выводим в поле разметки для ошибки инпутов сообщение и картинку
      ".input_error"
    ).innerHTML = `<img src="https://tse3.mm.bing.net/th?id=OIP.RfGHnE8gOuNd59TvKKg8LgHaEK&pid=Api&P=0&h=180" class="input-error_img"> <div class="input_error-message">Your choice you should make!</div>`;
    spinner.style.display = "none"; //убираем отображение спиннера загрузки
  } else {
    //иначе (если оба поля заполнены)
    document.querySelector(".input_error").innerHTML = ""; //очищаем поле для сообщения о незаполненных инпутах

    fetch(`https://swapi.nomoreparties.co/${option}/${number}`) //создаем функцию, которая делает GET запрос по адресу https://swapi.nomoreparties.co и добавляем к нему найденные выше переменные /${option}/${number}
      .then((response) => {
        //обрабатываем полученные данные
        if (!response.ok) {
          //проверяем, если с данными произошла ошибка (например, данные были undefined)
          throw new Error( // создаем новую ошибку и сообщение об ошибке, понятно для пользователя
            "Sorry! We couldn't find anything. Please try again!"
          );
        }
        return response.json(); //возвращаем массив с данными
      })
      .then((response) => {
        //работаем с массивом полученных данных
        document.querySelector(
          ".main-container_search-result"
        ).innerHTML = `You found ${response.name}! May the Force Be with You!`; // помещаем в разметку для поля результата поиска сообщение и имя найденного объекта
        let randomPic = getPicture(); // задаем переменную для функции выбора рандомной картинки
        document.querySelector(".main-container_image").innerHTML = randomPic; //вызываем функцию выбора картинки и отображаем ее
        errorMessage.innerHTML = " "; //очищаем поле сообщения об ошибке
      })
      .catch((error) => {
        //если была обнаружена ошибка
        errorMessage.innerHTML = `<p class="errorText">${error.message}</p>`; //выводим сообщение об ошибке
      })
      .finally(() => {
        //в любом случае
        spinner.style.display = "none"; //оключаем отображение спиннера загрузки
      });

    document.getElementById("item_option").value = "Please select an option"; //возвращаем исходное значение инпута option
    document.getElementById("input_number").value = " "; //возвращаем исходное значение инпута number
  }
};

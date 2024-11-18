const todayButton = document.getElementById("today");
const tomorrowButton = document.getElementById("tomorrow");
// const customButton = document.getElementById("custom");
const dateInputs = document.querySelector(".date-inputs");
const date1Input = document.getElementById("date1");
const date2Input = document.getElementById("date2");
const submitButton = document.getElementById("submit");

const getFormattedDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const handleToday = () => {
  const today = new Date();
  date1Input.value = getFormattedDate(today);
  today.setDate(today.getDate() + 1);
  date2Input.value = getFormattedDate(today);

  todayButton.classList.add("active");
  tomorrowButton.classList.remove("active");
  // customButton.classList.remove("active");

  if (dateInputs.style.display === "flex") {
    dateInputs.style.display = "none";
  }

  handleSubmit();
};

const handleTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  date1Input.value = getFormattedDate(tomorrow);
  tomorrow.setDate(tomorrow.getDate() + 1);
  date2Input.value = getFormattedDate(tomorrow);

  todayButton.classList.remove("active");
  tomorrowButton.classList.add("active");
  // customButton.classList.remove("active");

  if (dateInputs.style.display === "flex") {
    dateInputs.style.display = "none";
  }

  handleSubmit();
};

const handleCustom = () => {
  dateInputs.style.display = "flex";

  todayButton.classList.remove("active");
  tomorrowButton.classList.remove("active");
  // customButton.classList.add("active");
};

const handleSubmit = () => {
  const tg = window?.Telegram?.WebApp;
  const chat_id = tg?.initDataUnsafe?.user?.id;
  const date1 = date1Input.value;
  const date2 = date2Input.value;

  // Создаем URL с параметрами
  const apiUrl = `https://script.google.com/macros/s/AKfycbwzeFf8B_ru09VHhHjlQsbCvLm2p6MARSZO3Zl_FKfMTvvm1anWAP3ZJ_e_JDclBU2D/exec?date1=${date1}&date2=${date2}&chat_id=${chat_id}`;
  console.log(apiUrl);

  // Покажите фон загрузки и индикатор
  showLoader();

  fetch(apiUrl, {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    // },
  })
    .then((response) => {
      // Проверка успешного ответа
      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }
      tg.close();
      // Преобразование ответа в JSON
      return response.json();
    })
    .then((data) => {
      // Вывод данных в консоль
      console.log(data);

      // Очистите старый HTML
      const oldContent = document.getElementById("container");
      oldContent.innerHTML = "<h1>Свободные авто</h1>";

      // Создайте список
      const list = document.createElement("ul");
      data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.appendChild(listItem);
      });

      // Добавьте список в HTML
      oldContent.appendChild(list);
      // Добавьте кнопку после вывода списка
      const refreshButton = document.createElement("button");
      refreshButton.id = "refresh-button";
      refreshButton.textContent = "Обновить";

      refreshButton.addEventListener("click", () => {
        location.reload();
      });
      oldContent.appendChild(refreshButton);

      // Скрыть фон загрузки и индикатор
      hideLoader();
    })
    .catch((error) => {
      // Обработка ошибок
      console.error(error);
      // Скрыть фон загрузки и индикатор
      hideLoader();
    });
};

// Функции для показа/скрытия фона загрузки и индикатора
function showLoader() {
  // Добавьте ваш код для показа фона и индикатора
  // Например, вы можете использовать CSS для отображения элемента с фоном
  document.getElementById("loader-container").style.display = "flex";
}

function hideLoader() {
  // Добавьте ваш код для скрытия фона и индикатора
  // Например, вы можете использовать CSS для скрытия элемента с фоном
  document.getElementById("loader-container").style.display = "none";
}

todayButton.addEventListener("click", handleToday);
tomorrowButton.addEventListener("click", handleTomorrow);
// customButton.addEventListener("click", handleCustom);
submitButton.addEventListener("click", handleSubmit);

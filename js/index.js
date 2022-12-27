// Список компонент (from components.js)
const components = {
  header: Header,
  navbar: NavBar,
  content: Content,
  footer: Footer,
};

// Список поддердживаемых роутов (from pages.js)
const routes = {
  main: HomePage,
  about: About,
  contacts: Contacts,
  category: Category,
  testimonials: Testimonials,
  default: HomePage,
};

/* ----- spa init module --- */
const xonixSPA = (function () {
  let moduleXonix = null;
  let nameUser = '';
  let contein = null;
  const canvasWidth = 1000;
  const canvasHeight = 400;
  const widthCanvasButton = 280;
  const heightCanvasButton = 40;
  const heightCanvasLogo = 80;

  /* ------- begin view -------- */
  function ModuleView() {
    let myModuleContainer = null;
    let menu = null;
    let contentContainer = null;
    let routesObj = null;

    this.init = function (container, routes) {//функция инициализации view
      myModuleContainer = container;
      routesObj = routes;
      menu = myModuleContainer.querySelector("#mainmenu");
      contentContainer = myModuleContainer.querySelector("#content");


      const svgNS = "http://www.w3.org/2000/svg";
      const wrapperSvgProgress = document.createElementNS(svgNS, "svg");
      wrapperSvgProgress.setAttributeNS(null, "width", 80);
      wrapperSvgProgress.setAttributeNS(null, "height", 20);
      wrapperSvgProgress.setAttributeNS(null, "id", "svgProgressLoadedTableResults");
      wrapperSvgProgress.classList.add('modal_closed');
      wrapperSvgProgress.classList.add('modal__svg-progress');
      document.body.append(wrapperSvgProgress);

      const rectSVG = document.createElementNS(svgNS, "rect");
      rectSVG.setAttributeNS(null, "x", 0);
      rectSVG.setAttributeNS(null, "y", 0);
      rectSVG.setAttributeNS(null, "width", 80);
      rectSVG.setAttributeNS(null, "height", 20);
      rectSVG.setAttributeNS(null, "fill", "orange");
      rectSVG.setAttributeNS(null, "id", "modal__rectSVG");
      wrapperSvgProgress.append(rectSVG);

      this.createLogo();
      this.createButtons();
    };

    this.renderContent = function (hashPageName) {//функция отображения содержимого пунктов меню
      let routeName = "default";

      if (hashPageName.length > 0) {
        routeName = hashPageName in routes ? hashPageName : "error";
      }

      window.document.title = routesObj[routeName].title;
      contentContainer.innerHTML = routesObj[routeName].render(`${routeName}-page`);
      if (routeName === "about") this.showCanvasAbout();
      //if (routeName === "testimonials") { };// this.showTableRecords(tableResults);
      if (routeName === "category") this.startXonix();
      if (routeName === "main") this.showCanvasMain();
      if (routeName === "contacts") this.startOverXonix();

      this.updateButtons(routesObj[routeName].id);
    };

    this.showUser = function (textUserName) {//вывод имени пользователя
      const elemUser = document.getElementById("header-user-name");
      elemUser.textContent = textUserName;
    };

    this.getNameUser = function () {//модальная форма получения имени пользователя

      let modalForm = `<div class=" modal" id="modal-user-name">
        <header class="modal__header">          
          <h2>Введите свое имя</h2>
        </header>
        <main class="modal__content">
          <div class="form-field">
            <label for="name">Ваше имя:</label>
            <input required class="input__default" type="text" id="name" name="name">
          </div>
          <div class="form-field">
              <footer class="modal__footer">                
                <button id="modal-save" class="modal__save" title="Сохранить">Сохранить данные</button>
              </footer>
          </div>`;
      let divModal = document.createElement('div');
      divModal.innerHTML = modalForm;
      document.body.append(divModal);
    };

    this.hideButtons = function () {//фуекция скравает пункты меню в зависимости от выбранного пункта меню
      const elemStartGame = document.getElementById("canvas-mainmenu-list-start-game");
      elemStartGame.classList.add("display-none");
      const elemAbout = document.getElementById("canvas-mainmenu-list-about");
      elemAbout.classList.add("display-none");
      const elemRecords = document.getElementById("canvas-mainmenu-list-table-records");
      elemRecords.classList.add("display-none");

      const elemStartOver = document.getElementById("canvas-mainmenu-list-start-over");
      elemStartOver.classList.remove("display-none");

      const xonixList = document.querySelector('.mainmenu__list');
      xonixList.classList.add('mainmenu__list_flex');

    };

    this.showCanvasMain = function () {//фуекция отображает пункты меню в зависимости от выбранного пункта меню
      const elemStartGame = document.getElementById("canvas-mainmenu-list-start-game");
      elemStartGame.classList.remove("display-none");
      const elemAbout = document.getElementById("canvas-mainmenu-list-about");
      elemAbout.classList.remove("display-none");
      const elemRecords = document.getElementById("canvas-mainmenu-list-table-records");
      elemRecords.classList.remove("display-none");

      const elemStartOver = document.getElementById("canvas-mainmenu-list-start-over");
      elemStartOver.classList.add("display-none");

      const xonixList = document.querySelector('.mainmenu__list');
      xonixList.classList.remove('mainmenu__list_flex');

      //const frameMain = `<iframe class = "iframe_center" src="https://www.youtube.com/embed/POhMfAFZ_6c?autoplay=1" title="Пример игры Xonix под DOS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      //contentContainer.innerHTML = frameMain;

    };

    this.showCanvasAbout = function () {//построение канвас об игре
      this.hideButtons();

      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.classList.add("canvas_center");
      contentContainer.appendChild(canvas);
      const ctx = canvas.getContext("2d");

      var grd = ctx.createLinearGradient(0, 0, 170, 0);
      grd.addColorStop(0, "orange");
      grd.addColorStop(1, "yellow");
      const widthCanvas = ctx.canvas.width;
      const heightCanvas = ctx.canvas.height;

      const fontSize = 14;

      let numberString = 1;
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, widthCanvas, heightCanvas);
      ctx.font = `bold ${fontSize}px Arial`;
      //ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      let theString = `Xonix (с англ. — «Зоникс») — компьютерная игра.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Первая версия была создана в 1984 году для платформы PC как клон игры Qix,`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `появившейся ранее на аркадных автоматах.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Разработана Иланом Рабом и Дэни Катцем во время службы в ЦАХАЛе.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Игровой процесс:`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Игровое поле представляет собой сетку из квадратных или прямоугольных ячеек,`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `поэтому игра легко реализуется в текстовом режиме экрана.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Ячейки могут быть двух типов: условно «суша» и «море».`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `По полю движутся управляемый игроком курсор и управляемые программой точки.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Курсор может двигаться по вертикали и горизонтали, точки — по диагонали.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Точки бывают «сухопутными» и «морскими», то есть движутся или только по «суше», или только по «морю»,`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `отскакивая от разделяющей их границы.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Курсор может свободно передвигаться по «суше», где он уязвим для «сухопутных» точек.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Выходя в «море», он оставляет за собой след, уязвимый для «морских» точек,`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `при этом в «море» нельзя изменить направление движения курсора на противоположное,`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `можно поворачивать только на 90 градусов в любую сторону, также в «море» нельзя останавливаться.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Игра считается проигранной, если курсор собьёт «сухопутная» или «морская» точка,`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `если след курсора пересечет «морская» точка или при попытке в «море»`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `изменить направление движение на противоположное или остановиться.`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Как только курсор снова оказывается на «суше», след его превращается в новую «сушу».`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Если при этом в «море» появилась замкнутая область, не содержащая точек,`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `то вся эта область также превращается в «сушу».`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `Проще говоря, игрок, управляя курсором, пытается отсечь куски «моря»,`;
      ctx.fillText(theString, 1, fontSize * numberString++);
      theString = `превращая их в «сушу», а точки ему в этом мешают.`;
      ctx.fillText(theString, 1, fontSize * numberString++);

      theString = `Автор этого варианта: Бахановский Максим Валентинович`;
      ctx.fillText(theString, 1, fontSize * numberString++);

    };

    this.showTableRecords = function (tableResults) {//построение канвас таблицы результатов
      this.hideButtons();

      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.classList.add("canvas_center");
      contentContainer.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      var grd = ctx.createLinearGradient(0, 0, 170, 0);
      grd.addColorStop(0, "orange");
      grd.addColorStop(1, "yellow");
      const widthCanvas = ctx.canvas.width;
      const heightCanvas = ctx.canvas.height;

      const fontSize = 14;

      ctx.strokeStyle = "black";

      let numberString = 1;
      let count = 0;
      let colString = tableResults.length > 10 ? 10 : tableResults.length;
      //for (let i = 0; i < tableResults.length; i++) {
      for (let i = 0; i < colString; i++) {
        ctx.fillStyle = grd;
        ctx.lineWidth = 3;
        ctx.fillRect(0, fontSize * 2 * i + count, widthCanvas, fontSize * 2);
        //ctx.strokeRect(0, fontSize * 2 * (i + 1), widthCanvas, fontSize * 2);
        count += 10;

        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = "black";
        theString = `${tableResults[i].name}`;
        ctx.fillText(theString, 5, (fontSize * 2 * i + count) + fontSize / 2);
        theString = `${tableResults[i].mess}`;
        ctx.fillText(theString, widthCanvas - 50, (fontSize * 2 * i + count) + fontSize / 2);
        numberString++;

      };

    };

    this.createLogo = function () {//создание канвас логотипа

      const canvas = document.getElementById("header-canvas-logo");
      canvas.height = heightCanvasLogo;
      const ctx = canvas.getContext("2d");
      const widthCanvas = ctx.canvas.width;
      const heightCanvas = ctx.canvas.height;

      var grd = ctx.createLinearGradient(0, 0, 170, 0);
      grd.addColorStop(0, "orange");
      grd.addColorStop(1, "yellow");

      ctx.fillStyle = grd;

      const fontSize = 72;
      //ctx.fillStyle = "yellow";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.fillRect(0, 0, widthCanvas, heightCanvas);
      ctx.strokeRect(0, 0, widthCanvas, heightCanvas);

      //theString = 'X';
      ctx.font = `bold ${fontSize}px Arial`;
      //widthTXT = Math.round(ctx.measureText(theString).width);

      let theStringAll = "XONIX";
      widthTXTAll = Math.round(ctx.measureText(theStringAll).width);
      let startCoordinate = widthCanvas / 2 - widthTXTAll / 2;

      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.fillText(theStringAll, startCoordinate, heightCanvas / 2 + fontSize / 3);
      //ctx.strokeText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);
      widthTXT = startCoordinate;

      /*theString = 'O';
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 2);
      widthTXT = widthTXT + Math.round(ctx.measureText(theString).width) - 8;

      theString = 'N';
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 2);
      widthTXT = widthTXT + Math.round(ctx.measureText(theString).width) - 8;

      theString = 'I';
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 2);
      widthTXT = widthTXT + Math.round(ctx.measureText(theString).width) - 4;

      theString = 'X';
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 2);
      widthTXT = widthTXT + Math.round(ctx.measureText(theString).width) + 2;*/

    };

    this.createButtons = function () {//создание канвас кнопок

      const fontSize = 28;
      const widthCanvas = widthCanvasButton;
      const heightCanvas = heightCanvasButton;
      let canvas = document.getElementById("canvas-button-main");
      canvas.width = widthCanvas;
      canvas.height = heightCanvas;
      let ctx = canvas.getContext("2d");
      var grd = ctx.createLinearGradient(0, 0, 170, 0);
      grd.addColorStop(0, "orange");
      grd.addColorStop(1, "yellow");

      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, widthCanvas, heightCanvas);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, widthCanvas, heightCanvas);

      let theString = 'Главная';
      ctx.font = `bold ${fontSize}px Arial`;
      let widthTXT = Math.round(widthCanvas / 2 - ctx.measureText(theString).width / 2);
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);
      //ctx.strokeText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);

      canvas = document.getElementById("canvas-button-start-game");
      canvas.width = widthCanvas;
      canvas.height = heightCanvas;
      ctx = canvas.getContext("2d");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, widthCanvas, heightCanvas);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, widthCanvas, heightCanvas);
      ctx.font = `bold ${fontSize}px Arial`;
      theString = 'Начать игру';

      widthTXT = Math.round(widthCanvas / 2 - ctx.measureText(theString).width / 2);

      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);
      //ctx.strokeText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);

      canvas = document.getElementById("canvas-button-about");
      canvas.width = widthCanvas;
      canvas.height = heightCanvas;
      ctx = canvas.getContext("2d");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, widthCanvas, heightCanvas);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, widthCanvas, heightCanvas);

      theString = 'Об игре';
      ctx.font = `bold ${fontSize}px Arial`;
      widthTXT = Math.round(widthCanvas / 2 - ctx.measureText(theString).width / 2);
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);
      //ctx.strokeText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);

      canvas = document.getElementById("canvas-button-table-records");
      canvas.width = widthCanvas;
      canvas.height = heightCanvas;
      ctx = canvas.getContext("2d");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, widthCanvas, heightCanvas);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, widthCanvas, heightCanvas);

      theString = 'Таблица рекордов';
      ctx.font = `bold ${fontSize}px Arial`;
      widthTXT = Math.round(widthCanvas / 2 - ctx.measureText(theString).width / 2);

      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);
      //ctx.strokeText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);

      let div = document.getElementById("canvas-mainmenu-list-start-over");
      div.classList.add("display-none");

      canvas = document.getElementById("canvas-button-start-over");
      canvas.width = widthCanvas;
      canvas.height = heightCanvas;
      ctx = canvas.getContext("2d");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, widthCanvas, heightCanvas);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, widthCanvas, heightCanvas);

      theString = 'Начать заново';
      ctx.font = `bold ${fontSize}px Arial`;
      widthTXT = Math.round(widthCanvas / 2 - ctx.measureText(theString).width / 2);

      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.fillText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);
      //ctx.strokeText(theString, widthTXT, heightCanvas / 2 + fontSize / 4);
    };

    this.startXonix = function () {//функция запуска игры
      this.hideButtons();

      //contein = document.querySelector('#the-game-xonix');

      moduleXonix = new Xonix();
      moduleXonix.init(nameUser, contentContainer);
    };

    this.startOverXonix = function () {//функция запуска игры
      let pageName = 'category';
      this.renderContent(pageName);

      /*location.hash = '#category';
      moduleXonix = new Xonix();
      moduleXonix.init(nameUser, contentContainer);*/
    };

    this.updateButtons = function (currentPage) {//функция получения текущей страницы
      const menuLinks = menu.querySelectorAll(".mainmenu__link");

      for (let link of menuLinks) {
        currentPage === link.getAttribute("href").slice(1) ? link.classList.add("active") : link.classList.remove("active");
      };
    };

    this.closeModal = function () {//функция закрытия модпльного окна
      let elemModal = document.querySelector('#modal-user-name');
      if (elemModal) {
        elemModal.classList.add('modal_closed');
      }
    };

    this.showAnimationLoaded = function (widthAnimation) {
      const progressSVG = document.querySelector("#svgProgressLoadedTableResults");
      progressSVG.classList.remove('modal_closed');
      const rectSVG = document.querySelector("#modal__rectSVG");      
      rectSVG.setAttributeNS(null, "width", widthAnimation);
    };

    this.stopAnimationLoaded = function () {
      const progressSVG = document.querySelector("#svgProgressLoadedTableResults");
      progressSVG.classList.add('modal_closed');      
    };

  };
  /* -------- end view --------- */
  /* ------- begin model ------- */
  function ModuleModel() {
    let myModuleView = null;
    let tableResults = null;

    this.init = function (view) {//инициализация модели
      myModuleView = view;
    };

    this.updateState = function (pageName) {// в зависимости от страницы, отображение содержимого
      if (pageName === "testimonials") {
        this.getResultsTable();
      };
      if (pageName === "contacts") {
        location.hash = 'category';
      }

      myModuleView.renderContent(pageName, tableResults);
    };

    this.saveUserNameLocalStorage = function () {//запись текущего пользователя в localStorage
      let dataUser = {};
      dataUser.nameUser = nameUser;
      localStorage.setItem('BAKHANOUSKI_XONIX_USER_NAME', JSON.stringify(dataUser));
    };

    this.getUserNameLocalStorage = function () {//получить текущего пользователя из localStorage
      let objectUserNameLS = JSON.parse(localStorage.getItem('BAKHANOUSKI_XONIX_USER_NAME'));
      if (objectUserNameLS) {
        nameUser = objectUserNameLS['nameUser'];
        myModuleView.showUser(`Пользователь: ${nameUser}`);
      }
      else {
        myModuleView.getNameUser();
      }
    };

    this.setUserName = function (name) {//установить имя пользователя
      nameUser = name;
    };

    this.closeModal = function () {//закрыть модальное окно для ввода имени пользователя
      if (nameUser !== '') {
        myModuleView.closeModal();
        this.saveUserNameLocalStorage();
        myModuleView.showUser(`Пользователь: ${nameUser}`);
      }
    };


    this.getResultsTable = function () {// получаем таблицу результатов с сервера и потом отображаем таблицу рзультатов
      const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
      const stringName = 'BAKHANOUSKI_XONIX_TABLE_RECORDS';

      let counter = 0;
      let bool = true;
      //objWeather.push(`${dataWeather.city.name}`);
      let intervID = setInterval(() => {
        //console.log(counter++);
        counter += 0.0015;
        this.showAnimationLoaded(counter * 80)
      }, 10);

      setTimeout(() => {
        $.ajax({
          url: ajaxHandlerScript,
          type: 'POST', dataType: 'json',
          data: { f: 'READ', n: stringName },
          cache: false,
          success: this.readReady,
          error: this.errorHandler
        });

        bool = false;
        this.stopAnimationLoaded();
        clearInterval(intervID);        
      }, 5000);

    };

    this.showAnimationLoaded = function (widthAnimationLoaded) {//запуск анимации получения данных таблицы результатов
      myModuleView.showAnimationLoaded(widthAnimationLoaded);
    };

    this.stopAnimationLoaded = function () {//остановка анимации получения данных таблицы результатов
      myModuleView.stopAnimationLoaded();
    };

    this.readReady = function (callresult) { // сообщения получены - показываем

      if (callresult.error != undefined) {
        console.log(callresult.error);
      }
      else {
        tableResults = [];
        if (callresult.result != "") {
          tableResults = JSON.parse(callresult.result);
          if (!Array.isArray(tableResults))
            tableResults = [];
        };
        tableResults.sort((arg1, arg2) => Number(arg1.mess) < Number(arg2.mess) ? 1 : -1);
        myModuleView.showTableRecords(tableResults);
      }
    };

    this.errorHandler = function (jqXHR, statusStr, errorStr) {//если зашло сюда,то ошибка, сообщения не получены
      console.log(statusStr + ' ' + errorStr);
    };

  };

  /* -------- end model -------- */
  /* ----- begin controller ---- */
  function ModuleController() {
    let myModuleContainer = null;
    let myModuleModel = null;

    this.init = function (container, model) {//инициализация котроллера
      myModuleContainer = container;
      myModuleModel = model;

      document.addEventListener("click", this.closeModal);
      //document.addEventListener('DOMContentLoaded', this.goToLocalStorage);
      document.addEventListener('input', this.getValueUserName);
      // вешаем слушателей на событие hashchange и кликам по пунктам меню
      window.addEventListener("hashchange", this.updateState);

      this.goToLocalStorage();

      location.hash = '#main';
      this.updateState(); //первая отрисовка
    };

    this.updateState = function () {//отображение содержимого страниц, при преходе по пунктам меню
      const hashPageName = location.hash.slice(1).toLowerCase();
      myModuleModel.updateState(hashPageName);

    };

    this.goToLocalStorage = function (event) {//событие
      myModuleModel.getUserNameLocalStorage();
    };

    this.getValueUserName = function (event) {// обработка события ввода данных имени пользователя в input
      myModuleModel.setUserName(event.target.value);
    };

    this.closeModal = function () {//pfrhsdftv vjlfkmyjt jryj
      if (event.target.id !== "header-canvas-logo") {
        myModuleModel.closeModal();
      }
    };

  };
  /* ------ end controller ----- */

  return {
    init: function ({ container, routes, components }) {
      this.renderComponents(container, components);

      const view = new ModuleView();
      const model = new ModuleModel();
      const controller = new ModuleController();

      //связываем части модуля
      view.init(document.getElementById(container), routes);
      model.init(view);
      controller.init(document.getElementById(container), model);

    },

    renderComponents: function (container, components) {
      const root = document.getElementById(container);
      const componentsList = Object.keys(components);
      for (let item of componentsList) {
        root.innerHTML += components[item].render("component");
      }

    },


  };

}());
/* ------ end app module ----- */

/*** --- init module --- ***/
document.addEventListener("DOMContentLoaded", xonixSPA.init({
  container: "app",
  routes: routes,
  components: components,

}));

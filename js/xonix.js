const Xonix = (function () {//модуль игры
    let speedX = 4;
    let speedY = 4;
    let xonixPointWidth = 0;
    let xonixPointHeight = 0;
    const widthField = 800;
    const heightField = 300;
    const heightScore = 50;
    let widthInternalField = 0;
    let heightInternalField = 0;
    const lineWidth = 2;
    let flagGameStart = true;
    const audioEnemyIn = new Audio("https://api.allorigins.win/raw?url=https://github.com/MaksimBakhanouski/audio/blob/main/ric2.wav?raw=true");
    const audioEnemyOut = new Audio("https://api.allorigins.win/raw?url=https://github.com/MaksimBakhanouski/audio/blob/main/8bit-synth-bounce-short.mp3?raw=true");
    //const audioGameOver = new Audio("https://api.allorigins.win/raw?url=https://github.com/MaksimBakhanouski/mp3/blob/main/0961f580f9e00da.mp3?raw=true");
    const audioGameOver = new Audio("https://api.allorigins.win/raw?url=https://github.com/MaksimBakhanouski/audio/blob/main/ric2.wav?raw=true");
    const audioLossOfLife = new Audio("https://api.allorigins.win/raw?url=https://github.com/MaksimBakhanouski/mp3/blob/main/b1314089d5efb25.mp3?raw=true");


    function clickSoundInit() {//инициализация звуков
        audioEnemyIn.play();
        audioEnemyIn.pause();
        audioEnemyOut.play();
        audioEnemyOut.pause();
        audioGameOver.play();
        audioGameOver.pause();
        audioLossOfLife.play();
        audioLossOfLife.pause();
    }

    function clickSoundStop() {
        audioEnemyIn.pause();
        audioEnemyIn.currentTime = 0;
        audioEnemyOut.pause();
        audioEnemyOut.currentTime = 0;
        audioGameOver.pause();
        audioGameOver.currentTime = 0;
        audioLossOfLife.pause();
        audioLossOfLife.currentTime = 0;
    }

    function clickAudioEnemyIn() { //звук врагов в море (на территории, которую захватываем)
        //audioEnemyIn.currentTime = 0;
        //audioEnemyIn.play();

    }

    function clickSoundEnemyOut() {//звук врагов на суше (на территории, на которой стоим)
        //audioEnemyOut.currentTime = 0;
        //audioEnemyOut.play();        
    }

    function clickSoundGameOver() {//звук конец игры
        //audioEnemyIn.pause();
        //audioEnemyIn.currentTime = 0;
        //audioEnemyOut.pause();
        //audioEnemyOut.currentTime = 0;
        audioGameOver.currentTime = 0;
        audioGameOver.play();
    }

    function clickSoundLossOfLife() {//звук потери жизни
        //audioLossOfLife.currentTime = 0;
        //audioLossOfLife.play();
    }

    class XonixMainCharacter {//класс курсора пользователя
        constructor(positX, positY, width, coordinate, colorLand, colorSea, color, colorEnd, location, canvas) {
            this.positX = positX;
            this.positY = positY;
            this.positXEnd = positX;
            this.positYEnd = positY;
            this.speedX = 1;
            this.speedY = 1;
            this.width = width;
            this.height = width;
            this.timer = "";
            this.canvas = canvas;
            this.coordinate = coordinate;
            this.colorLand = colorLand;
            this.colorSea = colorSea;
            this.color = color;
            this.colorEnd = colorEnd;
            this.location = location;
            this.currentMovement = null;
            this.numberOfLives = 5;
            this.numberOfPoints = 0;
            this.numberOfPointsLevel = 0;
            this.numberOfPointsStartLevel = 0;
            this.level = 1;
        }

        update() {//обновляем курсор пользователя при движении
            let obj = this;

            if (this.canvas && this.canvas.getContext("2d")) {
                let ctx = this.canvas.getContext("2d");

                ctx.fillStyle = this.colorEnd;
                ctx.beginPath();
                ctx.fillRect(this.positXEnd * this.width, this.positYEnd * this.width, this.width, this.width);

                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.fillRect(this.positX * this.width, this.positY * this.width, this.width, this.width);

            };
            //return obj;
        };

        updateField() {//обновляем данные поля при захвате территории
            //let obj = this;
            if (this.canvas && this.canvas.getContext("2d")) {
                let ctx = this.canvas.getContext("2d");

                for (let i = 0; i < this.coordinate.length; i++) {
                    ctx.fillStyle = this.colorLand;
                    ctx.beginPath();
                    ctx.fillRect(this.coordinate[i][0] * this.width, this.coordinate[i][1] * this.width, this.width, this.width);
                }
                this.coordinate = [];
            };
        };

        updateLossOfLife() {//обновляем курсор пользователя при потере жизни

            //let obj = this;
            if (this.canvas && this.canvas.getContext("2d")) {
                let ctx = this.canvas.getContext("2d");

                for (let i = 1; i < this.coordinate.length; i++) {
                    ctx.fillStyle = this.colorSea;
                    ctx.beginPath();
                    ctx.fillRect(this.coordinate[i][0] * this.width, this.coordinate[i][1] * this.width, this.width, this.width);
                }
                this.coordinate = [];
                /*ctx.fillStyle = this.colorSea;                
                ctx.beginPath();
                ctx.fillRect(this.positXEnd * this.width, this.positYEnd * this.width, this.width, this.width);*/
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.fillRect(this.positX * this.width, this.positY * this.width, this.width, this.width);


            };
        };
    };

    class XonixPointer {//класс врагов в море
        constructor(posX, posY, speedX, speedY, location, color, colorEnd, width, widthLand) {
            this.posX = posX;
            this.posY = posY;
            this.accelX = Math.random() * speedX;
            this.accelY = Math.random() * speedY;
            this.speedX = speedX;
            this.speedY = speedY;
            this.canvas = null;
            this.location = location;
            this.posXEnd = posX;
            this.posYEnd = posY;
            this.color = color;
            this.colorEnd = colorEnd;
            this.width = width;
            this.widthLand = widthLand;
        }

        update() {//обновляем врагов в море
            if (this.canvas && this.canvas.getContext("2d")) {
                let ctx = this.canvas.getContext("2d");

                ctx.fillStyle = this.colorEnd;
                ctx.beginPath();
                //ctx.fillRect(this.posXEnd * this.width, this.posYEnd * this.width, this.width, this.width);
                ctx.fillRect(this.posXEnd, this.posYEnd, this.width, this.width);

                ctx.fillStyle = this.color;
                ctx.beginPath();
                //ctx.fillRect(this.posX * this.width, this.posY * this.width, this.width, this.width);
                ctx.fillRect(this.posX, this.posY, this.width, this.width);


            }
        }
    };

    class XonixFields {//класс игрового поля
        constructor(arrCoord, arrEnemyIn, arrEnemyOut, colCell, colRow, width, height, widthCell, widthLand, canvas) {
            this.canvas = canvas;
            this.arrCoord = arrCoord;
            this.location = [];
            this.arrEnemyIn = arrEnemyIn;
            this.arrEnemyOut = arrEnemyOut;
            this.colCell = colCell;
            this.colRow = colRow;
            this.nom = 0;
            this.width = width;
            this.height = height;
            this.bufferCanvas = null;
            this.bufferCtx = null;
            this.widthCell = widthCell;
            this.arrCoordStart = arrCoord;
            this.widthLand = widthLand;
        }

        update() {//обновляем игровое поле через буфиризирующий канвас

            if (this.canvas && this.canvas.getContext("2d")) {
                let ctx = this.canvas.getContext("2d");
                ctx.drawImage(this.bufferCanvas, 0, 0, this.width, this.height);
            };
        }

    };

    function XonixView() {//объект представления (view)
        let xonixView = null;
        let xonixField = null;
        let xonixFieldCanvas = null;
        let xonixScoreCanvas = null;
        let wrapperCanvas = null;

        this.init = function (conteiner) {//инициализация представления (view)
            xonixView = conteiner;

            ///xonixScoreCanvas = document.querySelector("#borders-score-xonix");
            if (!xonixScoreCanvas) {
                xonixScoreCanvas = document.createElement("canvas");
                xonixScoreCanvas.id = "borders-score-xonix";
                xonixScoreCanvas.width = widthField;
                xonixScoreCanvas.height = heightScore;
                xonixScoreCanvas.classList.add("canvas_center");
                xonixView.appendChild(xonixScoreCanvas);
            };
            //xonixFieldCanvas = document.querySelector("#borders-field-xonix");
            if (!xonixFieldCanvas) {
                xonixFieldCanvas = document.createElement("canvas");
                xonixFieldCanvas.id = "borders-field-xonix";
                xonixFieldCanvas.width = widthField;
                xonixFieldCanvas.height = heightField;
                xonixFieldCanvas.classList.add("canvas_center");
                xonixView.append(xonixFieldCanvas);
            };

            wrapperCanvas = document.createElement('div');
            wrapperCanvas.id = "wrapper-canvas-countdown";
            wrapperCanvas.classList.add("canvas__countdown");
            wrapperCanvas.classList.add("modal_closed");
            const canvas = document.createElement("canvas");
            canvas.id = "canvas-countdown";
            wrapperCanvas.append(canvas);
            document.body.append(wrapperCanvas);
        };

        this.show = function (dataObject) {//первая отрисовка представления (view)

            dataObject.field.canvas = xonixFieldCanvas;
            dataObject.field.bufferCanvas = document.createElement("canvas");
            dataObject.field.bufferCtx = dataObject.field.bufferCanvas.getContext("2d");
            dataObject.field.bufferCtx.canvas.width = dataObject.field.canvas.width;
            dataObject.field.bufferCtx.canvas.height = dataObject.field.canvas.height;
            this.allUpdate(dataObject);

            //dataObject.field.update();

            for (let i = 0; i < dataObject.field.arrEnemyIn.length; i++) {
                dataObject.field.arrEnemyIn[i].canvas = xonixFieldCanvas;
                //dataObject.field.arrEnemyIn[i].update();
            };
            for (let i = 0; i < dataObject.field.arrEnemyOut.length; i++) {
                dataObject.field.arrEnemyOut[i].canvas = xonixFieldCanvas;
                //dataObject.field.arrEnemyOut[i].update();
            };
            dataObject.xonixPointUser.canvas = xonixFieldCanvas;

            this.updateScore(dataObject);
        };

        this.allUpdate = function (dataObject) {//обнолвение игрового поля
            this.blank();
            //this.xonixCanvasUpdate();         
            for (let j = 0; j < dataObject.field.arrCoord.length; j++) {
                for (let i = 0; i < dataObject.field.arrCoord[j].length; i++) {

                    dataObject.field.bufferCtx.fillStyle = dataObject.field.arrCoord[j][i];
                    dataObject.field.bufferCtx.fillRect(i * dataObject.field.widthCell, j * dataObject.field.widthCell, dataObject.field.widthCell, dataObject.field.widthCell);
                }
            };
            //};
            dataObject.field.update();
            this.updateEnemy(dataObject);
        };

        this.updateEnemy = function (dataObject) {//обнолвение врагов на суше и на море
            //setTimeout(() => this.allUpdate(dataObject), 1000);
            //this.blank();
            //this.xonixCanvasUpdate();
            //dataObject.field.update();

            for (let i = 0; i < dataObject.field.arrEnemyIn.length; i++) {
                dataObject.field.arrEnemyIn[i].update();
            };
            for (let i = 0; i < dataObject.field.arrEnemyOut.length; i++) {
                dataObject.field.arrEnemyOut[i].update();
            };

            dataObject.xonixPointUser.update(dataObject);
        };

        this.blank = function () {//очищение игрового поля
            if (xonixFieldCanvas && xonixFieldCanvas.getContext("2d")) {
                let ctx = xonixFieldCanvas.getContext("2d");

                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, widthField, heightField);
            }
        };

        this.drawStar = function (ctx, r, posX) {//функия отрисовывает жизни(звезды)
            ctx.save();
            ctx.beginPath();
            ctx.rotate(-Math.PI / 10);
            ctx.scale(r, r);
            ctx.moveTo(1, 0);
            ctx.lineWidth = ctx.lineWidth / r;
            for (let i = 0; i < 9; i++) {
                ctx.rotate(Math.PI / 5);
                if (i % 2 == 0) {
                    ctx.lineTo(0.3819653016466596, 0);
                } else {
                    ctx.lineTo(1, 0);
                }
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
            //return ctx;
        };

        this.updateScore = function (dataObject) {//Обновление поля очков и данных игры
            if (xonixScoreCanvas && xonixScoreCanvas.getContext("2d")) {
                let ctx = xonixScoreCanvas.getContext("2d");

                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, widthField, heightScore);

                ctx.fillStyle = "grey";
                ctx.fillRect(0, 0, widthField, heightScore);

                //ctx.fillText = "black";
                //ctx.font = "72px serif black";

                ctx.font = 'bold 24px serif';
                ctx.strokeStyle = 'gold';
                let txtScore = "Заработанные очки: " + dataObject.xonixPointUser.numberOfPoints;
                let widthTXT = widthField - ctx.measureText(txtScore).width - 50;
                ctx.strokeText(txtScore, widthTXT, 30);

                ctx.font = 'bold 24px serif';
                ctx.strokeStyle = 'gold';
                let txtLevel = "Уровень " + dataObject.xonixPointUser.level;
                let widthTxtLevel = widthField / 2 - ctx.measureText(txtLevel).width / 2;
                ctx.strokeText(txtLevel, widthTxtLevel, 30);

                ctx.font = 'bold 24px serif';
                ctx.strokeStyle = 'gold';
                let txtLifes = "Жизни: ";
                const indent = 10;
                let widthTXTLifes = ctx.measureText(txtLifes).width + indent;
                ctx.strokeText(txtLifes, indent, 30);

                //let ctxLifes = xonixScoreCanvas.getContext("2d");
                if (dataObject.xonixPointUser.numberOfLives) {
                    const bufferCanvas = document.createElement("canvas");
                    const bufferCtx = bufferCanvas.getContext("2d");
                    const widthLife = 50;
                    const heightCanvas = 40;
                    const widthCanvas = 300;
                    bufferCtx.canvas.width = widthCanvas;
                    bufferCtx.canvas.height = widthLife;

                    bufferCtx.translate(0, 30);
                    for (let i = 0; i < dataObject.xonixPointUser.numberOfLives; i++) {
                        bufferCtx.fillStyle = 'gold';
                        bufferCtx.strokeStyle = 'gold';
                        bufferCtx.translate(40, 0);
                        this.drawStar(bufferCtx, 20);
                        //ctx.moveTo(50, 0);
                        //ctx.fill();
                        //ctx.stroke();

                    };
                    ctx.drawImage(bufferCanvas, widthTXTLifes, 0, widthCanvas, heightCanvas);
                };

            }

        };

        this.updateField = function (dataObject) {//обновление игрового поля при захвате территории
            dataObject.xonixPointUser.updateField();
        };

        this.showCountdown = function (countdown) {//вывод чисел обратного отсчета
            const widthCountdown = 50;
            const heightCountdown = 50;

            wrapperCanvas.classList.remove("modal_closed");
            let canvas = wrapperCanvas.querySelector("#canvas-countdown");
            canvas.width = widthCountdown;
            canvas.height = heightCountdown;
            //wrapperCanvas.append(canvas);
            const fontHeight = 48;
            const ctx = canvas.getContext("2d");

            ctx.canvas.width = widthCountdown;
            ctx.canvas.height = heightCountdown;
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, widthCountdown, heightCountdown);

            let theStringGO = countdown;


            ctx.font = `bold ${fontHeight}px Arial`;
            let widthTXT = widthCountdown / 2 - ctx.measureText(theStringGO).width / 2;
            ctx.fillStyle = "green";
            ctx.strokeStyle = "black";
            ctx.fillText(theStringGO, widthTXT, heightCountdown / 2 + fontHeight / 3);
            ctx.strokeText(theStringGO, widthTXT, heightCountdown / 2 + fontHeight / 3);

            //document.body.removeChild(wrapperCanvas);
        };

        this.lossOfLifeUpdate = function (dataObject, countdown) {//запуск анимация при потери жизни игрока

            if (countdown === 3) {
                this.updateScore(dataObject);
                dataObject.xonixPointUser.updateLossOfLife();
                setTimeout(() => this.allUpdate(dataObject), 4000);
            };

            this.showCountdown(countdown);

            if (countdown !== 0) {
                countdown -= 1;
                setTimeout(() => this.lossOfLifeUpdate(dataObject, countdown), 1000);

            };

            if (countdown === 0) {
                setTimeout(() => wrapperCanvas.classList.add("modal_closed"),2000);
            };

        };

        this.gameOverTXT = function (dataObject, fontSize = 8) {

            //for (let i = 12; i <= 52; i++) {
            if (xonixFieldCanvas && xonixFieldCanvas.getContext("2d")) {//анимация конца игры
                let ctx = xonixFieldCanvas.getContext("2d");
                let theStringGO = "GAME OVER";
                ctx.font = `bold ${fontSize}px Arial`;
                ctx.fillStyle = "red";
                ctx.strokeStyle = "black";
                ctx.fillText(theStringGO, widthField / 2 - ctx.measureText(theStringGO).width / 2, heightField / 2);
                ctx.strokeText(theStringGO, widthField / 2 - ctx.measureText(theStringGO).width / 2, heightField / 2);
            };
            //
            if (fontSize <= 72) {
                fontSize = fontSize + 1;
                dataObject.timerGameOverId = requestAnimationFrame(() => this.gameOverTXT(dataObject, fontSize));
            } else { cancelAnimationFrame(dataObject.timerGameOverId); };

            //;
            //};
        };

        this.warnUser = function (stringMessage) {
            alert(stringMessage);
        };


    };

    function XonixModel() {//объект модели (model)
        let xonixModelView = null;
        let dataObject = {};
        let timerId = null;
        const widthLand = 5;
        const widthCell = 5;
        const arrRows = [];
        const colorLand = 'yellow';
        const colorSea = 'black';
        const colorPointUser = 'green';
        const colorEnemyIn = 'white';
        const colorEnemyOut = 'red';
        let colCell = 162;
        let colRow = 102;
        const colEnemyIn = 3;
        const colEnemyOut = 1;
        const arrEnemyIn = [];
        const arrEnemyOut = [];

        const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
        let messages;
        let updatePassword;
        let stringName = 'BAKHANOUSKI_XONIX_TABLE_RECORDS';

        this.sendMessage = function () {//отправляем новые данные
            updatePassword = Math.random();
            $.ajax({
                url: ajaxHandlerScript, type: 'POST', dataType: 'json', data: { f: 'LOCKGET', n: stringName, p: updatePassword },
                cache: false,
                success: this.lockGetReady,
                error: this.errorHandler
            }
            );
        };

        this.lockGetReady = function (callresult) {//получаем, что записано ранее, добавляем новые и сохраняем
            if (callresult.error != undefined)
                alert(callresult.error);
            else {
                messages = [];
                if (callresult.result != "") { // либо строка пустая - сообщений нет
                    // либо в строке - JSON-представление массива сообщений
                    messages = JSON.parse(callresult.result);
                    // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
                    if (!Array.isArray(messages))
                        messages = [];
                }

                var senderName = dataObject.nameUser;
                var message = dataObject.xonixPointUser.numberOfPoints;
                messages.push({ name: senderName, mess: message });

                $.ajax({
                    url: ajaxHandlerScript, type: 'POST', dataType: 'json', data: { f: 'UPDATE', n: stringName, v: JSON.stringify(messages), p: updatePassword },
                    cache: false,
                    success: this.updateReady,
                    error: this.errorHandler
                }
                );
            }
        };

        this.updateReady = function (callresult) {//если зашло сюда, значит сообщения вместе с новым сохранены на сервере
            //if (callresult.error != undefined)
            //alert(callresult.error);
        };

        this.errorHandler = function (jqXHR, statusStr, errorStr) {//если зашло сюда, значит ошибка и сообщения вместе с новым не сохранены на сервере
            //alert(statusStr + ' ' + errorStr);
        };

        this.getRndInteger = function (min, max) {//функция получает рандомное число от min - до max
            return Math.floor(Math.random() * (max - min - 1)) + min;
        };

        this.init = function (view, nameUser) {//инициализация модели (model). Расчет первичных данных. Запуск игры.
            xonixModelView = view;
            //clickSoundInit();
            dataObject.arrDirection = [];
            dataObject.location = [];


            xonixPointWidth = 5;
            widthInternalField = widthField;
            heightInternalField = heightField;
            dataObject.widthCell = xonixPointWidth;

            colRow = Math.round(heightInternalField / xonixPointWidth);
            colCell = Math.round(widthInternalField / xonixPointWidth);

            //0 - colorLand yellow
            //1- colorSea black
            //2- colorPointUser green
            //3- colorEnemyIn white
            //4- colorEnemyOut red


            let coordY = 0;
            for (let h = 0; h < colRow; h++) {
                let arrCelss = [];
                let coordX = 0;
                for (let i = 0; i < colCell; i++) {

                    if (h === 1 && i === Math.round(colCell / 2)) {
                        arrCelss.push(colorPointUser);
                    } else if (h < widthLand || h > (colRow - widthLand)) {
                        arrCelss.push(colorLand);

                    } else if (i <= widthLand || i >= colCell - widthLand) {
                        arrCelss.push(colorLand);
                    } else {
                        arrCelss.push(colorSea);
                        //coordX += widthCell;
                    }

                    //coordY += widthCell;
                }
                arrRows.push(arrCelss);
            };

            for (let i = 0; i < colEnemyIn; i++) {
                let coordX = this.getRndInteger((widthLand + 3) * dataObject.widthCell, (colCell - widthLand - 3) * dataObject.widthCell);
                let coordY = this.getRndInteger((widthLand + 3) * dataObject.widthCell, (colRow - widthLand - 3) * dataObject.widthCell);
                let speedX = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 5);
                let speedY = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 5);
                let xonixPoint = new XonixPointer(coordX, coordY, speedX, speedY, 'interior', colorEnemyIn, colorSea, widthCell, widthLand);
                arrEnemyIn[arrEnemyIn.length] = xonixPoint;
            };
            let coordEnemyX = this.getRndInteger(1, (widthLand - 1) * dataObject.widthCell);
            let coordEnemyY = this.getRndInteger(1, (colRow - 1) * dataObject.widthCell);
            let speedX = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 2);
            let speedY = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 2);
            let xonixPoint = new XonixPointer(coordEnemyX, coordEnemyY, speedX, speedY, 'external', colorEnemyOut, colorLand, widthCell, widthLand);
            arrEnemyOut[arrEnemyOut.length] = xonixPoint;

            const field = new XonixFields(arrRows, arrEnemyIn, arrEnemyOut, colCell, colRow, widthField, heightField, widthCell, widthLand);
            dataObject.field = field;
            dataObject.arrEnemyIn = arrEnemyIn;
            dataObject.arrEnemyOut = arrEnemyOut;

            const coordinatesUser = [];
            const xonixPointUser = new XonixMainCharacter(Math.round(colCell / 2), 1, widthCell, coordinatesUser, colorLand, colorSea, colorPointUser, colorPointUser, 'land');
            dataObject.xonixPointUser = xonixPointUser;

            dataObject.nameUser = nameUser;
            dataObject.gameOver = false;
            dataObject.flagCountDown = false;
            dataObject.flagGameStart = true;

            xonixModelView.show(dataObject);
            this.timerId = requestAnimationFrame(() => this.start());
        };

        this.startNewLevel = function () {//иницализация при переходе на новый уровень

            //0 - colorLand yellow
            //1- colorSea black
            //2- colorPointUser green
            //3- colorEnemyIn white
            //4- colorEnemyOut red
            arrRows = [];

            for (let h = 0; h < colRow; h++) {
                let arrCelss = [];
                let coordX = 0;
                for (let i = 0; i < colCell; i++) {
                    if (h === 1 && i === Math.round(colCell / 2)) {
                        arrCelss.push(colorPointUser);
                    } else if (h < widthLand || h > (colRow - widthLand)) {
                        arrCelss.push(colorLand);

                    } else if (i <= widthLand || i >= colCell - widthLand) {
                        arrCelss.push(colorLand);
                    } else {
                        arrCelss.push(colorSea);
                    }
                }
                arrRows.push(arrCelss);
            };

            for (let i = 0; i < dataObject.field.arrEnemyIn.length; i++) {
                let coordX = this.getRndInteger(widthLand + 1, colCell - widthLand - 1);
                let coordY = this.getRndInteger(widthLand + 1, colRow - widthLand - 1);
                arrRows[coordY][coordX] = colorEnemyIn;
                let speedX = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 5);
                let speedY = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 5);
                dataObject.field.arrEnemyIn[i].speedX = speedX;
                dataObject.field.arrEnemyIn[i].speedY = speedY;
                dataObject.field.arrEnemyIn[i].posX = coordX;
                dataObject.field.arrEnemyIn[i].posY = coordY;

            };

            if (dataObject.xonixPointUser.level >= 2) {
                let coordX = this.getRndInteger(widthLand + 1, colCell - widthLand - 1);
                let coordY = this.getRndInteger(widthLand + 1, colRow - widthLand - 1);
                //arrRows[coordY][coordX] = colorEnemyIn;
                let speedX = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 5);
                let speedY = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 5);
                //let speedX = ((Math.random() < 0.5) ? -1 : 1) * 0.1;
                //let speedY = ((Math.random() < 0.5) ? -1 : 1) * 0.1;
                let xonixPoint = new XonixPointer(coordX, coordY, speedX, speedY, 'interior', colorEnemyIn, colorSea, widthCell, widthLand);
                dataObject.field.arrEnemyIn[dataObject.field.arrEnemyIn.length] = xonixPoint;
            };

            for (let i = 0; i < dataObject.field.arrEnemyOut.length; i++) {
                let coordEnemyX = this.getRndInteger(1, widthLand - 1);
                let coordEnemyY = this.getRndInteger(1, colRow);
                //arrRows[coordEnemyY][coordEnemyX] = colorEnemyOut;
                let speedX = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 2);
                let speedY = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 2);

                dataObject.field.arrEnemyOut[i].speedX = speedX;
                dataObject.field.arrEnemyOut[i].speedY = speedY;
                dataObject.field.arrEnemyOut[i].posX = coordEnemyX;
                dataObject.field.arrEnemyOut[i].posY = coordEnemyY;
            }

            if (dataObject.xonixPointUser.level >= 3) {
                let coordEnemyX = this.getRndInteger(1, widthLand - 1);
                let coordEnemyY = this.getRndInteger(1, colRow);
                arrRows[coordEnemyY][coordEnemyX] = colorEnemyOut;
                //arrRows[50][2] = colorEnemyOut;
                let speedX = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 2);
                let speedY = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 2);
                let xonixPoint = new XonixPointer(coordEnemyX, coordEnemyY, speedX, speedY, 'external', colorEnemyOut, colorLand, widthCell, widthLand);
                dataObject.field.arrEnemyOut[dataObject.field.arrEnemyOut.length] = xonixPoint;
            };

            dataObject.field.arrCoord = arrRows;
            dataObject.xonixPointUser.positX = Math.round(colCell / 2);
            dataObject.xonixPointUser.positY = 1;
            if (dataObject.xonixPointUser.level % 3 === 0) {
                dataObject.xonixPointUser.numberOfLives += 1;
            };

            dataObject.gameOver = false;
            xonixModelView.show(dataObject);
            this.timerId = requestAnimationFrame(() => this.start());

        };

        this.checkForEnemyInHit = function (posXEnd, posYEnd) {//проверка на попадание внутренними врагами в курсор или линию пользователя
            for (let i = 0; i < dataObject.xonixPointUser.coordinate.length; i++) {
                if (dataObject.xonixPointUser.coordinate[i][0] === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.coordinate[i][1] === Math.round(posYEnd / dataObject.widthCell)
                    || dataObject.xonixPointUser.coordinate[i][0] === Math.round((posXEnd + dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.coordinate[i][1] === Math.round(posYEnd / dataObject.widthCell)
                    || dataObject.xonixPointUser.coordinate[i][0] === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.coordinate[i][1] === Math.round((posYEnd + dataObject.widthCell) / dataObject.widthCell)
                    || dataObject.xonixPointUser.coordinate[i][0] === Math.round((posXEnd + dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.coordinate[i][1] === Math.round((posYEnd + dataObject.widthCell) / dataObject.widthCell)
                    || dataObject.xonixPointUser.coordinate[i][0] === Math.round((posXEnd - dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.coordinate[i][1] === Math.round(posYEnd / dataObject.widthCell)
                    || dataObject.xonixPointUser.coordinate[i][0] === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.coordinate[i][1] === Math.round((posYEnd - dataObject.widthCell) / dataObject.widthCell)
                    || dataObject.xonixPointUser.coordinate[i][0] === Math.round((posXEnd - dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.coordinate[i][1] === Math.round((posYEnd - dataObject.widthCell) / dataObject.widthCell)) {

                    //if (dataObject.xonixPointUser.coordinate[i][0] ===  Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.coordinate[i][1] === Math.round(posYEnd / dataObject.widthCell)) {
                    cancelAnimationFrame(this.timerId);
                    if (dataObject.xonixPointUser.numberOfLives === 0) {
                        this.gameOver();
                    } else {
                        this.lossOfLife();
                        //this.timerId = requestAnimationFrame(() => this.start());
                    };
                    return false;
                };
            };
            if (dataObject.xonixPointUser.positX === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.positY === Math.round(posYEnd / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round(posYEnd / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round((posXEnd + dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round(posYEnd / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round((posYEnd + dataObject.widthCell) / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round((posXEnd + dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round((posYEnd + dataObject.widthCell) / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round((posXEnd - dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round(posYEnd / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round((posYEnd - dataObject.widthCell) / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round((posXEnd - dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round((posYEnd - dataObject.widthCell) / dataObject.widthCell)) {
                cancelAnimationFrame(this.timerId);
                if (dataObject.xonixPointUser.numberOfLives === 0) {
                    this.gameOver();
                } else {
                    this.lossOfLife();
                    //this.timerId = requestAnimationFrame(() => this.start());
                };
                return false;
            };
            return true;
        };

        this.checkForEnemyOutHit = function (posXEnd, posYEnd, enemy) {//проверка на попадание внешними врагами в курсор или линию пользователя
            if (dataObject.xonixPointUser.positX === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.positY === Math.round(posYEnd / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round(posYEnd / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round((posXEnd + dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round(posYEnd / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round(posXEnd / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round((posYEnd + dataObject.widthCell) / dataObject.widthCell)
                || dataObject.xonixPointUser.positXEnd === Math.round((posXEnd + dataObject.widthCell) / dataObject.widthCell) && dataObject.xonixPointUser.positYEnd === Math.round((posYEnd + dataObject.widthCell) / dataObject.widthCell)) {
                cancelAnimationFrame(this.timerId);

                let coordEnemyX = this.getRndInteger(1, (dataObject.field.widthLand - 1) * dataObject.widthCell);
                let coordEnemyY = this.getRndInteger(1, (dataObject.field.colRow - 1) * dataObject.widthCell);
                let speedX = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 2);
                let speedY = ((Math.random() < 0.5) ? -1 : 1) * this.getRndInteger(1, 2);
                enemy.posX = coordEnemyX;
                enemy.posY = coordEnemyY;
                enemy.posXEnd = coordEnemyX;
                enemy.posYEnd = coordEnemyY;
                enemy.speedX = speedX;
                enemy.speedY = speedY;

                if (dataObject.xonixPointUser.numberOfLives === 0) {
                    this.gameOver();
                } else {
                    this.lossOfLife();
                    //this.timerId = requestAnimationFrame(() => this.start());
                };
                return false;
            };
            return true;
        };

        this.start = function () {//Запуск игры, расчт всех данных, запуск анимации.
            let boolIn = true;
            let boolOut = true;
            //dataObject.flagCountDown = false;
            if (this.timerId) {
                cancelAnimationFrame(this.timerId);
            };
            //this.timerId = requestAnimationFrame(() => this.start());

            for (let i = 0; i < dataObject.field.arrEnemyIn.length; i++) {
                dataObject.field.arrEnemyIn[i].posXEnd = dataObject.field.arrEnemyIn[i].posX + dataObject.field.arrEnemyIn[i].speedX;
                dataObject.field.arrEnemyIn[i].posYEnd = dataObject.field.arrEnemyIn[i].posY + dataObject.field.arrEnemyIn[i].speedY;
                boolIn = this.checkForEnemyInHit(dataObject.field.arrEnemyIn[i].posXEnd, dataObject.field.arrEnemyIn[i].posYEnd);

                this.checkСoordinatesInterior(dataObject.field.arrEnemyIn[i]);

            };

            for (let i = 0; i < dataObject.field.arrEnemyOut.length; i++) {
                dataObject.field.arrEnemyOut[i].posXEnd = dataObject.field.arrEnemyOut[i].posX + dataObject.field.arrEnemyOut[i].speedX;
                dataObject.field.arrEnemyOut[i].posYEnd = dataObject.field.arrEnemyOut[i].posY + dataObject.field.arrEnemyOut[i].speedY;

                boolOut = this.checkForEnemyOutHit(dataObject.field.arrEnemyOut[i].posXEnd, dataObject.field.arrEnemyOut[i].posYEnd, dataObject.field.arrEnemyOut[i]);

                this.checkСoordinatesExternal(dataObject.field.arrEnemyOut[i]);

            };

            //xonixModelView.allUpdate(dataObject);
            if (boolIn && boolOut && !dataObject.gameOver) {
                xonixModelView.updateEnemy(dataObject);
                this.timerId = requestAnimationFrame(() => this.start());
            };
        };

        this.checkСoordinatesInterior = function (xonixPoint) {//проверка координат движения внутренних врагов
            let speedX = xonixPoint.speedX;
            let speedY = xonixPoint.speedY;


            if (Math.round(xonixPoint.posXEnd / dataObject.widthCell) < xonixPoint.widthLand) {
                xonixPoint.posXEnd = Math.round(xonixPoint.widthLand * dataObject.widthCell);
                xonixPoint.speedX = -xonixPoint.speedX;
            }
            if (Math.round(xonixPoint.posXEnd / dataObject.widthCell) > dataObject.field.colCell - xonixPoint.widthLand) {
                clickAudioEnemyIn();
                let posY = xonixPoint.posY;
                xonixPoint.posY = xonixPoint.posYEnd;
                xonixPoint.posYEnd = posY;
                xonixPoint.speedX = -xonixPoint.speedX;
                xonixPoint.posX = Math.round((dataObject.field.colCell - xonixPoint.widthLand - 1) * dataObject.widthCell);
                return;

            }
            if (Math.round(xonixPoint.posYEnd / dataObject.widthCell) < xonixPoint.widthLand) {
                xonixPoint.posYEnd = Math.round(xonixPoint.widthLand * dataObject.widthCell);
                xonixPoint.speedY = -xonixPoint.speedY;
            }
            if (Math.round(xonixPoint.posYEnd / dataObject.widthCell) > dataObject.field.colRow - xonixPoint.widthLand) {
                clickAudioEnemyIn();
                let posX = xonixPoint.posX;
                xonixPoint.posX = xonixPoint.posXEnd;
                xonixPoint.posXEnd = posX;

                xonixPoint.speedY = -xonixPoint.speedY;
                xonixPoint.posY = Math.round((dataObject.field.colRow - xonixPoint.widthLand - 1) * dataObject.widthCell);
                return;

            };

            let posX = xonixPoint.posX;
            if (xonixPoint.posX < xonixPoint.posXEnd) {
                let coordX = Math.round((xonixPoint.posXEnd) / dataObject.widthCell) + 1;
                if (dataObject.field.arrCoord[Math.round(xonixPoint.posY / dataObject.widthCell)][coordX] !== xonixPoint.colorEnd) {
                    for (let i = Math.round(xonixPoint.posX / dataObject.widthCell); i < coordX; i++) {
                        if (dataObject.field.arrCoord[Math.round(xonixPoint.posYEnd / dataObject.widthCell)][i] === xonixPoint.colorEnd
                        ) {
                            posX = Math.round(i * dataObject.widthCell);
                        };
                    };
                    xonixPoint.speedX = -xonixPoint.speedX;
                };
            } else {
                let coordX = Math.round((xonixPoint.posXEnd) / dataObject.widthCell) - 1;
                if (dataObject.field.arrCoord[Math.round(xonixPoint.posY / dataObject.widthCell)][coordX] !== xonixPoint.colorEnd) {
                    for (let i = coordX; i < Math.round(xonixPoint.posX / dataObject.widthCell); i++) {
                        if (dataObject.field.arrCoord[Math.round(xonixPoint.posYEnd / dataObject.widthCell)][i] === xonixPoint.colorEnd) {
                            posX = Math.round(i * dataObject.widthCell);
                            break;
                        };
                    };
                    xonixPoint.speedX = -xonixPoint.speedX;
                };
            };

            let posY = xonixPoint.posY;
            if (xonixPoint.posY < xonixPoint.posYEnd) {
                let coordY = Math.round((xonixPoint.posYEnd) / dataObject.widthCell) + 1;
                if (dataObject.field.arrCoord[coordY][Math.round(xonixPoint.posX / dataObject.widthCell)] !== xonixPoint.colorEnd) {
                    for (let i = Math.round(xonixPoint.posY / dataObject.widthCell); i < coordY; i++) {
                        if (dataObject.field.arrCoord[i][Math.round(xonixPoint.posXEnd / dataObject.widthCell)] === xonixPoint.colorEnd
                        ) {
                            posY = Math.round(i * dataObject.widthCell);
                        };
                    };
                    xonixPoint.speedY = -xonixPoint.speedY;
                };
            } else {
                let coordY = Math.round((xonixPoint.posYEnd) / dataObject.widthCell) - 1;
                if (dataObject.field.arrCoord[coordY][Math.round(xonixPoint.posX / dataObject.widthCell)] !== xonixPoint.colorEnd) {
                    for (let i = coordY; i < Math.round(xonixPoint.posY / dataObject.widthCell); i++) {
                        if (dataObject.field.arrCoord[i][Math.round(xonixPoint.posXEnd / dataObject.widthCell)] === xonixPoint.colorEnd) {
                            posY = Math.round(i * dataObject.widthCell);
                            break;
                        };
                    };
                    xonixPoint.speedY = -xonixPoint.speedY;
                };
            };


            if (xonixPoint.speedX === speedX && xonixPoint.speedY === speedY) {
                let posX = xonixPoint.posX;
                let posY = xonixPoint.posY;
                xonixPoint.posX = xonixPoint.posXEnd;
                xonixPoint.posY = xonixPoint.posYEnd;
                xonixPoint.posXEnd = posX;
                xonixPoint.posYEnd = posY;
                //clickAudioEnemyIn();
                return;
            };

            if (xonixPoint.speedX !== speedX || xonixPoint.speedY !== speedY) {
                xonixPoint.posXEnd = xonixPoint.posX;
                xonixPoint.posX = posX;
                xonixPoint.posYEnd = xonixPoint.posY;
                xonixPoint.posY = posY;
                clickAudioEnemyIn();
            }
            else if (dataObject.field.arrCoord[Math.round(xonixPoint.posYEnd / dataObject.widthCell)][Math.round(xonixPoint.posXEnd / dataObject.widthCell)] !== xonixPoint.colorEnd) {
                xonixPoint.posXEnd = xonixPoint.posX;
                xonixPoint.posYEnd = xonixPoint.posY;
                xonixPoint.speedX = -xonixPoint.speedX;
                xonixPoint.speedY = -xonixPoint.speedY;
                clickAudioEnemyIn();
                return;

            };
        };

        this.checkСoordinatesExternal = function (xonixPoint) {//проверка координат движения внешних врагов
            let speedX = xonixPoint.speedX;
            let speedY = xonixPoint.speedY;

            if (Math.round(xonixPoint.posXEnd / dataObject.widthCell) < 0) {
                xonixPoint.posXEnd = 0;
                xonixPoint.speedX = -xonixPoint.speedX;

            }
            if (Math.round(xonixPoint.posXEnd / dataObject.widthCell) > dataObject.field.colCell - 1) {
                clickSoundEnemyOut();
                let posY = xonixPoint.posY;
                xonixPoint.posY = xonixPoint.posYEnd;
                xonixPoint.posYEnd = posY;
                xonixPoint.speedX = -xonixPoint.speedX;
                xonixPoint.posX = dataObject.field.width - dataObject.widthCell;
                return;

            }
            if (Math.round(xonixPoint.posYEnd / dataObject.widthCell) < 0) {
                xonixPoint.posYEnd = 0;
                xonixPoint.speedY = -xonixPoint.speedY;

            }
            if (Math.round(xonixPoint.posYEnd / dataObject.widthCell) > dataObject.field.colRow - 1) {
                clickSoundEnemyOut();
                let posX = xonixPoint.posX;
                xonixPoint.posX = xonixPoint.posXEnd;
                xonixPoint.posXEnd = posX;

                xonixPoint.speedY = -xonixPoint.speedY;
                xonixPoint.posY = dataObject.field.height - dataObject.widthCell;
                return;

            };

            let posX = xonixPoint.posX;
            if (xonixPoint.posX < xonixPoint.posXEnd) {
                let coordX = Math.round((xonixPoint.posXEnd) / dataObject.widthCell) + 1 >= dataObject.field.colCell ? dataObject.field.colCell - 1 : Math.round((xonixPoint.posXEnd) / dataObject.widthCell) + 1;
                if (dataObject.field.arrCoord[Math.round(xonixPoint.posY / dataObject.widthCell)][coordX] !== xonixPoint.colorEnd) {
                    for (let i = Math.round(xonixPoint.posX / dataObject.widthCell); i < coordX; i++) {
                        if (dataObject.field.arrCoord[Math.round(xonixPoint.posYEnd / dataObject.widthCell)][i] === xonixPoint.colorEnd
                        ) {
                            posX = Math.round(i * dataObject.widthCell);
                        };
                    };
                    xonixPoint.speedX = -xonixPoint.speedX;
                };
            } else {
                let coordX = Math.round((xonixPoint.posXEnd) / dataObject.widthCell) - 1 < 0 ? 0 : Math.round((xonixPoint.posXEnd) / dataObject.widthCell) - 1;
                if (dataObject.field.arrCoord[Math.round(xonixPoint.posY / dataObject.widthCell)][coordX] !== xonixPoint.colorEnd) {
                    for (let i = coordX; i < Math.round(xonixPoint.posX / dataObject.widthCell); i++) {
                        if (dataObject.field.arrCoord[Math.round(xonixPoint.posYEnd / dataObject.widthCell)][i] === xonixPoint.colorEnd) {
                            posX = Math.round(i * dataObject.widthCell);
                            break;
                        };
                    };
                    xonixPoint.speedX = -xonixPoint.speedX;
                };
            };

            let posY = xonixPoint.posY;
            if (xonixPoint.posY < xonixPoint.posYEnd) {
                let coordY = Math.round((xonixPoint.posYEnd) / dataObject.widthCell) + 1 >= dataObject.field.colRow ? dataObject.field.colRow - 1 : Math.round((xonixPoint.posYEnd) / dataObject.widthCell) + 1;
                if (dataObject.field.arrCoord[coordY][Math.round(xonixPoint.posX / dataObject.widthCell)] !== xonixPoint.colorEnd) {
                    for (let i = Math.round(xonixPoint.posY / dataObject.widthCell); i < coordY; i++) {
                        if (dataObject.field.arrCoord[i][Math.round(xonixPoint.posXEnd / dataObject.widthCell)] === xonixPoint.colorEnd
                        ) {
                            posY = Math.round(i * dataObject.widthCell);
                        };
                    };
                    xonixPoint.speedY = -xonixPoint.speedY;
                };
            } else {
                let coordY = Math.round((xonixPoint.posYEnd) / dataObject.widthCell) - 1 < 0 ? 0 : Math.round((xonixPoint.posYEnd) / dataObject.widthCell) - 1;
                if (dataObject.field.arrCoord[coordY][Math.round(xonixPoint.posX / dataObject.widthCell)] !== xonixPoint.colorEnd) {
                    for (let i = coordY; i < Math.round(xonixPoint.posY / dataObject.widthCell); i++) {
                        if (dataObject.field.arrCoord[i][Math.round(xonixPoint.posXEnd / dataObject.widthCell)] === xonixPoint.colorEnd) {
                            posY = Math.round(i * dataObject.widthCell);
                            break;
                        };
                    };
                    xonixPoint.speedY = -xonixPoint.speedY;
                };
            };

            if (xonixPoint.speedX === speedX && xonixPoint.speedY === speedY) {
                let posX = xonixPoint.posX;
                let posY = xonixPoint.posY;
                xonixPoint.posX = xonixPoint.posXEnd;
                xonixPoint.posY = xonixPoint.posYEnd;
                xonixPoint.posXEnd = posX;
                xonixPoint.posYEnd = posY;
                clickSoundEnemyOut();
                return;
            };

            if (xonixPoint.speedX !== speedX || xonixPoint.speedY !== speedY) {
                xonixPoint.posXEnd = xonixPoint.posX;
                xonixPoint.posX = posX;
                xonixPoint.posYEnd = xonixPoint.posY;
                xonixPoint.posY = posY;
                clickSoundEnemyOut();
            }
            else if (dataObject.field.arrCoord[Math.round(xonixPoint.posYEnd / dataObject.widthCell)][Math.round(xonixPoint.posXEnd / dataObject.widthCell)] !== xonixPoint.colorEnd) {
                xonixPoint.posXEnd = xonixPoint.posX;
                xonixPoint.posYEnd = xonixPoint.posY;
                xonixPoint.speedX = -xonixPoint.speedX;
                xonixPoint.speedY = -xonixPoint.speedY;
                clickSoundEnemyOut();
                return;

            };
        };

        this.territoryСaptured = function (arr) {//функция закрашивает захваченные поля
            for (let i = 0; i < arr.length; i++) {
                dataObject.field.arrCoord[arr[i][1]][arr[i][0]] = dataObject.xonixPointUser.colorLand;
            };
        };

        this.seizeTerritory = function () {//определение захваченных координат при окончании движения курсора пользователя

            const arrCoordinates = dataObject.xonixPointUser.coordinate;
            let arrCoordX = [];
            let arrCoordY = [];
            const minFieldX = 0;
            const maxFieldX = dataObject.field.colCell - 1;
            let minX = arrCoordinates[0][0];
            let maxX = arrCoordinates[arrCoordinates.length - 1][0];
            for (let i = 0; i < arrCoordinates.length; i++) {
                let arr = [arrCoordinates[i][1], arrCoordinates[i][0]];
                let stringPos = arr.join(';');
                //if (!arrCoordX.includes(stringPos)) { arrCoordX[arrCoordX.length] = stringPos; }
                arrCoordX[arrCoordX.length] = stringPos;
                arrCoordY[arrCoordY.length] = String(arr[0]);
                maxX = (arr[1] > maxX) ? arr[1] : maxX;
                minX = (arr[1] < minX) ? arr[1] : minX;
            };
            /*const duplicates = arrCoordY.filter((number, index, numbers) => {
                return numbers.indexOf(number) !== index;
            });*/
            const countItems = {};
            for (const item of arrCoordY) {
                // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
                countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
            };
            const duplicates = Object.keys(countItems).filter((item) => countItems[item] > 1);

            const arrY = [];
            for (let i = 0; i < arrCoordX.length - 1; i++) {
                let arrPoints1 = arrCoordX[i].split(';');
                if (!duplicates.includes(String(arrPoints1[0]))) {
                    arrY[arrY.length] = (Number(arrPoints1[1]) === maxX) ? `${arrPoints1[0]};${minX}` : `${arrPoints1[0]};${maxX}`;
                };
            };
            if (arrY.length) {
                arrCoordX = arrCoordX.concat(arrY);
            }
            arrCoordX.sort();
            if (arrCoordX.length % 2 !== 0) {
                for (let i = 0; i < arrCoordX.length - 1; i = i + 2) {
                    let arrPoints1 = arrCoordX[i].split(';');
                    let arrPoints2 = arrCoordX[i + 1].split(';');
                    if (arrPoints1[1] !== arrPoints2[1] && arrPoints1[0] !== arrPoints2[0]) {
                        let removed = arrCoordX.splice(i, 0, arrCoordX[i]);
                    };
                };
            };

            const arrCoord = [];
            const arrCoord1 = [];
            const arrCoord2 = [];
            for (let i = 0; i < arrCoordX.length - 1; i = i + 2) {
                let arrPoints1 = arrCoordX[i].split(';');
                let arrPoints2 = arrCoordX[i + 1].split(';');
                /*if (arrPoints1[0] !== arrPoints2[0]
                    //|| arrPoints1[0] === arrPoints2[0])
                ) { continue };*/
                //if (arrPoints1[1] !== arrPoints2[1] && arrPoints1[0] === arrPoints2[0]) {
                let startX = Number(arrPoints1[1]);
                let endX = Number(arrPoints2[1]);
                if (startX > endX) {
                    let intermediary = startX;
                    startX = endX;
                    endX = intermediary;
                };
                for (let j = startX; j <= endX; j++) {
                    let strCoord = [j, Number(arrPoints1[0])].join(';');
                    if (!arrCoord2.includes(strCoord)) {
                        arrCoord2[arrCoord2.length] = strCoord;
                        arrCoord[arrCoord.length] = [j, Number(arrPoints1[0])];
                    }
                };

            };

            let thereIsAnEnemy = false;
            for (let i = 0; i < dataObject.field.arrEnemyIn.length; i++) {
                let strCoord = [dataObject.field.arrEnemyIn[i].posX, dataObject.field.arrEnemyIn[i].posY].join(';');
                if (!arrCoord2.includes(strCoord)) {
                    thereIsAnEnemy = true;
                    break;
                };
            };


            if (thereIsAnEnemy) {
                this.territoryСaptured(arrCoord);
                dataObject.xonixPointUser.coordinate = arrCoord;
                dataObject.xonixPointUser.location = 'land';
                xonixModelView.updateField(dataObject);
            } else {
                dataObject.xonixPointUser.coordinate = [];
            };
            this.countPoints();

        };

        this.countPoints = function () {//подсчет очков
            let amountOfEverything = (dataObject.field.colRow - dataObject.field.widthLand) * (dataObject.field.colCell - dataObject.field.widthLand);
            let count = 0;
            for (let i = dataObject.field.widthLand - 1; i < dataObject.field.colRow - dataObject.field.widthLand - 1; i++) {
                for (let j = dataObject.field.widthLand - 1; j < dataObject.field.colCell - dataObject.field.widthLand - 1; j++) {
                    if (dataObject.field.arrCoord[i][j] === dataObject.xonixPointUser.colorLand) { count++ };
                };
            };
            dataObject.xonixPointUser.numberOfPointsLevel = Math.round(count * 100 / amountOfEverything);
            dataObject.xonixPointUser.numberOfPoints = dataObject.xonixPointUser.numberOfPointsStartLevel + dataObject.xonixPointUser.numberOfPointsLevel;
            if (dataObject.xonixPointUser.numberOfPointsLevel >= 75) {
                dataObject.xonixPointUser.level += 1;
                dataObject.xonixPointUser.numberOfPointsLevel = 0;
                dataObject.xonixPointUser.numberOfPointsStartLevel = dataObject.xonixPointUser.numberOfPoints;
                setTimeout(() => this.startNewLevel(), 1000);
            }
            xonixModelView.updateScore(dataObject);
        };

        this.сheckForEnding = function (direction) {//обработка движений пользователя при нажатии кнопок на клавиатуре
            switch (direction) {
                case 'left':
                    let coordXLeft = dataObject.xonixPointUser.positX - dataObject.xonixPointUser.speedX;
                    dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                    if (dataObject.xonixPointUser.positX === 0) { return false; };
                    if (coordXLeft <= 0) {
                        coordXLeft = 0;
                    };
                    if ((dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXLeft] === dataObject.xonixPointUser.colorLand
                        || dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXLeft] === dataObject.xonixPointUser.color)
                        && dataObject.xonixPointUser.location === 'land') {
                        dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                        dataObject.xonixPointUser.positX = coordXLeft;
                        dataObject.xonixPointUser.colorEnd = dataObject.xonixPointUser.colorLand;
                        return true;

                    };
                    if (dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXLeft] === dataObject.xonixPointUser.colorSea
                        && dataObject.xonixPointUser.location === 'land') {
                        dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                        dataObject.xonixPointUser.positX = coordXLeft;
                        dataObject.xonixPointUser.location = 'sea';

                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                    }
                    if (dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXLeft] === dataObject.xonixPointUser.colorLand
                        && dataObject.xonixPointUser.location === 'sea') {
                        if (dataObject.xonixPointUser.currentMovement === 'right') {
                            cancelAnimationFrame(this.timerId);
                            if (dataObject.xonixPointUser.numberOfLives === 0) {
                                this.gameOver();
                            } else {
                                this.lossOfLife();
                                //this.timerId = requestAnimationFrame(() => this.start());
                            };
                            return false;
                        };
                        dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                        dataObject.xonixPointUser.positX = coordXLeft;
                        dataObject.xonixPointUser.location = 'land';

                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positX, dataObject.xonixPointUser.positY];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;

                        this.seizeTerritory();
                    };
                    if (dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXLeft] === dataObject.xonixPointUser.colorSea
                        && dataObject.xonixPointUser.location === 'sea') {

                        dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                        dataObject.xonixPointUser.positX = coordXLeft;
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                    }
                    return true;
                case 'right':
                    let coordXRight = dataObject.xonixPointUser.positX + dataObject.xonixPointUser.speedX;
                    dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                    if (dataObject.xonixPointUser.positX === dataObject.field.arrCoord[0].length - 1) { return false; };
                    if (coordXRight >= dataObject.field.arrCoord[0].length - 1) {
                        coordXRight = dataObject.field.arrCoord[0].length - 1;
                    };
                    if ((dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXRight] === dataObject.xonixPointUser.colorLand
                        || dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXRight] === dataObject.xonixPointUser.color)
                        && dataObject.xonixPointUser.location === 'land') {
                        dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                        dataObject.xonixPointUser.positX = coordXRight;
                        dataObject.xonixPointUser.colorEnd = dataObject.xonixPointUser.colorLand;

                        //dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        //dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;

                        return true;
                    };
                    if (dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXRight] === dataObject.xonixPointUser.colorSea
                        && dataObject.xonixPointUser.location === 'land') {
                        dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                        dataObject.xonixPointUser.positX = coordXRight;
                        dataObject.xonixPointUser.location === 'sea';
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                    }
                    if (dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXRight] === dataObject.xonixPointUser.colorLand
                        && dataObject.xonixPointUser.location === 'sea') {
                        if (dataObject.xonixPointUser.currentMovement === 'left') {
                            cancelAnimationFrame(this.timerId);
                            if (dataObject.xonixPointUser.numberOfLives === 0) {
                                this.gameOver();
                            } else {
                                this.lossOfLife();
                                //this.timerId = requestAnimationFrame(() => this.start());
                            };
                            return false;
                        };
                        dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                        dataObject.xonixPointUser.positX = coordXRight;
                        dataObject.xonixPointUser.location === 'land';
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positX, dataObject.xonixPointUser.positY];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                        this.seizeTerritory();
                    };
                    if (dataObject.field.arrCoord[dataObject.xonixPointUser.positY][coordXRight] === dataObject.xonixPointUser.colorSea
                        && dataObject.xonixPointUser.location === 'sea') {
                        dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                        dataObject.xonixPointUser.positX = coordXRight;
                        dataObject.xonixPointUser.location === 'sea';
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;

                    };
                    return true;
                case 'up':
                    let coordYUp = dataObject.xonixPointUser.positY - dataObject.xonixPointUser.speedY;
                    dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                    if (dataObject.xonixPointUser.positY === 0) { return false; };
                    if (coordYUp <= 0) {
                        coordYUp = 0;
                    };
                    if ((dataObject.field.arrCoord[coordYUp][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.colorLand
                        || dataObject.field.arrCoord[coordYUp][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.color)
                        && dataObject.xonixPointUser.location === 'land') {
                        dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                        dataObject.xonixPointUser.positY = coordYUp;
                        dataObject.xonixPointUser.colorEnd = dataObject.xonixPointUser.colorLand;

                        //dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        //dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;

                        return true;

                    };
                    if (dataObject.field.arrCoord[coordYUp][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.colorSea
                        && dataObject.xonixPointUser.location === 'land') {
                        dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                        dataObject.xonixPointUser.positY = coordYUp;
                        dataObject.xonixPointUser.location = 'sea';

                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                    }
                    if (dataObject.field.arrCoord[coordYUp][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.colorLand
                        && dataObject.xonixPointUser.location === 'sea') {
                        if (dataObject.xonixPointUser.currentMovement === 'down') {
                            cancelAnimationFrame(this.timerId);
                            if (dataObject.xonixPointUser.numberOfLives === 0) {
                                this.gameOver();
                            } else {
                                this.lossOfLife();
                                //this.timerId = requestAnimationFrame(() => this.start());
                            };
                            return false;
                        };
                        dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                        dataObject.xonixPointUser.positY = coordYUp;
                        dataObject.xonixPointUser.location = 'land';

                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positX, dataObject.xonixPointUser.positY];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                        this.seizeTerritory();
                    };
                    if (dataObject.field.arrCoord[coordYUp][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.colorSea
                        && dataObject.xonixPointUser.location === 'sea') {

                        dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                        dataObject.xonixPointUser.positY = coordYUp;

                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                    }
                    return true;
                case 'down':
                    let coordYDown = dataObject.xonixPointUser.positY + dataObject.xonixPointUser.speedY;
                    dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
                    if (dataObject.xonixPointUser.positY === dataObject.field.arrCoord.length - 1) { return false; };
                    if (coordYDown >= dataObject.field.arrCoord.length - 1) {
                        coordYDown = dataObject.field.arrCoord.length - 1;
                    };
                    if ((dataObject.field.arrCoord[coordYDown][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.colorLand
                        || dataObject.field.arrCoord[coordYDown][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.color)
                        && dataObject.xonixPointUser.location === 'land') {
                        dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                        dataObject.xonixPointUser.positY = coordYDown;
                        dataObject.xonixPointUser.colorEnd = dataObject.xonixPointUser.colorLand;

                        //dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        //dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;

                        return true;

                    };
                    if (dataObject.field.arrCoord[coordYDown][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.colorSea
                        && dataObject.xonixPointUser.location === 'land') {
                        dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                        dataObject.xonixPointUser.positY = coordYDown;
                        dataObject.xonixPointUser.location = 'sea';

                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                    }
                    if (dataObject.field.arrCoord[coordYDown][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.colorLand
                        && dataObject.xonixPointUser.location === 'sea') {
                        if (dataObject.xonixPointUser.currentMovement === 'up') {
                            cancelAnimationFrame(this.timerId);
                            if (dataObject.xonixPointUser.numberOfLives === 0) {
                                this.gameOver();
                            } else {
                                this.lossOfLife();
                                //this.timerId = requestAnimationFrame(() => this.start());
                            };
                            return false;
                        };
                        dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                        dataObject.xonixPointUser.positY = coordYDown;
                        dataObject.xonixPointUser.location = 'land';
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positX, dataObject.xonixPointUser.positY];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                        this.seizeTerritory();
                    };
                    if (dataObject.field.arrCoord[coordYDown][dataObject.xonixPointUser.positX] === dataObject.xonixPointUser.colorSea
                        && dataObject.xonixPointUser.location === 'sea') {

                        dataObject.xonixPointUser.positYEnd = dataObject.xonixPointUser.positY;
                        dataObject.xonixPointUser.positY = coordYDown;
                        dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positXEnd, dataObject.xonixPointUser.positYEnd];

                        dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;
                        dataObject.field.arrCoord[dataObject.xonixPointUser.positYEnd][dataObject.xonixPointUser.positXEnd] = dataObject.xonixPointUser.colorEnd;
                    }
                    return true;
                default: return false;
            };
        };

        this.moveModalKeyDown = function (codeKey) {//обработка нажатия кнопок на клавиатуре
            switch (codeKey) {
                case "ArrowLeft":
                    if (!dataObject.flagCountDown && !dataObject.gameOver) {
                        let boolLeft = this.сheckForEnding('left');
                        dataObject.xonixPointUser.currentMovement = 'left';
                        if (boolLeft) {
                            cancelAnimationFrame(this.timerId);
                            this.timerId = requestAnimationFrame(() => this.start());
                        };
                    };
                    break;
                case "ArrowUp":
                    if (!dataObject.flagCountDown && !dataObject.gameOver) {
                        let boolUp = this.сheckForEnding('up');
                        dataObject.xonixPointUser.currentMovement = 'up';
                        if (boolUp) {
                            cancelAnimationFrame(this.timerId);
                            this.timerId = requestAnimationFrame(() => this.start());
                        };
                    };
                    break;
                case "ArrowRight":
                    if (!dataObject.flagCountDown && !dataObject.gameOver) {
                        let boolRight = this.сheckForEnding('right');
                        dataObject.xonixPointUser.currentMovement = 'right';
                        if (boolRight) {
                            cancelAnimationFrame(this.timerId);
                            this.timerId = requestAnimationFrame(() => this.start());
                        };
                    };
                    break;
                case "ArrowDown":
                    if (!dataObject.flagCountDown && !dataObject.gameOver) {
                        let boolDown = this.сheckForEnding('down');
                        dataObject.xonixPointUser.currentMovement = 'down';
                        if (boolDown) {
                            cancelAnimationFrame(this.timerId);
                            this.timerId = requestAnimationFrame(() => this.start());
                        };
                    };
                    break;
                default:
                    break;
            }
        };

        this.checkPosition = function (direction) {//определение местонахождения курсора пользователя
            if (direction === dataObject.xonixPointUser.currentMovement && dataObject.xonixPointUser.location === 'sea') {
                return true;
            };
            return false;
        };

        this.lossOfLife = function () {//расчеты при потере жизни игроком

            dataObject.flagCountDown = true;
            cancelAnimationFrame(this.timerId);
            dataObject.xonixPointUser.coordinate[dataObject.xonixPointUser.coordinate.length] = [dataObject.xonixPointUser.positX, dataObject.xonixPointUser.positY];
            clickSoundLossOfLife();
            dataObject.xonixPointUser.numberOfLives -= 1;
            dataObject.xonixPointUser.positX = dataObject.field.colCell / 2;
            dataObject.xonixPointUser.positY = 1;
            dataObject.xonixPointUser.positXEnd = dataObject.xonixPointUser.positX;
            dataObject.xonixPointUser.positYEnd = 1;
            dataObject.xonixPointUser.colorEnd = dataObject.xonixPointUser.color;
            dataObject.xonixPointUser.location = 'land';
            dataObject.xonixPointUser.currentMovement = '';

            for (let i = 1; i < dataObject.xonixPointUser.coordinate.length; i++) {
                dataObject.field.arrCoord[dataObject.xonixPointUser.coordinate[i][1]][dataObject.xonixPointUser.coordinate[i][0]] = dataObject.xonixPointUser.colorSea;
            };
            setTimeout(() => xonixModelView.allUpdate(dataObject), 1000);
            //dataObject.field.arrCoord[dataObject.xonixPointUser.positY][dataObject.xonixPointUser.positX] = dataObject.xonixPointUser.color;

            setTimeout(() => this.timerId = requestAnimationFrame(() => this.start()), 4000);

            xonixModelView.lossOfLifeUpdate(dataObject, 3);
            setTimeout(() => dataObject.flagCountDown = false, 4000);


        };

        this.moveModalKeyUp = function (codeKey) {//обработка отпускания клавиш клавиатуры
            let bool = false;
            switch (codeKey) {
                case "ArrowLeft":
                    if (!dataObject.flagCountDown && !dataObject.gameOver) {
                        bool = this.checkPosition('left');
                        if (bool) {
                            cancelAnimationFrame(this.timerId);
                            if (dataObject.xonixPointUser.numberOfLives === 0) {
                                this.gameOver();
                            } else {
                                this.lossOfLife();
                                //this.timerId = requestAnimationFrame(() => this.start());
                            };
                        };
                    };
                    break;
                case "ArrowUp":
                    if (!dataObject.flagCountDown && !dataObject.gameOver) {
                        bool = this.checkPosition('up');
                        if (bool) {
                            cancelAnimationFrame(this.timerId);
                            if (dataObject.xonixPointUser.numberOfLives === 0) {
                                this.gameOver();
                            } else {
                                this.lossOfLife();
                                //this.timerId = requestAnimationFrame(() => this.start());
                            };
                        };
                    };
                    break;
                case "ArrowRight":
                    if (!dataObject.flagCountDown && !dataObject.gameOver) {
                        bool = this.checkPosition('right');
                        if (bool) {
                            cancelAnimationFrame(this.timerId);
                            if (dataObject.xonixPointUser.numberOfLives === 0) {
                                this.gameOver();
                            } else {
                                this.lossOfLife();
                                //this.timerId = requestAnimationFrame(() => this.start());
                            };
                        };
                    };
                    break;
                case "ArrowDown":
                    if (!dataObject.flagCountDown && !dataObject.gameOver) {
                        bool = this.checkPosition('down');
                        if (bool) {
                            cancelAnimationFrame(this.timerId);
                            if (dataObject.xonixPointUser.numberOfLives === 0) {
                                this.gameOver();
                            } else {
                                this.lossOfLife();
                                //this.timerId = requestAnimationFrame(() => this.start());
                            };

                        };
                    };
                    break;
                default:
                    break;
            };
        };

        this.gameOver = function () {//запуск анимации окончания игры
            clickSoundGameOver();
            dataObject.gameOver = true;
            cancelAnimationFrame(dataObject.timerId);
            flagGameStart = false;
            dataObject.timerGameOverId = requestAnimationFrame(() => xonixModelView.gameOverTXT(dataObject));
            if (dataObject.xonixPointUser.numberOfPoints !== 0) {
                this.sendMessage();
            };
            dataObject.xonixPointUser.numberOfLives = -1;
            //clickSoundInit();

        };

        this.stopAnimation = function () {//остановка анимации при окончания игры
            dataObject.gameOver = true;
            cancelAnimationFrame(dataObject.timerId);
        };

        this.warnUser = function () {
            xonixModelView.warnUser("Игра запущена, прогресс будет потерян!");
        };
    };

    function XonixController() {//объявление класса контроллера (controller) 

        let myModalModel = null;
        let myModalWindow = null;

        this.init = function (model, modalWindow) {//инициализация контроллера

            myModalModel = model;
            myModalWindow = modalWindow;

            document.addEventListener('keydown', (event) => this.moveControlKeyDown(event));
            document.addEventListener('keyup', (event) => this.moveControlKeyUp(event));

            document.addEventListener('click', (event) => this.stopAnimation(event));

            window.onbeforeunload = function (event) {
                event.preventDefault();
                if (flagGameStart) {
                    flagGameStart = false;
                    return false;
                };
            };

            window.addEventListener("popstate", (event) => this.warnUser(event));

        };

        this.moveControlKeyDown = function (event) {//обработка события нажатия клавиш клавиатуры
            myModalWindow.moveModalKeyDown(event.code);
        };

        this.moveControlKeyUp = function (event) {//обработка события отпускания клавиш клавиатуры
            myModalWindow.moveModalKeyUp(event.code);
        };

        this.stopAnimation = function (event) {//остановка всей анимации
            if (event.target.id === "canvas-button-main") {
                myModalWindow.stopAnimation();
            }
        };
        this.warnUser = function (event) {
            event.preventDefault();
            if (flagGameStart) {
                flagGameStart = false;
                myModalWindow.warnUser();
            }
        };

    };

    return {

        init: function (nameUser, conteiner) {//иниациализация модуля игры

            const view = new XonixView();
            const model = new XonixModel();
            const controller = new XonixController();

            view.init(conteiner);
            model.init(view, nameUser);
            controller.init(conteiner, model);

        },

    };

});






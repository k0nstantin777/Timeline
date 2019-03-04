/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/scripts/components/Timeline.ts":
/*!***************************************************!*\
  !*** ./src/assets/scripts/components/Timeline.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TimelineItem_1 = __webpack_require__(/*! ./TimelineItem */ \"./src/assets/scripts/components/TimelineItem.ts\");\nvar Timeline = /** @class */ (function () {\n    function Timeline(eventList) {\n        this.eventList = eventList;\n        this.head = 'Timeline';\n        this.init();\n    }\n    Timeline.prototype.init = function () {\n        this.element = document.querySelector('.timeline');\n        this.lineElement = document.querySelector('.timeline-line');\n        this.leftColumnElement = document.querySelector('.timeline-column.left');\n        this.rightColumnElement = document.querySelector('.timeline-column.right');\n        this.events = this.eventList.getEvents();\n        console.log(this);\n    };\n    Timeline.prototype.run = function () {\n        var _this = this;\n        this.setHeightLine();\n        this.events.forEach(function (event, index) {\n            if (index % 2 !== 0) {\n                _this.leftColumnElement.append(_this.getTimeLineItem(event));\n            }\n            else {\n                _this.rightColumnElement.append(_this.getTimeLineItem(event));\n            }\n        });\n    };\n    Timeline.prototype.setHeightLine = function () {\n        this.lineElement.style.height = this.events.length * 150 + 'px';\n    };\n    Timeline.prototype.getTimeLineItem = function (event) {\n        var timeLineItem = new TimelineItem_1.TimelineItem(event);\n        return timeLineItem.build();\n    };\n    return Timeline;\n}());\nexports.Timeline = Timeline;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/components/Timeline.ts?");

/***/ }),

/***/ "./src/assets/scripts/components/TimelineItem.ts":
/*!*******************************************************!*\
  !*** ./src/assets/scripts/components/TimelineItem.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EventFactory_1 = __webpack_require__(/*! ./events/EventFactory */ \"./src/assets/scripts/components/events/EventFactory.ts\");\nvar TimelineItem = /** @class */ (function () {\n    function TimelineItem(event) {\n        this.event = event;\n        this.eventFactory = new EventFactory_1.EventFactory(event.type);\n    }\n    TimelineItem.prototype.build = function () {\n        var eventObject = this.eventFactory.getEventObject();\n        return eventObject.create(this.event);\n    };\n    return TimelineItem;\n}());\nexports.TimelineItem = TimelineItem;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/components/TimelineItem.ts?");

/***/ }),

/***/ "./src/assets/scripts/components/events/EventAbstract.ts":
/*!***************************************************************!*\
  !*** ./src/assets/scripts/components/events/EventAbstract.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ElementBuilder_1 = __webpack_require__(/*! ../../helpers/ElementBuilder */ \"./src/assets/scripts/helpers/ElementBuilder.ts\");\nvar EventAbstract = /** @class */ (function () {\n    function EventAbstract() {\n    }\n    EventAbstract.prototype.create = function (event) {\n        var eventElement = document.createElement('div');\n        eventElement.classList.add('timeline-event', 'timeline-event-item', event.type);\n        var head = new ElementBuilder_1.ElementBuilder('div', { 'class': 'timeline-event-item-head flex align-center justify-space-between' }).build();\n        eventElement.append(head);\n        var body = new ElementBuilder_1.ElementBuilder('div', { 'class': 'timeline-event-item-body flex flex-wrap align-center' }).build();\n        eventElement.append(body);\n        var footer = new ElementBuilder_1.ElementBuilder('div', { 'class': 'timeline-event-item-footer' }).build();\n        eventElement.append(footer);\n        var dataContent = new ElementBuilder_1.ElementBuilder('div', { 'class': 'date-content' }).build();\n        var dateWrapper = new ElementBuilder_1.ElementBuilder('div', { 'class': 'date-content-wrapper' }).build();\n        var point = new ElementBuilder_1.ElementBuilder('span', { 'class': 'point' }).build();\n        var line = new ElementBuilder_1.ElementBuilder('span', { 'class': 'line' }).build();\n        var date = new ElementBuilder_1.ElementBuilder('p', { 'class': 'date', 'text': event.date }).build();\n        dateWrapper.append(point);\n        dateWrapper.append(line);\n        dateWrapper.append(date);\n        dataContent.append(dateWrapper);\n        eventElement.append(dataContent);\n        return eventElement;\n    };\n    return EventAbstract;\n}());\nexports.EventAbstract = EventAbstract;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/components/events/EventAbstract.ts?");

/***/ }),

/***/ "./src/assets/scripts/components/events/EventFactory.ts":
/*!**************************************************************!*\
  !*** ./src/assets/scripts/components/events/EventFactory.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EventTransaction_1 = __webpack_require__(/*! ./EventTransaction */ \"./src/assets/scripts/components/events/EventTransaction.ts\");\nvar EventNews_1 = __webpack_require__(/*! ./EventNews */ \"./src/assets/scripts/components/events/EventNews.ts\");\nvar EventFactory = /** @class */ (function () {\n    function EventFactory(type) {\n        this.type = type;\n    }\n    EventFactory.prototype.getEventObject = function () {\n        switch (this.type) {\n            case 'transaction': return new EventTransaction_1.EventTransaction();\n            case 'news': return new EventNews_1.EventNews();\n        }\n    };\n    return EventFactory;\n}());\nexports.EventFactory = EventFactory;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/components/events/EventFactory.ts?");

/***/ }),

/***/ "./src/assets/scripts/components/events/EventFakeData.ts":
/*!***************************************************************!*\
  !*** ./src/assets/scripts/components/events/EventFakeData.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar eventsTypes = ['transaction', 'news'];\nvar transactionsCurrency = ['RUB', 'USD', 'EURO'];\nvar transactionsAuthors = ['OOO \"Молоко\"', 'ИП \"Иванов\"', 'OAO \"Мегафон\"'];\nvar transactionsDescriptions = ['Списание задолженности', 'Пополнение баланса', 'Кредитная карта'];\nvar transactionsMoves = ['positive', 'negative'];\nvar newsHeads = ['Новая версия программы', 'Новый технический директор', 'Подведены итоги голосования'];\nvar newsMessages = ['У нас вышла новая версия программы', 'У нас новый технический директор', 'Наконецто подведены итоги голосования'];\nvar events = [];\nfor (var i = 0; i < 10; i++) {\n    var type = eventsTypes[getRandomInRange(0, 1)];\n    var date = new Date(getRandomInRange(2017, 2018), getRandomInRange(0, 11), getRandomInRange(0, 30));\n    if (type === 'transaction') {\n        events.push({\n            type: type,\n            content: {\n                summ: getRandomInRange(100, 1000),\n                currency: transactionsCurrency[getRandomInRange(0, 2)],\n                author: transactionsAuthors[getRandomInRange(0, 2)],\n                description: transactionsDescriptions[getRandomInRange(0, 2)],\n                move: transactionsMoves[getRandomInRange(0, 1)],\n            },\n            date: date.toLocaleDateString(),\n        });\n    }\n    else if (type === 'news') {\n        events.push({\n            type: type,\n            content: {\n                head: newsHeads[getRandomInRange(0, 2)],\n                message: newsMessages[getRandomInRange(0, 2)]\n            },\n            date: date.toLocaleDateString(),\n        });\n    }\n}\nfunction getRandomInRange(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n}\nexports.default = events;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/components/events/EventFakeData.ts?");

/***/ }),

/***/ "./src/assets/scripts/components/events/EventList.ts":
/*!***********************************************************!*\
  !*** ./src/assets/scripts/components/events/EventList.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EventFakeData_1 = __webpack_require__(/*! ./EventFakeData */ \"./src/assets/scripts/components/events/EventFakeData.ts\");\nvar EventList = /** @class */ (function () {\n    function EventList() {\n    }\n    EventList.prototype.getEvents = function () {\n        return EventFakeData_1.default;\n    };\n    return EventList;\n}());\nexports.EventList = EventList;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/components/events/EventList.ts?");

/***/ }),

/***/ "./src/assets/scripts/components/events/EventNews.ts":
/*!***********************************************************!*\
  !*** ./src/assets/scripts/components/events/EventNews.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EventAbstract_1 = __webpack_require__(/*! ./EventAbstract */ \"./src/assets/scripts/components/events/EventAbstract.ts\");\nvar ElementBuilder_1 = __webpack_require__(/*! ../../helpers/ElementBuilder */ \"./src/assets/scripts/helpers/ElementBuilder.ts\");\nvar EventNews = /** @class */ (function (_super) {\n    __extends(EventNews, _super);\n    function EventNews() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    EventNews.prototype.create = function (event) {\n        var element = _super.prototype.create.call(this, event);\n        var head = element.querySelector('.timeline-event-item-head');\n        var title = new ElementBuilder_1.ElementBuilder('p', { 'html': '<i class=\"fa fa-bullhorn\" aria-hidden=\"true\"></i> Новость' }).build();\n        head.append(title);\n        var body = element.querySelector('.timeline-event-item-body');\n        var header = new ElementBuilder_1.ElementBuilder('span', { 'text': event.content.head }).build();\n        body.append(header);\n        return element;\n    };\n    return EventNews;\n}(EventAbstract_1.EventAbstract));\nexports.EventNews = EventNews;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/components/events/EventNews.ts?");

/***/ }),

/***/ "./src/assets/scripts/components/events/EventTransaction.ts":
/*!******************************************************************!*\
  !*** ./src/assets/scripts/components/events/EventTransaction.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __extends = (this && this.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EventAbstract_1 = __webpack_require__(/*! ./EventAbstract */ \"./src/assets/scripts/components/events/EventAbstract.ts\");\nvar ElementBuilder_1 = __webpack_require__(/*! ../../helpers/ElementBuilder */ \"./src/assets/scripts/helpers/ElementBuilder.ts\");\nvar EventTransaction = /** @class */ (function (_super) {\n    __extends(EventTransaction, _super);\n    function EventTransaction() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    EventTransaction.prototype.create = function (event) {\n        var element = _super.prototype.create.call(this, event);\n        var head = element.querySelector('.timeline-event-item-head');\n        var title = new ElementBuilder_1.ElementBuilder('p', { 'html': '<i class=\"fa fa-money\" aria-hidden=\"true\"></i> Финансовая транзакция' }).build();\n        head.append(title);\n        var body = element.querySelector('.timeline-event-item-body');\n        var summ = new ElementBuilder_1.ElementBuilder('span', { 'text': 'Сумма: ' + event.content.summ }).build();\n        var currency = new ElementBuilder_1.ElementBuilder('span', { 'text': 'Валюта: ' + event.content.currency }).build();\n        var author = new ElementBuilder_1.ElementBuilder('span', { 'text': 'Автор: ' + event.content.author }).build();\n        body.append(summ);\n        body.append(currency);\n        body.append(author);\n        var footer = element.querySelector('.timeline-event-item-footer');\n        footer.classList.add(event.content.move);\n        var mark = new ElementBuilder_1.ElementBuilder('i', { 'class': (event.content.move === 'positive') ? 'fa fa-plus' : 'fa fa-minus', 'aria-hidden': \"true\" }).build();\n        footer.append(mark);\n        return element;\n    };\n    return EventTransaction;\n}(EventAbstract_1.EventAbstract));\nexports.EventTransaction = EventTransaction;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/components/events/EventTransaction.ts?");

/***/ }),

/***/ "./src/assets/scripts/helpers/ElementBuilder.ts":
/*!******************************************************!*\
  !*** ./src/assets/scripts/helpers/ElementBuilder.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ElementBuilder = /** @class */ (function () {\n    function ElementBuilder(tagname, attrs) {\n        this.tagname = tagname;\n        this.attrs = attrs;\n    }\n    ElementBuilder.prototype.build = function () {\n        var element = document.createElement(this.tagname);\n        if (Object.keys(this.attrs).length > 0) {\n            for (var name_1 in this.attrs) {\n                if (name_1 === 'text') {\n                    element.innerText = this.attrs[name_1];\n                    continue;\n                }\n                if (name_1 === 'html') {\n                    element.innerHTML = this.attrs[name_1];\n                    continue;\n                }\n                // if (name === 'value'){\n                //     element.value =  this.attrs[name];\n                //     continue;\n                // }\n                element.setAttribute(name_1, this.attrs[name_1]);\n            }\n        }\n        return element;\n    };\n    return ElementBuilder;\n}());\nexports.ElementBuilder = ElementBuilder;\n\n\n//# sourceURL=webpack:///./src/assets/scripts/helpers/ElementBuilder.ts?");

/***/ }),

/***/ "./src/assets/styles/style.scss":
/*!**************************************!*\
  !*** ./src/assets/styles/style.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/assets/styles/style.scss?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./assets/styles/style.scss */ \"./src/assets/styles/style.scss\");\nvar Timeline_1 = __webpack_require__(/*! ./assets/scripts/components/Timeline */ \"./src/assets/scripts/components/Timeline.ts\");\nvar EventList_1 = __webpack_require__(/*! ./assets/scripts/components/events/EventList */ \"./src/assets/scripts/components/events/EventList.ts\");\nvar timeline = new Timeline_1.Timeline(new EventList_1.EventList());\ntimeline.run();\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/user/Project/TestWork-SelectingItemOnAPage/src/main.ts */"zUnb");


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./service.service */ "ibrm");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





const _c0 = ["answersList"];
const _c1 = ["questionsList"];
function AppComponent_li_4_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("mouseup", function AppComponent_li_4_Template_li_mouseup_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5); const item_r3 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r4.startSelectAnswer(item_r3.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r3.text);
} }
class AppComponent {
    constructor(serviceService, renderer) {
        this.serviceService = serviceService;
        this.renderer = renderer;
        this.isSelectStarted = false;
        this.componentDestroyed = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.arrElementlisten = [];
        this.unlistenMouseEnterArr = [];
        this.unlistenMouseLeaveArr = [];
    }
    ngOnDestroy() {
        this.componentDestroyed.next();
        this.componentDestroyed.complete();
        this.stopSelectAnswer();
    }
    ngOnInit() {
        this.serviceService.getData()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.componentDestroyed))
            .subscribe(({ html, questions }) => {
            this.htmlFromServer = html;
            this.questionsFromServer = questions;
        });
    }
    startSelectAnswer(questionsId) {
        if (this.isSelectStarted) {
            return;
        }
        this.isSelectStarted = true;
        const listAnswers = this.answersList.nativeElement.getElementsByTagName('div');
        this.listenMouseEnter = (eventMouseEnter, i) => {
            const target = eventMouseEnter.target || eventMouseEnter.srcElement || eventMouseEnter.currentTarget;
            this.renderer.setStyle(this.arrElementlisten[i].firstElementChild, 'color', 'blue');
            this.drawTableBorder(this.arrElementlisten[i].firstElementChild);
            this.unlistenMouseClick = this.renderer.listen(target, 'mouseup', eventMouseUp => this.openModalDialog(questionsId, eventMouseUp));
        };
        this.listenMouseLeave = (eventMouseLeave, i) => {
            this.renderer.removeStyle(this.arrElementlisten[i].firstElementChild, 'color');
            this.removeTableBorder();
            this.unlistenMouseClick();
        };
        for (let i = 0; i < listAnswers.length; i++) {
            this.arrElementlisten.push(listAnswers[i]);
            const unlistenMouseEnter = this.renderer.listen(listAnswers[i].firstElementChild, 'mouseenter', (eventMouseEnter) => this.listenMouseEnter(eventMouseEnter, i));
            this.unlistenMouseEnterArr.push(unlistenMouseEnter);
            const unlistenMouseLeave = this.renderer.listen(listAnswers[i].firstElementChild, 'mouseleave', (eventMouseLeave) => this.listenMouseLeave(eventMouseLeave, i));
            this.unlistenMouseLeaveArr.push(unlistenMouseLeave);
        }
    }
    stopSelectAnswer() {
        this.isSelectStarted = false;
        this.unlistenMouseClick();
        this.removeTableBorder();
        for (let i = 0; i < this.unlistenMouseEnterArr.length; i++) {
            this.unlistenMouseEnterArr[i]();
        }
        for (let i = 0; i < this.unlistenMouseLeaveArr.length; i++) {
            this.unlistenMouseLeaveArr[i]();
        }
    }
    openModalDialog(questionsId, mouseEvent) {
        this.stopSelectAnswer();
        const numberQuestionsInArr = questionsId - 1;
        // @ts-ignore
        const target = mouseEvent.target || mouseEvent.srcElement || mouseEvent.currentTarget;
        const textPopup = `
      ${this.questionsFromServer[numberQuestionsInArr].text}
      ${target.innerText}
    `;
        const res = confirm(textPopup);
        if (res) {
            const formatData = { questionId: questionsId, selectedText: target.innerText };
            this.serviceService.sendDataOnServer(formatData);
        }
    }
    drawTableBorder(element) {
        const rect = element.getBoundingClientRect();
        this.wrapTableBorder = this.renderer.createElement('div');
        const wrapStyles = {
            'display': 'block',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'pointer-events': 'none',
        };
        Object.keys(wrapStyles).forEach(newStyle => {
            this.renderer.setStyle(this.wrapTableBorder, `${newStyle}`, wrapStyles[newStyle]);
        });
        const heightDiv = this.renderer.createElement('div');
        const heightStyles = {
            'display': 'block',
            'position': 'absolute',
            'top': '0',
            'left': rect.left + 'px',
            'width': (rect.right - rect.left) + 'px',
            'height': '100%',
            'border-color': '#86dfff',
            'border-style': 'dashed',
            'border-width': '1px',
        };
        Object.keys(heightStyles).forEach(newStyle => {
            this.renderer.setStyle(heightDiv, `${newStyle}`, heightStyles[newStyle]);
        });
        const widthDiv = this.renderer.createElement('div');
        const widthStyles = {
            'display': 'block',
            'position': 'absolute',
            'left': '0',
            'width': '100%',
            'top': rect.top + 'px',
            'height': (rect.bottom - rect.top) + 'px',
            'border-color': '#86dfff',
            'border-style': 'dashed',
            'border-width': '1px',
        };
        Object.keys(widthStyles).forEach(newStyle => {
            this.renderer.setStyle(widthDiv, `${newStyle}`, widthStyles[newStyle]);
        });
        const point = [heightDiv, widthDiv];
        point.forEach(el => {
            this.renderer.appendChild(this.wrapTableBorder, el);
        });
        this.renderer.appendChild(document.body, this.wrapTableBorder);
    }
    removeTableBorder() {
        this.renderer.removeChild(document.body, this.wrapTableBorder);
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_service_service__WEBPACK_IMPORTED_MODULE_3__["ServiceService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], viewQuery: function AppComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.answersList = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.questionsList = _t.first);
    } }, decls: 5, vars: 2, consts: [[1, "answers", 3, "innerHtml"], ["answersList", ""], [1, "questions"], ["questionsList", ""], [3, "mouseup", 4, "ngFor", "ngForOf"], [3, "mouseup"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ul", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, AppComponent_li_4_Template, 2, 1, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHtml", ctx.htmlFromServer, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.questionsFromServer);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: [".questions[_ngcontent-%COMP%]{\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtBQUNqQiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5xdWVzdGlvbnN7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbiJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]] }); })();


/***/ }),

/***/ "ibrm":
/*!************************************!*\
  !*** ./src/app/service.service.ts ***!
  \************************************/
/*! exports provided: ServiceService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceService", function() { return ServiceService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class ServiceService {
    constructor() { }
    getData() {
        return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"]((observer) => {
            const data = {
                html: `<div>
                <span>Ivan Ivanov</span>
                <div>Country:<span>UA</span></div>
                <div>Postcode:<b>65000</b></div>
               </div>`,
                questions: [
                    {
                        id: 1,
                        text: 'Where is fullname?'
                    },
                    {
                        id: 2,
                        text: `Where is the country?`
                    },
                    {
                        id: 3,
                        text: `Where is the postcode?`
                    }
                ]
            };
            observer.next(data);
            observer.complete();
        });
    }
    sendDataOnServer(aasd) {
        console.log('finish : ', aasd);
    }
}
ServiceService.ɵfac = function ServiceService_Factory(t) { return new (t || ServiceService)(); };
ServiceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ServiceService, factory: ServiceService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map
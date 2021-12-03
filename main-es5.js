(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /home/user/Project/TestWork-SelectingItemOnAPage/src/main.ts */
      "zUnb");
      /***/
    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
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

      /***/
    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./service.service */
      "ibrm");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");

      var _c0 = ["answersList"];
      var _c1 = ["questionsList"];

      function AppComponent_li_4_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "li", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("mouseup", function AppComponent_li_4_Template_li_mouseup_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5);

            var item_r3 = ctx.$implicit;

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

            return ctx_r4.startSelectAnswer(item_r3.id);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var item_r3 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r3.text);
        }
      }

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent(serviceService, renderer) {
          _classCallCheck(this, AppComponent);

          this.serviceService = serviceService;
          this.renderer = renderer;
          this.isSelectStarted = false;
          this.componentDestroyed = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
          this.arrElementlisten = [];
          this.unlistenMouseEnterArr = [];
          this.unlistenMouseLeaveArr = [];
        }

        _createClass(AppComponent, [{
          key: "ngOnDestroy",
          value: function ngOnDestroy() {
            this.componentDestroyed.next();
            this.componentDestroyed.complete();
            this.stopSelectAnswer();
          }
        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            var _this = this;

            this.serviceService.getData().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(this.componentDestroyed)).subscribe(function (_ref) {
              var html = _ref.html,
                  questions = _ref.questions;
              _this.htmlFromServer = html;
              _this.questionsFromServer = questions;
            });
          }
        }, {
          key: "startSelectAnswer",
          value: function startSelectAnswer(questionsId) {
            var _this2 = this;

            if (this.isSelectStarted) {
              return;
            }

            this.isSelectStarted = true;
            var listAnswers = this.answersList.nativeElement.getElementsByTagName('div');

            this.listenMouseEnter = function (eventMouseEnter, i) {
              var target = eventMouseEnter.target || eventMouseEnter.srcElement || eventMouseEnter.currentTarget;

              _this2.renderer.setStyle(_this2.arrElementlisten[i].firstElementChild, 'color', 'blue');

              _this2.drawTableBorder(_this2.arrElementlisten[i].firstElementChild);

              _this2.unlistenMouseClick = _this2.renderer.listen(target, 'mouseup', function (eventMouseUp) {
                return _this2.openModalDialog(questionsId, eventMouseUp);
              });
            };

            this.listenMouseLeave = function (eventMouseLeave, i) {
              _this2.renderer.removeStyle(_this2.arrElementlisten[i].firstElementChild, 'color');

              _this2.removeTableBorder();

              _this2.unlistenMouseClick();
            };

            var _loop = function _loop(i) {
              _this2.arrElementlisten.push(listAnswers[i]);

              var unlistenMouseEnter = _this2.renderer.listen(listAnswers[i].firstElementChild, 'mouseenter', function (eventMouseEnter) {
                return _this2.listenMouseEnter(eventMouseEnter, i);
              });

              _this2.unlistenMouseEnterArr.push(unlistenMouseEnter);

              var unlistenMouseLeave = _this2.renderer.listen(listAnswers[i].firstElementChild, 'mouseleave', function (eventMouseLeave) {
                return _this2.listenMouseLeave(eventMouseLeave, i);
              });

              _this2.unlistenMouseLeaveArr.push(unlistenMouseLeave);
            };

            for (var i = 0; i < listAnswers.length; i++) {
              _loop(i);
            }
          }
        }, {
          key: "stopSelectAnswer",
          value: function stopSelectAnswer() {
            this.isSelectStarted = false;
            this.unlistenMouseClick();
            this.removeTableBorder();

            for (var i = 0; i < this.unlistenMouseEnterArr.length; i++) {
              this.unlistenMouseEnterArr[i]();
            }

            for (var _i = 0; _i < this.unlistenMouseLeaveArr.length; _i++) {
              this.unlistenMouseLeaveArr[_i]();
            }
          }
        }, {
          key: "openModalDialog",
          value: function openModalDialog(questionsId, mouseEvent) {
            this.stopSelectAnswer();
            var numberQuestionsInArr = questionsId - 1; // @ts-ignore

            var target = mouseEvent.target || mouseEvent.srcElement || mouseEvent.currentTarget;
            var textPopup = "\n      ".concat(this.questionsFromServer[numberQuestionsInArr].text, "\n      ").concat(target.innerText, "\n    ");
            var res = confirm(textPopup);

            if (res) {
              var formatData = {
                questionId: questionsId,
                selectedText: target.innerText
              };
              this.serviceService.sendDataOnServer(formatData);
            }
          }
        }, {
          key: "drawTableBorder",
          value: function drawTableBorder(element) {
            var _this3 = this;

            var rect = element.getBoundingClientRect();
            this.wrapTableBorder = this.renderer.createElement('div');
            var wrapStyles = {
              'display': 'block',
              'position': 'absolute',
              'top': '0',
              'left': '0',
              'width': '100%',
              'height': '100%',
              'pointer-events': 'none'
            };
            Object.keys(wrapStyles).forEach(function (newStyle) {
              _this3.renderer.setStyle(_this3.wrapTableBorder, "".concat(newStyle), wrapStyles[newStyle]);
            });
            var heightDiv = this.renderer.createElement('div');
            var heightStyles = {
              'display': 'block',
              'position': 'absolute',
              'top': '0',
              'left': rect.left + 'px',
              'width': rect.right - rect.left + 'px',
              'height': '100%',
              'border-color': '#86dfff',
              'border-style': 'dashed',
              'border-width': '1px'
            };
            Object.keys(heightStyles).forEach(function (newStyle) {
              _this3.renderer.setStyle(heightDiv, "".concat(newStyle), heightStyles[newStyle]);
            });
            var widthDiv = this.renderer.createElement('div');
            var widthStyles = {
              'display': 'block',
              'position': 'absolute',
              'left': '0',
              'width': '100%',
              'top': rect.top + 'px',
              'height': rect.bottom - rect.top + 'px',
              'border-color': '#86dfff',
              'border-style': 'dashed',
              'border-width': '1px'
            };
            Object.keys(widthStyles).forEach(function (newStyle) {
              _this3.renderer.setStyle(widthDiv, "".concat(newStyle), widthStyles[newStyle]);
            });
            var point = [heightDiv, widthDiv];
            point.forEach(function (el) {
              _this3.renderer.appendChild(_this3.wrapTableBorder, el);
            });
            this.renderer.appendChild(document.body, this.wrapTableBorder);
          }
        }, {
          key: "removeTableBorder",
          value: function removeTableBorder() {
            this.renderer.removeChild(document.body, this.wrapTableBorder);
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_service_service__WEBPACK_IMPORTED_MODULE_3__["ServiceService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Renderer2"]));
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        viewQuery: function AppComponent_Query(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c1, 1);
          }

          if (rf & 2) {
            var _t;

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.answersList = _t.first);
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.questionsList = _t.first);
          }
        },
        decls: 5,
        vars: 2,
        consts: [[1, "answers", 3, "innerHtml"], ["answersList", ""], [1, "questions"], ["questionsList", ""], [3, "mouseup", 4, "ngFor", "ngForOf"], [3, "mouseup"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 0, 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ul", 2, 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, AppComponent_li_4_Template, 2, 1, "li", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHtml", ctx.htmlFromServer, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.questionsFromServer);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]],
        styles: [".questions[_ngcontent-%COMP%]{\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBZTtBQUNqQiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5xdWVzdGlvbnN7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbiJdfQ== */"]
      });
      /***/
    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵfac = function AppModule_Factory(t) {
        return new (t || AppModule)();
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
        providers: [],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"]]
        });
      })();
      /***/

    },

    /***/
    "ibrm":
    /*!************************************!*\
      !*** ./src/app/service.service.ts ***!
      \************************************/

    /*! exports provided: ServiceService */

    /***/
    function ibrm(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ServiceService", function () {
        return ServiceService;
      });
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var ServiceService = /*#__PURE__*/function () {
        function ServiceService() {
          _classCallCheck(this, ServiceService);
        }

        _createClass(ServiceService, [{
          key: "getData",
          value: function getData() {
            return new rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"](function (observer) {
              var data = {
                html: "<div>\n                <span>Ivan Ivanov</span>\n                <div>Country:<span>UA</span></div>\n                <div>Postcode:<b>65000</b></div>\n               </div>",
                questions: [{
                  id: 1,
                  text: 'Where is fullname?'
                }, {
                  id: 2,
                  text: "Where is the country?"
                }, {
                  id: 3,
                  text: "Where is the postcode?"
                }]
              };
              observer.next(data);
              observer.complete();
            });
          }
        }, {
          key: "sendDataOnServer",
          value: function sendDataOnServer(aasd) {
            console.log('finish : ', aasd);
          }
        }]);

        return ServiceService;
      }();

      ServiceService.ɵfac = function ServiceService_Factory(t) {
        return new (t || ServiceService)();
      };

      ServiceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: ServiceService,
        factory: ServiceService.ɵfac,
        providedIn: 'root'
      });
      /***/
    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var routes = [];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) {
        return new (t || AppRoutingModule)();
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]]
        });
      })();
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(() => {
  'use strict';

  const Observer = require("./observer.js");

  const elements = document.querySelectorAll(".observable");
  const observer = new Observer();

  elements.forEach((element) => {
    element.addEventListener("enter", () => {
      element.classList.add("active");
    });

    element.addEventListener("exit", () => {
      element.classList.remove("active");
    });

    observer.observe(element);
  });
})();

},{"./observer.js":2}],2:[function(require,module,exports){
(() => {
  'use strict';

  module.exports = class Observer {
    static get __callback() {
      return (entries, observer) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;
          const element = entry.target;
          if(ratio > 0.9) {
            const event = new Event('enter');
            element.dispatchEvent(event);
          } else {
            const event = new Event('exit');
            element.dispatchEvent(event);
          }
        });
      };
    }

    constructor(callback = Observer.__callback) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.9
      };

      this._intersectionObserver = new IntersectionObserver(callback, options);
    }

    observe(element) {
      this._intersectionObserver.observe(element);
    }

    /*
      var elements = document.querySelectorAll(".observable")
      var observer = new Observer()

      elements.forEach((element) => {
        element.addEventListener("enter", () => {
          element.classList.add("active")
        })

        element.addEventListener("exit", () => {
          element.classList.remove("active")
        })

        observer.observe(element)
      })
    */
  };
})();

},{}]},{},[1]);

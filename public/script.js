(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var c = console.log;
var formPadrino = document.querySelector("#formPadrino");
var formLogIn = document.querySelector("#logIn");

var addAvatar = function addAvatar(user) {
  var img = document.querySelector(".sesion-avatar");
  if (user.photoURL) {
    img.src = user.photoURL;
  } else {
    img.src = "./img/ICONO DE USUARIO SIN FOTO.png";
  }
};

var verifyUser = function verifyUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user !== null) {
      document.body.innerHTML = "\n        <div class=\"menuNavegation bg-white fixed-top shadow-sm\">\n          <nav class=\"navbar navbar-expand-lg navbar-light bg-white font-f-title\">\n            <div class=\"container\">\n              <a class=\"navbar-brand\" href=\"#inicio\">\n                <img class=\"menuNavegation-logo preloaderImage-img\" data-img=\"./img/Logo NAV.png\" alt=\"\"/>\n              </a>\n              <div class=\"ml-auto d-flex\">\n                <img class=\"sesion-avatar  mr-3\">\n                <a href=\"#\" class=\"d-flex justify-content-center align-items-center signOut nav-link p-0\"> salir</a>\n              </div>\n            </div>\n          </nav>\n        </div>\n        <header>\n          <div class=\"headerSesion py-5 container \">\n            <img src=\"./img/ICONO DE USUARIO SIN FOTO.png\" alt=\"\" class=\"headerSesion-avatarHeader m-auto d-block\">\n            <h1 class=\"py-3 text-center text-verde\">" + (user.displayName !== null ? user.displayName : "Bienvenido") + "</h1>\n            <div class=\"headerSesion-contentButtons m-auto  py-4\">\n              <div class=\"row\">\n                <div class=\"p-2  col-sm-12 col-md-6 \"><button class=\"m-auto btn btn-block btn-buttonForm br-25  a-title \" data-toggle=\"modal\" data-target=\"#staticBackdrop\">ni\xF1o</button></div>\n                <div class=\"p-2  col-sm-12 col-md-6 \"><button class=\"m-auto btn btn-block btn-azul br-25  a-title \">padrino</button></div> \n              </div>\n            </div>\n          </div>\n        </header>\n\n\n        <div class=\"modal fade\" id=\"staticBackdrop\" data-backdrop=\"static\" data-keyboard=\"false\" tabindex=\"-1\" aria-labelledby=\"staticBackdropLabel\" aria-hidden=\"true\">\n          <div class=\"modal-dialog modal-dialog-centered\">\n            <div class=\"modal-content\">\n              <div class=\"modal-header\">\n                <h5 class=\"modal-title\" id=\"staticBackdropLabel\">Modal title</h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>\n              <div class=\"modal-body\">\n                ...\n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" class=\"br-25 btn btn-secondary\" data-dismiss=\"modal\">Close</button>\n                <button type=\"button\" class=\"br-25 btn btn-primary\">Understood</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      ";
      document.addEventListener("click", function (e) {
        if (e.target.matches(".signOut")) {
          location.reload();
          firebase.auth().signOut().then(function () {
            return e.target.remove();
          });
        }
      });
      addAvatar(user);
    }
    preloaderImage(".preloaderImage-img");
  });
};

// preloaderr ------
var preloaderImage = function preloaderImage(selectorImage) {
  var images = null || document.querySelectorAll(selectorImage);
  var options = {
    root: null,
    rootMargin: "100px",
    threshold: 0
  };
  var callback = function callback(entries) {
    entries.forEach(function (el) {
      if (el.isIntersecting) {
        var urlImage = el.target.getAttribute("data-img");

        el.target.src = urlImage;
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);
  images.forEach(function (el) {
    observer.observe(el);
  });
};

var Autentication = function () {
  function Autentication() {
    _classCallCheck(this, Autentication);
  }

  _createClass(Autentication, [{
    key: "autEmailPass",
    value: function autEmailPass(email, pass) {
      // c(email, pass)
      firebase.auth().signInWithEmailAndPassword(email.value, pass.value).then(function (response) {
        c(response, " ok");
      }).catch(function (err) {
        formLogIn.innerHTML += "\n      <div class=\"failedLogin alert alert-danger my-3\" role=\"alert\">\n        " + err.message + "\n      </div>\n      ";
      });
    }
  }, {
    key: "crearCuentaEmailPass",
    value: function crearCuentaEmailPass(email, pass, names) {
      firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (result) {
        result.user.updateProfile({
          displayName: names,
          pa: "sapo"
        });
        c(result.user);
      });
    }
  }, {
    key: "autCuentaGoogle",
    value: function autCuentaGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function (result) {
        c(result);
      }).catch(function (err) {
        formPadrino.innerHTML += "\n      <div class=\"failedLogin alert alert-danger my-3\" role=\"alert\">\n        hubo un error puedes ingrezar registrando tus datos en el formulario\n      </div>\n      ";

        setTimeout(function () {
          document.querySelector(".failedLogin").remove();
        }, 8000);
      });
    }
  }]);

  return Autentication;
}();

window.addEventListener("load", function (e) {
  verifyUser();
  preloaderImage(".preloaderImage-img");
  setTimeout(function () {
    document.body.classList.remove("loading");
  }, 3000);
});

document.addEventListener("click", function (e) {
  var auth = new Autentication();
  if (e.target.matches("#googleAuth") || e.target.matches("font")) {
    auth.autCuentaGoogle();
  }
});

formPadrino.addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("padrinoName");
  var email = document.getElementById("padrinoEmail");
  var passWord = document.getElementById("padrinoPass");
  var auth = new Autentication();
  auth.crearCuentaEmailPass(email.value, passWord.value, name.value);
});

formLogIn.addEventListener("submit", function (e) {
  e.preventDefault();
  c("submit");
  var auth = new Autentication();
  auth.autEmailPass(e.target.email, e.target.password);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFNLElBQUksUUFBUSxHQUFsQjtBQUNBLElBQU0sY0FBYyxTQUFTLGFBQVQsZ0JBQXBCO0FBQ0EsSUFBTSxZQUFZLFNBQVMsYUFBVCxVQUFsQjs7QUFHQSxJQUFNLFlBQVksU0FBWixTQUFZLENBQUMsSUFBRCxFQUFVO0FBQzFCLE1BQUksTUFBTSxTQUFTLGFBQVQsa0JBQVY7QUFDQSxNQUFHLEtBQUssUUFBUixFQUFpQjtBQUNmLFFBQUksR0FBSixHQUFVLEtBQUssUUFBZjtBQUNELEdBRkQsTUFFSztBQUNILFFBQUksR0FBSjtBQUNEO0FBRUYsQ0FSRDs7QUFVQSxJQUFNLGFBQWEsU0FBYixVQUFhLEdBQU07QUFDdkIsV0FBUyxJQUFULEdBQWdCLGtCQUFoQixDQUFtQyxnQkFBUTtBQUN6QyxRQUFHLFNBQVMsSUFBWixFQUFrQjtBQUNoQixlQUFTLElBQVQsQ0FBYyxTQUFkLGs3QkFpQmdELEtBQUssV0FBTCxLQUFxQixJQUFyQixHQUE0QixLQUFLLFdBQWpDLGVBakJoRDtBQWdEQSxlQUFTLGdCQUFULFVBQW1DLGFBQUs7QUFDdEMsWUFBRyxFQUFFLE1BQUYsQ0FBUyxPQUFULFlBQUgsRUFBZ0M7QUFDOUIsbUJBQVMsTUFBVDtBQUNBLG1CQUFTLElBQVQsR0FBZ0IsT0FBaEIsR0FDRyxJQURILENBQ1M7QUFBQSxtQkFBTyxFQUFFLE1BQUYsQ0FBUyxNQUFULEVBQVA7QUFBQSxXQURUO0FBRUQ7QUFDRixPQU5EO0FBT0EsZ0JBQVUsSUFBVjtBQUNEO0FBQ0Q7QUFDRCxHQTVERDtBQStERCxDQWhFRDs7QUFtRUE7QUFDQSxJQUFNLGlCQUFpQixTQUFqQixjQUFpQixDQUFFLGFBQUYsRUFBb0I7QUFDekMsTUFBTSxTQUFTLFFBQVEsU0FBUyxnQkFBVCxDQUEwQixhQUExQixDQUF2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Q29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYyA9IGNvbnNvbGUubG9nXG5jb25zdCBmb3JtUGFkcmlubyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNmb3JtUGFkcmlub2ApXG5jb25zdCBmb3JtTG9nSW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbG9nSW5gKVxuXG5cbmNvbnN0IGFkZEF2YXRhciA9ICh1c2VyKSA9PiB7XG4gIGxldCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2VzaW9uLWF2YXRhcmApXG4gIGlmKHVzZXIucGhvdG9VUkwpe1xuICAgIGltZy5zcmMgPSB1c2VyLnBob3RvVVJMXG4gIH1lbHNle1xuICAgIGltZy5zcmMgPSBgLi9pbWcvSUNPTk8gREUgVVNVQVJJTyBTSU4gRk9UTy5wbmdgXG4gIH1cbiAgXG59XG5cbmNvbnN0IHZlcmlmeVVzZXIgPSAoKSA9PiB7XG4gIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQodXNlciA9PiB7XG4gICAgaWYodXNlciAhPT0gbnVsbCkge1xuICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZW51TmF2ZWdhdGlvbiBiZy13aGl0ZSBmaXhlZC10b3Agc2hhZG93LXNtXCI+XG4gICAgICAgICAgPG5hdiBjbGFzcz1cIm5hdmJhciBuYXZiYXItZXhwYW5kLWxnIG5hdmJhci1saWdodCBiZy13aGl0ZSBmb250LWYtdGl0bGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiI2luaWNpb1wiPlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJtZW51TmF2ZWdhdGlvbi1sb2dvIHByZWxvYWRlckltYWdlLWltZ1wiIGRhdGEtaW1nPVwiLi9pbWcvTG9nbyBOQVYucG5nXCIgYWx0PVwiXCIvPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtbC1hdXRvIGQtZmxleFwiPlxuICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJzZXNpb24tYXZhdGFyICBtci0zXCI+XG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtY2VudGVyIGFsaWduLWl0ZW1zLWNlbnRlciBzaWduT3V0IG5hdi1saW5rIHAtMFwiPiBzYWxpcjwvYT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L25hdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclNlc2lvbiBweS01IGNvbnRhaW5lciBcIj5cbiAgICAgICAgICAgIDxpbWcgc3JjPVwiLi9pbWcvSUNPTk8gREUgVVNVQVJJTyBTSU4gRk9UTy5wbmdcIiBhbHQ9XCJcIiBjbGFzcz1cImhlYWRlclNlc2lvbi1hdmF0YXJIZWFkZXIgbS1hdXRvIGQtYmxvY2tcIj5cbiAgICAgICAgICAgIDxoMSBjbGFzcz1cInB5LTMgdGV4dC1jZW50ZXIgdGV4dC12ZXJkZVwiPiR7dXNlci5kaXNwbGF5TmFtZSAhPT0gbnVsbCA/IHVzZXIuZGlzcGxheU5hbWUgOiBgQmllbnZlbmlkb2B9PC9oMT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJTZXNpb24tY29udGVudEJ1dHRvbnMgbS1hdXRvICBweS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC0yICBjb2wtc20tMTIgY29sLW1kLTYgXCI+PGJ1dHRvbiBjbGFzcz1cIm0tYXV0byBidG4gYnRuLWJsb2NrIGJ0bi1idXR0b25Gb3JtIGJyLTI1ICBhLXRpdGxlIFwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNzdGF0aWNCYWNrZHJvcFwiPm5pw7FvPC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtMiAgY29sLXNtLTEyIGNvbC1tZC02IFwiPjxidXR0b24gY2xhc3M9XCJtLWF1dG8gYnRuIGJ0bi1ibG9jayBidG4tYXp1bCBici0yNSAgYS10aXRsZSBcIj5wYWRyaW5vPC9idXR0b24+PC9kaXY+IFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2hlYWRlcj5cblxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbCBmYWRlXCIgaWQ9XCJzdGF0aWNCYWNrZHJvcFwiIGRhdGEtYmFja2Ryb3A9XCJzdGF0aWNcIiBkYXRhLWtleWJvYXJkPVwiZmFsc2VcIiB0YWJpbmRleD1cIi0xXCIgYXJpYS1sYWJlbGxlZGJ5PVwic3RhdGljQmFja2Ryb3BMYWJlbFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2cgbW9kYWwtZGlhbG9nLWNlbnRlcmVkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVwibW9kYWwtdGl0bGVcIiBpZD1cInN0YXRpY0JhY2tkcm9wTGFiZWxcIj5Nb2RhbCB0aXRsZTwvaDU+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAuLi5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJyLTI1IGJ0biBidG4tc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DbG9zZTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnItMjUgYnRuIGJ0bi1wcmltYXJ5XCI+VW5kZXJzdG9vZDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGBcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZSA9PiB7XG4gICAgICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoYC5zaWduT3V0YCkpe1xuICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+ICBlLnRhcmdldC5yZW1vdmUoKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGFkZEF2YXRhcih1c2VyKVxuICAgIH1cbiAgICBwcmVsb2FkZXJJbWFnZShgLnByZWxvYWRlckltYWdlLWltZ2ApXG4gIH0pXG5cblxufVxuXG5cbi8vIHByZWxvYWRlcnIgLS0tLS0tXG5jb25zdCBwcmVsb2FkZXJJbWFnZSA9ICggc2VsZWN0b3JJbWFnZSkgPT4ge1xuICBjb25zdCBpbWFnZXMgPSBudWxsIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3JJbWFnZSlcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgcm9vdDpudWxsLFxuICAgIHJvb3RNYXJnaW46YDEwMHB4YCxcbiAgICB0aHJlc2hvbGQ6MFxuICB9XG4gIGNvbnN0IGNhbGxiYWNrID0gKGVudHJpZXMpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goZWwgPT4ge1xuICAgICAgaWYoZWwuaXNJbnRlcnNlY3Rpbmcpe1xuICAgICAgICBsZXQgdXJsSW1hZ2UgPSBlbC50YXJnZXQuZ2V0QXR0cmlidXRlKGBkYXRhLWltZ2ApXG5cbiAgICAgICAgZWwudGFyZ2V0LnNyYyA9IHVybEltYWdlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxldCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihjYWxsYmFjayxvcHRpb25zKVxuICBpbWFnZXMuZm9yRWFjaChlbCA9PiB7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbClcbiAgfSlcbn1cbmNsYXNzIEF1dGVudGljYXRpb24ge1xuICBhdXRFbWFpbFBhc3MoZW1haWwsIHBhc3Mpe1xuICAgIC8vIGMoZW1haWwsIHBhc3MpXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKFxuICAgICAgZW1haWwudmFsdWUsXG4gICAgICBwYXNzLnZhbHVlLFxuICAgIClcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBjKHJlc3BvbnNlLCBgIG9rYClcbiAgICB9KVxuICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgZm9ybUxvZ0luLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZmFpbGVkTG9naW4gYWxlcnQgYWxlcnQtZGFuZ2VyIG15LTNcIiByb2xlPVwiYWxlcnRcIj5cbiAgICAgICAgJHtlcnIubWVzc2FnZX1cbiAgICAgIDwvZGl2PlxuICAgICAgYFxuICAgIH0pXG4gIH1cbiAgY3JlYXJDdWVudGFFbWFpbFBhc3MoZW1haWwsIHBhc3MsIG5hbWVzKXtcbiAgICBmaXJlYmFzZVxuICAgICAgLmF1dGgoKS5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgcmVzdWx0LnVzZXIudXBkYXRlUHJvZmlsZSh7XG4gICAgICAgICAgICBkaXNwbGF5TmFtZTogbmFtZXMsXG4gICAgICAgICAgICBwYTogYHNhcG9gXG4gICAgICAgICAgfSlcbiAgICAgICAgICBjKHJlc3VsdC51c2VyKVxuICAgICAgICB9KVxuICB9XG5cbiAgYXV0Q3VlbnRhR29vZ2xlKCl7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKVxuXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcilcbiAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgYyhyZXN1bHQpXG4gICAgfSlcbiAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgIGZvcm1QYWRyaW5vLmlubmVySFRNTCArPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZmFpbGVkTG9naW4gYWxlcnQgYWxlcnQtZGFuZ2VyIG15LTNcIiByb2xlPVwiYWxlcnRcIj5cbiAgICAgICAgaHVibyB1biBlcnJvciBwdWVkZXMgaW5ncmV6YXIgcmVnaXN0cmFuZG8gdHVzIGRhdG9zIGVuIGVsIGZvcm11bGFyaW9cbiAgICAgIDwvZGl2PlxuICAgICAgYFxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZhaWxlZExvZ2luYCkucmVtb3ZlKClcbiAgICAgIH0sODAwMClcbiAgICB9KVxuICB9XG59XG5cblxuXG5cbiAgXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgbG9hZGAsIGUgPT4ge1xuICAgIHZlcmlmeVVzZXIoKVxuICAgIHByZWxvYWRlckltYWdlKGAucHJlbG9hZGVySW1hZ2UtaW1nYClcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShgbG9hZGluZ2ApXG4gICAgfSwzMDAwKVxufSlcblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGUgPT4ge1xuICBjb25zdCBhdXRoID0gbmV3IEF1dGVudGljYXRpb24oKVxuICBpZihlLnRhcmdldC5tYXRjaGVzKGAjZ29vZ2xlQXV0aGApIHx8IGUudGFyZ2V0Lm1hdGNoZXMoYGZvbnRgKSl7XG4gICAgYXV0aC5hdXRDdWVudGFHb29nbGUoIClcbiAgfVxufSlcblxuXG5mb3JtUGFkcmluby5hZGRFdmVudExpc3RlbmVyKGBzdWJtaXRgLCBlID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgY29uc3QgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwYWRyaW5vTmFtZWApXG4gIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHBhZHJpbm9FbWFpbGApXG4gIGNvbnN0IHBhc3NXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHBhZHJpbm9QYXNzYClcbiAgY29uc3QgYXV0aCA9IG5ldyBBdXRlbnRpY2F0aW9uKClcbiAgYXV0aC5jcmVhckN1ZW50YUVtYWlsUGFzcyhlbWFpbC52YWx1ZSwgcGFzc1dvcmQudmFsdWUsbmFtZS52YWx1ZSApXG59KSBcblxuZm9ybUxvZ0luLmFkZEV2ZW50TGlzdGVuZXIoYHN1Ym1pdGAsIGUgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KClcbiAgYyhgc3VibWl0YClcbiAgbGV0IGF1dGggPSBuZXcgQXV0ZW50aWNhdGlvbiBcbiAgYXV0aC5hdXRFbWFpbFBhc3MoZS50YXJnZXQuZW1haWwsZS50YXJnZXQucGFzc3dvcmQpXG59KSJdfQ==

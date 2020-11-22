(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var c = console.log;
var formPadrino = document.querySelector("#formPadrino");

var Autentication = function () {
  function Autentication() {
    _classCallCheck(this, Autentication);
  }

  _createClass(Autentication, [{
    key: "autEmailPass",
    value: function autEmailPass(email, pass) {}
  }, {
    key: "crearCuentaEmailPass",
    value: function crearCuentaEmailPass(email, pass, names) {
      firebase.auth().createUserWithEmailAndPassword(email, pass).then(function (result) {
        result.user.updateProfile({
          displayName: names
        });
      });
    }
  }, {
    key: "autCuentaGoogle",
    value: function autCuentaGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function (result) {
        c(result);
      });
    }
  }]);

  return Autentication;
}();

var verifyUser = function verifyUser() {
  var user = firebase.auth().currentUser;
  return user;
};

window.addEventListener("load", function (e) {
  firebase.auth().onAuthStateChanged(function (user) {
    c(user);
    formPadrino.innerHTML += user !== null ? "<button class=\"btn btn-primary btn-block br-25\" id=\"signOut\">Salir</button>" : "";
  });
  c(verifyUser().x.push("hola"));
});
formPadrino.addEventListener("click", function (e) {
  var auth = new Autentication();
  if (e.target.matches("#signOut")) {
    firebase.auth().signOut().then(function () {
      return e.target.remove();
    });
  } else if (e.target.matches("#googleAuth")) {
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
  // c(name.value ,email.value)
  // c( passWord.value)
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFNLElBQUksUUFBUSxHQUFsQjtBQUNBLElBQU0sY0FBYyxTQUFTLGFBQVQsZ0JBQXBCOztJQUVNLGE7Ozs7Ozs7aUNBQ1MsSyxFQUFPLEksRUFBSyxDQUV4Qjs7O3lDQUNvQixLLEVBQU8sSSxFQUFNLEssRUFBTTtBQUN0QyxlQUNHLElBREgsR0FDVSw4QkFEVixDQUN5QyxLQUR6QyxFQUNnRCxJQURoRCxFQUVLLElBRkwsQ0FFVSxrQkFBVTtBQUNkLGVBQU8sSUFBUCxDQUFZLGFBQVosQ0FBMEI7QUFDeEIsdUJBQWE7QUFEVyxTQUExQjtBQUdELE9BTkw7QUFPRDs7O3NDQUVnQjtBQUNmLFVBQU0sV0FBVyxJQUFJLFNBQVMsSUFBVCxDQUFjLGtCQUFsQixFQUFqQjs7QUFFQSxlQUFTLElBQVQsR0FBZ0IsZUFBaEIsQ0FBZ0MsUUFBaEMsRUFDQyxJQURELENBQ00sa0JBQVU7QUFDZCxVQUFFLE1BQUY7QUFDRCxPQUhEO0FBSUQ7Ozs7OztBQUdILElBQU0sYUFBYSxTQUFiLFVBQWEsR0FBTTtBQUN2QixNQUFNLE9BQU8sU0FBUyxJQUFULEdBQWdCLFdBQTdCO0FBQ0EsU0FBTyxJQUFQO0FBQ0QsQ0FIRDs7QUFLQSxPQUFPLGdCQUFQLFNBQWdDLGFBQUs7QUFDbkMsV0FBUyxJQUFULEdBQWdCLGtCQUFoQixDQUFtQyxnQkFBUTtBQUN6QyxNQUFFLElBQUY7QUFDQSxnQkFBWSxTQUFaLElBQXlCLFNBQVMsSUFBVCx5RkFBekI7QUFHRCxHQUxEO0FBTUEsSUFBRSxhQUFhLENBQWIsQ0FBZSxJQUFmLFFBQUY7QUFDRCxDQVJEO0FBU0EsWUFBWSxnQkFBWixVQUFzQyxhQUFLO0FBQ3pDLE1BQU0sT0FBTyxJQUFJLGFBQUosRUFBYjtBQUNBLE1BQUcsRUFBRSxNQUFGLENBQVMsT0FBVCxZQUFILEVBQWdDO0FBQzlCLGFBQVMsSUFBVCxHQUFnQixPQUFoQixHQUNHLElBREgsQ0FDUztBQUFBLGFBQU8sRUFBRSxNQUFGLENBQVMsTUFBVCxFQUFQO0FBQUEsS0FEVDtBQUVELEdBSEQsTUFHTSxJQUFHLEVBQUUsTUFBRixDQUFTLE9BQVQsZUFBSCxFQUFtQztBQUN2QyxTQUFLLGVBQUw7QUFDRDtBQUNGLENBUkQ7O0FBV0EsWUFBWSxnQkFBWixXQUF1QyxhQUFLO0FBQzFDLElBQUUsY0FBRjs7QUFFQSxNQUFNLE9BQU8sU0FBUyxjQUFULGVBQWI7QUFDQSxNQUFNLFFBQVEsU0FBUyxjQUFULGdCQUFkO0FBQ0EsTUFBTSxXQUFXLFNBQVMsY0FBVCxlQUFqQjtBQUNBLE1BQU0sT0FBTyxJQUFJLGFBQUosRUFBYjtBQUNBLE9BQUssb0JBQUwsQ0FBMEIsTUFBTSxLQUFoQyxFQUF1QyxTQUFTLEtBQWhELEVBQXNELEtBQUssS0FBM0Q7QUFDQTtBQUNBO0FBQ0QsQ0FWRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGMgPSBjb25zb2xlLmxvZ1xuY29uc3QgZm9ybVBhZHJpbm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZm9ybVBhZHJpbm9gKVxuXG5jbGFzcyBBdXRlbnRpY2F0aW9uIHtcbiAgYXV0RW1haWxQYXNzKGVtYWlsLCBwYXNzKXtcblxuICB9XG4gIGNyZWFyQ3VlbnRhRW1haWxQYXNzKGVtYWlsLCBwYXNzLCBuYW1lcyl7XG4gICAgZmlyZWJhc2VcbiAgICAgIC5hdXRoKCkuY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzKVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHJlc3VsdC51c2VyLnVwZGF0ZVByb2ZpbGUoe1xuICAgICAgICAgICAgZGlzcGxheU5hbWU6IG5hbWVzXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgfVxuXG4gIGF1dEN1ZW50YUdvb2dsZSgpe1xuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKClcblxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGMocmVzdWx0KVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgdmVyaWZ5VXNlciA9ICgpID0+IHtcbiAgY29uc3QgdXNlciA9IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlclxuICByZXR1cm4gdXNlclxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgbG9hZGAsIGUgPT4ge1xuICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKHVzZXIgPT4ge1xuICAgIGModXNlcilcbiAgICBmb3JtUGFkcmluby5pbm5lckhUTUwgKz0gdXNlciAhPT0gbnVsbFxuICAgID8gYDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrIGJyLTI1XCIgaWQ9XCJzaWduT3V0XCI+U2FsaXI8L2J1dHRvbj5gXG4gICAgOiBgYFxuICB9KVxuICBjKHZlcmlmeVVzZXIoKS54LnB1c2goYGhvbGFgKSlcbn0pXG5mb3JtUGFkcmluby5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGUgPT4ge1xuICBjb25zdCBhdXRoID0gbmV3IEF1dGVudGljYXRpb24oKVxuICBpZihlLnRhcmdldC5tYXRjaGVzKGAjc2lnbk91dGApKXtcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpXG4gICAgICAudGhlbiggKCkgPT4gIGUudGFyZ2V0LnJlbW92ZSgpKVxuICB9ZWxzZSBpZihlLnRhcmdldC5tYXRjaGVzKGAjZ29vZ2xlQXV0aGApKXtcbiAgICBhdXRoLmF1dEN1ZW50YUdvb2dsZSggKVxuICB9XG59KVxuXG5cbmZvcm1QYWRyaW5vLmFkZEV2ZW50TGlzdGVuZXIoYHN1Ym1pdGAsIGUgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KClcblxuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHBhZHJpbm9OYW1lYClcbiAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcGFkcmlub0VtYWlsYClcbiAgY29uc3QgcGFzc1dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcGFkcmlub1Bhc3NgKVxuICBjb25zdCBhdXRoID0gbmV3IEF1dGVudGljYXRpb24oKVxuICBhdXRoLmNyZWFyQ3VlbnRhRW1haWxQYXNzKGVtYWlsLnZhbHVlLCBwYXNzV29yZC52YWx1ZSxuYW1lLnZhbHVlIClcbiAgLy8gYyhuYW1lLnZhbHVlICxlbWFpbC52YWx1ZSlcbiAgLy8gYyggcGFzc1dvcmQudmFsdWUpXG59KSAiXX0=

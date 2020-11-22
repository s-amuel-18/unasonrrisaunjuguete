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
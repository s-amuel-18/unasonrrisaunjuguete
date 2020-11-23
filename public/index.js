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
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var c = console.log;
var formPadrino = document.querySelector("#formPadrino");
var formLogIn = document.querySelector("#logIn");
// const verificadorUser = false

var addAvatar = function addAvatar(user) {
  var img = document.querySelector(".sesion-avatar");
  if (user.photoURL) {
    img.src = user.photoURL;
  } else {
    img.src = "./img/ICONO DE USUARIO SIN FOTO.png";
  }
};

var progressBar = function progressBar(porcentaje) {
  return "\n  <div class=\"progress\">\n    <div class=\"progress-bar my-3\" role=\"progressbar\" style=\"width: " + porcentaje + "%;\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\">" + porcentaje + "%</div>\n  </div>\n  ";
};

var notificattion = function notificattion(selector, message, alert) {

  selector.innerHTML += "\n  <div id=\"notification-alert\" class=\"failedLogin alert alert-" + alert + " my-3\" role=\"alert\">\n    " + message + "\n  </div>\n  ";

  setTimeout(function () {
    document.querySelector("#notification-alert").remove();
  }, 8000);
};

var verifyUser = function verifyUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user !== null) {
      document.body.innerHTML = "\n        <div class=\"menuNavegation bg-white fixed-top shadow-sm\">\n          <nav class=\"navbar navbar-expand-lg navbar-light bg-white font-f-title\">\n            <div class=\"container\">\n              <a class=\"navbar-brand\" href=\"#inicio\">\n                <img class=\"menuNavegation-logo preloaderImage-img\" data-img=\"./img/Logo NAV.png\" alt=\"\"/>\n              </a>\n              <div class=\"ml-auto d-flex\">\n                <img class=\"sesion-avatar  mr-3\">\n                <a href=\"#\" class=\"d-flex justify-content-center align-items-center signOut nav-link p-0\"> salir</a>\n              </div>\n            </div>\n          </nav>\n        </div>\n        <header>\n          <div class=\"headerSesion py-5 container \">\n            <img src=\"./img/ICONO DE USUARIO SIN FOTO.png\" alt=\"\" class=\"headerSesion-avatarHeader m-auto d-block\">\n            <h1 class=\"py-3 text-center text-verde\">" + (user.displayName !== null ? user.displayName : "Bienvenido") + "</h1>\n            <div class=\"headerSesion-contentButtons m-auto  py-4\">\n              <div class=\"row\">\n                <div class=\"p-2  col-sm-12 col-md-6 \"><button class=\"m-auto btn btn-block btn-buttonForm br-25  a-title \" data-toggle=\"modal\" data-target=\"#staticBackdrop\">ni\xF1o</button></div>\n                <div class=\"p-2  col-sm-12 col-md-6 \"><button class=\"m-auto btn btn-block btn-azul br-25  a-title \">padrino</button></div> \n              </div>\n            </div>\n          </div>\n        </header>\n\n\n        <div class=\"modal fade\" id=\"staticBackdrop\" data-backdrop=\"static\" data-keyboard=\"false\" tabindex=\"-1\"\n        aria-labelledby=\"staticBackdropLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-dialog-centered\">\n          <div class=\"modal-content modal-notification\">\n            <form id=\"formInfoBoy\">\n              <div class=\"modal-header\">\n                <h5 class=\"modal-title\" id=\"staticBackdropLabel\">Modal title</h5>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>\n              <div class=\"modal-body px-4\">\n                <div class=\"row\">\n                  <div class=\"col-lg-4 col-md-12 p-2 \">\n                    <div class=\"modalNinio-contentImg  m-auto\">\n                      <img src=\"./img/ICONO DE USUARIO SIN FOTO.png\" alt=\"\" class=\"modalNinio-img m-auto mb-3 d-block\" id=\"imagenNinio\">\n                      <label for=\"addFoto\" class=\"mt-3 btn-azul btn btn-block br-25 p-1\">subir foto <img\n                          class=\"h-15px ml-2 \" src=\"./img/ICONO SUBIR FOTO.svg\" alt=\"\"></label>\n                      <input type=\"file\" name=\"fotoNinio\" id=\"addFoto\" class=\"d-none\">\n                    </div>\n                  </div>\n                  <div class=\"col-lg-8 col-md-12  p-2\">\n                    <div class=\"modalNinio-contentInputs m-auto\">\n                      <div class=\"form-group\">\n                        <input name=\"names\" class=\"form-control br-25\" type=\"text\" name=\"nombre\" placeholder=\"nombre y apellido\"\n                          required=\"required\" />\n                      </div>\n\n                      <div class=\"form-group\">\n                        <textarea class=\"form-control br-25\" name=\"textArea\" rows=\"5\" required placeholder=\"Ingreza tu carta Navide\xF1a\"></textarea>\n                      </div>\n                      <input type=\"hidden\" id=\"idNinio\" name=\"idNinio\">\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"modal-footer\">\n                <button type=\"button\" class=\"p-2 px-4 br-25 btn btn-outline-secondary\"\n                  data-dismiss=\"modal\">Cancelar</button>\n                <input type=\"submit\" class=\"p-2 px-4  btn-azul br-25 btn btn-primary\" value=\"Ingrezar\">\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n      <div class=\"modal fade\" id=\"modalprogressBar\" style=\"display:none; background-color: rgba(0,0,0,.2);\">\n        <div class=\"modal-dialog modal-md\">\n          <div class=\"modal-content p-3\">\n\n          <div class=\"progress\">\n            <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\" id=\"progressbar\"></div>\n          </div>\n        </div>\n      </div>\n      ";
      document.body.classList.remove("loading");
      document.addEventListener("click", function (e) {
        if (e.target.matches(".signOut")) {
          location.reload();
          firebase.auth().signOut().then(function () {
            return e.target.remove();
          });
        }
      });

      document.querySelector("#formInfoBoy").addEventListener("submit", function (e) {
        e.preventDefault();

        var names = e.target.names;
        var idHidden = e.target.idNinio;
        var carta = e.target.textArea;
        var fotoNinio = e.target.fotoNinio;
        var db = firebase.database();
        var niniosRef = db.ref().child("ni\xF1os-users");
        var storage = firebase.storage();
        var bucket = storage.ref();
        var imgRef = bucket.child("img-ni\xF1os");
        var modalProgress = document.querySelector("#modalprogressBar");
        var progressbar = document.querySelector("#progressbar");

        // const 
        if (names.value === "" || carta.value === "" || fotoNinio.value === "") {
          // c(names.value ,idHidden.value , carta.value, fotoNinio.value === ``)
          notificattion(e.target, "por favor ingreza todos los campos de formulario, la foto es requerida para el ingrezo de tu carta navide\xF1a", "danger");
        }

        var id = idHidden.value || niniosRef.push().key;

        var formdata = new FormData(e.target);

        var uploadTask = imgRef.child(formdata.get("fotoNinio").name).put(formdata.get("fotoNinio"));
        uploadTask.on("stated_changed", function (data) {
          var counter = Math.floor(data.bytesTransferred / data.totalBytes * 100);
          // c(counter)
          if (counter < 100) {
            modalProgress.classList.add("show");
            modalProgress.style.display = "block";
            progressbar.style.width = counter + "%";
            progressbar.textContent = counter + "%";
          } else {
            modalProgress.classList.remove("show");
            modalProgress.style.display = "none";
            fotoNinio.innerHTML = "";
            e.target.reset();
            notificattion(e.target, "se ah registrado correctamente ", "success");
            document.querySelector("#imagenNinio").src = "./img/ICONO DE USUARIO SIN FOTO.png";
          }
        }, function (err) {}, function () {
          var fileRef = imgRef.child(formdata.get("fotoNinio").name);

          fileRef.getDownloadURL().then(function (url) {
            var datanaNinios = {
              names: names.value,
              carta: carta.value,
              padrino: false,
              id: id,
              photoURL: url
            };
            var updateData = {};
            updateData["/" + id] = datanaNinios;
            niniosRef.update(updateData);
          });
        });
      });

      document.querySelector("#addFoto").addEventListener("change", function (e) {
        var urlImage = URL.createObjectURL(e.target.files[0]);
        document.querySelector("#imagenNinio").src = urlImage;
      });
      addAvatar(user);
    } else {
      document.body.classList.remove("loading");
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
      firebase.auth().signInWithEmailAndPassword(email.value, pass.value).then(function (response) {}).catch(function (err) {
        // formLogIn.innerHTML += notificattion(err.message, `danger`)

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
      }).catch(function (err) {
        // formPadrino.innerHTML += notificattion(err.message, `danger`)
      });
    }
  }, {
    key: "autCuentaGoogle",
    value: function autCuentaGoogle() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function (result) {
        c(result);
      }).catch(function (err) {
        // formPadrino.innerHTML += notificattion(err.message , `danger`)

      });
    }
  }]);

  return Autentication;
}();

window.addEventListener("load", function (e) {
  verifyUser();
  preloaderImage(".preloaderImage-img");
  // setTimeout(() => {
  // },3000)
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
  var auth = new Autentication();
  auth.autEmailPass(e.target.email, e.target.password);
});
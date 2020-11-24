(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFNLElBQUksUUFBUSxHQUFsQjtBQUNBLElBQU0sY0FBYyxTQUFTLGFBQVQsZ0JBQXBCO0FBQ0EsSUFBTSxZQUFZLFNBQVMsYUFBVCxVQUFsQjtBQUNBOztBQUVBLElBQU0sWUFBWSxTQUFaLFNBQVksQ0FBQyxJQUFELEVBQVU7QUFDMUIsTUFBSSxNQUFNLFNBQVMsYUFBVCxrQkFBVjtBQUNBLE1BQUcsS0FBSyxRQUFSLEVBQWlCO0FBQ2YsUUFBSSxHQUFKLEdBQVUsS0FBSyxRQUFmO0FBQ0QsR0FGRCxNQUVLO0FBQ0gsUUFBSSxHQUFKO0FBQ0Q7QUFDRixDQVBEOztBQVNBLElBQU0sY0FBYyxTQUFkLFdBQWMsQ0FBQyxVQUFELEVBQWdCO0FBQ2xDLHFIQUVvRSxVQUZwRSw0RUFFOEksVUFGOUk7QUFLRCxDQU5EOztBQVFBLElBQU0sZ0JBQWdCLFNBQWhCLGFBQWdCLENBQUMsUUFBRCxFQUFXLE9BQVgsRUFBb0IsS0FBcEIsRUFBOEI7O0FBRWxELFdBQVMsU0FBVCw0RUFDOEQsS0FEOUQscUNBRUksT0FGSjs7QUFNQSxhQUFXLFlBQU07QUFDZixhQUFTLGFBQVQsd0JBQThDLE1BQTlDO0FBQ0QsR0FGRCxFQUVHLElBRkg7QUFHRCxDQVhEOztBQWFBLElBQU0sYUFBYSxTQUFiLFVBQWEsR0FBTTtBQUN2QixXQUFTLElBQVQsR0FBZ0Isa0JBQWhCLENBQW1DLGdCQUFRO0FBQ3pDLFFBQUcsU0FBUyxJQUFaLEVBQWtCO0FBQ2hCLGVBQVMsSUFBVCxDQUFjLFNBQWQsazdCQWlCZ0QsS0FBSyxXQUFMLEtBQXFCLElBQXJCLEdBQTRCLEtBQUssV0FBakMsZUFqQmhEO0FBbUZBLGVBQVMsSUFBVCxDQUFjLFNBQWQsQ0FBd0IsTUFBeEI7QUFDQSxlQUFTLGdCQUFULFVBQW1DLGFBQUs7QUFD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QixFQUFFLE1BQUYsQ0FBUyxLQUEzQixFQUFpQyxFQUFFLE1BQUYsQ0FBUyxRQUExQztBQUNELENBSkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBjID0gY29uc29sZS5sb2dcbmNvbnN0IGZvcm1QYWRyaW5vID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm1QYWRyaW5vYClcbmNvbnN0IGZvcm1Mb2dJbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNsb2dJbmApXG4vLyBjb25zdCB2ZXJpZmljYWRvclVzZXIgPSBmYWxzZVxuXG5jb25zdCBhZGRBdmF0YXIgPSAodXNlcikgPT4ge1xuICBsZXQgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNlc2lvbi1hdmF0YXJgKVxuICBpZih1c2VyLnBob3RvVVJMKXtcbiAgICBpbWcuc3JjID0gdXNlci5waG90b1VSTFxuICB9ZWxzZXtcbiAgICBpbWcuc3JjID0gYC4vaW1nL0lDT05PIERFIFVTVUFSSU8gU0lOIEZPVE8ucG5nYFxuICB9XG59XG5cbmNvbnN0IHByb2dyZXNzQmFyID0gKHBvcmNlbnRhamUpID0+IHtcbiAgcmV0dXJuIGBcbiAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+XG4gICAgPGRpdiBjbGFzcz1cInByb2dyZXNzLWJhciBteS0zXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgc3R5bGU9XCJ3aWR0aDogJHtwb3JjZW50YWplfSU7XCIgYXJpYS12YWx1ZW5vdz1cIjI1XCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCI+JHtwb3JjZW50YWplfSU8L2Rpdj5cbiAgPC9kaXY+XG4gIGBcbn1cblxuY29uc3Qgbm90aWZpY2F0dGlvbiA9IChzZWxlY3RvciwgbWVzc2FnZSwgYWxlcnQpID0+IHtcblxuICBzZWxlY3Rvci5pbm5lckhUTUwgKz0gYFxuICA8ZGl2IGlkPVwibm90aWZpY2F0aW9uLWFsZXJ0XCIgY2xhc3M9XCJmYWlsZWRMb2dpbiBhbGVydCBhbGVydC0ke2FsZXJ0fSBteS0zXCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgJHttZXNzYWdlfVxuICA8L2Rpdj5cbiAgYFxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNub3RpZmljYXRpb24tYWxlcnRgKS5yZW1vdmUoKVxuICB9LCA4MDAwKVxufVxuXG5jb25zdCB2ZXJpZnlVc2VyID0gKCkgPT4ge1xuICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKHVzZXIgPT4ge1xuICAgIGlmKHVzZXIgIT09IG51bGwpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwibWVudU5hdmVnYXRpb24gYmctd2hpdGUgZml4ZWQtdG9wIHNoYWRvdy1zbVwiPlxuICAgICAgICAgIDxuYXYgY2xhc3M9XCJuYXZiYXIgbmF2YmFyLWV4cGFuZC1sZyBuYXZiYXItbGlnaHQgYmctd2hpdGUgZm9udC1mLXRpdGxlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIiNpbmljaW9cIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwibWVudU5hdmVnYXRpb24tbG9nbyBwcmVsb2FkZXJJbWFnZS1pbWdcIiBkYXRhLWltZz1cIi4vaW1nL0xvZ28gTkFWLnBuZ1wiIGFsdD1cIlwiLz5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWwtYXV0byBkLWZsZXhcIj5cbiAgICAgICAgICAgICAgICA8aW1nIGNsYXNzPVwic2VzaW9uLWF2YXRhciAgbXItM1wiPlxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWNlbnRlciBhbGlnbi1pdGVtcy1jZW50ZXIgc2lnbk91dCBuYXYtbGluayBwLTBcIj4gc2FsaXI8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uYXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXJTZXNpb24gcHktNSBjb250YWluZXIgXCI+XG4gICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1nL0lDT05PIERFIFVTVUFSSU8gU0lOIEZPVE8ucG5nXCIgYWx0PVwiXCIgY2xhc3M9XCJoZWFkZXJTZXNpb24tYXZhdGFySGVhZGVyIG0tYXV0byBkLWJsb2NrXCI+XG4gICAgICAgICAgICA8aDEgY2xhc3M9XCJweS0zIHRleHQtY2VudGVyIHRleHQtdmVyZGVcIj4ke3VzZXIuZGlzcGxheU5hbWUgIT09IG51bGwgPyB1c2VyLmRpc3BsYXlOYW1lIDogYEJpZW52ZW5pZG9gfTwvaDE+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyU2VzaW9uLWNvbnRlbnRCdXR0b25zIG0tYXV0byAgcHktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtMiAgY29sLXNtLTEyIGNvbC1tZC02IFwiPjxidXR0b24gY2xhc3M9XCJtLWF1dG8gYnRuIGJ0bi1ibG9jayBidG4tYnV0dG9uRm9ybSBici0yNSAgYS10aXRsZSBcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjc3RhdGljQmFja2Ryb3BcIj5uacOxbzwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLTIgIGNvbC1zbS0xMiBjb2wtbWQtNiBcIj48YnV0dG9uIGNsYXNzPVwibS1hdXRvIGJ0biBidG4tYmxvY2sgYnRuLWF6dWwgYnItMjUgIGEtdGl0bGUgXCI+cGFkcmlubzwvYnV0dG9uPjwvZGl2PiBcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9oZWFkZXI+XG5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwgZmFkZVwiIGlkPVwic3RhdGljQmFja2Ryb3BcIiBkYXRhLWJhY2tkcm9wPVwic3RhdGljXCIgZGF0YS1rZXlib2FyZD1cImZhbHNlXCIgdGFiaW5kZXg9XCItMVwiXG4gICAgICAgIGFyaWEtbGFiZWxsZWRieT1cInN0YXRpY0JhY2tkcm9wTGFiZWxcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1kaWFsb2ctY2VudGVyZWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudCBtb2RhbC1ub3RpZmljYXRpb25cIj5cbiAgICAgICAgICAgIDxmb3JtIGlkPVwiZm9ybUluZm9Cb3lcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlXCIgaWQ9XCJzdGF0aWNCYWNrZHJvcExhYmVsXCI+TW9kYWwgdGl0bGU8L2g1PlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJtb2RhbFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5IHB4LTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTQgY29sLW1kLTEyIHAtMiBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsTmluaW8tY29udGVudEltZyAgbS1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZy9JQ09OTyBERSBVU1VBUklPIFNJTiBGT1RPLnBuZ1wiIGFsdD1cIlwiIGNsYXNzPVwibW9kYWxOaW5pby1pbWcgbS1hdXRvIG1iLTMgZC1ibG9ja1wiIGlkPVwiaW1hZ2VuTmluaW9cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiYWRkRm90b1wiIGNsYXNzPVwibXQtMyBidG4tYXp1bCBidG4gYnRuLWJsb2NrIGJyLTI1IHAtMVwiPnN1YmlyIGZvdG8gPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImgtMTVweCBtbC0yIFwiIHNyYz1cIi4vaW1nL0lDT05PIFNVQklSIEZPVE8uc3ZnXCIgYWx0PVwiXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBuYW1lPVwiZm90b05pbmlvXCIgaWQ9XCJhZGRGb3RvXCIgY2xhc3M9XCJkLW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctOCBjb2wtbWQtMTIgIHAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWxOaW5pby1jb250ZW50SW5wdXRzIG0tYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cIm5hbWVzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgYnItMjVcIiB0eXBlPVwidGV4dFwiIG5hbWU9XCJub21icmVcIiBwbGFjZWhvbGRlcj1cIm5vbWJyZSB5IGFwZWxsaWRvXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ9XCJyZXF1aXJlZFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiZm9ybS1jb250cm9sIGJyLTI1XCIgbmFtZT1cInRleHRBcmVhXCIgcm93cz1cIjVcIiByZXF1aXJlZCBwbGFjZWhvbGRlcj1cIkluZ3JlemEgdHUgY2FydGEgTmF2aWRlw7FhXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiaWROaW5pb1wiIG5hbWU9XCJpZE5pbmlvXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwLTIgcHgtNCBici0yNSBidG4gYnRuLW91dGxpbmUtc2Vjb25kYXJ5XCJcbiAgICAgICAgICAgICAgICAgIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+Q2FuY2VsYXI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwicC0yIHB4LTQgIGJ0bi1henVsIGJyLTI1IGJ0biBidG4tcHJpbWFyeVwiIHZhbHVlPVwiSW5ncmV6YXJcIj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwgZmFkZVwiIGlkPVwibW9kYWxwcm9ncmVzc0JhclwiIHN0eWxlPVwiZGlzcGxheTpub25lOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMCwwLC4yKTtcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWRpYWxvZyBtb2RhbC1tZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50IHAtM1wiPlxuXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW5vdz1cIjI1XCIgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCIgaWQ9XCJwcm9ncmVzc2JhclwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgYFxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGBsb2FkaW5nYClcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZSA9PiB7XG4gICAgICAgIGlmKGUudGFyZ2V0Lm1hdGNoZXMoYC5zaWduT3V0YCkpe1xuICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKVxuICAgICAgICAgICAgLnRoZW4oICgpID0+ICBlLnRhcmdldC5yZW1vdmUoKSlcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2Zvcm1JbmZvQm95YCkuYWRkRXZlbnRMaXN0ZW5lcihgc3VibWl0YCwgZSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGNvbnN0IG5hbWVzID0gZS50YXJnZXQubmFtZXNcbiAgICAgICAgY29uc3QgaWRIaWRkZW4gPSBlLnRhcmdldC5pZE5pbmlvXG4gICAgICAgIGNvbnN0IGNhcnRhID0gZS50YXJnZXQudGV4dEFyZWFcbiAgICAgICAgY29uc3QgZm90b05pbmlvID0gZS50YXJnZXQuZm90b05pbmlvXG4gICAgICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKVxuICAgICAgICBjb25zdCBuaW5pb3NSZWYgPSBkYi5yZWYoKS5jaGlsZChgbmnDsW9zLXVzZXJzYClcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IGZpcmViYXNlLnN0b3JhZ2UoKVxuICAgICAgICBjb25zdCBidWNrZXQgPSBzdG9yYWdlLnJlZigpXG4gICAgICAgIGNvbnN0IGltZ1JlZiA9IGJ1Y2tldC5jaGlsZChgaW1nLW5pw7Fvc2ApXG4gICAgICAgIGNvbnN0IG1vZGFsUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbW9kYWxwcm9ncmVzc0JhcmApXG4gICAgICAgIGNvbnN0IHByb2dyZXNzYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2dyZXNzYmFyYClcblxuICAgICAgICAvLyBjb25zdCBcbiAgICAgICAgaWYobmFtZXMudmFsdWUgPT09IGBgIHx8IGNhcnRhLnZhbHVlID09PSBgYCB8fCBmb3RvTmluaW8udmFsdWUgPT09IGBgKXtcbiAgICAgICAgICAvLyBjKG5hbWVzLnZhbHVlICxpZEhpZGRlbi52YWx1ZSAsIGNhcnRhLnZhbHVlLCBmb3RvTmluaW8udmFsdWUgPT09IGBgKVxuICAgICAgICAgIG5vdGlmaWNhdHRpb24oZS50YXJnZXQsYHBvciBmYXZvciBpbmdyZXphIHRvZG9zIGxvcyBjYW1wb3MgZGUgZm9ybXVsYXJpbywgbGEgZm90byBlcyByZXF1ZXJpZGEgcGFyYSBlbCBpbmdyZXpvIGRlIHR1IGNhcnRhIG5hdmlkZcOxYWAsIGBkYW5nZXJgKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGlkID0gaWRIaWRkZW4udmFsdWUgfHwgbmluaW9zUmVmLnB1c2goKS5rZXlcblxuICAgICAgICBsZXQgZm9ybWRhdGEgPSBuZXcgRm9ybURhdGEoZS50YXJnZXQpXG5cbiAgICAgICAgbGV0IHVwbG9hZFRhc2sgPSBpbWdSZWYuY2hpbGQoZm9ybWRhdGEuZ2V0KGBmb3RvTmluaW9gKS5uYW1lKS5wdXQoZm9ybWRhdGEuZ2V0KGBmb3RvTmluaW9gKSlcbiAgICAgICAgdXBsb2FkVGFzay5vbihgc3RhdGVkX2NoYW5nZWRgLCBkYXRhID0+IHtcbiAgICAgICAgICBsZXQgY291bnRlciA9IE1hdGguZmxvb3IoKGRhdGEuYnl0ZXNUcmFuc2ZlcnJlZCAvIGRhdGEudG90YWxCeXRlcykgKiAxMDApXG4gICAgICAgICAgLy8gYyhjb3VudGVyKVxuICAgICAgICAgIGlmKGNvdW50ZXIgPCAxMDApe1xuICAgICAgICAgICAgbW9kYWxQcm9ncmVzcy5jbGFzc0xpc3QuYWRkKGBzaG93YClcbiAgICAgICAgICAgIG1vZGFsUHJvZ3Jlc3Muc3R5bGUuZGlzcGxheSA9IGBibG9ja2BcbiAgICAgICAgICAgIHByb2dyZXNzYmFyLnN0eWxlLndpZHRoID0gYCR7Y291bnRlcn0lYFxuICAgICAgICAgICAgcHJvZ3Jlc3NiYXIudGV4dENvbnRlbnQgPSBjb3VudGVyICsgYCVgXG4gICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBtb2RhbFByb2dyZXNzLmNsYXNzTGlzdC5yZW1vdmUoYHNob3dgKVxuICAgICAgICAgICAgbW9kYWxQcm9ncmVzcy5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgXG4gICAgICAgICAgICBmb3RvTmluaW8uaW5uZXJIVE1MID0gYGBcbiAgICAgICAgICAgIGUudGFyZ2V0LnJlc2V0KClcbiAgICAgICAgICAgIG5vdGlmaWNhdHRpb24oZS50YXJnZXQsYHNlIGFoIHJlZ2lzdHJhZG8gY29ycmVjdGFtZW50ZSBgLCBgc3VjY2Vzc2ApXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjaW1hZ2VuTmluaW9gKS5zcmMgPSBgLi9pbWcvSUNPTk8gREUgVVNVQVJJTyBTSU4gRk9UTy5wbmdgXG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSwgZXJyID0+IHtcblxuICAgICAgICB9LCAoICkgPT4ge1xuICAgICAgICAgIGxldCBmaWxlUmVmID0gaW1nUmVmLmNoaWxkKGZvcm1kYXRhLmdldChgZm90b05pbmlvYCkubmFtZSlcblxuICAgICAgICAgIGZpbGVSZWYuZ2V0RG93bmxvYWRVUkwoKVxuICAgICAgICAgICAgLnRoZW4odXJsID0+IHtcbiAgICAgICAgICAgICAgbGV0IGRhdGFuYU5pbmlvcyA9IHtcbiAgICAgICAgICAgICAgICBuYW1lczpuYW1lcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBjYXJ0YTogY2FydGEudmFsdWUsXG4gICAgICAgICAgICAgICAgcGFkcmlubzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIHBob3RvVVJMOiB1cmxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgdXBkYXRlRGF0YSA9IHt9XG4gICAgICAgICAgICAgIHVwZGF0ZURhdGFbYC8ke2lkfWBdID0gZGF0YW5hTmluaW9zXG4gICAgICAgICAgICAgIG5pbmlvc1JlZi51cGRhdGUodXBkYXRlRGF0YSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgIFxuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZEZvdG9gKS5hZGRFdmVudExpc3RlbmVyKGBjaGFuZ2VgLCBlID0+IHtcbiAgICAgICAgbGV0IHVybEltYWdlID0gVVJMLmNyZWF0ZU9iamVjdFVSTChlLnRhcmdldC5maWxlc1swXSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2ltYWdlbk5pbmlvYCkuc3JjID0gdXJsSW1hZ2VcbiAgICAgIH0pXG4gICAgICBhZGRBdmF0YXIodXNlcilcbiAgICB9ZWxzZSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoYGxvYWRpbmdgKVxuICAgIH1cbiAgICBwcmVsb2FkZXJJbWFnZShgLnByZWxvYWRlckltYWdlLWltZ2ApIFxuICB9KVxuXG5cbn1cblxuXG4vLyBwcmVsb2FkZXJyIC0tLS0tLVxuY29uc3QgcHJlbG9hZGVySW1hZ2UgPSAoIHNlbGVjdG9ySW1hZ2UpID0+IHtcbiAgY29uc3QgaW1hZ2VzID0gbnVsbCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9ySW1hZ2UpXG4gIGxldCBvcHRpb25zID0ge1xuICAgIHJvb3Q6bnVsbCxcbiAgICByb290TWFyZ2luOmAxMDBweGAsXG4gICAgdGhyZXNob2xkOjBcbiAgfVxuICBjb25zdCBjYWxsYmFjayA9IChlbnRyaWVzKSA9PiB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGlmKGVsLmlzSW50ZXJzZWN0aW5nKXtcbiAgICAgICAgbGV0IHVybEltYWdlID0gZWwudGFyZ2V0LmdldEF0dHJpYnV0ZShgZGF0YS1pbWdgKVxuXG4gICAgICAgIGVsLnRhcmdldC5zcmMgPSB1cmxJbWFnZVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBsZXQgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoY2FsbGJhY2ssb3B0aW9ucylcbiAgaW1hZ2VzLmZvckVhY2goZWwgPT4ge1xuICAgIG9ic2VydmVyLm9ic2VydmUoZWwpXG4gIH0pXG59XG5jbGFzcyBBdXRlbnRpY2F0aW9uIHtcbiAgYXV0RW1haWxQYXNzKGVtYWlsLCBwYXNzKXtcbiAgICAvLyBjKGVtYWlsLCBwYXNzKVxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChcbiAgICAgIGVtYWlsLnZhbHVlLFxuICAgICAgcGFzcy52YWx1ZSxcbiAgICApXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIH0pXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAvLyBmb3JtTG9nSW4uaW5uZXJIVE1MICs9IG5vdGlmaWNhdHRpb24oZXJyLm1lc3NhZ2UsIGBkYW5nZXJgKVxuICAgICAgXG4gICAgfSlcbiAgfVxuXG5cblxuICBjcmVhckN1ZW50YUVtYWlsUGFzcyhlbWFpbCwgcGFzcywgbmFtZXMpe1xuICAgIGZpcmViYXNlXG4gICAgICAuYXV0aCgpLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzcylcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgICByZXN1bHQudXNlci51cGRhdGVQcm9maWxlKHtcbiAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBuYW1lcyxcbiAgICAgICAgICAgIHBhOiBgc2Fwb2BcbiAgICAgICAgICB9KVxuICAgICAgICAgIGMocmVzdWx0LnVzZXIpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIC8vIGZvcm1QYWRyaW5vLmlubmVySFRNTCArPSBub3RpZmljYXR0aW9uKGVyci5tZXNzYWdlLCBgZGFuZ2VyYClcbiAgICAgICAgfSlcbiAgfVxuXG4gIGF1dEN1ZW50YUdvb2dsZSgpe1xuICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKClcblxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAocHJvdmlkZXIpXG4gICAgLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGMocmVzdWx0KVxuICAgIH0pXG4gICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAvLyBmb3JtUGFkcmluby5pbm5lckhUTUwgKz0gbm90aWZpY2F0dGlvbihlcnIubWVzc2FnZSAsIGBkYW5nZXJgKVxuXG4gICAgfSlcbiAgfVxufVxuXG5cblxuXG4gIFxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYGxvYWRgLCBlID0+IHtcbiAgICB2ZXJpZnlVc2VyKClcbiAgICBwcmVsb2FkZXJJbWFnZShgLnByZWxvYWRlckltYWdlLWltZ2ApXG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gfSwzMDAwKVxuXG59KVxuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgZSA9PiB7XG4gIGNvbnN0IGF1dGggPSBuZXcgQXV0ZW50aWNhdGlvbigpXG4gIGlmKGUudGFyZ2V0Lm1hdGNoZXMoYCNnb29nbGVBdXRoYCkgfHwgZS50YXJnZXQubWF0Y2hlcyhgZm9udGApKXtcbiAgICBhdXRoLmF1dEN1ZW50YUdvb2dsZSggKVxuICB9XG59KVxuXG5cbmZvcm1QYWRyaW5vLmFkZEV2ZW50TGlzdGVuZXIoYHN1Ym1pdGAsIGUgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KClcblxuICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHBhZHJpbm9OYW1lYClcbiAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcGFkcmlub0VtYWlsYClcbiAgY29uc3QgcGFzc1dvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcGFkcmlub1Bhc3NgKVxuICBjb25zdCBhdXRoID0gbmV3IEF1dGVudGljYXRpb24oKVxuICBhdXRoLmNyZWFyQ3VlbnRhRW1haWxQYXNzKGVtYWlsLnZhbHVlLCBwYXNzV29yZC52YWx1ZSxuYW1lLnZhbHVlIClcblxufSkgXG5cbmZvcm1Mb2dJbi5hZGRFdmVudExpc3RlbmVyKGBzdWJtaXRgLCBlID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIGxldCBhdXRoID0gbmV3IEF1dGVudGljYXRpb24gXG4gIGF1dGguYXV0RW1haWxQYXNzKGUudGFyZ2V0LmVtYWlsLGUudGFyZ2V0LnBhc3N3b3JkKVxufSkiXX0=

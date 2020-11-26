const c = console.log
const formPadrino = document.querySelector(`#formPadrino`)
const formLogIn = document.querySelector(`#logIn`)
// const verificadorUser = false

const addAvatar = (user) => {
  let img = document.querySelector(`.sesion-avatar`)
  if (user.photoURL) {
    img.src = user.photoURL
  } else {
    img.src = `./img/ICONO DE USUARIO SIN FOTO.png`
  }
}

const progressBar = (porcentaje) => {
  return `
  <div class="progress">
    <div class="progress-bar my-3" role="progressbar" style="width: ${porcentaje}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${porcentaje}%</div>
  </div>
  `
}

const templateCardNinios = ({ carta, id, names, padrinoPhoto, padrinoName, photoURL }) => {

  return `
    <div class="${(padrinoName ? `order-1` : ``)} col-xl-3 col-lg-6 col-sm-12 p-2 pt-5 mb-3">
      <div id="${id}" class="h-100 carrouselBoys-card bg-white card mx-auto position-relative">
        <div class="carrouselBoys-contentImgBoy mx-auto "><img
            class="gris-claro carrouselBoys-imgBoy w-100 h-100 preloaderImage-img" data-img="${photoURL}"
            alt="" /></div>
        <div class="card-body text-center py-5 mt-4">
          <h5 class="card-title text-verde">${names}</h5>
          <div  class=" centrado-ab">
            ${(padrinoName
      ? `<img data-img="${(padrinoPhoto ? padrinoPhoto : `./img/ICONO DE USUARIO SIN FOTO.png`)}"  class="preloaderImage-img h50-w50 rounded-circle  mr-2" alt="">
                  <h6 >${padrinoName}</h6>`
      : ``)}
          </div>
          ${(padrinoName
      ? ``
      : `<p class="card-text">${carta}</p>
              <p  class="text-light carrouselBoys-buttonLink position-absolute p-2 m-0" href="#">${id}</p>`)}
          
        </div>
      </div>
    </div> 
  `
}

const progressBarFunc = (modalProgress, progressbar, counter) => {
  if (counter < 100) {
    modalProgress.classList.add(`show`)
    modalProgress.style.display = `block`
    progressbar.style.width = `${counter}%`
    progressbar.textContent = counter + `%`
  } else {
    modalProgress.classList.remove(`show`)
    modalProgress.style.display = `none`
  }
}

const notificattion = (selector, message, alert) => {

  selector.innerHTML = `
  <div id="notification-alert" class="failedLogin alert alert-${alert} my-3" role="alert">
    ${message}
  </div>
  `

  setTimeout(() => {
    let alertNotification = null || document.querySelector(`#notification-alert`)
    alertNotification !== null
      ? alertNotification.remove()
      : false
  }, 5000)
}

const verifyUser = () => {
  firebase.auth().onAuthStateChanged(user => {

    if (user !== null) {
      document.body.innerHTML = `
        <div class="menuNavegation bg-white fixed-top shadow-sm">
          <nav class="navbar navbar-expand-lg navbar-light bg-white font-f-title">
            <div class="container">
              <a class="navbar-brand" href="#inicio">
                <img class="menuNavegation-logo preloaderImage-img" data-img="./img/Logo NAV.png" alt=""/>
              </a>
              <div class="ml-auto d-flex">
                <img class="sesion-avatar  mr-3 preloaderImage-img" data-img="${(user.photoURL ? user.photoURL : `./img/ICONO DE USUARIO SIN FOTO.png`)}">
                <a href="#" class="d-flex justify-content-center align-items-center signOut nav-link p-0"> salir</a>
              </div>
            </div>
          </nav>
        </div>
        <header>
          <div class="headerSesion py-5 container ">
            <img class="gris-claro headerSesion-avatarHeader m-auto d-block preloaderImage-img" data-img="${(user.photoURL ? user.photoURL : `./img/ICONO DE USUARIO SIN FOTO.png`)}">
            ${(user.photoURL
          ? ``
          : `<div class="pt-3 contentButtonAddAvatar" ><label for="addAvatarUser" class="w-fit d-block btn-azul btn br-25 px-3 py-1  m-auto" >subir foto <img class="h-15px ml-2 " src="./img/ICONO SUBIR FOTO.svg" alt=""></label>
            <input type="file" name="addAvatar" id="addAvatarUser" class="d-none"></div>`
        )}  
            <h4 class="mt-3 text-center text-azul">${user.displayName !== null ? user.displayName : `Bienvenido`}</h4>
            <h1 class="pb-3 text-center text-azul">¿Que deseas ser este año 2020?</h1>
            <div class="headerSesion-contentButtons m-auto  py-1">
              <div class="row">
                <div class="p-2  col-sm-12 col-md-6 "><button class="centrado-ab btn-sesionIniciada m-auto btn btn-block btn-azul br-25  a-title " data-toggle="modal" data-target="#staticBackdrop"> <img class="h-40px mr-3 preloaderImage-img" data-img="./img/Cara de niño.png"> niño</button></div>
                <div class="p-2  col-sm-12 col-md-6 "><button id="buttonPadrino" class="btn-sesionIniciada centrado-ab m-auto btn btn-block  btn-buttonForm br-25  a-title " data-toggle="modal" data-target="#modalPadrino"><img class="h-40px mr-3 preloaderImage-img" data-img="./img/Cara de santa.png">padrino</button></div> 
              </div>
            </div>
          </div>
        </header> 


        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
          <div class="modal-content modal-notification azul-claro">
            <form id="formInfoBoy">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel text-azul">Sube tu foto y escribe tu carta</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button> 
              </div>
              <div class="modal-body px-4">
           
                <div class="row">
                  <div class="col-lg-4 col-md-12 p-2 ">
                    <div class="modalNinio-contentImg  m-auto">
                      <img src="./img/ICONO DE USUARIO SIN FOTO.png" alt="" class="modalNinio-img m-auto mb-3 d-block" id="imagenNinio">
                      <label for="addFoto" class="mt-3 btn-azul btn btn-block br-25 p-1">subir foto <img
                          class="h-15px ml-2 " src="./img/ICONO SUBIR FOTO.svg" alt=""></label>
                      <input type="file" name="fotoNinio" id="addFoto" class="d-none">
                    </div>
                  </div>
                  <div class="col-lg-8 col-md-12  p-2">
                    <div class="modalNinio-contentInputs m-auto">
                      <div class="form-group">
                        <input name="names" class="form-control br-25" type="text" name="nombre" placeholder="nombre y apellido"
                          required="required" />
                      </div>

                      <div class="form-group">
                        <textarea class="form-control br-25" name="textArea" rows="5" required placeholder="Ingreza tu carta Navideña"></textarea>
                        <span class="form-text text-muted">Por favor ingreza menos de 30 caracteres</span>
                      </div>
                      <input type="hidden" id="idNinio" name="idNinio">
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="p-2 px-4 br-25 btn btn-outline-secondary"
                  data-dismiss="modal">Cancelar</button>
                <input type="submit" class="p-2 px-4  btn-azul br-25 btn btn-primary" value="Ingrezar">
              </div>
              <div id="notificationCarta"></div>
            </form>
          </div>
        </div>
      </div>


    <div class="modal fade" id="modalPadrino" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div class="modal-dialog modal-xl max-h100vh">
        <div class="modal-content bg-verde-muyClaro">
          <div class="modal-header">
            <h5 class="modal-title text-verde"  id="exampleModalLabel">Niños a apadrinar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body overflow-auto max-h65vh" >
            <div class="row" id="modalContent">

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="p-2 px-4 br-25 btn btn-outline-secondary" data-dismiss="modal">Cancelar</button>
            <a class="btn btn-buttonForm br-25 p-2 px-4" href="#"><img
              data-img="./img/whatsapp.svg" class="preloaderImage-img mr-1"> contactanos por whatsapp</a>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="modalprogressBar" style="display:none; background-color: rgba(0,0,0,.2);">
      <div class="modal-dialog modal-md">
        <div class="modal-content p-3">

        <div class="progress">
          <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="progressbar"></div>
        </div>
      </div>
    </div>
      `
      document.body.classList.remove(`loading`)
      document.addEventListener(`click`, e => {
        if (e.target.matches(`.signOut`)) {
          location.reload()
          firebase.auth().signOut()
            .then(() => e.target.remove())
        }
      })


      const db = firebase.database()
      const niniosRef = db.ref().child(`niños-users`)

      document.querySelector(`#formInfoBoy`).addEventListener(`submit`, e => {
        e.preventDefault()

        const names = e.target.names
        const idHidden = e.target.idNinio
        const carta = e.target.textArea
        const fotoNinio = e.target.fotoNinio
        const storage = firebase.storage()
        const bucket = storage.ref()
        const imgRef = bucket.child(`img-niños`)
        const modalProgress = document.querySelector(`#modalprogressBar`)
        const progressbar = document.querySelector(`#progressbar`)
        const namesNinio = names.value
        const cartasNinio = carta.value

        // const 
        if (names.value === `` || carta.value === `` || fotoNinio.value === ``) {
          let notificationCarta = document.querySelector(`#notificationCarta`)
          notificattion(notificationCarta, `por favor ingreza todos los campos de formulario, la foto es requerida para el ingrezo de tu carta navideña`, `danger`)
        }

        let id = idHidden.value || niniosRef.push().key

        let formdata = new FormData(e.target)

        let uploadTask = imgRef.child(formdata.get(`fotoNinio`).name).put(formdata.get(`fotoNinio`))
        uploadTask.on(`stated_changed`, data => {
          let counter = Math.floor((data.bytesTransferred / data.totalBytes) * 100)
          // c(counter)
          progressBarFunc(modalProgress, progressbar, counter)
          if (counter === 100) {
            let notificationCarta = document.querySelector(`#notificationCarta`)

            notificattion(notificationCarta, `se ah registrado correctamente `, `success`)
            document.querySelector(`#imagenNinio`).src = `./img/ICONO DE USUARIO SIN FOTO.png`
            e.target.reset()
          }
        }, err => {

        }, () => {
          let fileRef = imgRef.child(formdata.get(`fotoNinio`).name)

          fileRef.getDownloadURL()
            .then(url => {
              let datanaNinios = {
                names: namesNinio,
                carta: cartasNinio,
                padrinoPhoto: false,
                padrinoName: false,
                id: id,
                photoURL: url
              }
              let updateData = {}
              updateData[`/${id}`] = datanaNinios
              niniosRef.update(updateData)
            })
        })

      })




      niniosRef.on(`child_added`, data => {
        let modalContent = document.querySelector(`#modalContent`)
        modalContent.innerHTML += templateCardNinios(data.val())
        preloaderImage(`.preloaderImage-img`)
      })



      document.querySelector(`#addFoto`).addEventListener(`change`, e => {
        let urlImage = URL.createObjectURL(e.target.files[0])
        document.querySelector(`#imagenNinio`).src = urlImage
      })
      // addAvatar(user)

      let inputAddAvatar = null || document.querySelector(`#addAvatarUser`)
      // if(inputAddAvatar !== null){
      if (inputAddAvatar !== null) {
        inputAddAvatar.addEventListener(`change`, e => {
          const storage = firebase.storage()
          const bucket = storage.ref()
          const imgRef = bucket.child(`img-users`)
          const modalProgress = document.querySelector(`#modalprogressBar`)
          const progressbar = document.querySelector(`#progressbar`)
          const user = firebase.auth().currentUser

          let urlAvatar = URL.createObjectURL(e.target.files[0])

          let uploadTask = imgRef.child(e.target.files[0].name).put(e.target.files[0])

          uploadTask.on(`stated_changed`, data => {
            let counter = Math.floor((data.bytesTransferred / data.totalBytes) * 100)
            progressBarFunc(modalProgress, progressbar, counter)

          }, err => {

          }, () => {
            let fileRef = imgRef.child(e.target.files[0].name)

            fileRef.getDownloadURL()
              .then(url => {
                user.updateProfile({
                  photoURL: url
                })


                let updateData = {}
                let contactData = {
                  name: user.displayName,
                  email: user.email,
                  photoURL: url
                }
                updateData[user.uid] = contactData
                usersRef.update(updateData)


                document.querySelector(`.headerSesion-avatarHeader`).src = urlAvatar
                document.querySelector(`.sesion-avatar`).src = urlAvatar
                document.querySelector(`.contentButtonAddAvatar`).remove()
              })
          })
        })
      }
    } else {
      document.body.classList.remove(`loading`)
    }
    preloaderImage(`.preloaderImage-img`)
  })


}


// preloaderr ------
const preloaderImage = (selectorImage) => {
  const images = null || document.querySelectorAll(selectorImage)
  let options = {
    root: null,
    rootMargin: `100px`,
    threshold: 0
  }
  const callback = (entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        let urlImage = el.target.getAttribute(`data-img`)

        el.target.src = urlImage
      }
    })
  }

  let observer = new IntersectionObserver(callback, options)
  images.forEach(el => {
    observer.observe(el)
  })
}

const createUserAndDb = (uid, email, names, photoURL = false) => {
  let usersRef = firebase.database().ref().child(`users`)

  usersRef.child(uid).set({
    email,
    names,
    photoURL
  })
}

class Autentication {
  autEmailPass(email, pass) {
    // c(email, pass)
    firebase.auth().signInWithEmailAndPassword(
      email.value,
      pass.value,
    )
      .then(response => {
        c(response)
      })
      .catch(err => {
        const modalContent = document.querySelector(`#modalNotificationLogIn`)
        // modalContent.text += notificattion(`a ocurrido un erro`, `danger`)
        notificattion(modalContent, err.message, `danger`)

      })
  }



  crearCuentaEmailPass(email, pass, names) {
    firebase
      .auth().createUserWithEmailAndPassword(email, pass)
      .then(result => {
        result.user.updateProfile({
          displayName: names
        })
        createUserAndDb(
          result.user.uid,
          email,
          names
        )

      })
      .catch(err => {
        // formPadrino.innerHTML += notificattion(err.message, `danger`)
        let notificationForm = document.querySelector(`#notificationForm`)
        notificattion(notificationForm, err.message, `danger`)
      })
  }

  autCuentaGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        c(result)
        createUserAndDb(
          result.user.uid,
          result.user.email,
          result.user.displayName,
          result.user.photoURL
        )
      })
      .catch(err => {
        let notificationForm = document.querySelector(`#notificationForm`)
        notificattion(notificationForm, err.message, `danger`)

      })
  }
}





window.addEventListener(`load`, e => {
  verifyUser()
  preloaderImage(`.preloaderImage-img`)
  // setTimeout(() => {
  // },3000)

})


document.addEventListener(`click`, e => {
  const auth = new Autentication()
  if (e.target.matches(`#googleAuth`) || e.target.matches(`font`)) {
    auth.autCuentaGoogle()
  }
})


formPadrino.addEventListener(`submit`, e => {
  e.preventDefault()

  const name = document.getElementById(`padrinoName`)
  const email = document.getElementById(`padrinoEmail`)
  const passWord = document.getElementById(`padrinoPass`)
  const auth = new Autentication()
  auth.crearCuentaEmailPass(email.value, passWord.value, name.value)

})

formLogIn.addEventListener(`submit`, e => {
  e.preventDefault()
  let auth = new Autentication
  auth.autEmailPass(e.target.email, e.target.password)
})

document.querySelector(`.menuNavegation`).addEventListener(`click`, e => {
  if (e.target.matches(`a`) || e.target.matches(`button`)) {
    document.querySelector(`#navbarSupportedContent`).classList.remove(`show`)
  }
})


let usersRef = firebase.database().ref().child(`users`)
// c(user.uid)


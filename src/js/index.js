const c = console.log
const formPadrino = document.querySelector(`#formPadrino`)
const formLogIn = document.querySelector(`#logIn`)
// const verificadorUser = false

const addAvatar = (user) => {
  let img = document.querySelector(`.sesion-avatar`)
  if(user.photoURL){
    img.src = user.photoURL
  }else{
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

const notificattion = (selector, message, alert) => {

  selector.innerHTML += `
  <div id="notification-alert" class="failedLogin alert alert-${alert} my-3" role="alert">
    ${message}
  </div>
  `

  setTimeout(() => {
    document.querySelector(`#notification-alert`).remove()
  }, 8000)
}

const verifyUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if(user !== null) {
      document.body.innerHTML = `
        <div class="menuNavegation bg-white fixed-top shadow-sm">
          <nav class="navbar navbar-expand-lg navbar-light bg-white font-f-title">
            <div class="container">
              <a class="navbar-brand" href="#inicio">
                <img class="menuNavegation-logo preloaderImage-img" data-img="./img/Logo NAV.png" alt=""/>
              </a>
              <div class="ml-auto d-flex">
                <img class="sesion-avatar  mr-3">
                <a href="#" class="d-flex justify-content-center align-items-center signOut nav-link p-0"> salir</a>
              </div>
            </div>
          </nav>
        </div>
        <header>
          <div class="headerSesion py-5 container ">
            <img src="./img/ICONO DE USUARIO SIN FOTO.png" alt="" class="headerSesion-avatarHeader m-auto d-block">
            <h1 class="py-3 text-center text-verde">${user.displayName !== null ? user.displayName : `Bienvenido`}</h1>
            <div class="headerSesion-contentButtons m-auto  py-4">
              <div class="row">
                <div class="p-2  col-sm-12 col-md-6 "><button class="m-auto btn btn-block btn-buttonForm br-25  a-title " data-toggle="modal" data-target="#staticBackdrop">niño</button></div>
                <div class="p-2  col-sm-12 col-md-6 "><button class="m-auto btn btn-block btn-azul br-25  a-title ">padrino</button></div> 
              </div>
            </div>
          </div>
        </header>


        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content modal-notification">
            <form id="formInfoBoy">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
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
            </form>
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
        if(e.target.matches(`.signOut`)){
          location.reload()
          firebase.auth().signOut()
            .then( () =>  e.target.remove())
        }
      })

      document.querySelector(`#formInfoBoy`).addEventListener(`submit`, e => {
        e.preventDefault()

        const names = e.target.names
        const idHidden = e.target.idNinio
        const carta = e.target.textArea
        const fotoNinio = e.target.fotoNinio
        const db = firebase.database()
        const niniosRef = db.ref().child(`niños-users`)
        const storage = firebase.storage()
        const bucket = storage.ref()
        const imgRef = bucket.child(`img-niños`)
        const modalProgress = document.querySelector(`#modalprogressBar`)
        const progressbar = document.querySelector(`#progressbar`)

        // const 
        if(names.value === `` || carta.value === `` || fotoNinio.value === ``){
          // c(names.value ,idHidden.value , carta.value, fotoNinio.value === ``)
          notificattion(e.target,`por favor ingreza todos los campos de formulario, la foto es requerida para el ingrezo de tu carta navideña`, `danger`)
        }

        let id = idHidden.value || niniosRef.push().key

        let formdata = new FormData(e.target)

        let uploadTask = imgRef.child(formdata.get(`fotoNinio`).name).put(formdata.get(`fotoNinio`))
        uploadTask.on(`stated_changed`, data => {
          let counter = Math.floor((data.bytesTransferred / data.totalBytes) * 100)
          // c(counter)
          if(counter < 100){
            modalProgress.classList.add(`show`)
            modalProgress.style.display = `block`
            progressbar.style.width = `${counter}%`
            progressbar.textContent = counter + `%`
          }else{
            modalProgress.classList.remove(`show`)
            modalProgress.style.display = `none`
            fotoNinio.innerHTML = ``
            e.target.reset()
            notificattion(e.target,`se ah registrado correctamente `, `success`)
            document.querySelector(`#imagenNinio`).src = `./img/ICONO DE USUARIO SIN FOTO.png`

          }

        }, err => {

        }, ( ) => {
          let fileRef = imgRef.child(formdata.get(`fotoNinio`).name)

          fileRef.getDownloadURL()
            .then(url => {
              let datanaNinios = {
                names:names.value,
                carta: carta.value,
                padrino: false,
                id: id,
                photoURL: url
              }
              let updateData = {}
              updateData[`/${id}`] = datanaNinios
              niniosRef.update(updateData)
            })
        })
        
       
      })

      document.querySelector(`#addFoto`).addEventListener(`change`, e => {
        let urlImage = URL.createObjectURL(e.target.files[0])
        document.querySelector(`#imagenNinio`).src = urlImage
      })
      addAvatar(user)
    }else {
      document.body.classList.remove(`loading`)
    }
    preloaderImage(`.preloaderImage-img`) 
  })


}


// preloaderr ------
const preloaderImage = ( selectorImage) => {
  const images = null || document.querySelectorAll(selectorImage)
  let options = {
    root:null,
    rootMargin:`100px`,
    threshold:0
  }
  const callback = (entries) => {
    entries.forEach(el => {
      if(el.isIntersecting){
        let urlImage = el.target.getAttribute(`data-img`)

        el.target.src = urlImage
      }
    })
  }

  let observer = new IntersectionObserver(callback,options)
  images.forEach(el => {
    observer.observe(el)
  })
}
class Autentication {
  autEmailPass(email, pass){
    // c(email, pass)
    firebase.auth().signInWithEmailAndPassword(
      email.value,
      pass.value,
    )
    .then(response => {
    })
    .catch(err => {
      // formLogIn.innerHTML += notificattion(err.message, `danger`)
      
    })
  }



  crearCuentaEmailPass(email, pass, names){
    firebase
      .auth().createUserWithEmailAndPassword(email, pass)
        .then(result => {
          result.user.updateProfile({
            displayName: names,
            pa: `sapo`
          })
          c(result.user)
        })
        .catch(err => {
          // formPadrino.innerHTML += notificattion(err.message, `danger`)
        })
  }

  autCuentaGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then(result => {
      c(result)
    })
    .catch(err => {
      // formPadrino.innerHTML += notificattion(err.message , `danger`)

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
  if(e.target.matches(`#googleAuth`) || e.target.matches(`font`)){
    auth.autCuentaGoogle( )
  }
})


formPadrino.addEventListener(`submit`, e => {
  e.preventDefault()

  const name = document.getElementById(`padrinoName`)
  const email = document.getElementById(`padrinoEmail`)
  const passWord = document.getElementById(`padrinoPass`)
  const auth = new Autentication()
  auth.crearCuentaEmailPass(email.value, passWord.value,name.value )

}) 

formLogIn.addEventListener(`submit`, e => {
  e.preventDefault()
  let auth = new Autentication 
  auth.autEmailPass(e.target.email,e.target.password)
})
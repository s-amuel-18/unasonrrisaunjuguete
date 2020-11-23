const c = console.log
const formPadrino = document.querySelector(`#formPadrino`)
const formLogIn = document.querySelector(`#logIn`)


const addAvatar = (user) => {
  let img = document.querySelector(`.sesion-avatar`)
  if(user.photoURL){
    img.src = user.photoURL
  }else{
    img.src = `./img/ICONO DE USUARIO SIN FOTO.png`
  }
  
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


        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="br-25 btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="br-25 btn btn-primary">Understood</button>
              </div>
            </div>
          </div>
        </div>
      `
      document.addEventListener(`click`, e => {
        if(e.target.matches(`.signOut`)){
          location.reload()
          firebase.auth().signOut()
            .then( () =>  e.target.remove())
        }
      })
      addAvatar(user)
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
      c(response, ` ok`)
    })
    .catch(err => {
      formLogIn.innerHTML += `
      <div class="failedLogin alert alert-danger my-3" role="alert">
        ${err.message}
      </div>
      `
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
  }

  autCuentaGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then(result => {
      c(result)
    })
    .catch(err => {
      formPadrino.innerHTML += `
      <div class="failedLogin alert alert-danger my-3" role="alert">
        hubo un error puedes ingrezar registrando tus datos en el formulario
      </div>
      `

      setTimeout(() => {
        document.querySelector(`.failedLogin`).remove()
      },8000)
    })
  }
}




  
window.addEventListener(`load`, e => {
    verifyUser()
    preloaderImage(`.preloaderImage-img`)
    setTimeout(() => {
      document.body.classList.remove(`loading`)
    },3000)
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
  c(`submit`)
  let auth = new Autentication 
  auth.autEmailPass(e.target.email,e.target.password)
})
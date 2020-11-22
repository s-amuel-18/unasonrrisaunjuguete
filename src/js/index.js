const c = console.log
const formPadrino = document.querySelector(`#formPadrino`)

class Autentication {
  autEmailPass(email, pass){

  }
  crearCuentaEmailPass(email, pass, names){
    firebase
      .auth().createUserWithEmailAndPassword(email, pass)
        .then(result => {
          result.user.updateProfile({
            displayName: names
          })
        })
  }

  autCuentaGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
    .then(result => {
      c(result)
    })
  }
}

const verifyUser = () => {
  const user = firebase.auth().currentUser
  return user
}

window.addEventListener(`load`, e => {
  firebase.auth().onAuthStateChanged(user => {
    c(user)
    formPadrino.innerHTML += user !== null
    ? `<button class="btn btn-primary btn-block br-25" id="signOut">Salir</button>`
    : ``
  })
  c(verifyUser().x.push(`hola`))
})
formPadrino.addEventListener(`click`, e => {
  const auth = new Autentication()
  if(e.target.matches(`#signOut`)){
    firebase.auth().signOut()
      .then( () =>  e.target.remove())
  }else if(e.target.matches(`#googleAuth`)){
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
  // c(name.value ,email.value)
  // c( passWord.value)
}) 
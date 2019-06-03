$(() => {
  $('.tooltipped').tooltip({ delay: 50 })
  $('.modal').modal()

  // Init Firebase nuevamente
  firebase.initializeApp(varConfig);

  //Adicionar el service worker
  navigator.serviceWorker.register('notificaciones-sw.js')
  .then(registro => {
    // console.log('service worker registrado')
    firebase.messaging().useServiceWorker(registro)
  }).catch(error => {
    console.log(`Error al registrar el service worker ${error}`)
  })

  const messaging = firebase.messaging()
  
  //Registrar credenciales web
  messaging.usePublicVapidKey(
    'BMnvSXvZ-vcALIPuBV3V0bX0iKRTviPYTy7wUgKSrdEd-vvwbPXWs3kQyEt1BlfN8XgtmOV1jSrMjllJ3A_VXs0'
  )

  //Solicitar permisos para las notificaciones
  messaging.requestPermission()
  .then(() =>{
    // console.log('permiso otorgado')
    return messaging.getToken()
  }).then(token => {
    // console.log('TOKEN')
    // console.log(token)
    const db = firebase.firestore()
    db.settings({timestampsInSnapshots:true})
    db.collection('tokens')
    .doc(token)
    .set({
      token: token
    }).catch(error =>{
      console.log(`Error al insertar el token a la DB => ${error}`)
    })
  })

  // Obtener el token cuando se refresca
  messaging.onTokenRefresh(() => {
    messaging.getToken().then(token => {
      console.log("token se ha renovado")
      const db = firebase.firestore()
      db.settings({ timestampsInSnapshots: true })
        db
          .collection('tokens')
          .doc(token)
          .set({
            token: token
          })
          .catch(error => {
            console.log(`Error al insertar el token en la DB => ${error}`)
          })
    })
  })

  //Recibir las notificaciones cuando el usuario esta foreground
  messaging.onMessage(payLoad => {
    Materialize.toast(
      `Ya tenemos un nuevo post. Revisalo, se llama ${payLoad.data.titulo}`, 6000
    )
  })

  const post = new Post()
  post.consultarTodosPost()

  //Firebase observador del cambio de estado
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      $('#btnInicioSesion').text('salir')
      if(user.photoURL){
        $('#avatar').attr('src', user.photoURL)
      }else {
        $('#avatar').attr('src', 'imagenes/usuario_auth.png')
      }
    }else {
      $('#btnInicioSesion').text('Iniciar Sesión')
      $('#avatar').attr('src', 'imagenes/usuario.png')
    }
  })

  //Evento boton inicio sesion
  $('#btnInicioSesion').click(() => {
    const user = firebase.auth().currentUser
    if(user){
      $('#btnInicioSesion').text('Iniciar Sesión')
      return firebase.auth().signOut()
      .then(() => {
        $('#avatar').attr('src', 'imagenes/usuario.png')
        Materialize.toast(`SignOut Correcto`, 4000)
      })
      .catch(error =>{
        Materialize.toast(`Error al realizar SignOut => ${error}`, 4000)
      })
    }

    $('#emailSesion').val('')
    $('#passwordSesion').val('')
    $('#modalSesion').modal('open')
  })

  $('#avatar').click(() => {
    firebase.auth().signOut()
    .then(() => {
      $('#avatar').attr('src', 'imagenes/usuario.png')
      Materialize.toast(`Haz salido de tu cuenta`, 4000)
    })
    .catch(error => {
      Materialize.toast(`Error al salir de la cuenta ${error}`, 4000)
    })
  })

  $('#btnTodoPost').click(() => {
    $('#tituloPost').text('Posts de la Comunidad')
    const post = new Post()
    post.consultarTodosPost()
  })

  $('#btnMisPost').click(() => {
    const user = firebase.auth().currentUser
    if (user) {
      const post = new Post()
      post.consultarPostxUsuario(user.email)
      $('#tituloPost').text('Mis Posts')
    } else {
      Materialize.toast(`Debes estar autenticado para ver tus posts`, 4000)
    }
  })
})

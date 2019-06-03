importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/5.5.8/firebase-messaging.js')

// Init Firebase nuevamente
firebase.initializeApp({
  projectId: "bloggeek-jp",
  messagingSenderId: "763688958038"
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(payload => {
  const tituloNotificacion = 'Ya tenemos un nuevo post'
  const opcionesNotificacion = {
    body: payload.data.titulo,
    icon: 'icons/icon_new_post.png',
    click_action: "https://bloggeek-jp.web.app"
  }

  return self.registration.showNotificacion(
    tituloNotificacion,
    opcionesNotificacion
  )
})
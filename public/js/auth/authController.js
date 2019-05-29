$(() => {    

  const objAuth = new Autenticacion()

  $("#btnRegistroEmail").click(() => {
    const nombres = $('#nombreContactoReg').val();
    const email = $('#emailContactoReg').val();
    const password = $('#passwordReg').val();
    const auth = new Autenticacion()
    auth.crearCuentaEmailPass(email, password, nombres)
  });

  $("#btnInicioEmail").click(() => {
    const email = $('#emailSesion').val();
    const password = $('#passwordSesion').val();
    const auth = new Autenticacion()
    auth.autEmailPass(email, password)
  });

  $("#btnRestablecer").click(() => {
    const email = $('#emailRestablecer').val();
    const auth = new Autenticacion()
    auth.resetPasswordByEmail(email)
  });

  $('#btnresetEmail').click(() => {
    $('#modalSesion').modal('close');
    $('#modalrestablecer').modal('open');
  });
  
  $('#btnRegresar').click(() => {
    $('#modalrestablecer').modal('close');
    $('#modalSesion').modal('open');
  });

  $('#btnRegistrarse').click(() => {
    $('#modalSesion').modal('close');
    $('#modalRegistro').modal('open');
  });
  
  $('#btnIniciarSesion').click(() => {
    $('#modalRegistro').modal('close');
    $('#modalSesion').modal('open');
  });
  
  $("#authGoogle").click(() => objAuth.authCuentaGoogle());
  $("#authFB").click(() =>objAuth.authCuentaFacebook());
  $("#authTwitter").click(() =>objAuth.authCuentaTwitter());
});
class Comentarios {
  constructor() {
    this.db = firebase.firestore()
    const settings = { timestampsInSnapshots: true }
    this.db.settings(settings)
  }

  crearComentario(autor, descripcion, otroTipo) {
    return this.db.collection('comentarios').add({
      autor: autor,
      descripcion: descripcion,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(refDoc => {
        console.log(`Id del comentario => ${refDoc.id}`)
      })
      .catch(error => {
        console.log(`error creando el comentario => ${error}`)
      })
  }
}

// function checked(cha) {
//   if (document.getElementById(cha).checked) {
//     alert(cha)
//     alert(document.getElementById(cha).checked)

//   } else {
//     alert(cha)
//     alert(document.getElementById(cha).checked)
//   }
// }

// $(document).ready(function () {
//   $('input[type="checkbox"]').click(function () {
//     if ($(this).prop("checked") == true) {
//       alert("Checkbox is checked.");
//     }
//     else if ($(this).prop("checked") == false) {
//       alert("Checkbox is unchecked.");
//     }
//   })
// })

$('#btncontactForm').click(() => {
  const comentarios = new Comentarios()

  const titulo = $('#nombreContacto').val()
  const descripcion = $('#comentariosContacto').val()


  comentarios
    .crearComentario(
      titulo,
      descripcion,
    )
    .then(resp => {
      Materialize.toast(`comentario creado correctamente`, 4000)
    })
    .catch(error => {
      Materialize.toast(`Error => ${error}`, 4000)
    })
})

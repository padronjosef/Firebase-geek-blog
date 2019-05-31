class Comentarios {
  constructor () {
    this.db = firebase.firestore()
    const settings = { timestampsInSnapshots : true }
    this.db.settings(settings)
  }

  crearComentario (autor, descripcion) {
    return this.db.collection('comentarios').add({
      autor : autor,
      descripcion : descripcion,
    })
    .then(refDoc => {
      console.log(`Id del comentario => ${refDoc.id}`)
    })
    .catch(error => {
      console.log(`error creando el comentario => ${error}`)
    })
  }
}

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
    .catch(err => {
      Materialize.toast(`Error => ${err}`, 4000)
    })
})
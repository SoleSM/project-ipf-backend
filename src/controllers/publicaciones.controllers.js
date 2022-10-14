const ctrlPublicaciones = {};
const Publicaciones = require('../models/publicaciones.models');

ctrlPublicaciones.getPublicaciones = async (req, res) => {
    const publicacion = await Publicaciones.find();
    res.json(publicacion);
}

ctrlPublicaciones.getPublicacionesMateria = async (req, res) => {
    const { idMateria } = req.params;

    try {
       const PublisEncontradas = await Publicaciones.find({ materia: idMateria })
        res.json({
            "Publicaciones de la materia:" : PublisEncontradas})
    } catch (error) {
        res.json(error)
        console.log(error)
    }
}


ctrlPublicaciones.postPublicaciones = async (req, res) => {
    const { usuario, texto, date, archivos, comments, tipo, materia } = req.body;

    try {
        const publicacionAdded = new Publicaciones({
            usuario, texto, date, archivos, comments, tipo, materia
        });
        await publicacionAdded.save();
        res.json({
            msg: "Publicación realizada exitosamente",
            publicacionAdded
        });
    } catch (error) {
        res.json({
            msg: "Error al agregar una publicación", error
        });
    }

}

ctrlPublicaciones.putPublicaciones = async (req, res) => {
    const { id } = req.params;
    const { ...resto } = req.body;

    try {
        const publicacionUpdated = await Publicaciones.findByIdAndUpdate(id, resto, {new:true});
        res.json({
            msg: "Publicación editada con éxito",
            publicacionUpdated
        })
    } catch (error) {
        res.json({
            msg:"Error al editar la publicación", error,
        })
    }
}

ctrlPublicaciones.deletePublicaciones = async (req, res) => {
    const { id } = req.params;

    try {
        const publicacionDeleted = await Publicaciones.findByIdAndDelete(id)
        res.json({
            msg: "Publicación eliminada", 
            publicacionDeleted
        })
    } catch (error) {
        res.json({
            msg:"Error al eliminar la publicación", error
        })
    }
}



module.exports = ctrlPublicaciones;
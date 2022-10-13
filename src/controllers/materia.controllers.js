const ctrlMateria = {};
const Materia = require('../models/materias.models');


//Mostrar todas las materias
ctrlMateria.getMateria = async (req, res) => {

    const materia = await Materia.find();
    res.json(materia)
};


ctrlMateria.getNotaAlumno = async (req, res) => {

    const { id } = req.params.id;
    const { idAlumno } = req.body;

    try {
        const MateriaEncontrada = await Materia.findOne({ id, notas: { $elemMatch: { alumno: idAlumno } } })

        const { notas } = MateriaEncontrada

        const Notas = notas.filter(Element => Element.alumno == idAlumno)

        //    const NotaFinal  =  Nota.filter((data, key) => {
        //         const { alumno } = data
        //         if(alumno == idAlumno) {
        //             return Nota[key].calificacion;
        //         }
        //     })

        console.log(Notas)
        res.json({
            msg: "Materia encontrada",
            Notas

        })

    } catch (error) {
        res.json({
            msg: "Error Alumno NO encontrado",
            error
        })
    }

};


ctrlMateria.putNotaDeAlumno = async (req, res)=> {

    const { id } = req.params.id;
    

    try {
        

    } catch (error) {
        
    }

}

ctrlMateria.postMateria = async (req, res) => {

    const { nombreMateria, profesores, alumnos, inasistencias, notas } = req.body;

    try {
        const materiaAdded = new Materia({ nombreMateria, profesores, alumnos, inasistencias, notas })
        await materiaAdded.save();

        res.json({
            msg: "Materia agregada",
            materiaAdded
        })

    } catch (error) {
        res.json({
            msg: "Error al agregar una materia", error
        })
        console.log("Error al agregar una materia", error)
    }


}

ctrlMateria.putMateria = async (req, res) => {

    const { id } = req.params;
    const { ...resto } = req.body;

    try {
        const materiaUpdated = await Materia.findByIdAndUpdate(id, resto, { new: true })
        res.json({
            msg: "Datos de la materia actualizados correctamente",
            materiaUpdated
        })

    } catch (error) {
        res.json({
            msg: "Error al actualizar la materia", error
        })

    }

}

module.exports = ctrlMateria;
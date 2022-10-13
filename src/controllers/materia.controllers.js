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

        const Notas = notas.filter(element => element.alumno == idAlumno)

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

 
    
    try {
    
        
        const { periodo, tipo, calificacion } = req.body;
        const { idMateria, idNota } = req.params;
    
        const MateriaEncontrada = await Materia.findOne({idMateria})
        const { notas } = MateriaEncontrada;
        
        const objetoNota = notas.findIndex((obj => obj._id == idNota));
      
        console.log(notas[objetoNota]._id)

        if( idNota == notas[objetoNota]._id){

            const NotaActualizada = MateriaEncontrada.findByIdAndUpdate(notas[objetoNota]._id, {periodo, tipo, calificacion})

            console.log(NotaActualizada)
         
            res.json(NotaActualizada)
            
        }
        
        
       
        


    } catch (error) {
        res.json({
            "error": error
        })


        console.log(error)
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
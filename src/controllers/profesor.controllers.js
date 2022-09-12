const ctrlProfesor = {};
const Profesor = require('../models/profesor.models');
const User = require('../models/user.models');


//ruta GET profesores
ctrlProfesor.rutaGetProfesores = async (req,res)=>{

        const profesor = await Profesor.find().populate('user','nombre', 'apellido');
        res.json(profesor);
        
}


//ruta agregar profesores
ctrlProfesor.rutaPost = async (req,res)=>{
        const body = req.body;
        body.user = req.usuario._id
        const profesor = new Profesor(body)

        await profesor.save();
        res.json({msg: 'profesor agregado'})
};

//ruta eliminar users
ctrlProfesor.rutaDelete = async (req,res)=>{
    
        try{
            await Profesor.findByIdAndDelete(req.params.id);

            return res.json({msg: 'user removed'})
        } catch(error){
            console.log('error al eliminar user ',error)
        }
}



//ruta editar users
ctrlProfesor.rutaPut = async (req , res)=>{
        const body = req.body;
        body.user = req.usuario._id
        const { id } = req.params;
        
        try {
            const profesor = await Profesor.findByIdAndUpdate(id, body);
            return res.json(profesor)
        } catch (error) {
            console.log(`error al actulizar usuario: ${error}`)
        }

};


//eliminar profesor logicamente

ctrlProfesor.rutaLogicalDelete= async (req, res)=>{

        const { id } = req.params;
        try {
            //Verifico que el usuario este activo
            const inactivo = await User.findById(id);

            /* console.log(inactivo) */
            if (!inactivo.profesor) {
                return res.json({
                    msg: `El usuario ${id} no existe`
                });
            };

            const usuario = await User.findByIdAndUpdate(id, { profesor: false });

            res.json({
                msg: 'Usuario borrado de la base de datos exitosamente',
                usuario
            });
        } catch (error) {
            console.log('Error al borrar los datos del usuario: ', error);
        };
}



module.exports = ctrlProfesor;
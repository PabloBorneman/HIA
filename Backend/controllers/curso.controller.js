const Curso = require('./../models/curso');
const Usuario = require('./../models/usuario');
const Perfil = require('./../models/perfil');
const cursoCtrl = {};

// Crear curso
cursoCtrl.crearCurso = async (req, res) => {
    const curso = new Curso(req.body);
    try {
        await curso.save();

        const instructor = await Usuario.findById(req.body.instructor).populate('perfil');
        console.log('Instructor encontrado:', instructor);  // Añadir depuración
        console.log('Perfil del instructor:', instructor ? instructor.perfil : 'Instructor no encontrado');  // Añadir depuración

        if (instructor && instructor.perfil && instructor.perfil.nombre === 'profesional') {
            console.log('Instructor tiene el perfil de profecional');
            instructor.cursosImpartidos.push(curso._id);
            await instructor.save();
            res.status(200).json({
                'status': '1',
                'msg': 'Curso guardado y asignado al instructor.'
            });
        } else {
            console.log('Instructor no tiene el perfil de profecional o no se encontró el perfil');
            await Curso.findByIdAndDelete(curso._id); // Elimina el curso si el instructor no es profesional
            res.status(400).json({
                'status': '0',
                'msg': 'El instructor no tiene el perfil de Profesional.'
            });
        }
    } catch (error) {
        console.error('Error durante la creación del curso:', error);  // Añadir depuración
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        });
    }
};

// Modificar curso
cursoCtrl.modificarCurso = async (req, res) => {
    try {
        const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({
            status: '1',
            msg: 'Curso actualizado',
            curso
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion - Actualizar Curso'
        });
    }
};

// Eliminar curso
cursoCtrl.eliminarCurso = async (req, res) => {
    try {
        await Curso.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Curso eliminado'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion - Eliminar Curso'
        });
    }
};

// Obtener un curso
cursoCtrl.obtenerUnCurso = async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id).populate('instructor').populate('miembros');
        res.json(curso);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion - Obtener Curso'
        });
    }
};

// Obtener todos los cursos
cursoCtrl.obtenerCursos = async (req, res) => {
    try {
        const cursos = await Curso.find().populate('instructor').populate('miembros');
        res.json(cursos);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operacion - Obtener Cursos'
        });
    }
};

// Inscribir usuario en curso
cursoCtrl.inscribirUsuario = async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.id);
        if (!curso) {
            return res.status(404).json({
                status: '0',
                msg: 'Curso no encontrado'
            });
        }
        
        const usuarioId = req.body.usuarioId;
        if (!curso.miembros.includes(usuarioId)) {
            curso.miembros.push(usuarioId);
            await curso.save();

            const usuario = await Usuario.findById(usuarioId);
            if (!usuario.cursos.includes(req.params.id)) {
                usuario.cursos.push(req.params.id);
                await usuario.save();
            }

            res.status(200).json({
                status: '1',
                msg: 'Usuario inscrito en el curso'
            });
        } else {
            res.status(400).json({
                status: '0',
                msg: 'Usuario ya inscrito en el curso'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación'
        });
    }
};

module.exports = cursoCtrl;

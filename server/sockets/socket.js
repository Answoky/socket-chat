const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('./../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado');
    
    client.on('entrarChat', (usuario, callback) => {
        console.log(usuario);

        if ( !usuario.nombre && !usuario.sala ) {
            return callback({
                error: true,
                mensaje: 'El nombre y sala es necesario'
            });
        } else {

            client.join(usuario.sala);

            usuarios.agregarPersona(client.id, usuario.nombre, usuario.sala);
            client.broadcast.to(usuario.sala).emit('listaPersona', usuarios.getPersonasPorSala(usuario.sala));
            client.broadcast.to(usuario.sala).emit('crearMensaje', crearMensaje('Administrador',`${usuario.nombre} entró al chat`));
            callback(usuarios.getPersonasPorSala(usuario.sala));
        }
        
    });

    client.on('crearMensaje', (data, callback) => {

        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje( persona.nombre, data.mensaje );
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);

    });

    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersonas(client.id);
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador',`${personaBorrada.nombre} abandono el chat`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    client.on('mensajePrivado', (data) => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

});
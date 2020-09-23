

class Usuarios {

    constructor() {
        this.personas = [];
    }

    agregarPersona(id, nombre, sala){

        let persona = {
            id,
            nombre,
            sala
        }

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id){
        let persona = this.personas.find((persona) => persona.id === id);
        return persona;
    }

    getPersonas(){
        return this.personas;
    }

    getPersonasPorSala(sala){
        let personaEnSala = this.personas.filter( persona => persona.sala === sala);
        return personaEnSala;
    }

    borrarPersonas(id){
        let personaDelete = this.getPersona(id);
        this.personas = this.personas.filter((persona) => persona.id !== id);
        return personaDelete;
    }

}


module.exports = {
    Usuarios
}
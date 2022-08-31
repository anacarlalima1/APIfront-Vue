import { http } from './config'

export default {
    
    listar:() => {
        return http.get('usuario/listarTodos')
    },

    salvar:(usuario) => {
        return http.post('usuario/cadastrar', usuario)
    },

    atualizar:(usuario) => {
        return http.put('usuario/alterar', usuario)
    },

    remover:(usuario) => {
        return http.delete("usuario/deletar/"+ usuario.codigo , usuario);
    },
}
import api from '@/lib/axios'

export default {
    obtenerClientes() {
        return api.get('/clientes')
    },
    obtenerCliente(id) {
        return api.get('/clientes/' + id)
    },
    agregarCliente(data) {
        return api.post('/clientes', data)
    },
    actualizarCliente(id, data) {
        return api.patch('/clientes/' + id, data)
    },
    cambiarEstado(id, data){
        return api.patch('/clientes/' + id, data)
    },
    eliinarCliente(id) {
        return api.delete('/clientes/' + id)
    }
}
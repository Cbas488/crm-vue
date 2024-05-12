<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { FormKit } from '@formkit/vue'
import ClienteService from '@/services/ClienteService'
import Heading from '@/components/UI/Heading.vue'
import RouterLink from '../components/UI/RouterLink.vue'

const router = useRouter()
const route = useRoute()
const { id } = route.params
const formData = reactive({
	nombre: '',
	apellido: '',
	email: '',
	telefono: '',
	empresa: '',
	puesto: '',
})

onMounted(() => {
	ClienteService.obtenerCliente(id)
		.then(({ data }) => {
			Object.assign(formData, data)
		})
		.catch((error) => {
			console.log(error)
		})
})

defineProps({
	titulo: {
		type: String,
	},
})

const handleSubmit = (data) => {
	ClienteService.actualizarCliente(id, data)
		.then(() => {
			router.push({
				name: 'listado-clientes',
			})
		})
		.catch((error) => {
			console.log(error)
		})
}
</script>

<template>
	<div>
		<div class="flex justify-end">
			<RouterLink to="listado-clientes">Volver</RouterLink>
		</div>
		<Heading>{{ titulo }}</Heading>
		<div class="mx-auto mt-10 bg-white shadow-sm">
			<div class="mx-auto md:w-2/3 py-20 px-6">
				<FormKit
					type="form"
					submit-label="Guardar"
					incomplete-message="No se pudo enviar, revise los mensajes"
					@submit="handleSubmit"
				>
					<FormKit
						name="nombre"
						type="text"
						label="Nombre"
						placeholder="Nombre del cliente"
						validation="required"
						:validation-messages="{
							required: 'El nombre del cliente es obligatorio',
						}"
						v-model="formData.nombre"
					/>
					<FormKit
						name="apellido"
						type="text"
						label="Apellido"
						placeholder="Apellido del cliente"
						validation="required"
						:validation-messages="{
							required: 'El apellido del cliente es obligatorio',
						}"
						v-model="formData.apellido"
					/>
					<FormKit
						name="email"
						type="email"
						label="Email"
						placeholder="Email del cliente"
						validation="required|email"
						:validation-messages="{
							required: 'El email del cliente es obligatorio',
							email: 'Coloca un email valido',
						}"
						v-model="formData.email"
					/>
					<FormKit
						name="telefono"
						type="text"
						label="Telefono"
						placeholder="Telefono XXX-XXX-XXXX"
						validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
						:validation-messages="{
							matches: 'El formato no es valido',
						}"
						v-model="formData.telefono"
					/>
					<FormKit
						name="empresa"
						type="text"
						label="Empresa"
						placeholder="Empresa del cliente"
						v-model="formData.empresa"
					/>
					<FormKit
						name="puesto"
						type="text"
						label="Puesto"
						placeholder="Puesto del cliente"
						v-model="formData.puesto"
					/>
				</FormKit>
			</div>
		</div>
	</div>
</template>

<style>
.formkit-wrapper {
	max-width: 100% !important;
}
</style>

const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductoSchema = new Schema({
	nombre: { type: String, required: true },
	descripcion: { type: String, required: true },
	modelo: { type: String, required: true },
	precio: { type: Number, required: true },
	cantidad: { type: Number, required: true },
	imagen: { type: String },
	proveedor: {
		nombre: { type: String, required: true },
		direccion: { type: String, required: true },
		email: { type: String, required: true },
		telefono: { type: Number, required: true },
	},
	categoria: {
		nombre: { type: String, required: true },
		descripcion: { type: String, required: true },
	},
});

module.exports = mongoose.model("Producto", ProductoSchema);


// Importa la colección que maneja las filas del Excel
import { rowsCollection } from "./rowsCollection.js";

// Clase que representa un Excel cargado en memoria
export class excel {

	// info contiene todo el contenido del Excel:
	// [0] = encabezado
	// [n] = filas de datos
	constructor(info){
		this.info = info;
	}

	// Retorna la fila de encabezados
	header(){
		return this.info[0];
	}

	// Retorna las filas sin el encabezado
	// envueltas en rowsCollection para su manejo
	rows(){
		return new rowsCollection(this.info.slice(1, this.info.length));
	}
}


import { row } from "./row.js";

// Colección que encapsula el manejo de múltiples filas del Excel
export class rowsCollection {

	// rows es un array de filas sin el header
	constructor(rows){
		this.rows = rows;
	}

	// Retorna la primera fila como instancia de row
	// Útil para accesos rápidos o validaciones iniciales
	first(){
		return new row(this.rows[1]);
	}

	// Retorna una fila específica según su índice
	get(ind){
		return new row(this.rows[ind]);
	}

	// Cantidad total de filas disponibles
	count(){
		return this.rows.length;
	}
}

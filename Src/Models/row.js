
// Clase que representa una fila individual del Excel
export class row {

	// row es un array con los valores de una fila
	constructor(row){
		this.row = row;
	}

	// Códigos del producto
	codigo1(){ return this.row[0] || ""; }
	codigo2(){ return this.row[1]; }

	// Información descriptiva
	descripcion(){ return this.row[2]; }
	unidad(){ return this.row[3]; }

	// Saldo registrado
	saldo(){ return this.row[4]; }

	// Cantidad en inventario
	// Se convierte a entero para evitar valores inválidos
	inventario(){
		return parseInt(this.row[5]) || 0;
	}

	// Diferencia calculada
	// Se convierte a decimal por posibles valores fraccionados
	diferencia(){
		return parseFloat(this.row[6]) || 0;
	}
}

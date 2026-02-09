
// Exporta la información visible de la tabla a un archivo Excel
export function exportarExcel(informacion) {

	// Seguridad: no ejecutar si no existe información cargada
	if (!informacion) return;

	// Selecciona solo las filas visibles (excluye las filtradas con .remove)
	const filas = document.querySelectorAll("tbody tr:not(.remove)");

	// Estructura final que se enviará a Excel
	const datos = [];

	// Construcción del header del Excel
	// Se reutilizan los encabezados originales y se agregan columnas calculadas
	datos.push([
		informacion.header()[0],
		informacion.header()[1],
		informacion.header()[2],
		informacion.header()[3],
		"SALDO MAESTRA",
		"CONTEO",
		"DIFERENCIAS"
	]);

	// Recorre cada fila visible de la tabla
	filas.forEach(fila => {

		// Obtiene todas las celdas de la fila
		const celdas = fila.querySelectorAll("th");

		// Extrae el contenido en el orden esperado para el Excel
		datos.push([
			celdas[1].textContent,
			celdas[2].textContent,
			celdas[3].textContent,
			celdas[4].textContent,
			celdas[5].textContent,
			celdas[6].textContent,
			celdas[7].textContent
		]);
	});

	// Convierte el arreglo de datos en una hoja de Excel
	const hoja = XLSX.utils.aoa_to_sheet(datos);

	// Crea un nuevo libro de Excel
	const libro = XLSX.utils.book_new();

	// Agrega la hoja al libro con un nombre descriptivo
	XLSX.utils.book_append_sheet(libro, hoja, "Inventario");

	// Descarga el archivo final
	XLSX.writeFile(libro, "Maestra_Exportada.xlsx");
}

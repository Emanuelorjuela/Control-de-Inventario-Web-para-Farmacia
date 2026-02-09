
// Se ejecuta una vez que el Excel fue cargado y procesado correctamente
// Su función es habilitar los controles del sistema que dependen de los datos
export function onExcelLoaded(dom) {

	// Oculta el input de carga de archivo para evitar recargas accidentales
	dom.input.classList.add("remove");

	// Muestra el input para escaneo de códigos de barras
	dom.input2.classList.remove("remove");

	// Habilita el botón para filtrar productos con diferencia cero
	dom.ceros.classList.remove("remove");

	// Habilita el botón para remover productos repetidos
	dom.remover.classList.remove("remove");

	// Habilita el botón para limpiar filtros aplicados
	dom.quitar.classList.remove("remove");

	// Habilita el botón de exportación a Excel
	dom.exportar.classList.remove("remove");

	// Muestra el selector de filtrado por letra/descripción
	dom.select.classList.remove("remove");
}

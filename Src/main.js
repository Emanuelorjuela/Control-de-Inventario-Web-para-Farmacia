
import { bootstrap } from "./Services/Bootstrap.js";

/*
 Referencias centralizadas al DOM.
 Se agrupan aquí para evitar múltiples querySelector dispersos
 y facilitar el paso de dependencias entre módulos.
*/
export const dom = {
	input: document.querySelector(".input"),        // Input de carga manual de Excel
	input2: document.querySelector(".input2"),      // Input para escaneo de códigos de barra

	thead: document.querySelector(".thead"),        // Cabecera de la tabla
	tbody: document.querySelector(".tbody"),        // Cuerpo de la tabla

	ceros: document.querySelector(".ceros"),        // Filtro de diferencias en cero
	remover: document.querySelector(".remover"),    // Eliminación de registros repetidos
	quitar: document.querySelector(".quitar"),      // Limpieza de filtros
	exportar: document.querySelector(".exportar"),  // Exportación a Excel
	select: document.querySelector(".select")       // Filtro alfabético
};

/*
 Flujo especial para entorno de demostración / deploy.
 
 En producción (tienda):
 - El usuario carga manualmente el Excel generado por VOPOS
   o descargado recientemente desde el sistema.

 En este proyecto visible para reclutadores:
 - Se carga automáticamente un archivo Excel incluido en el repositorio
   para evitar descargas manuales y permitir ver el sistema funcionando
   apenas se abre la aplicación.
*/
window.addEventListener("DOMContentLoaded", async () => {
	// Carga del archivo Excel incluido en el proyecto
	const response = await fetch("./maestra.xlsx");
	const blob = await response.blob();

	// Parseo del Excel a estructura manipulable por la aplicación
	const contenido = await readXlsxFile(blob);

	// Inicialización del sistema completo
	bootstrap(contenido, dom);
});

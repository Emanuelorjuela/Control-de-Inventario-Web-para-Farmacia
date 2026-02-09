import { excel } from "../Models/excel.js";
import { renderTable } from "../UI/table.js";
import { initFilters } from "../UI/filters.js";
import { initScanner } from "../UI/scanner.js";
import { onExcelLoaded } from "../UI/state.js";
import { exportarExcel } from "./exportExcel.js";

// Evita que el bootstrap se ejecute más de una vez
let inicializado = false;

// Función principal de inicialización del sistema
// Se ejecuta una vez cuando el Excel ya fue cargado y parseado
export async function bootstrap(content, dom) {

	// Previene doble inicialización
	if (inicializado) return;
	inicializado = true;

	// Instancia del modelo Excel con la información cruda
	const informacion = new excel(content);

	// Separa el header del resto de filas
	const header = informacion.info[0];

	// Ordena las filas por la columna descripción (índice 2)
	const rowsOrdenadas = informacion.info
		.slice(1)
		.sort((a, b) =>
			(a[2] || "").localeCompare(b[2] || "", "es", { sensitivity: "base" })
		);

	// Reconstruye la información manteniendo el header
	informacion.info = [header, ...rowsOrdenadas];

	// Renderiza la tabla en el DOM
	renderTable(informacion, dom.thead, dom.tbody);

	// Inicializa los filtros con acceso al DOM y a la información
	initFilters({ ...dom, informacion });

	// Inicializa el escáner de código de barras
	initScanner(dom.input2);

	// Actualiza el estado visual de la interfaz
	onExcelLoaded(dom);

	// Evento para exportar el Excel procesado
	dom.exportar.addEventListener("click", () => {
		exportarExcel(informacion);
	});

	// Retorna la instancia para posibles usos externos
	return informacion;
}

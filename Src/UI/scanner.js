
import { pintarDiferencia } from "./table.js";

// Inicializa el escáner de códigos de barras usando un input numérico
export function initScanner(input2) {

	// Timeout para detectar fin de escaneo (evita procesar carácter por carácter)
	let scanTimeout;

	input2.addEventListener("input", () => {
		clearTimeout(scanTimeout);

		// Se espera un pequeño delay para asumir que el escaneo terminó
		scanTimeout = setTimeout(() => {
			const cod = input2.value.trim();
			if (!cod) return;

			// Busca la fila asociada al código escaneado
			const trbody = document.querySelector(`tr[data-codigo="${cod}"]`);
			if (!trbody) {
				// Si no existe el código, limpia el input y termina
				input2.value = "";
				return;
			}

			// Referencias a celdas clave
			const inventario = trbody.querySelector(".inv");
			const diferencia = trbody.querySelector(".dif");

			let valueinv = parseInt(inventario.textContent);
			const saldo = parseFloat(trbody.children[5].textContent);

			// Datos descriptivos del producto
			const descripcion = trbody.children[3].textContent.toUpperCase();
			const unidad = trbody.children[4].textContent.toUpperCase();

			// Separa la descripción para analizar patrones de empaque
			const array = descripcion.split(" ");

			// Cantidad por defecto por escaneo
			let cantidad = 1;

		
			// DETECCIÓN DE MULTIPLICADORES

			for (let i = 0; i < array.length - 2; i++) {

				// Unidades que siempre cuentan como 1
				if (
					unidad === "CAJA" ||
					unidad === "FRASCO" ||
					unidad === "BOLSA" ||
					unidad === "CAJA_INDIVIDUAL" ||
					unidad === "BOLSA_INDIVIDUAL" ||
					unidad === "PAQUETE"
				) {
					cantidad = 1;
					break;
				}

				// Detecta formatos tipo "CAJA X 10", "BOL X 20", etc.
				if (
					(
						array[i].includes("CAJ") ||
						array[i].includes("CAJA") ||
						array[i].includes("FCO") ||
						array[i].includes("BOL") ||
						array[i].includes("PAQ") ||
						array[i].includes("BLI") ||
						array[i].includes("SOB")
					) &&
					array[i + 1].includes("X")
				) {
					const n = Number(array[i + 2]);

					// Usa el número solo si es válido
					if (!isNaN(n)) {
						cantidad = n;
						break;
					}
				}
			}


			// ACTUALIZACIÓN DE INVENTARIO

			valueinv += cantidad;
			inventario.textContent = valueinv;

			// Recalcula la diferencia contra saldo maestro
			const nuevaDif = valueinv - saldo;
			diferencia.textContent = nuevaDif;

			// Aplica estilos visuales según el valor de la diferencia
			pintarDiferencia(diferencia, nuevaDif);

			// Limpia el input para el siguiente escaneo
			input2.value = "";

		}, 200);
	});
}

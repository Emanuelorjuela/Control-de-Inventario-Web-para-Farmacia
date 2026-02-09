
// Inicializa todos los filtros de la tabla
export function initFilters({ ceros, quitar, select, informacion, remover }) {

	// Referencia inicial a filas visibles
	const trclass = document.querySelectorAll(".trclass");


	// FILTRO: OCULTAR DIFERENCIAS EN CERO

	ceros.addEventListener("click", () => {
		const difs = document.querySelectorAll(".dif");

		// Oculta el selector mientras el filtro está activo
		select.classList.add("remove");

		for (let i = 0; i < difs.length; i++) {
			// Si la diferencia es 0, se oculta la fila
			if (parseInt(difs[i].innerHTML) === 0) {
				trclass[i].classList.add("remove");
				trclass[i].classList.remove("trclass");
			}
		}
	});


	// QUITAR TODOS LOS FILTROS

	quitar.addEventListener("click", () => {
		const difs = document.querySelectorAll(".dif");

		// Restaura visibilidad del selector
		select.classList.remove("remove");

		for (let i = 0; i < difs.length; i++) {
			// Vuelve a mostrar todas las filas
			trclass[i].classList.add("trclass");
			trclass[i].classList.remove("remove");
		}

		// Resetea el selector
		select.selectedIndex = 0;
	});


	// FILTRO POR LETRA (DESCRIPCIÓN)

	select.addEventListener("change", () => {

		// Oculta el select una vez aplicado el filtro
		select.classList.add("remove");
		select.classList.remove("select");

		const trclass = document.querySelectorAll(".trclass");

		for (let i = 0; i < informacion.rows().count(); i++) {
			// Obtiene la primera letra de la descripción
			const desc = informacion.rows().get(i).descripcion();
			const letter = desc[0];

			// Oculta filas que no coinciden con la letra seleccionada
			if (letter !== select.value) {
				trclass[i].classList.add("remove");
				trclass[i].classList.remove("trclass");
			}
		}
	});


	// REMOVER REGISTROS REPETIDOS

	remover.addEventListener("click", () => {

		// Filas identificadas por código
		const filas = document.querySelectorAll("tr[data-codigo]");

		// Agrupa filas por código principal
		const grupos = new Map();

		filas.forEach(tr => {
			const codigo1 = tr.children[1].textContent.trim();
			const saldo = parseFloat(tr.children[5].textContent) || 0;
			const diferencia = parseFloat(tr.querySelector(".dif").textContent) || 0;

			if (!grupos.has(codigo1)) {
				grupos.set(codigo1, []);
			}

			grupos.get(codigo1).push({ tr, saldo, diferencia });
		});

		// Analiza cada grupo de códigos repetidos
		grupos.forEach(grupo => {
			if (grupo.length < 2) return;

			// Verifica si al menos uno fue escaneado
			const hayEscaneado = grupo.some(
				item => item.diferencia !== -item.saldo
			);

			// Oculta duplicados no escaneados
			if (hayEscaneado) {
				grupo.forEach(item => {
					if (item.diferencia === -item.saldo) {
						item.tr.classList.add("remove");
						item.tr.classList.add("repetido");
					}
				});
			}
		});
	});
}

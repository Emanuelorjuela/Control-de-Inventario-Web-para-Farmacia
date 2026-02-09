
// Aplica un color visual a la celda de diferencia según su valor
// Negativo: rojo, Positivo: verde, Cero: negro
export function pintarDiferencia(el, valor) {
	if (valor < 0) el.style.color = "red";
	else if (valor > 0) el.style.color = "green";
	else el.style.color = "black";
}

// Renderiza completamente la tabla a partir de la información del Excel
// Construye el header y todas las filas del cuerpo
export function renderTable(informacion, thead, tbody) {

	// Header fijo de la tabla usando los encabezados del Excel
	const trhead = `
	<tr>
		<th class="head">NUMERO</th>
		<th class="head">${informacion.header()[0]}</th>
		<th class="head">${informacion.header()[1]}</th>
		<th class="head">${informacion.header()[2]}</th>
		<th class="head">${informacion.header()[3]}</th>
		<th class="head">SALDO MAESTRA</th>
		<th class="head">CONTEO</th>
		<th class="head">DIFERENCIAS</th>
	</tr>`;

	thead.innerHTML = trhead;

	// Almacena unidades únicas (actualmente solo para control interno)
	const arrayy = [];

	// Itera sobre todas las filas de datos
	for (let i = 0; i < informacion.rows().count(); i++) {
		const fila = informacion.rows().get(i);
		const codigo = fila.codigo2();

		// Guarda la unidad si aún no ha sido registrada
		if (!arrayy.includes(fila.unidad())) {
			arrayy.push(fila.unidad());
		}

		// Crea la fila de la tabla
		const trbody = document.createElement("TR");
		trbody.classList.add("trclass");

		// Se usa data-codigo para localizar filas al escanear códigos de barra
		trbody.setAttribute("data-codigo", codigo);

		// Calcula la diferencia inicial entre inventario y saldo
		const operacion = parseInt(fila.inventario()) - parseInt(fila.saldo());

		// Inserta las celdas con la información correspondiente
		trbody.innerHTML = `
			<th class="th">${i+1}</th>
			<th class="th">${fila.codigo1()}</th>
			<th class="th">${fila.codigo2()}</th>
			<th class="th">${fila.descripcion()}</th>
			<th class="th">${fila.unidad()}</th>
			<th class="th">${fila.saldo()}</th>
			<th class="inv th">${fila.inventario()}</th>
			<th class="dif th">${operacion}</th>
		`;

		// Agrega la fila al cuerpo de la tabla
		tbody.appendChild(trbody);

		// Aplica el color visual inicial a la diferencia
		pintarDiferencia(trbody.querySelector(".dif"), operacion);
	}
}


// SELECT DE FILTRADO POR LETRA


// Referencia al select de filtrado
const select = document.querySelector(".select");

// Opciones disponibles para el filtrado por letra inicial
const options = [
	"FILTRAR","A","B","C","D","E","F","H","I","J","K","L","M","N","Ñ",
	"O","P","Q","R","S","T","U","V","W","X","Y","Z"
];

// Construcción dinámica de las opciones del select
for (let i of options) {
	const opcion = document.createElement("OPTION");

	// Opción inicial deshabilitada
	if (i === "FILTRAR") {
		opcion.textContent = i;
		opcion.disabled = true;
		opcion.selected = true;
	} else {
		opcion.textContent = i;
		opcion.value = i;
	}

	select.appendChild(opcion);
}

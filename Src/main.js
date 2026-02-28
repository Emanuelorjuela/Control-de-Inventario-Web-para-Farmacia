import { bootstrap } from "./Services/Bootstrap.js";

export const dom = {
	input: document.querySelector(".input"),
	input2: document.querySelector(".input2"),
	thead: document.querySelector(".thead"),
	tbody: document.querySelector(".tbody"),
	ceros: document.querySelector(".ceros"),
	remover: document.querySelector(".remover"),
	quitar: document.querySelector(".quitar"),
	exportar: document.querySelector(".exportar"),
	select: document.querySelector(".select")
};

// CARGA MANUAL (uso real en tienda)
dom.input.addEventListener("change", async (e) => {
	const file = e.target.files[0];
	if (!file) return;

	const contenido = await readXlsxFile(file);
	bootstrap(contenido, dom);
});

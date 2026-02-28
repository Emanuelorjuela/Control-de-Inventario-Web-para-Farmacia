// Importa la función principal que inicializa la aplicación con los datos
import { bootstrap } from "./Services/Bootstrap.js";

// Selección de elementos del DOM que se usarán en la interfaz
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

// CARGA MANUAL (uso real en tienda):
// Cuando el usuario selecciona un archivo Excel desde el input, se lee y se inicializa la app.
dom.input.addEventListener("change", async (e) => {
    const file = e.target.files[0];   // Obtiene el archivo seleccionado
    if (!file) return;                // Si no se selecciona nada, termina

    // Lee el contenido del archivo Excel usando la librería 'read-excel-file'
    const contenido = await readXlsxFile(file);

    // Inicializa la aplicación con los datos leídos y los elementos del DOM
    bootstrap(contenido, dom);
});

// Nota sobre la versión interactiva:
// En la versión interactiva para usuarios, no es necesario que el usuario cargue un Excel.
// En ese caso, se carga un archivo Excel por defecto incluido en el repositorio y la tabla se renderiza automáticamente.


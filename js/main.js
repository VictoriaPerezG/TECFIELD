import { obraManager } from "./obraManager.js";
import { obraUi } from "./obraUi.js";

//INICIO APLICACION

const manejador = new obraManager();
const ui = new obraUi(manejador);

ui.render();
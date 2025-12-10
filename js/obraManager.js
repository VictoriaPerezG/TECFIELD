import { Obra } from "./obra.js";

export class obraManager {
  constructor() {
    this.obras = [];
    this.NextId = 1;
  }

  agregar(numero, contratista, desarrollo) {
    const obra = new Obra(this.NextId++, numero, contratista, desarrollo, fechaInicio);
    this.obras.push(obra);
  }

  editar(id, numero, contratista, desarrollo, fechaInicio) {
    const obra = this.obras.find((t) => t.id === id);
    if (obra) {
      obra.numero = numero;
      obra.contratista = contratista;
      obra.desarrollo = desarrollo;
      obra.fechaInicio = fechaInicio;
    }
  }

  eliminar(id) {
    this.obras = this.obras.filter((t) => t.id !== id);
  }

}
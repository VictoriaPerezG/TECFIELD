export class obraUi {
  constructor(manager) {
    this.manager = manager;
    this.obraEditando = null;

    this.numero = document.getElementById("numObra");
    this.contratista = document.getElementById("contratista");
    this.desarrollo = document.getElementById("desarrollo");
    this.desarrollo = document.getElementById("desarrollo");
    this.fechaInicio = document.getElementById("fechaInicio");
    this.btnAgregar = document.getElementById("agregarObra");
    this.listado = document.getElementById("listadoObras");
    this.btnAgregar.addEventListener("click", () => this.handleAgregar());
   
  }

  handleAgregar() {
    const numero = this.numero.value;
    const contratista = this.contratista.value;
    const desarrollo = this.desarrollo.value;
    const fechaInicio = this.fechaInicio.value;

    if (!numero || !contratista || !desarrollo || !fechaInicio) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (this.obraEditando) {
      this.manager.editar(
        this.obraEditando.id,
        numero,
        contratista,
        desarrollo,
        fechaInicio
      );
      this.btnAgregar.textContent = "Agregar";
      this.obraEditando = null;
    } else {
      this.manager.agregar(numero, contratista, desarrollo, fechaInicio);
    }
    this.limpiarFormulario();
    this.render();
  }

  cargarParaEdicion(obra) {
    
    this.numero.value = obra.numero;
    this.contratista.value = obra.contratista;
    this.desarrollo.value = obra.desarrollo;
    this.fechaInicio.value = obra.fechaInicio;

    this.obraEditando = obra;
    this.btnAgregar.textContent = "Guardar Cambios";
    document.getElementById("exampleModalToggleLabel").textContent = "Editar Obra";
  }

  render() {
    const tbody = document.querySelector("#listadoObras tbody");
    tbody.innerHTML = ""; 

    this.manager.obras.forEach((obra) => {
        const fila = document.createElement("tr");

        // numero de obra
        const colNumero = document.createElement("td");
        colNumero.textContent = obra.numero;
        console.log(colNumero);
        
        // Contratista
        const colContratista = document.createElement("td");
        colContratista.textContent = obra.contratista;

        // Desarrollo
        const colDesarrollo = document.createElement("td");
        colDesarrollo.textContent = obra.desarrollo;

         // Fecha de inicio
        const colFecha = document.createElement("td");
        colFecha.textContent = obra.fechaInicio;
        console.log(obra.fechaInicio);
        

        // Botones de acciones
        const colAcciones = document.createElement("td");

        //boton editar
        const btnEditar = this.crearBoton("Editar", "btn btn-success btn-sm");
        btnEditar.setAttribute("data-bs-toggle", "modal");
        btnEditar.setAttribute("data-bs-target", "#exampleModalToggle");
        btnEditar.addEventListener("click", () => this.cargarParaEdicion(obra));        
        console.log(this.crearBoton);

        const btnEliminar = this.crearBoton("Eliminar", "btn btn-danger btn-sm");
        btnEliminar.addEventListener("click", () => {
            this.manager.eliminar(obra.id);
            this.render();
        });

        colAcciones.append(btnEditar, " ", btnEliminar);

        // Armando la fila
        fila.append( colNumero, colContratista, colDesarrollo, colFecha, colAcciones);
        tbody.appendChild(fila);
    });
}


  crearBoton(texto, clases) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = clases;
    return btn;
  }

  // limpieza formulario 
  limpiarFormulario() {
    this.numero.value = "";
    this.contratista.value = "";
    this.desarrollo.value = "Automatizacion";
    this.fechaInicio.value = "";

  }
}
let cancelar = document.getElementById("cancelar");
cancelar.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = "../Main/main.html";
});

$("#myModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

let link = document.getElementById("txtLink");
link.addEventListener("dblclick", (e) => {
  e.preventDefault();
  var valor = document.getElementById("txtLink").value;

  if (valor === "") {
    return false;
  }

  //   window.location = valor;
  window.open(valor, "_blank");
});

let pdf = document.getElementById("txtPdf");
pdf.addEventListener("dblclick", (e) => {
  e.preventDefault();
  var valor = document.getElementById("txtPdf").value;

  if (valor === "") {
    return false;
  }

  //   window.location = valor;
  window.open(valor, "_blank");
});

var mail = localStorage.getItem("email");
if (mail == "null" || mail === undefined) {
  Swal.fire({
    icon: "error",
    title: "Ingrese al sistema primero",
    timer: 1500,
  });
  setTimeout(() => {
    window.location = "/index.html";
  }, 3000);
} else {
  fetch("https://proyecto-fundacion.herokuapp.com/api/Areas", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      cargarCombo(data);
    });

  fetch("https://proyecto-fundacion.herokuapp.com/api/Personal", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cargarComboPersonal(data);
    });

  function cargarCombo(datos) {
    var html = "";
    $("#txtAreas").append(html);
    select = document.getElementById("txtAreas");
    for (let i = 0; i < datos.length; i++) {
      var option = document.createElement("option");
      option.value = datos[i].id;
      option.text = datos[i].area1;
      select.add(option);
      //console.log(datos[i].area1);
    }
  }

  //<option value=''>Seleccione</option>

  function cargarComboPersonal(datos) {
    var html = "";
    $("#txtPersonal").append(html);
    select = document.getElementById("txtPersonal");
    for (let i = 0; i < datos.length; i++) {
      var option = document.createElement("option");
      option.value = datos[i].id;
      option.text = datos[i].nombre;
      select.add(option);
      //console.log(datos[i].area1);
    }
  }
}

let areas = [];
var objAreas = [];
var selectAreas;
function imprimirValorAreas() {
  selectAreas = document.getElementById("txtAreas");
  var options = document.getElementById("idOpcionArea");
  console.log(selectAreas.value);

  if (selectAreas.value == "") {
    return false;
  } else {
    areas.push(selectAreas.value);
    objAreas.push({ id: selectAreas.value });
    console.log(objAreas);
  }
}

$(document).on("click", "#txtCordinador", function () {
  // e.preventDefault();
  id = $(this).parent().parent().children().first().text();
  console.log(id);

  if ($(this).is(":checked")) {
    for (const obj of objPersonal) {
      if (obj.id == id) {
        obj.coordinador = true;
        break;
      }
      //coordinadorOpcion = false;
    }
  } else {
    for (const obj of objPersonal) {
      if (obj.id == id) {
        obj.coordinador = false;
        break;
      }
      //coordinadorOpcion = false;
    }
  }
});

let personal = [];
var objPersonal = [];
var select;
function imprimirValorPersonal() {
  var coordinadorOpcion = false;
  select = document.getElementById("txtPersonal");
  var options = document.getElementById("idOpcionPersonal");

  if (select.value == "") {
    return false;
  } else {
    personal.push(select.value);
    objPersonal.push({
      id: select.value,
      coordinador: coordinadorOpcion,
    });
    console.log(objPersonal);
  }

  console.log(select.value);
}

var i = 0;
function removerPersonal(index) {
  $("#row" + index)
    .closest("tr")
    .remove();
}

$(document).on("click", "#btnEliminarPersonal", function (e) {
  e.preventDefault();

  id = $(this).parent().parent().children().first().text();

  const eliminado = objPersonal.findIndex((object) => {
    return object.id === id;
  });

  console.log(eliminado);
  let a = objPersonal.splice(eliminado, 1);
  console.log(a);
  console.log(objPersonal);
});

let btnAgregarPersonal = document.getElementById("btnAgregarPersonal");

btnAgregarPersonal.addEventListener("click", cargarTabla);
btnAgregarPersonal.addEventListener("click", mostrarDatos);
btnAgregarPersonal.addEventListener("click", mostrarDatos2);

function cargarTabla() {
  var personal = document.getElementById("txtPersonal").value;
  var combo = document.getElementById("txtPersonal");
  console.log(combo);
  var nombre = combo.options[combo.selectedIndex].text;

  if (personal == "null") {
    Swal.fire({
      icon: "error",
      title: "Seleccione un Personal",
    });
    return false;
  }

  var fila =
    '<tr id="row' +
    i +
    '"><td>' +
    personal +
    "</td><td>" +
    nombre +
    '</td><td><input type=checkbox id="txtCordinador"/></td><td><button class="btn btn-danger" id="btnEliminarPersonal" onclick="removerPersonal(' +
    i +
    ')" type=button><box-icon name="trash"></box-icon></button></td></tr>';

  i++;

  $("#mytable tr:first").after(fila);
}

function mostrarDatos() {
  for (let row of mytable.rows) {
    for (let cell of row.cells) {
      console.log(cell);
      console.log(cell.textContent);
      console.log(cell.firstChild);
    }
  }
}

function mostrarDatos2() {
  $("#mytable tr").each(function () {
    $(this)
      .find("td")
      .each(function () {
        console.log($(this));
      });
  });
}

//cargar tabla areas y remover

let btnAgregarArea = document.getElementById("btnAgregarArea");

btnAgregarArea.addEventListener("click", cargarTablaArea);
btnAgregarArea.addEventListener("click", mostrarDatosArea);
btnAgregarArea.addEventListener("click", mostrarDatos2Area);

var indexArea = 0;
function removerArea(areaIndex) {
  $("#rowArea" + areaIndex)
    .closest("tr")
    .remove();
}

$(document).on("click", "#btnEliminarArea", function (e) {
  e.preventDefault();

  id = $(this).parent().parent().children().first().text();

  const eliminadoArea = objAreas.findIndex((object) => {
    return object.id === id;
  });

  console.log(eliminadoArea);
  let area = objAreas.splice(eliminadoArea, 1);
  console.log(area);
  console.log(objAreas);
});

function cargarTablaArea() {
  var area = document.getElementById("txtAreas").value;
  var combo = document.getElementById("txtAreas");
  var nombre = combo.options[combo.selectedIndex].text;

  if (area == "null") {
    Swal.fire({
      icon: "error",
      title: "Seleccione un Area",
    });
    return false;
  }

  var fila =
    '<tr id="rowArea' +
    indexArea +
    '"><td>' +
    area +
    "</td><td>" +
    nombre +
    '</td><td><button class="btn btn-danger" onclick="removerArea(' +
    indexArea +
    ')" id="btnEliminarArea" type=button><box-icon name="trash"></box-icon></button></td></tr>';

  indexArea++;

  $("#mytableArea tr:first").after(fila);
}

function mostrarDatosArea() {
  for (let row of mytableArea.rows) {
    for (let cell of row.cells) {
      console.log(cell);
      console.log(cell.textContent);
      console.log(cell.firstChild);
    }
  }
}

function mostrarDatos2Area() {
  $("#mytableArea tr").each(function () {
    $(this)
      .find("td")
      .each(function () {
        console.log($(this));
      });
  });
}

//Publicaciones
var indexPublicacion = 0;
let publicacionBtn = document.getElementById("btnPublicacion");

let publicacion = [];
var objPublicacion = [];
// var select;
var iPubli = 0;
function imprimirValorPublicacion() {
  var txtPubli = document.getElementById("txtPublicacion").value;
  var anio = document.getElementById("txtAnioPubli").value;
  var codigoBcs = document.getElementById("txtCodigoBcs").value;
  //publicacion.push(select.value);
  objPublicacion.push({
    idPublicacion: iPubli,
    año: anio,
    publicacion: txtPubli,
    codigobcs: codigoBcs,
  });
  console.log(objPublicacion);
  iPubli++;
}

publicacionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cargarTablaPublicacion();
  imprimirValorPublicacion();
  document.getElementById("formPublicacion").reset();
});
publicacionBtn.addEventListener("click", mostrarDatosPublicacion());
publicacionBtn.addEventListener("click", mostrarDatos2Publicacion());

// function removerPublicacion(pubicacionIdex) {
//     $('#rowPubli' + pubicacionIdex).closest('tr').remove();
// }

var removido = 0;
const removerPublicacion = (pubicacionIdex) => {
  $("#rowPubli" + pubicacionIdex)
    .closest("tr")
    .remove();
  removido = pubicacionIdex;
};

var masInfo = 0;
const funcionMasInfo = (j) => {
  console.log(j);
  masInfo = j;
};

function cargarTablaPublicacion() {
  var txtPubli = document.getElementById("txtPublicacion").value;
  var anio = document.getElementById("txtAnioPubli").value;
  var codigoBcs = document.getElementById("txtCodigoBcs").value;
  //var fila = '<tr id="rowArea' + indexArea + '"><td>' + area + '</td><td>' + nombre + '</td><td><button id="btnEliminarArea" onclick="removerArea(' + indexArea + ')" type=button><box-icon name="trash"></box-icon></button></td></tr>';
  var fila =
    '<tr id="rowPubli' +
    indexPublicacion +
    '"><td>' +
    indexPublicacion +
    "</td><td>" +
    anio +
    "</td><td>" +
    codigoBcs +
    '</td><td><button class="btn btn-danger" id="btnEliminarPublicacion" onclick="removerPublicacion(' +
    indexPublicacion +
    ')" type=button><box-icon name="trash"></box-icon></button>' +
    '<button data-toggle="modal" data-target="#exampleModal" id="btnMasInfo" onclick="funcionMasInfo( ' +
    indexPublicacion +
    ')" class="btn btn-secondary" type="button"><box-icon name="info-circle"></box-icon></button></td></tr>';

  indexPublicacion++;

  $("#mytablePublicacion tr:first").after(fila);
}

function mostrarDatosPublicacion() {
  for (let row of mytablePublicacion.rows) {
    for (let cell of row.cells) {
      console.log(cell);
      console.log(cell.textContent);
      console.log(cell.firstChild);
    }
  }
}

function mostrarDatos2Publicacion() {
  $("#mytablePublicacion tr").each(function () {
    $(this)
      .find("td")
      .each(function () {
        console.log($(this));
      });
  });
}

//var codigoBcs;
$(document).on("click", "#btnEliminarPublicacion", function (e) {
  e.preventDefault();
  console.log(removido);
  console.log(indexPublicacion);

  //idPubli = $(this).parent().parent().children().first().text();
  //codigoBcs = document.getElementById("txtCodigoBcs").value;

  const eliminadoPublicacion = objPublicacion.findIndex((object) => {
    return object.idPublicacion == removido;
  });

  console.log(eliminadoPublicacion);
  let p = objPublicacion.splice(eliminadoPublicacion, 1);
  console.log(p);
  console.log(objPublicacion);
  codigoBcs = 0;
});

$(document).on("click", "#btnMasInfo", function (e) {
  e.preventDefault();
  console.log(masInfo);

  objPublicacion.forEach((element) => {
    if (element.idPublicacion == masInfo) {
      document.getElementById("txtPublicacion").disabled = true;
      document.getElementById("txtAnioPubli").disabled = true;
      document.getElementById("txtCodigoBcs").disabled = true;
      document.getElementById("txtPublicacion").value = element.publicacion;
      document.getElementById("txtAnioPubli").value = element.año;
      document.getElementById("txtCodigoBcs").value = element.codigobcs;
    }
  });
});

$(document).ready(function () {
  fichaSeleccionada();
});

var comboFicha;
var comboFichaSeleccionada;

function fichaSeleccionada() {
  var fichaLista = document.getElementById("idFichaLista").checked;

  if (fichaLista) {
    document.getElementById("comboFicha").disabled = !fichaLista;
    comboFicha = document.getElementById("comboFicha").value;
    comboFicha2 = document.getElementById("comboFicha");

    comboFichaSeleccionada =
      comboFicha2.options[comboFicha2.selectedIndex].text;
    console.log(comboFichaSeleccionada);
  } else {
    document.getElementById("comboFicha").disabled = !fichaLista;
    comboFicha2 = document.getElementById("comboFicha");
    comboFichaSeleccionada =
      comboFicha2.options[comboFicha2.selectedIndex].text;
    comboFichaSeleccionada = "";
    comboFicha = -1;
  }
}

function cambiarValor() {
  comboFicha = document.getElementById("comboFicha").value;
  comboFicha2 = document.getElementById("comboFicha");

  comboFichaSeleccionada = comboFicha2.options[comboFicha2.selectedIndex].text;
  console.log(comboFichaSeleccionada);
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", (e) => {
  e.preventDefault();

  var moneda = document.getElementById("txtMoneda");
  var monedaSeleccionada = moneda.options[moneda.selectedIndex].text;
  console.log(moneda);

  var tit = document.getElementById("txtTitulo").value;

  var depto = document.getElementById("txtDepartamento");
  var deptoSeleccionado = depto.options[depto.selectedIndex].text;

  var url = "https://proyecto-fundacion.herokuapp.com/api/Proyecto";
  //var url = "https://localhost:44313/api/Proyecto";
  var data = {
    titulo: document.getElementById("txtTitulo").value,
    paisRegion: document.getElementById("txtPais").value,
    contratante: document.getElementById("txtContratante").value,
    dirección: document.getElementById("txtDireccion").value,
    montoContrato: document.getElementById("txtMonto").value,
    nroContrato: document.getElementById("txtNumero").value,
    mesInicio: parseInt(document.getElementById("mesDesde").value),
    anioInicio: parseInt(document.getElementById("txtAnioInicio").value),
    mesFinalizacion: parseInt(document.getElementById("mesHasta").value),
    anioFinalizacion: parseInt(document.getElementById("txtAnioFin").value),
    consultoresAsoc: document.getElementById("txtConsultores").value,
    descripcion: document.getElementById("txtDescProyexto").value,
    resultados: null,
    fichaLista: document.getElementById("idFichaLista").checked,
    enCurso: document.getElementById("txtEjecucion").checked,
    departamento: deptoSeleccionado,
    moneda: monedaSeleccionada,
    certconformidad: document.getElementById("certConformidad").checked,
    certificadopor: comboFicha,
    activo: true,
    areas: objAreas,
    personal: objPersonal,
    link: document.getElementById("txtLink").value,
    publicaciones: objPublicacion,
    convenio: document.getElementById("txtConvenio").checked,
    pdf: document.getElementById("txtPdf").value,
    isbn: document.getElementById("txtIsbn").value,
    issn: document.getElementById("txtIssn").value,
    cita: document.getElementById("txtCita").value,
  };

  console.log(data);

  if (tit === "") {
    Swal.fire({
      icon: "error",
      title: "Ingrese un Titulo",
    });
    return false;
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Insercion Exitosa",
      showConfirmButton: false,
      timer: 1500,
    });

    fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .catch((error) => console.error("Error:", error))
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == 400) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "No se pudo insertar",
            text: "Resvise todos los campos cargados",
            showConfirmButton: false,
            timer: 2000,
          });
          return false;
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Inserción exitosa",
            showConfirmButton: false,
            timer: 1500,
          });
          document.getElementById("formulario").reset();
          setInterval(() => {
            location.reload();
          }, 2000);
        }
      });
    document.getElementById("formulario").reset();
    setInterval(() => {
      location.reload();
    }, 2000);
  }
});

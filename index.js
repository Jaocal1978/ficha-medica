let registros = [];

const guardar = () =>
{

    let Rut = rut.value;
    let existe = registros.find(r => r.rut === Rut);

    if(Rut == '' || nombres.value == '' || apellidos.value == '' || telefono.value == '' || email.value == '' || direccion.value == '' || ciudad.value == '' || fechaNacimiento.value == '' || estadoCivil.value == '' || comentarios.value == '')
    {
        Swal.fire(
        {
            icon: 'error',
            title: 'Campos obligatorios',
            text: 'Debes completar RUT, Nombres, Apellidos, Email, Telefono, Fecha nacimiento, Estado Civil, Comentarios, Dirección y Ciudad.'
        });

        return;
    }

    if(comentarios.value.length > 200) 
    {
        Swal.fire(
        {
            icon: 'error',
            title: 'Comentarios demasiado largos',
            text: 'El campo comentarios no puede superar los 200 caracteres.'
        });
        return;
    }

    //Validar el formato de email
    if(!validarEmail(email.value)) 
    {
        Swal.fire(
        {
            icon: 'error',
            title: 'Email inválido',
            text: 'Por favor ingresa un correo electrónico válido (ejemplo: usuario@dominio.com).'
        });

        return;
    }
   

    if(existe)
    {
        Swal.fire({
            icon: 'warning',
            title: 'Registro existente',
            text: '¿Desea sobrescribir el registro?',
            showCancelButton: true,
            confirmButtonText: 'Sí, sobrescribir',
            cancelButtonText: 'No'
        }).then((result) => 
        {
            if (result.isConfirmed) 
            {
                registros = registros.filter(r => r.rut !== Rut);
                agregarRegistro(Rut);
            }
        });
    } 
    else 
    {
        agregarRegistro(Rut);
    }
}

const agregarRegistro = (Rut) =>
{
    let nuevo = {
        rut: Rut,
        nombres: document.getElementById("nombres").value,
        apellidos: document.getElementById("apellidos").value,
        direccion: document.getElementById("direccion").value,
        ciudad: document.getElementById("ciudad").value,
        telefono: document.getElementById("telefono").value,
        email: document.getElementById("email").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        estadoCivil: document.getElementById("estadoCivil").value,
        comentarios: document.getElementById("comentarios").value
    };

    registros.push(nuevo);
    actualizarTabla();

    Swal.fire(
    {
        icon: 'success',
        title: 'Registro guardado',
        text: 'El registro se ha almacenado correctamente.'
    });
}

const actualizarTabla = () =>
{
    let tbody = document.querySelector("#tablaRegistros tbody");
    tbody.innerHTML = "";
    registros.forEach(r => {
        let fila = `<tr>
                        <td>${r.rut}</td>
                        <td>${r.nombres}</td>
                        <td>${r.apellidos}</td>
                        <td>${r.email}</td>
                        <td>${r.telefono}</td>
                        <td>${r.ciudad}</td>
                        <td>${r.estadoCivil}</td>
                    </tr>`;
        tbody.innerHTML += fila;
    });
}

const buscarPorApellido = () =>
{
    let apellido = document.getElementById("buscarApellido").value;
    let resultados = registros.filter(r => r.apellidos.toLowerCase().includes(apellido.toLowerCase()));

    if(resultados.length > 0) 
    {
        actualizarTablaBusqueda(resultados);
    } 
    else 
    {
        Swal.fire(
        {
            icon: 'error',
            title: 'Sin resultados',
            text: 'No se encontraron registros con ese apellido.'
        });
    }
}

const actualizarTablaBusqueda = (lista) =>
{
    let tbody = document.querySelector("#tablaRegistros tbody");
    tbody.innerHTML = "";

    lista.forEach(r => {
        let fila = `<tr>
                        <td>${r.rut}</td>
                        <td>${r.nombres}</td>
                        <td>${r.apellidos}</td>
                        <td>${r.email}</td>
                        <td>${r.telefono}</td>
                        <td>${r.ciudad}</td>
                        <td>${r.estadoCivil}</td>
                </tr>`;
        tbody.innerHTML += fila;
    });
}

const limpiarFormulario = () => 
{
    Swal.fire(
    {
        icon: 'warning',
        title: '¿Deseas limpiar el formulario?',
        text: 'Se borrarán todos los campos ingresados.',
        showCancelButton: true,
        confirmButtonText: 'Sí, limpiar',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) 
        {
            document.getElementById("fichaMedica").reset();

            Swal.fire(
            {
                icon: 'success',
                title: 'Formulario limpio',
                text: 'Todos los campos han sido borrados.'
            });
        }
    });
}

const limpiaFormulario = () =>
{
    document.getElementById("fichaMedica").reset();
}

const cerrar = () =>
{
    //Limpia Formulario
    limpiaFormulario();

    // Ocultar el formulario
    document.getElementById("formularioCard").style.display = "none";

    // Mostrar el botón de nuevo registro
    document.getElementById("nuevoRegistroDiv").style.display = "block";

    Swal.fire(
    {
        icon: 'info',
        title: 'Formulario cerrado',
        text: 'Haz clic en "Nuevo registro" para volver a abrirlo.'
    });
}

const abrirFormulario = () => 
{
    // Mostrar el formulario
    document.getElementById("formularioCard").style.display = "block";

    // Ocultar el botón de nuevo registro
    document.getElementById("nuevoRegistroDiv").style.display = "none";
}

const validarEmail = (email) => 
{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
};
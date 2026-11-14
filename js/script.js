/* Antes de la IA

// El botón
const btn = document.getElementById('boton');
let activar = false;

// Todos los input
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const pass1 = document.getElementById("pass1");
const pass2 = document.getElementById("pass2");

// Todos los errores
var error_nombre = document.getElementById("error_nombre");
var error_apellido = document.getElementById("error_apellido");
var error_edad = document.getElementById("error_edad");
var error_telefono = document.getElementById("error_telefono");
var error_email = document.getElementById("error_email");
var error_pass1 = document.getElementById("error_pass1");

// Validadores
// const regex = /[a-zA-Z]/g;

const RE = {
  // Letras (con tildes, ñ, ü) y espacios entre palabras
  nombre:   /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/,
  apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/,

  // Edad: 1 a 120 sin ceros a la izquierda
  edad:     /^(?:[1-9]|[1-9]\d|1[01]\d|120)$/,

  // Teléfono: exactamente 8 dígitos
  telefono: /^\d{8}$/,

  // E-mail: algo@algo.dominio (validación básica)
  email:    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Contraseña: mínimo 8 caracteres, al menos una letra minúscula, al menos una letra 
  // mayúscula al menos un número y a menos un símbolo
  pass1: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
  pass2: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
};


nombre.addEventListener("input", (e) => {
    validarTexto(e.data, error_nombre)
});

apellido.addEventListener("input", (e) => {
    validarTexto(e.data, error_apellido)
});


function validarTexto(text, error) {
    console.log(`Validando el texto: ${text}`)

    if (text.match(regex)) {
        error.classList.remove("invisible");
        error.innerHTML = 'Solo se aceptan caracteres.'
    } else if (text.match(tilde)) {
        error.classList.remove("invisible");
        error.innerHTML = 'Solo se aceptan caracteres.'
    } else {
        error.classList.add("invisible");
        error.innerHTML = ''
    }
    
}

btn.addEventListener("click", (event) => {
    event.preventDefault();
    
    console.log("tocaste el botón")
});

function esValido(campo) {
    const input = campo.input;
    const id    = input.id;

    // Caso especial: las contraseñas deben coincidir
    if (id === 'pass2') {
        return input.value !== '' && input.value === pass1.value;
    }

    // Si tenemos regex para ese id, la usamos
    const regex = RE[id];
    if (regex) return regex.test(input.value);

    // Fallback a la validación nativa de HTML5
    return input.checkValidity();
}

*/


document.addEventListener('DOMContentLoaded', () => {
    // Capturar todo el formulario y el botón
    const form  = document.querySelector('form');
    const boton = document.getElementById('boton');
    const pass1 = document.getElementById('pass1');
    const pass2 = document.getElementById('pass2');

    // Relación input  ->  span de error
    const campos = [
        { input: document.getElementById('nombre'),   error: document.getElementById('error_nombre')   },
        { input: document.getElementById('apellido'), error: document.getElementById('error_apellido') },
        { input: document.getElementById('edad'),     error: document.getElementById('error_edad')     },
        { input: document.getElementById('telefono'), error: document.getElementById('error_telefono') },
        { input: document.getElementById('email'),    error: document.getElementById('error_email')    },
        { input: pass1,                               error: document.getElementById('error_pass')     }, 
        { input: pass2,                               error: document.getElementById('error_pass')     }
    ];

    // Las expresiones regulares
    const RE = {
        // Letras (con tildes, ñ, ü) y espacios entre palabras
        nombre:   /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/,
        apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/,

        // Edad: 1 a 120 sin ceros a la izquierda
        edad:     /^(?:[1-9]|[1-9]\d|1[01]\d|120)$/,

        // Teléfono: exactamente 8 dígitos
        telefono: /^\d{8}$/,

        // E-mail: algo@algo.dominio (validación básica)
        email:    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

        // Contraseña: 
        //   mínimo 8 caracteres,
        //   al menos una letra minúscula,
        //   al menos una letra mayúscula,
        //   al menos un número y,
        //   al menos un símbolo
        pass1: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        pass2: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
    };

    // ¿El campo cumple TODAS las reglas?
    function esValido(campo) {
        const input = campo.input;
        const id    = input.id;

        // Caso especial: las contraseñas deben coincidir
        if (id === 'pass2') {
            if (input.value !== '' && input.value != pass1.value) {
                mensajesError(pass2, 'no_coinciden')
            }
            return input.value !== '' && input.value === pass1.value;
        }

        // Si tenemos regex para ese id, la usamos
        const regex = RE[id];
        if (regex) return regex.test(input.value);

        // Fallback a la validación nativa de HTML5
        return input.checkValidity();
    }

    // Pinta o limpia el span de error de un campo
    // mostrar = false -> no lo mostramos todavía (el usuario no ha tocado el campo)
    function pintar(campo, mostrar) {
        const ok    = esValido(campo);
        const span  = campo.error;
        const input = campo.input;

        if (span) {
            if (!ok && mostrar) {
                // console.log(`El error de: ${span}, id del input: ${input.id}`)
                span.textContent = mensajesError(input.id, input.value) || 'Error contraseñas no coinciden';
                span.classList.remove('invisible');
                input.classList.add('is-invalid');
                input.classList.remove('is-valid')
            } else {
                span.textContent = '';
                span.classList.add('invisible');
                input.classList.add('is-valid'),
                input.classList.remove('is-invalid')
            }
        }
        return ok;
    }

    // Habilita el botón solo si TODOS los campos son válidos
    function actualizarBoton() {
        boton.disabled = !campos.every(c => esValido(c));
    }

    // Personalizer los mensajes de error:
    function mensajesError(id, valor) {

        const regex = RE[id];
        
        if (id == 'nombre' || id == 'apellido') {
            if (!regex.test(valor)) {
                return 'Solo se aceptan letras y espacios'
            }
        }
        if (id == 'edad') {
            if (!regex.test(valor)) {
                return 'Solo se números menor que 120'
            }
        }
        if (id == 'telefono') {
            if (!regex.test(valor)) {
                return 'Solo se aceptan números de 8 dígitos'
            }
        }
        if (id == 'email') {
            if (!regex.test(valor)) {
                return 'Solo se aceptan correos válidos'
            }
        }
        if (id == 'pass1' || id == 'pass2') {
            if (!regex.test(valor)) {
                if (valor.length < 8)             return 'Mínimo 8 caracteres';
                if (!/[a-z]/.test(valor))         return 'Falta una minúscula';
                if (!/[A-Z]/.test(valor))         return 'Falta una mayúscula';
                if (!/\d/.test(valor))            return 'Falta un número';
                if (!/[^A-Za-z0-9]/.test(valor))  return 'Falta un símbolo';
            }
            if (valor == 'no_coinciden') return 'Las contraseñas no coinciden.';
        }
        return '';
    }

    // Validación "en vivo" de cada campo
    campos.forEach(campo => {
        const validar = () => {
            pintar(campo, true);

            // Si cambia pass1 hay que revisar también pass2
            if (campo.input === pass1 && pass2.value !== '') {
                const campoPass2 = campos.find(c => c.input === pass2);
                pintar(campoPass2, true);
            }

            actualizarBoton();
        };

        campo.input.addEventListener('input', validar);
        campo.input.addEventListener('blur',  validar);
    });

    // Validación final al enviar
    form.addEventListener('submit', e => {
        e.preventDefault(); // quítalo si realmente vas a enviar al servidor

        campos.forEach(c => pintar(c, true));
        actualizarBoton();

        if (campos.every(c => esValido(c))) {
            // Aquí harías el envío real:
            // form.submit();  o  fetch(...)  o  console.log(...)
            console.log('Formulario válido ✅');
        }
    });

    actualizarBoton(); // estado inicial (botón deshabilitado)
});
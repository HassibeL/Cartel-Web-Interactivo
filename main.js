console.log('Hass');

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//////// Inversión de colores //////////
let coloresInvertidos = false;
///////// Variables para la posición del mouse ///////////
let mouseX = 0;
let mouseY = 0;

function obtenerColor(original, invertido) {
    return coloresInvertidos ? invertido : original;
}

//////// colores originales e invertidos del texto //////////
const coloresTexto = {
    original: "#55828b",
    invertido: "#c08070" // Un color invertido de ejemplo
};

// Función para dibujar la primera composición (rectángulos y círculos)
function dibujarComp(ctx, offsetX, offsetY) {
    ////// Dibuja un rectángulo //////////
    ctx.beginPath();
    ctx.fillStyle = obtenerColor("rgb(202, 210, 202)", "rgb(50, 45, 50)");
    ctx.rect(offsetX, offsetY, 100, 100);
    ctx.fill();

    ///////////  Círculos  ///////////
    for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.fillStyle = obtenerColor("rgba(25, 50, 57, 0.25)", "rgba(200, 150, 140, 0.5)");

        /////// Desplazamiento de los círculos basado en la posición del mouse //////////
        let dx = (mouseX - offsetX - 50) * 0.03 * i;
        let dy = (mouseY - offsetY - 50) * 0.03 * i;

        ////// Limite dentro del rectángulo //////////
        let newX = Math.max(5, Math.min(95, 50 + i * 5 + dx));
        let newY = Math.max(5, Math.min(95, 50 + i * 5 + dy));

        // Dibuja la elipse
        ctx.ellipse(offsetX + newX, offsetY + newY, 50 - i * 5, 50 - i * 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Función para dibujar la segunda composición (rectángulos y círculos)
function dibujarComp1(ctx, offsetX, offsetY) {
    // Dibuja un rectángulo
    ctx.beginPath();
    ctx.fillStyle = obtenerColor("rgb(202, 210, 202)", "rgb(50, 45, 50)");
    ctx.rect(offsetX, offsetY + 570, 100, 100);
    ctx.fill();

    //  círculos 
    for (let i = 0; i < 7; i++) {
        ctx.beginPath();
        ctx.fillStyle = obtenerColor("rgba(25, 50, 57, 0.25)", "rgba(200, 150, 140, 0.5)");

        //desplazamiento de los círculos basado en la posición del mouse  //////// codigo de ayuda: https://codepen.io/nfamula/pen/GZyWZd /////////
        let dx = (mouseX - offsetX - 50) * 0.03 * i;
        let dy = (mouseY - (offsetY + 570) - 50) * 0.03 * i;

        // Limite dentro del rectángulo /////////////
        let newX = Math.max(5, Math.min(95, 50 + i * 5 + dx));
        let newY = Math.max(5, Math.min(95, 50 + i * 5 + dy));

        ctx.ellipse(offsetX + newX, offsetY + 570 + newY, 50 - i * 5, 50 - i * 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }
}

///////// Lineassssss /////////////
function dibujarLineas() {
    const cantidad = 11; // Número de líneas
    const espaciado = 29; // Espaciado entre líneas

    for (let i = 0; i < cantidad; i++) {
        let offsetY = i * espaciado;
        let color = obtenerColor("rgba(82, 113, 122, .20)", "rgba(180, 90, 80, .50)");
        let grosor = 14;

        // Cambia el color de las líneas
        if (mouseX < canvas.width / 2) {
            color = obtenerColor("rgba(82, 113, 122, .10)", "rgba(180, 90, 80, .25)");
        } else {
            color = obtenerColor("rgba(40, 60, 70, .30)", "rgba(220, 120, 100, .75)");
        }

        // Cambia el grosor de las líneas
        if (mouseY < canvas.height / 2) {
            grosor = 10;
        } else {
            grosor = 18;
        }

        // Dibuja la línea
        ctx.beginPath();
        ctx.lineWidth = grosor;
        ctx.strokeStyle = color;
        ctx.moveTo(480, 250 + offsetY);
        ctx.lineTo(1500, 250 + offsetY);
        ctx.stroke();

        // Dibuja líneas verticales en cada línea horizontal
        lineasX(250 + offsetY, color, grosor);
    }
}

// Función para dibujar las líneas verticales
function lineasX(y, color, grosor) {
    const cantidad1 = 11; // Número de líneas verticales
    const espaciado1 = 50; // Espaciado entre líneas verticales

    for (let i = 0; i < cantidad1; i++) {
        let offsetX = i * espaciado1;

        // Dibuja la línea vertical
        ctx.beginPath();
        ctx.lineWidth = grosor;
        ctx.strokeStyle = color;
        ctx.moveTo(480 + offsetX, y);
        ctx.lineTo(1500, y);
        ctx.stroke();
    }
}

// Borrador gigante //
function actualizar() {
    // Limpia el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja las composiciones
    for (let i = 0; i < 26; i++) {
        let offsetX = (i % 13) * 120;
        let offsetY = Math.floor(i / 13) * 120;
        dibujarComp(ctx, offsetX, offsetY);
        dibujarComp1(ctx, offsetX, offsetY);
    }

    // Dibuja las líneas
    dibujarLineas();

    // Sigue bucle de animación
    requestAnimationFrame(actualizar);
}

// La posición del mouse
window.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

// Invertir colores al presionar espacio
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        coloresInvertidos = !coloresInvertidos;
        // Invertir colores del texto
        const colorTexto = obtenerColor(coloresTexto.original, coloresTexto.invertido);

        // Actualiza el color del texto en los elementos HTML
        document.getElementById("artista").style.color = colorTexto;
        document.getElementById("fecha").style.color = colorTexto;
        document.getElementById("tour").style.color = colorTexto;
        document.getElementById("lugar").style.color = colorTexto;
    }
});

// Inicia el bucle de animación
actualizar();
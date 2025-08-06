const preguntas = [
  {
    titulo: "Sección 1 - Nicho",
    clave: "nicho",
    items: [
      ["¿Tiene una comunidad con intereses claros?", ["Sí", "No"], [1, 0]],
      ["¿Es un nicho con alta recompra?", ["Alta", "Media", "Baja"], [1, 0.5, 0]],
      ["¿Se encuentra poco saturado en TikTok?", ["Poco saturado", "Saturado", "Muy saturado"], [1, 0.5, 0]],
      ["¿Puedes conectarte emocionalmente con ese nicho?", ["Sí", "No"], [1, 0]]
    ]
  },
  {
    titulo: "Sección 2 - Producto deseable",
    clave: "producto",
    items: [
      ["¿Resuelve un problema específico o urgente?", ["Sí", "No"], [1, 0]],
      ["¿Se puede demostrar fácilmente en video?", ["Muy visual", "Poco visual", "Nada visual"], [1, 0.5, 0]],
      ["¿Tiene un efecto WOW o factor viral?", ["Sí", "No"], [1, 0]],
      ["¿Es de compra impulsiva (menos de $600)?", ["Sí", "No"], [1, 0]],
      ["¿Tiene alta posibilidad de recompra o venta cruzada?", ["Sí", "No"], [1, 0]]
    ]
  },
  {
    titulo: "Sección - Proveedor rentable",
    clave: "proveedor",
    items: [
      ["¿El proveedor acepta pago contra entrega o dropshipping?", ["Sí", "No"], [1, 0]],
      ["¿El costo del producto permite un margen del 40% o más?", ["Sí", "No"], [1, 0]],
      ["¿El proveedor ya tiene logística automatizada?", ["Sí", "No"], [1, 0]],
      ["¿El envío no supera los $100 MXN y es nacional?", ["Sí", "No"], [1, 0]],
      ["¿Tiene buenas reseñas o pruebas de cumplimiento?", ["Sí", "No"], [1, 0]]
    ]
  }
];

const retroalimentacion = {
  "¿Tiene una comunidad con intereses claros?": {
    "Sí": "El producto está asociado a una comunidad bien definida, lo cual facilita la segmentación y el engagement.",
    "No": "Este producto no tiene una comunidad clara, lo que complica su posicionamiento y dificulta la creación de contenido relevante."
  },
  "¿Es un nicho con alta recompra?": {
    "Alta": "El nicho tiene alto potencial de recompra, lo cual maximiza el valor por cliente.",
    "Media": "Aunque hay recompra moderada, podrías complementar con ventas cruzadas para mejorar el rendimiento.",
    "Baja": "Este nicho presenta baja recompra, lo que puede exigir más inversión publicitaria para sostener el crecimiento."
  },
  "¿Se encuentra poco saturado en TikTok?": {
    "Poco saturado": "El nicho tiene baja saturación en TikTok, lo que representa una excelente oportunidad para destacarte.",
    "Saturado": "El nivel de saturación es alto. Necesitarás creatividad y diferenciación para competir.",
    "Muy saturado": "El mercado está altamente saturado en TikTok, lo cual reduce la efectividad del contenido y eleva los costos de adquisición."
  },
  "¿Puedes conectarte emocionalmente con ese nicho?": {
    "Sí": "Existe una conexión personal con el nicho, lo que favorece la creación de contenido auténtico y resonante.",
    "No": "La falta de conexión emocional con el nicho puede dificultar la empatía y la comunicación efectiva del valor del producto."
  },
  "¿Resuelve un problema específico o urgente?": {
    "Sí": "Este producto aborda una necesidad clara, lo que mejora la tasa de conversión y facilita la venta directa.",
    "No": "No hay una urgencia evidente asociada al producto, lo que puede requerir una estrategia de branding o storytelling más elaborada."
  },
  "¿Se puede demostrar fácilmente en video?": {
    "Muy visual": "El producto es altamente visual y demostrativo, perfecto para captar atención en formatos como TikTok.",
    "Poco visual": "El producto tiene poca capacidad de demostración. Tendrás que ser creativo para comunicar su valor visualmente.",
    "Nada visual": "No es un producto demostrativo, lo que dificulta su viralización y reduce su atractivo en contenido visual."
  },
  "¿Tiene un efecto WOW o factor viral?": {
    "Sí": "Tiene un efecto wow o elemento viral que puede impulsar el alcance orgánico y el interés inmediato.",
    "No": "Carece de un factor de impacto inmediato. Será necesario compensarlo con contenido creativo o testimonios potentes."
  },
  "¿Es de compra impulsiva (menos de $600)?": {
    "Sí": "El precio bajo lo convierte en una compra impulsiva ideal para el comportamiento de los usuarios en TikTok.",
    "No": "El precio elevado requiere más validación, pruebas sociales o confianza en la marca para lograr conversión."
  },
  "¿Tiene alta posibilidad de recompra o venta cruzada?": {
    "Sí": "Tiene buen potencial para recompra o venta cruzada, lo que favorece un ciclo de vida rentable por cliente.",
    "No": "La recompra es limitada. Considera ofrecer bundles, accesorios o versiones complementarias."
  },
  "¿El proveedor acepta pago contra entrega o dropshipping?": {
    "Sí": "El proveedor ofrece modelos de bajo riesgo como pago contra entrega o dropshipping. Ideal para escalar sin capital.",
    "No": "Este proveedor requiere inversión inicial o riesgo financiero, lo que puede limitar el volumen de prueba."
  },
  "¿El costo del producto permite un margen del 40% o más?": {
    "Sí": "El margen de ganancia es saludable, lo que permite absorber comisiones y costos publicitarios sin comprometer rentabilidad.",
    "No": "El margen es insuficiente. Necesitas renegociar precios, ajustar el precio de venta o reducir costos para que sea viable."
  },
  "¿El proveedor ya tiene logística automatizada?": {
    "Sí": "La logística automatizada ahorra tiempo y reduce errores operativos, facilitando la escalabilidad.",
    "No": "Al no contar con logística automatizada, tendrás que asumir la carga operativa y eso puede frenar el crecimiento."
  },
  "¿El envío no supera los $100 MXN y es nacional?": {
    "Sí": "El costo de envío es competitivo y mejora la conversión al no ser una barrera de entrada.",
    "No": "El envío nacional es costoso, lo que puede afectar tanto la percepción del producto como tu margen final."
  },
  "¿Tiene buenas reseñas o pruebas de cumplimiento?": {
    "Sí": "El proveedor tiene historial comprobado, lo que genera confianza y disminuye las tasas de devolución.",
    "No": "No hay garantías claras sobre cumplimiento. Esto puede afectar la reputación del producto y aumentar las reclamaciones."
  }
};

let pagina = 0;
let puntajes = { nicho: [], producto: [], proveedor: [] };
let respuestas = [];
let nombreProducto = "";

const contenedor = document.getElementById("scanner");

function cargarPagina() {
  contenedor.innerHTML = "";

  const seccion = preguntas[pagina];
  const form = document.createElement("form");
  form.classList.add("resultado-panel");

  if (pagina === 0) {
    const label = document.createElement("label");
    label.textContent = "Nombre del producto:";
    const input = document.createElement("input");
    input.value = "Audífonos inalámbricos";
    input.type = "text";
    input.required = true;
    input.id = "nombreProducto";
    form.appendChild(label);
    form.appendChild(input);
  }

  const h2 = document.createElement("h3");
  h2.textContent = seccion.titulo;
  form.appendChild(h2);

  respuestas = [];

  seccion.items.forEach(([pregunta, opciones, valores], i) => {
    const preguntaDiv = document.createElement("div");
    preguntaDiv.classList.add("resultado-seccion");

    const p = document.createElement("p");
    p.textContent = pregunta;
    preguntaDiv.appendChild(p);

    const group = document.createElement("div");
    group.style.display = "flex";
    group.style.flexDirection = "column";
    const respuesta = { value: -1 };

    opciones.forEach((opcion, j) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `pregunta${i}`;
      radio.value = valores[j];
      radio.onclick = () => respuesta.value = parseFloat(radio.value);
      label.appendChild(radio);
      label.appendChild(document.createTextNode(" " + opcion));
      group.appendChild(label);
    });

    respuestas.push(respuesta);
    preguntaDiv.appendChild(group);
    form.appendChild(preguntaDiv);
  });

  const btn = document.createElement("button");
  btn.type = "submit";
  btn.textContent = "Siguiente";
  form.appendChild(btn);

  form.onsubmit = (e) => {
    if (pagina === 0) {
    nombreProducto = document.getElementById("nombreProducto").value.trim();
    }
    e.preventDefault();
    if (respuestas.some(r => r.value === -1)) {
      alert("Por favor responde todas las preguntas.");
      return;
    }
    puntajes[seccion.clave] = respuestas.map(r => r.value);
    pagina++;
    if (pagina < preguntas.length) cargarPagina();
    else mostrarResultado();
  };

  contenedor.appendChild(form);
}

function generarFeedback(seccion, respuestasBrutas) {
  const [titulo, clave] = seccion;
  const preguntasSeccion = preguntas.find(p => p.clave === clave).items;
  const comentarios = respuestasBrutas.map((valor, i) => {
    if (valor >= 1) return null; // omitimos respuestas positivas

    const [pregunta, opciones, valores] = preguntasSeccion[i];
    const index = valores.indexOf(valor);
    const opcionTexto = opciones[index];
    const comentario = retroalimentacion[pregunta]?.[opcionTexto];
    
    return comentario ? `- ${comentario}` : null;
  }).filter(Boolean);

  return comentarios.length
    ? comentarios.join("\n\n")
    : "- No se detectaron áreas de mejora en esta sección.";
}


function mostrarResultado() {
  contenedor.innerHTML = "";

  let exitosos = 0;
  let fallas = [];

  const resultados = [
    ["Nicho", "nicho", "Apto", "No apto"],
    ["Producto", "producto", "Ganador", "No ganador"],
    ["Proveedor", "proveedor", "Viable", "No viable"]
  ];

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("resultado-panel");

  const encabezado = document.createElement("h3");
  encabezado.textContent = `📦 Resultado para: ${nombreProducto}`;
  resultadoDiv.appendChild(encabezado);

  resultados.forEach(([nombre, clave, exito, fallo]) => {
    const total = puntajes[clave].length;
    const puntos = puntajes[clave].reduce((a, b) => a + b, 0);
    const porcentaje = (puntos / total) * 100;
    const estado = porcentaje >= 80 ? exito : fallo;
    if (estado === exito) exitosos++; else fallas.push(clave);

    const seccionDiv = document.createElement("div");
    seccionDiv.classList.add("resultado-seccion");

    const subtitulo = document.createElement("h3");
    subtitulo.classList.add("resultado-categoria");

    const puntaje = document.createElement("span");
    puntaje.classList.add("resultado-puntaje");

    // Determinar clase visual según evaluación
    if (porcentaje >= 75) {
    puntaje.classList.add("estado-aprobado");
    } else if (porcentaje >= 50) {
    puntaje.classList.add("estado-parcial");
    } else {
    puntaje.classList.add("estado-fallo");
    }

    puntaje.textContent = ` – ${estado} (${puntos.toFixed(1)}/${total} – ${porcentaje.toFixed(0)}%)`;

    subtitulo.textContent = nombre;
    subtitulo.appendChild(puntaje);
    seccionDiv.appendChild(subtitulo);

    const feedback = document.createElement("pre");
    feedback.style.whiteSpace = "pre-wrap";
    feedback.textContent = generarFeedback([nombre, clave, exito, fallo], puntajes[clave]);

    seccionDiv.appendChild(feedback);
    resultadoDiv.appendChild(seccionDiv);
  });

  const conclusion = document.createElement("div");
  conclusion.classList.add("conclusion");
  conclusion.textContent = exitosos === 3
    ? "¡Felicidades! Tu producto cumple con los criterios necesarios para tener éxito en TikTok Shop."
    : "Tu producto necesita mejorar en algunas áreas antes de ser lanzado en TikTok Shop.";
  resultadoDiv.appendChild(conclusion);

  const reinicio = document.createElement("button");
  reinicio.textContent = "🔁 Volver a empezar";
  reinicio.onclick = () => location.reload();

  resultadoDiv.appendChild(reinicio);
  contenedor.appendChild(resultadoDiv);
}


cargarPagina();

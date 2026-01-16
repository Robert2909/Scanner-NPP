(function () {
    // Utility functions
    const $ = (q, ctx = document) => ctx.querySelector(q);
    const $$ = (q, ctx = document) => Array.from(ctx.querySelectorAll(q));

    // Data - Questions & Feedback
    const preguntas = [
        {
            titulo: "Sección 1 - Nicho",
            clave: "nicho",
            items: [
                ["¿Tiene una comunidad con intereses claros?", ["Sí", "No"], [1, 0]],
                ["¿Puedes conectarte emocionalmente con ese nicho?", ["Sí", "No"], [1, 0]],
                ["¿Es un nicho con alta recompra?", ["Alta", "Media", "Baja"], [1, 0.5, 0]],
                ["¿Se encuentra poco saturado en TikTok?", ["Poco saturado", "Saturado", "Muy saturado"], [1, 0.5, 0]]
            ]
        },
        {
            titulo: "Sección 2 - Producto deseable",
            clave: "producto",
            items: [
                ["¿Resuelve un problema específico o urgente?", ["Sí", "No"], [1, 0]],
                ["¿Tiene un efecto WOW o factor viral?", ["Sí", "No"], [1, 0]],
                ["¿Es de compra impulsiva (menos de $600)?", ["Sí", "No"], [1, 0]],
                ["¿Tiene alta posibilidad de recompra o venta cruzada?", ["Sí", "No"], [1, 0]],
                ["¿Se puede demostrar fácilmente en video?", ["Muy visual", "Poco visual", "Nada visual"], [1, 0.5, 0]]
            ]
        },
        {
            titulo: "Sección 3 - Proveedor rentable",
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
        "¿Tiene una comunidad con intereses claros?": { "Sí": "Comunidad bien definida: segmentación y engagement facilitados.", "No": "Sin comunidad clara: posicionamiento y contenido complicados." },
        "¿Es un nicho con alta recompra?": { "Alta": "Alto potencial de recompra: valor por cliente maximizado.", "Media": "Recompra moderada: complementar con ventas cruzadas.", "Baja": "Baja recompra: exige más inversión publicitaria." },
        "¿Se encuentra poco saturado en TikTok?": { "Poco saturado": "Baja saturación: excelente oportunidad para destacar.", "Saturado": "Nivel alto de saturación: requiere más creatividad.", "Muy saturado": "Altamente saturado: costos elevados y menor efectividad." },
        "¿Puedes conectarte emocionalmente con ese nicho?": { "Sí": "Conexión personal: favorece contenido auténtico.", "No": "Falta de conexión: dificultad para comunicar el valor." },
        "¿Resuelve un problema específico o urgente?": { "Sí": "Aborda necesidad clara: mejor tasa de conversión.", "No": "Sin urgencia evidente: requiere mejor storytelling." },
        "¿Se puede demostrar fácilmente en video?": { "Muy visual": "Producto visual: perfecto para captar atención en TikTok.", "Poco visual": "Poca demostración visual: requiere creatividad extra.", "Nada visual": "No demostrativo: difícil viralización." },
        "¿Tiene un efecto WOW o factor viral?": { "Sí": "Factor viral: impulsa el alcance orgánico inmediato.", "No": "Sin factor wow: requiere contenido más potente." },
        "¿Es de compra impulsiva (menos de $600)?": { "Sí": "Compra impulsiva: ideal para usuarios de TikTok.", "No": "Precio elevado: requiere más validación y pruebas sociales." },
        "¿Tiene alta posibilidad de recompra o venta cruzada?": { "Sí": "Potencial post-venta: ciclo de vida rentable.", "No": "Recompra limitada: usar bundles y accesorios." },
        "¿El proveedor acepta pago contra entrega o dropshipping?": { "Sí": "Bajo riesgo: ideal para escalar sin capital.", "No": "Riesgo financiero: requiere inversión inicial." },
        "¿El costo del producto permite un margen del 40% o más?": { "Sí": "Margen saludable: absorbe costos publicitarios.", "No": "Margen insuficiente: renegociar precios o ajustar venta." },
        "¿El proveedor ya tiene logística automatizada?": { "Sí": "Logística auto: ahorra tiempo y facilita escalabilidad.", "No": "Carga operativa: puede frenar el crecimiento." },
        "¿El envío no supera los $100 MXN y es nacional?": { "Sí": "Envío competitivo: mejora la conversión.", "No": "Envío costoso: barrera de entrada para el cliente." },
        "¿Tiene buenas reseñas o pruebas de cumplimiento?": { "Sí": "Historial comprobado: genera confianza y reduce devoluciones.", "No": "Sin garantías: riesgo para la reputación y reclamaciones." }
    };

    // State
    let pagina = 0;
    let nombreProducto = "";
    let puntajes = { nicho: [], producto: [], proveedor: [] };
    let respuestasGuardadas = [];

    const scanner = $('#scanner');
    const fill = $('#progressFill');
    const label = $('#progressLabel');

    function updateProgress() {
        const total = preguntas.length;
        const current = Math.min(pagina + 1, total);
        const pct = ((pagina) / total) * 100;
        fill.style.width = pct + '%';
        label.textContent = `Paso ${current} de ${total}`;
    }

    const nombresSugeridos = [
        "Humidificador Volcánico", "Mini Proyector 4K", "Licuadora Portátil", "Lámpara de Luna 3D",
        "Auriculares Óseos", "Masajeador de Cuello EMS", "Cámara de Seguridad Solar", "Teclado Mecánico RGB",
        "Soporte Magnético para Coche", "Cepillo Alisador de Iones", "Reloj Inteligente Ultra", "Mochila Antirrobo USB",
        "Dispensador Automático de Jabón", "Tira LED Inteligente WiFi", "Organizador de Maquillaje Rotativo",
        "Depiladora Láser Portátil", "Aspiradora de Mano Inalámbrica", "Soporte para Laptop Ergonómico", "Luz de Anillo para Selfies",
        "Micrófono de Condensador USB", "Proyectores de Estrellas Galaxia", "Cojín de Asiento Ortopédico", "Set de Utensilios de Silicona",
        "Botella de Agua con Recordatorio", "Kit de Herramientas de Precisión", "Altavoz Bluetooth Impermeable", "Lentes de Realidad Virtual",
        "Dron con Cámara HD", "Afilador de Cuchillos Profesional", "Purificador de Aire para Escritorio", "Difusor de Aromas Ultrasónico",
        "Báscula de Cocina Digital", "Termómetro Infrarrojo", "Controlador de Juegos para Celular", "Cargador Inalámbrico Rápido",
        "Cámara de Tablero Dash Cam", "Trípode para Smartphone con Control", "Audífonos con Cancelación de Ruido", "Lámpara de Escritorio LED",
        "Espejo de Maquillaje con Luz", "Mini Máquina de Sellado al Vacío", "Almohada de Viaje Viscoelástica", "Cinta de Correr Plegable"
    ];

    function renderPage() {
        scanner.innerHTML = '';
        updateProgress();

        if (pagina >= preguntas.length) {
            showResults();
            return;
        }

        const seccion = preguntas[pagina];
        const layout = document.createElement('div');
        layout.className = 'questions-layout';

        const h3 = document.createElement('h3');
        h3.textContent = seccion.titulo;
        h3.className = 'full-width';
        layout.appendChild(h3);

        if (pagina === 0) {
            const group = document.createElement('div');
            group.className = 'field-group full-width';
            group.innerHTML = `
                <label class="top">Nombre del producto (Presiona TAB para sugerencia)</label>
                <input type="text" id="nombreInput" placeholder="Ej. Audífonos Bluetooth" value="${nombreProducto}">
            `;
            layout.appendChild(group);

            const input = group.querySelector('#nombreInput');
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && input.value.trim() === "") {
                    e.preventDefault();
                    const randomName = nombresSugeridos[Math.floor(Math.random() * nombresSugeridos.length)];
                    input.value = randomName;
                    nombreProducto = randomName;
                }
            });
        }

        seccion.items.forEach((item, i) => {
            const [pregunta, opciones, valores] = item;
            const block = document.createElement('div');
            block.className = 'question-block';
            block.style.animationDelay = (i * 0.1) + 's';

            const p = document.createElement('p');
            p.className = 'question-text';
            p.textContent = pregunta;
            block.appendChild(p);

            const grid = document.createElement('div');
            grid.className = 'options-grid';

            opciones.forEach((op, j) => {
                const optItem = document.createElement('label');
                optItem.className = 'option-item';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `q_${pagina}_${i}`;
                radio.value = valores[j];
                radio.required = true;

                // Restaurar respuesta previa si existe
                if (respuestasGuardadas[pagina] && respuestasGuardadas[pagina][i] === valores[j]) {
                    radio.checked = true;
                }

                const span = document.createElement('span');
                span.textContent = op;

                optItem.appendChild(radio);
                optItem.appendChild(span);
                grid.appendChild(optItem);
            });

            block.appendChild(grid);
            layout.appendChild(block);
        });

        const actions = document.createElement('div');
        actions.className = 'actions full-width';

        if (pagina > 0) {
            const btnBack = document.createElement('button');
            btnBack.className = 'btn btn-secondary';
            btnBack.textContent = 'Atrás';
            btnBack.type = 'button';
            btnBack.onclick = prevStep;
            actions.appendChild(btnBack);
        }

        const btnNext = document.createElement('button');
        btnNext.className = 'btn';
        btnNext.textContent = pagina === preguntas.length - 1 ? 'Finalizar Escaneo' : 'Siguiente';
        btnNext.onclick = nextStep;
        actions.appendChild(btnNext);

        layout.appendChild(actions);
        scanner.appendChild(layout);
    }

    function showError(text) {
        const msg = $('#errorMsg');
        const txt = $('#errorText');
        txt.textContent = text;
        msg.classList.add('show');
        setTimeout(() => msg.classList.remove('show'), 3000);
    }

    function nextStep() {
        if (pagina === 0) {
            const input = $('#nombreInput');
            nombreProducto = input.value.trim();
            if (!nombreProducto) {
                showError('Ingresa el nombre del producto para continuar.');
                input.focus();
                return;
            }
        }

        const blocks = $$('.question-block');
        const currentRespuestas = [];
        let allAnswered = true;

        blocks.forEach((block) => {
            const selected = block.querySelector('input:checked');
            if (!selected) {
                allAnswered = false;
                block.classList.add('invalid');
                // Quitar la clase después de la animación para poder repetirla
                setTimeout(() => block.classList.remove('invalid'), 500);
            } else {
                currentRespuestas.push(parseFloat(selected.value));
            }
        });

        if (!allAnswered) {
            showError('Responde todas las preguntas marcadas en rojo.');
            return;
        }

        const seccion = preguntas[pagina];
        puntajes[seccion.clave] = currentRespuestas;
        respuestasGuardadas[pagina] = currentRespuestas;

        pagina++;
        renderPage();
    }

    function prevStep() {
        pagina--;
        renderPage();
    }

    function showResults() {
        fill.style.width = '100%';
        label.textContent = 'Escaneo completado';

        scanner.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'result-container';
        container.id = 'printArea';

        const header = document.createElement('div');
        header.className = 'result-header';
        header.innerHTML = `
            <div class="score-title">Informe de Diagnóstico</div>
            <span class="product-name">${nombreProducto}</span>
        `;
        container.appendChild(header);

        let totalAprobados = 0;
        const items = [
            { nombre: "Análisis de Nicho", clave: "nicho", exito: "Apto", fallo: "No apto" },
            { nombre: "Validación de Producto", clave: "producto", exito: "Ganador", fallo: "No ganador" },
            { nombre: "Viabilidad de Proveedor", clave: "proveedor", exito: "Viable", fallo: "No viable" }
        ];

        const grid = document.createElement('div');
        grid.className = 'results-grid';

        items.forEach(item => {
            const vals = puntajes[item.clave];
            const max = vals.length;
            const pts = vals.reduce((a, b) => a + b, 0);
            const pct = (pts / max) * 100;
            const esExito = pct >= 80;
            if (esExito) totalAprobados++;

            const card = document.createElement('div');
            card.className = 'score-card';

            const statusClass = pct >= 80 ? 'badge-green' : pct >= 50 ? 'badge-yellow' : 'badge-red';
            card.innerHTML = `
                <div class="score-head">
                    <span class="score-title">${item.nombre}</span>
                    <span class="badge ${statusClass}">${esExito ? item.exito : item.fallo} · ${pct.toFixed(0)}%</span>
                </div>
            `;

            const fbList = document.createElement('ul');
            fbList.className = 'feedback-list';

            const seccionData = preguntas.find(p => p.clave === item.clave).items;
            let improvements = 0;

            vals.forEach((v, i) => {
                if (v < 1) {
                    const [pregunta, opciones, valores] = seccionData[i];
                    const selectedText = opciones[valores.indexOf(v)];
                    const text = (retroalimentacion[pregunta] || {})[selectedText];
                    if (text) {
                        const li = document.createElement('li');
                        li.textContent = text;
                        fbList.appendChild(li);
                        improvements++;
                    }
                }
            });

            if (improvements === 0) {
                fbList.innerHTML = '<li>✓ Excelente. No se detectaron áreas de mejora en esta sección.</li>';
            }

            card.appendChild(fbList);
            grid.appendChild(card);
        });

        container.appendChild(grid);

        const conclusion = document.createElement('div');
        conclusion.className = `conclusion-box ${totalAprobados === 3 ? 'is-green' : 'is-yellow'}`;
        conclusion.textContent = totalAprobados === 3
            ? '¡Producto Validado! Cumple con todos los criterios críticos para ser escalado en TikTok Shop.'
            : 'Validación Parcial. Es necesario optimizar los puntos señalados antes de invertir en stock.';
        container.appendChild(conclusion);

        scanner.appendChild(container);

        // Actions
        const actions = document.createElement('div');
        actions.className = 'actions';

        const btnRestart = document.createElement('button');
        btnRestart.className = 'btn btn-secondary';
        btnRestart.textContent = 'Nuevo Escaneo';
        btnRestart.onclick = () => location.reload();

        const btnExport = document.createElement('button');
        btnExport.className = 'btn';
        btnExport.innerHTML = '⬇ Exportar Reporte';
        btnExport.onclick = exportReport;

        actions.appendChild(btnRestart);
        actions.appendChild(btnExport);
        scanner.appendChild(actions);

        saveToHistory();
    }

    function exportReport() {
        const target = $('#printArea');
        const filename = `ScannerNPP_${nombreProducto.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.png`;

        html2canvas(target, {
            backgroundColor: '#161616',
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error('Error al exportar:', err);
            alert('No se pudo exportar el reporte. Inténtalo de nuevo.');
        });
    }

    function saveToHistory() {
        const hist = JSON.parse(localStorage.getItem('scanner_history') || '[]');
        const entry = {
            nombre: nombreProducto,
            fecha: new Date().toLocaleString(),
            puntajes: puntajes,
            aprobado: (puntajes.nicho.reduce((a, b) => a + b, 0) / puntajes.nicho.length >= 0.8) &&
                (puntajes.producto.reduce((a, b) => a + b, 0) / puntajes.producto.length >= 0.8) &&
                (puntajes.proveedor.reduce((a, b) => a + b, 0) / puntajes.proveedor.length >= 0.8)
        };
        hist.unshift(entry);
        localStorage.setItem('scanner_history', JSON.stringify(hist.slice(0, 5))); // Guardar últimos 5
    }

    // Init
    renderPage();
})();

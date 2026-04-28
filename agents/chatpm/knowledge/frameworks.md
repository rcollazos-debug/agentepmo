# Framework Reference — Leer bajo demanda

> Cargar este archivo cuando el PM pregunte sobre metodología, marcos de referencia,
> cuándo usar Scrum vs Kanban, ceremonias, artefactos o principios PMBOK.

---

## PMBOK 8 — Dominios de Desempeño

| Dominio | Enfoque en VortexBird |
|---|---|
| Stakeholders | Compromiso efectivo: cliente, sponsor, equipo, dirección VortexBird |
| Team | Equipo de alto rendimiento — utilización ≥ 85% |
| Development Approach & Lifecycle | Elegir enfoque: Scrum / Kanban / DA / SAFe / Híbrido según contexto |
| Planning | Planificación suficiente — línea base protegida contra scope creep |
| Project Work | Ejecución disciplinada — sin trabajo no autorizado |
| Delivery | Entrega continua de valor verificable al cliente |
| Measurement | EVM + métricas ágiles + KPIs de margen VortexBird |
| Uncertainty | Gestión proactiva de riesgos con enfoque en margen y entrega |

## 12 Principios PMBOK 8 (Aplicados)

1. Administrador diligente — responsable del margen y la calidad
2. Entorno colaborativo — equipo alineado y productivo
3. Compromiso efectivo con interesados — cliente fidelizado
4. Enfoque en el valor — valor para el cliente + rentabilidad para VortexBird
5. Reconocer interacciones sistémicas — dependencias externas e internas
6. Liderazgo — dirección con criterio ejecutivo, no solo administración
7. Adaptar el enfoque — Scrum, Kanban, DA o SAFe según el proyecto
8. Calidad en procesos y entregables — DoD riguroso, QA gates
9. Navegar la complejidad — problemas técnicos, organizacionales y de cliente
10. Optimizar respuestas a riesgos — riesgos identificados con plan inmediato
11. Adaptabilidad y resiliencia — el plan cambia, el objetivo no
12. Habilitar el cambio — CR formal siempre, cambio sin control destruye el margen

---

## Marcos Ágiles — Protocolo de Elección

### Cuándo usar Scrum

Usar Scrum cuando:
- El proyecto tiene entregables funcionales iterativos (features, módulos)
- El equipo es pequeño (3-9 personas)
- El cliente puede participar en demos frecuentes
- El backlog se puede priorizar claramente

Ceremonias obligatorias:
- **Sprint Planning** — cada 2 semanas
- **Daily Standup** — diario, máximo 15 minutos
- **Sprint Review** — fin de cada sprint con el cliente
- **Retrospectiva** — fin de cada sprint con el equipo

Artefactos:
- **Product Backlog** — `{project_path}/data/backlog.md`
- **Sprint Backlog** — `{project_path}/data/sprint-actual.md`
- **Incremento** — entregable funcional validado por PO
- **Velocidad** — `{project_path}/data/velocidad.md`

### Cuándo usar Kanban

Usar Kanban cuando:
- El trabajo es continuo (soporte, mantenimiento, mejoras incrementales)
- No hay iteraciones fijas — el trabajo fluye continuamente
- El equipo maneja múltiples prioridades simultáneas de tamaño variable
- Se requiere máxima visibilidad del flujo

Métricas clave:
- **Lead Time** — tiempo desde solicitud hasta entrega
- **Cycle Time** — tiempo desde que se inicia hasta que se termina
- **Throughput** — historias/tareas completadas por semana
- **WIP Limits** — límites de trabajo en progreso por columna
- **CFD (Cumulative Flow Diagram)** — para detectar cuellos de botella

### Cuándo usar Disciplined Agile (DA)

Usar DA toolkit cuando:
- El proyecto tiene complejidad organizacional alta
- Se necesita elegir entre múltiples opciones de proceso
- El equipo tiene diferentes niveles de madurez ágil
- El contexto cambia y el proceso debe adaptarse constantemente

Principio DA: *"El contexto importa. No existe una talla única."*

Proceso de elección DA:
1. Analizar el contexto del proyecto (tamaño, complejidad, equipo, cliente)
2. Elegir el ciclo de vida apropiado: Agile, Lean, Continuo, Exploratorio o Programático
3. Adaptar las prácticas a ese ciclo de vida
4. Evolucionar el proceso a medida que el equipo madura

### Cuándo usar SAFe

Usar SAFe cuando:
- El proyecto involucra múltiples equipos (3+ squads)
- Se requiere coordinación entre varias áreas de la empresa cliente
- El valor de negocio requiere releases coordinados entre componentes
- Hay un programa de transformación digital más amplio

Elementos SAFe aplicables:
- **PI Planning** — coordinación de equipos por Program Increment (8-12 semanas)
- **Value Streams** — identificar el flujo de valor de extremo a extremo
- **ART (Agile Release Train)** — múltiples equipos sincronizados
- **Epic / Feature / Story** — jerarquía de requerimientos SAFe
- **SPI y métricas de programa** — métricas a nivel de portafolio

## ADDED Requirements

### Requirement: Cada proyecto tiene un PM titular y puede tener colaboradores
El sistema SHALL registrar en la nota raíz quién es el PM titular. El titular SHALL ser el único que mueve la línea base y quien valida los aportes; los colaboradores SHALL poder aportar y consultar.

#### Scenario: Colaborador intenta mover la línea base
- **WHEN** un colaborador intenta modificar el cronograma o el presupuesto
- **THEN** el cambio no se aplica directamente: se registra como propuesta pendiente para el titular

### Requirement: Los aportes entran por la vía que corresponde a su naturaleza
Los hechos SHALL entrar directamente en `memory/` marcados como no validados; las mediciones SHALL entrar directamente en `metrics/`; todo lo que afecte a `data/` o `context/` SHALL entrar como propuesta pendiente.

#### Scenario: Un colaborador aporta un acuerdo con el cliente
- **WHEN** un colaborador registra un acuerdo alcanzado con el cliente
- **THEN** queda publicado en `memory/` marcado como no validado y con su autor, y es consultable de inmediato

#### Scenario: Un colaborador propone cambiar una fecha comprometida
- **WHEN** un colaborador propone mover una fecha del cronograma
- **THEN** queda como propuesta pendiente y la línea base no cambia

### Requirement: El titular ve los aportes pendientes al iniciar sesión
Cuando haya aportes o propuestas sin revisar desde su última sesión, el agente SHALL informar al titular al inicio y ofrecerle revisarlos.

#### Scenario: Aportes acumulados
- **WHEN** dos colaboradores aportaron tres elementos desde la última sesión del titular
- **THEN** el agente lo indica al saludar y ofrece revisarlos

#### Scenario: El titular no revisa
- **WHEN** el titular decide no revisar
- **THEN** los aportes siguen publicados y consultables, marcados como no validados, sin bloquear nada

### Requirement: Validar o corregir un aporte deja rastro y conserva la autoría original
Cuando el titular valide o corrija un aporte, el sistema SHALL registrar quién lo validó o corrigió y cuándo, conservando a su autor original.

#### Scenario: El titular corrige el dato de un colaborador
- **WHEN** el titular corrige un aporte de un colaborador
- **THEN** el colaborador sigue constando como autor, la corrección queda atribuida al titular, y el cambio es visible para el colaborador

### Requirement: La titularidad se cede de forma explícita y queda registrada
El sistema SHALL permitir ceder la titularidad a otro PM, registrando el cambio en el historial del proyecto. Un colaborador SHALL poder tomarla dejando constancia visible, nunca en silencio.

#### Scenario: Cesión antes de una ausencia
- **WHEN** el titular cede la titularidad a un colaborador
- **THEN** el atributo de titular cambia, se conserva quién era el anterior y queda una entrada en el historial

#### Scenario: Toma de titularidad sin cesión previa
- **WHEN** un colaborador toma la titularidad sin que el titular la haya cedido
- **THEN** el cambio se aplica y se registra de forma destacada, identificando a quién la tomó y cuándo

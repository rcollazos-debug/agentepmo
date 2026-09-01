## ADDED Requirements

### Requirement: La auditoría detecta incoherencias que la reconciliación no puede ver
El sistema SHALL ofrecer una revisión del proyecto que identifique contradicciones de significado entre sus contenidos, más allá de las diferencias de texto.

#### Scenario: Dos riesgos que describen el mismo hecho
- **WHEN** dos PMs registraron el mismo riesgo con identificadores distintos
- **THEN** la auditoría lo señala, muestra ambos registros y propone unificarlos

#### Scenario: Semáforo que contradice a los indicadores
- **WHEN** el estado del proyecto es VERDE y el CPI registrado está por debajo del umbral
- **THEN** la auditoría lo señala citando ambos valores

#### Scenario: Compromisos duplicados con responsables distintos
- **WHEN** existen dos compromisos equivalentes asignados a personas distintas
- **THEN** la auditoría los presenta juntos y propone cuál conservar

### Requirement: La auditoría propone y nunca corrige
El sistema SHALL presentar sus hallazgos como propuestas con su evidencia, y SHALL NOT modificar ningún contenido del proyecto por su cuenta.

#### Scenario: Hallazgos aceptados en parte
- **WHEN** el titular acepta unas propuestas y rechaza otras
- **THEN** solo se aplican las aceptadas, cada una atribuida a quien la aprobó

#### Scenario: Auditoría sin respuesta
- **WHEN** nadie atiende el informe
- **THEN** el proyecto queda tal como estaba y ningún dato se altera

### Requirement: La auditoría se ofrece cuando hay motivo y bajo demanda
El sistema SHALL proponer la revisión cuando detecte que otros PMs escribieron desde la última sesión del titular, y SHALL permitir lanzarla en cualquier momento.

#### Scenario: Escrituras de otros desde la última visita
- **WHEN** el titular abre sesión y otros PMs publicaron desde su última visita
- **THEN** el agente ofrece revisar la consistencia del proyecto

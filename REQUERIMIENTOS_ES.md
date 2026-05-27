# REQUERIMIENTOS E/S - VIGILAMED

**Documento:** Especificación de Entradas y Salidas del Sistema  
**Fecha:** 22/May/2026  
**Fase:** 2 - Diseño y Datos  
**Tarea:** 3 - Requerimientos E/S (14-15/May)

---

## OBJETIVO

Documentar de forma clara y precisa todos los datos que **entran** al sistema y todos los datos que el sistema **produce como salida**.

---

## ENTRADAS (INPUTS)

### 1. **Entradas del Administrador**

| Entrada | Tipo | Descripción | Validación |
|---------|------|-------------|-----------|
| Nombre de usuario | Texto | Nombre completo del administrador | Min 3 caracteres |
| Email | Correo | Correo electrónico único | Formato válido, único en BD |
| Contraseña | Texto | Contraseña de acceso | Min 8 caracteres, encriptada |
| Rol | Selección | Tipo de usuario (Admin/Tutor) | Predefinido |

**Función:** Crear cuentas de administradores y tutores

---

### 2. **Entradas del Tutor**

| Entrada | Tipo | Descripción | Validación |
|---------|------|-------------|-----------|
| Nombre del paciente | Texto | Nombre del paciente asignado | Min 3 caracteres |
| Edad del paciente | Número | Edad en años | Entre 1-120 |
| Historial médico | Texto largo | Antecedentes de salud | Opcional, max 1000 caracteres |
| Nombre medicamento | Texto | Nombre del fármaco | Obligatorio |
| Dosis | Texto | Cantidad y unidad (ej: 500mg) | Obligatorio |
| Fecha inicio | Fecha | Cuándo comienza el tratamiento | Obligatorio |
| Fecha fin | Fecha | Cuándo termina el tratamiento | Opcional |
| Notas | Texto | Observaciones del tutor | Opcional |
| Hora de alerta | Tiempo | Hora de recordatorio (HH:mm) | Formato 24 horas |
| Días de la semana | Selección múltiple | Qué días se envía alerta | Lunes-Domingo |
| Chat ID Telegram | Número | ID único del chat Telegram | Asociado al paciente |

**Función:** Registrar pacientes, medicamentos y horarios de tomas

---

### 3. **Entradas del Paciente (Telegram)**

| Entrada | Tipo | Descripción | Validación |
|---------|------|-------------|-----------|
| Respuesta "Sí" | Botón | Confirmación de toma de medicamento | Binaria: Sí/No |
| Respuesta "No" | Botón | No se tomó la medicación | Binaria: Sí/No |
| Timestamp | Automático | Hora exacta de la respuesta | Generado por sistema |

**Función:** Registrar confirmación o falta de toma de medicamento

---

### 4. **Entradas Automáticas del Sistema**

| Entrada | Tipo | Descripción |
|---------|------|-------------|
| Hora actual | Timestamp | Hora del servidor para comparar con horarios |
| Día de la semana | Número | 0-6 (Domingo-Sábado) para validar programación |
| Estado de conexión | Booleano | Disponibilidad de API de Telegram |

---

## SALIDAS (OUTPUTS)

### 1. **Salidas para el Administrador**

| Salida | Tipo | Descripción | Formato |
|--------|------|-------------|---------|
| Confirmación de registro | Mensaje | Usuario creado exitosamente | JSON: `{message, userId}` |
| Listado de usuarios | Tabla | Todos los tutores/admins | JSON array |
| Reporte de auditoría | Tabla | Registro de todas las acciones | CSV/PDF |
| Errores de sistema | Logs | Eventos importantes y fallos | Texto con timestamp |

---

### 2. **Salidas para el Tutor (Dashboard Web)**

| Salida | Tipo | Descripción | Actualización |
|--------|------|-------------|---------------|
| Listado de pacientes | Tabla | Pacientes asignados | En tiempo real |
| Listado de medicamentos | Tabla | Tratamientos activos por paciente | En tiempo real |
| Historial de tomas | Tabla | Todas las tomas registradas con fecha/hora | En tiempo real |
| Gráfico de adherencia | Gráfico de barras | % de medicinas tomadas vs faltadas | Diario |
| Gráfico de tendencia | Gráfico de líneas | Adherencia en últimos 30 días | Diario |
| Indicadores visuales | Cards | Verde (cumplió), Rojo (no tomó), Gris (pendiente) | Por evento |
| Filtros | Dropdown | Por paciente, fecha, medicamento | Interactivo |
| Alertas | Notificaciones | Paciente no respondió en 30 min | Pop-up en tiempo real |
| Reporte descargable | PDF/Excel | Historial completo filtrable | A demanda |

---

### 3. **Salidas para el Paciente (Telegram)**

| Salida | Tipo | Descripción | Ejemplo |
|--------|------|-------------|---------|
| Recordatorio de medicamento | Mensaje de texto | Alerta para tomar el medicamento | "Es hora de tomar [medicamento]" |
| Botones interactivos | Buttons | Opciones Sí/No para confirmar | 2 botones debajo del mensaje |
| Confirmación de respuesta | Mensaje | Agradecimiento por la confirmación | "Gracias, se registró tu respuesta" |
| Recordatorio de seguimiento | Mensaje | Si no respondió en 30 min | "¿Todavía no tomaste? Responde Sí/No" |
| Resumen diario | Mensaje | Al final del día, tomas completadas | "Hoy tomaste 3 de 3 medicinas ✓" |

---

### 4. **Salidas Automáticas (Base de Datos)**

| Salida | Tipo | Descripción | Almacenamiento |
|--------|------|-------------|-----------------|
| Confirmación de medicamento | Registro | Timestamp de cuándo se confirmó | MedicationLog |
| ID de alerta enviada | Registro | Referencia a la alerta en Telegram | Alert |
| Estado de alerta | Registro | "pending", "sent", "failed" | Alert.status |
| Historial completo | Archivo | Backup de datos de pacientes | Base de datos MongoDB |

---

## FLUJO DE DATOS PRINCIPAL

```
┌─────────────────────────────────────────────────────────────────────┐
│ ENTRADA: Tutor registra medicamento + horario                       │
├─────────────────────────────────────────────────────────────────────┤
│                          ↓                                           │
│ PROCESAMIENTO: Sistema almacena en MedicationSchedule               │
│                          ↓                                           │
│ ALERTA PROGRAMADA: A la hora exacta, envía mensaje a Telegram      │
│                          ↓                                           │
│ ENTRADA: Paciente responde "Sí" o "No"                             │
│                          ↓                                           │
│ PROCESAMIENTO: Se registra en MedicationLog                         │
│                          ↓                                           │
│ SALIDA: Tutor ve en dashboard actualizado                           │
│         - Tabla de tomas                                            │
│         - Gráfico de adherencia actualizado                         │
│         - Indicador visual (verde/rojo)                             │
└─────────────────────────────────────────────────────────────────────┘
```

---

## TABLA RESUMEN: E/S POR ROL

### **ADMINISTRADOR**

**Entradas:**
- Crear usuarios (nombre, email, password, rol)

**Salidas:**
- Confirmación de creación
- Listado de usuarios
- Reportes de auditoría
- Logs de sistema

---

### **TUTOR**

**Entradas:**
- Registro de pacientes (nombre, edad, historial)
- Registro de medicamentos (nombre, dosis, fechas)
- Programación de horarios (hora, días)

**Salidas:**
- Dashboard con listado de pacientes
- Tabla de medicamentos
- Historial de tomas con timestamps
- Gráficos de adherencia
- Alertas en tiempo real
- Filtros por paciente/fecha/medicamento
- Reportes descargables

---

### **PACIENTE**

**Entradas:**
- Respuestas a alertas de Telegram (Sí/No)

**Salidas:**
- Confirmación de respuesta recibida
- Recordatorio de seguimiento (si no responde)
- Resumen diario de tomas
- Mensajes automáticos a horas programadas

---

## CONSIDERACIONES DE SEGURIDAD

**Entradas:**
- Validación de todos los datos (tipo, rango, formato)
- Encriptación de contraseñas (bcrypt)
- Sanitización de entrada para evitar inyecciones
- Autenticación obligatoria

**Salidas:**
- Autorización: Cada usuario solo ve sus datos
- Enmascaramiento de IDs sensibles
- Logs de auditoría de accesos
- Expiración de sesiones

---

##  NOTAS IMPORTANTES

1. **Integridad de datos:** Todos los cambios quedan registrados con timestamp
2. **Tiempo real:** Dashboard se actualiza vía WebSockets o polling
3. **Redundancia:** Backups automáticos de la base de datos
4. **Escalabilidad:** Sistema diseñado para n pacientes x n tutores
5. **Error handling:** Sistema reintentos de envíos fallidos en Telegram

---

## CASOS DE USO

Descripción detallada de cada acción que pueden realizar los usuarios.

---

## **ROL 1: ADMINISTRADOR**

El administrador gestiona el sistema a nivel macro (usuarios, accesos).

### **Caso de Uso 1.1: Crear Cuenta de Tutor**

**Actores:** Administrador  
**Precondición:** Admin está autenticado en el sistema

**Flujo Principal:**
1. Admin accede a sección "Gestión de Usuarios"
2. Hace clic en "Crear Nuevo Tutor"
3. Ingresa:
   - Nombre del tutor
   - Email (único en el sistema)
   - Contraseña inicial (temporal)
   - Rol: "Tutor"
4. Sistema valida que email no exista
5. Sistema encripta la contraseña con bcrypt
6. Sistema crea el usuario en la BD
7. Sistema envía correo con credenciales temporales
8. **Salida:** Confirmación de creación exitosa

**Flujo Alternativo:**
- Si email ya existe → Error: "Email ya registrado"
- Si hay campo vacío → Error: "Todos los campos son obligatorios"

**Post-condición:** Nuevo tutor puede hacer login

---

### **Caso de Uso 1.2: Consultar Reportes de Auditoría**

**Actores:** Administrador  
**Precondición:** Admin está autenticado

**Flujo Principal:**
1. Admin accede a "Reportes"
2. Selecciona filtro (fecha, tutor, acción)
3. Sistema consulta logs de auditoría
4. Sistema muestra tabla con:
   - Quién (usuario)
   - Qué hizo (acción)
   - Cuándo (timestamp)
   - Resultado (éxito/error)
5. Admin puede descargar como PDF/Excel

**Post-condición:** Reporte disponible para descarga

---

## **ROL 2: TUTOR**

El tutor gestiona pacientes, medicamentos y monitorea adherencia.

### **Caso de Uso 2.1: Registrar Paciente**

**Actores:** Tutor  
**Precondición:** Tutor está autenticado

**Flujo Principal:**
1. Tutor accede a "Mis Pacientes"
2. Hace clic en "Registrar Nuevo Paciente"
3. Ingresa:
   - Nombre del paciente
   - Edad (número)
   - Historial médico (opcional)
   - Chat ID de Telegram
4. Sistema valida que edad esté entre 1-120
5. Sistema valida formato Chat ID
6. Sistema crea paciente en BD
7. Sistema asocia paciente al tutor (tutorId)
8. **Salida:** "Paciente registrado exitosamente"

**Flujo Alternativo:**
- Si Chat ID inválido → Error: "ID de Telegram inválido"
- Si edad fuera de rango → Error: "Edad debe estar entre 1 y 120"

**Post-condición:** Paciente aparece en lista "Mis Pacientes"

---

### **Caso de Uso 2.2: Crear Tratamiento para Paciente**

**Actores:** Tutor  
**Precondición:** Tutor autenticado, paciente ya registrado

**Flujo Principal:**
1. Tutor selecciona un paciente
2. Hace clic en "Agregar Medicamento"
3. Ingresa:
   - Nombre del medicamento
   - Dosis (ej: "500mg")
   - Fecha de inicio
   - Fecha de fin (opcional)
   - Notas (opcional)
4. Sistema valida que nombre no esté vacío
5. Sistema valida que fecha inicio ≤ fecha fin
6. Sistema crea Treatment en BD
7. **Salida:** "Medicamento agregado"

**Post-condición:** Medicamento aparece en historial de tratamientos del paciente

---

### **Caso de Uso 2.3: Programar Horario de Toma**

**Actores:** Tutor  
**Precondición:** Tutor autenticado, treatment ya creado

**Flujo Principal:**
1. Tutor selecciona un medicamento
2. Hace clic en "Programar Recordatorio"
3. Selecciona:
   - Hora (HH:mm) - ej: "08:30"
   - Días de la semana (múltiple selección)
4. Sistema valida formato de hora
5. Sistema crea MedicationSchedule en BD
6. Sistema programa el primer recordatorio
7. **Salida:** "Horario programado. Recordatorios activos"

**Comportamiento Posterior:**
- Diariamente, a la hora exacta, el bot enviará un mensaje al paciente
- Sistema monitorea si el paciente responde

**Post-condición:** Bot enviará alertas automáticas a esa hora en esos días

---

### **Caso de Uso 2.4: Ver Dashboard - Historial de Tomas**

**Actores:** Tutor  
**Precondición:** Tutor autenticado, paciente con tratamientos activos

**Flujo Principal:**
1. Tutor accede al Dashboard
2. Selecciona un paciente (dropdown)
3. Selecciona un rango de fechas (opcional)
4. Sistema consulta MedicationLog del paciente
5. Sistema muestra tabla con:
   | Fecha | Hora | Medicamento | Respuesta |
   |-------|------|-------------|-----------|
   | 22/May | 08:30 | Metformina | Sí ✓ |
   | 22/May | 14:00 | Lisinopril | No ✗ |
   | 21/May | 08:30 | Metformina | Sí ✓ |
6. Indicadores visuales (verde/rojo/gris)

**Post-condición:** Tutor ve historial completo

---

### **Caso de Uso 2.5: Ver Gráfico de Adherencia**

**Actores:** Tutor  
**Precondición:** Tutor autenticado, paciente con mínimo 7 días de datos

**Flujo Principal:**
1. Tutor va a sección "Gráficos"
2. Selecciona paciente y rango de fechas
3. Sistema calcula:
   - Total de alertas enviadas
   - Total confirmadas como "Sí"
   - Total respondidas como "No"
   - Total sin respuesta
4. Sistema muestra:
   - **Gráfico de barras:** Comparación Tomó vs No tomó
   - **Gráfico de línea:** Tendencia de adherencia últimos 30 días
   - **Porcentaje:** "Adherencia: 85%"
5. Tutor puede filtrar por medicamento

**Post-condición:** Tutor comprende patrón de adherencia del paciente

---

### **Caso de Uso 2.6: Descargar Reporte de Paciente**

**Actores:** Tutor  
**Precondición:** Tutor autenticado

**Flujo Principal:**
1. Tutor selecciona paciente
2. Hace clic en "Descargar Reporte"
3. Elige formato: PDF o Excel
4. Selecciona rango de fechas
5. Sistema genera documento con:
   - Datos del paciente
   - Listado de medicamentos activos
   - Tabla de historial de tomas
   - Gráficos de adherencia
   - Conclusiones (adherencia alta/baja)
6. Sistema descarga archivo

**Post-condición:** Archivo descargado lista para usar o archivar

---

### **Caso de Uso 2.7: Recibir Alerta en Tiempo Real**

**Actores:** Tutor, Sistema  
**Precondición:** Paciente no respondió alerta después de 30 minutos

**Flujo Principal (AUTOMÁTICO):**
1. Sistema detecta que paciente no respondió a alerta
2. Sistema envía notificación al tutor:
   - "[Paciente] no respondió a alerta de [Medicamento] hace 30 min"
3. Tutor puede hacer clic para ver detalles
4. Tutor puede opcionalmente contactar al paciente

**Post-condición:** Tutor alertado de incumplimiento

---

## **ROL 3: PACIENTE**

El paciente interactúa solo a través del bot de Telegram.

### **Caso de Uso 3.1: Recibir Alerta de Medicamento**

**Actores:** Bot de Telegram, Paciente  
**Precondición:** Tutor programó horario, hora exacta llegó

**Flujo Principal (AUTOMÁTICO):**
1. Sistema detecta que llegó hora programada
2. Sistema consulta MedicationSchedule
3. Sistema verifica que hoy está en dias_de_semana
4. Bot envía mensaje a Telegram del paciente:
   ```
    RECORDATORIO DE MEDICAMENTO
   
   Nombre: [Medicamento]
   Dosis: [Dosis]
   Hora: [HH:mm]
   
   ¿Ya te tomaste tu medicina?
   
   [Botón SÍ]  [Botón NO]
   ```
5. Sistema crea MedicationLog con confirmed=false (pendiente)

**Post-condición:** Mensaje esperando respuesta del paciente

---

### **Caso de Uso 3.2: Confirmar Toma de Medicamento (Sí)**

**Actores:** Paciente, Bot de Telegram  
**Precondición:** Paciente recibió alerta

**Flujo Principal:**
1. Paciente presiona botón [SÍ]
2. Bot recibe callback
3. Bot actualiza MedicationLog:
   - confirmed = true
   - response = "Sí"
   - timestamp = hora actual
4. Bot envía confirmación:
   ```
   Excelente
   Se registró que tomaste tu medicina a las HH:mm
   ```
5. Sistema actualiza estado de Alert: sent
6. Dashboard del tutor se actualiza (tiempo real)

**Post-condición:** Toma registrada, Dashboard actualizado

---

### **Caso de Uso 3.3: Confirmar No Toma de Medicamento (No)**

**Actores:** Paciente, Bot de Telegram  
**Precondición:** Paciente recibió alerta

**Flujo Principal:**
1. Paciente presiona botón [NO]
2. Bot recibe callback
3. Bot actualiza MedicationLog:
   - confirmed = false
   - response = "No"
   - timestamp = hora actual
4. Bot envía mensaje:
   ```
   Importante
   Registramos que NO tomaste tu medicina.
   Por favor contacta a tu tutor si hay algún problema.
   ```
5. Sistema envía alerta al tutor inmediatamente
6. Dashboard se marca en ROJO

**Post-condición:** Falta registrada, Tutor alertado

---

### **Caso de Uso 3.4: No Responder a Alerta (Timeout)**

**Actores:** Sistema  
**Precondición:** 30 minutos pasaron sin respuesta

**Flujo Principal (AUTOMÁTICO):**
1. Sistema detecta 30 min sin respuesta
2. Sistema envía recordatorio:
   ```
    RECORDATORIO IMPORTANTE
   
   Aún no confirmaste si tomaste [Medicamento]
   
   ¿Ya lo hiciste?
   
   [Botón SÍ]  [Botón NO]
   ```
3. Si después de otro recordatorio no hay respuesta:
   - MedicationLog: response = "No respondió"
   - Alert: status = "failed"
   - Tutor recibe notificación roja en dashboard

**Post-condición:** Incumplimiento registrado

---

### **Caso de Uso 3.5: Recibir Resumen Diario**

**Actores:** Bot de Telegram (automático), Paciente  
**Precondición:** Fin del día (ej: 23:00)

**Flujo Principal (AUTOMÁTICO):**
1. Sistema calcula al final del día:
   - Medicinas programadas hoy: 3
   - Medicinas tomadas: 2
   - No respondidas: 1
2. Bot envía resumen:
   ```
   RESUMEN DEL DÍA
   
   Hoy programamos 3 medicinas
   Tomaste 2
   No tomaste 1
   
   Adherencia de hoy: 66%
   
   Sigue adelante!
   ```

**Post-condición:** Paciente ve su desempeño diario

---

## DIAGRAMA DE FLUJO - VISTA GENERAL

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     FLUJO PRINCIPAL DE VIGILAMED                         │
└─────────────────────────────────────────────────────────────────────────┘

ADMINISTRADOR               TUTOR                    PACIENTE (Telegram)
     │                       │                              │
     ├─ Crear Tutores        │                              │
     │                       ├─ Registrar Paciente          │
     │                       │                              │
     │                       ├─ Crear Tratamiento           │
     │                       │                              │
     │                       ├─ Programar Horario           │
     │                       │      (MedicationSchedule)    │
     │                       │            │                 │
     │                       │            └──────────────────┼─→ [Bot envía alerta]
     │                       │                              │
     │                       │←─ Paciente responde ─────────┤
     │                       │                              │
     │                       ├─ Ve Dashboard               │
     │                       ├─ Ve Gráficos               │
     │                       ├─ Descarga Reportes         │
     │                       │                              │
     │                       ├─ Si no responde → ALERTA ────→ [Recordatorio]
     │                       │                              │
     ├─ Ver Auditoría        │                              │
     │                       │      [MedicationLog actualizado]
     │                       │                              │
     └───────────────────────┴──────────────────────────────┘
```

---

## MODELO DE DATOS LÓGICO PARA MONGODB

Este diagrama describe las colecciones y las referencias entre documentos en MongoDB Atlas, no un modelo relacional estricto.

```
USER (Admin/Tutor)
  ├─ _id
  ├─ name
  ├─ email (unique)
  ├─ password (encrypted)
  ├─ role (Admin/Tutor)
  └─ tutorId usado como referencia en PATIENT

PATIENT
  ├─ _id
  ├─ name
  ├─ age
  ├─ medicalHistory
  ├─ tutorId (referencia a USER)
  ├─ telegramChatId
  └─ patientId usado como referencia en TREATMENT y MEDICATIONLOG

TREATMENT
  ├─ _id
  ├─ patientId (referencia a PATIENT)
  ├─ medicationName
  ├─ dosage
  ├─ startDate
  ├─ endDate
  ├─ notes
  └─ treatmentId usado como referencia en MEDICATIONSCHEDULE

MEDICATIONSCHEDULE
  ├─ _id
  ├─ treatmentId (referencia a TREATMENT)
  ├─ time (HH:mm)
  ├─ daysOfWeek [0-6]
  ├─ active (boolean)
  └─ scheduleId usado como referencia en MEDICATIONLOG

MEDICATIONLOG
  ├─ _id
  ├─ scheduleId (referencia a MEDICATIONSCHEDULE)
  ├─ patientId (referencia a PATIENT)
  ├─ timestamp
  ├─ confirmed (boolean)
  └─ response (Sí/No/No respondió)

ALERT
  ├─ _id
  ├─ medicationLogId (referencia a MEDICATIONLOG)
  ├─ telegramChatId
  ├─ sentAt
  └─ status (pending/sent/failed)
```

---

## MATRIZ DE CASOS DE USO

| # | Caso de Uso | Actor | Precondición | Resultado |
|----|-------------|-------|--------------|-----------|
| 1.1 | Crear Cuenta Tutor | Admin | Admin autenticado | Tutor puede hacer login |
| 1.2 | Consultar Auditoría | Admin | Admin autenticado | Reporte disponible |
| 2.1 | Registrar Paciente | Tutor | Tutor autenticado | Paciente en BD |
| 2.2 | Crear Tratamiento | Tutor | Paciente existe | Medicamento en BD |
| 2.3 | Programar Horario | Tutor | Tratamiento existe | Bot enviará alertas |
| 2.4 | Ver Historial | Tutor | Paciente con datos | Tabla visible |
| 2.5 | Ver Gráficos | Tutor | 7+ días de datos | Gráficos generados |
| 2.6 | Descargar Reporte | Tutor | Paciente existe | PDF/Excel descargado |
| 2.7 | Alerta Tiempo Real | Tutor | Paciente no respondió | Notificación enviada |
| 3.1 | Recibir Alerta | Paciente | Horario programado | Mensaje en Telegram |
| 3.2 | Confirmar Sí | Paciente | Alerta recibida | MedicationLog = true |
| 3.3 | Confirmar No | Paciente | Alerta recibida | MedicationLog = false |
| 3.4 | No Responder | Sistema | 30 min sin respuesta | response = "No respondió" |
| 3.5 | Resumen Diario | Paciente | Fin del día | Resumen enviado |

---

## PRIORIDADES DE IMPLEMENTACIÓN

**CRÍTICOS (Fase 3 - Bot):**
- Caso 3.1: Recibir Alerta
- Caso 3.2: Confirmar Sí
- Caso 3.3: Confirmar No
- Caso 2.3: Programar Horario

**IMPORTANTES (Fase 3 - Dashboard):**
- Caso 2.4: Ver Historial
- Caso 2.5: Ver Gráficos
- Caso 2.7: Alertas Tiempo Real

**ESENCIALES (Fase 2 - Hecho):**
- Caso 2.1: Registrar Paciente
- Caso 2.2: Crear Tratamiento

**OPCIONALES (Después):**
- Caso 1.1: Crear Tutor (temporalmente puede ser manual)
- Caso 1.2: Auditoría
- Caso 3.5: Resumen Diario


**Última actualización:** 22/May/2026  
**Próxima tarea:** Frontend Angular Base (23-26/May)

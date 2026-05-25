# GLOSARIO Y CASOS DE USO - VIGILAMED

**Documento:** Glosario de Términos + Casos de Uso del Sistema  
**Fecha:** 22/May/2026  
**Fase:** 2 - Diseño y Datos  
**Tarea:** 4 - Glosario y Casos de Uso (16-19/May)

---

## GLOSARIO DE TÉRMINOS

Definiciones de términos clave usados en VigilaMed para que todos entendan lo mismo.

### **Conceptos Generales**

| Término | Definición |
|---------|-----------|
| **VigilaMed** | Sistema automatizado de recordatorio de medicamentos con bot de Telegram y dashboard web |
| **Sistema** | Conjunto de componentes (BD, servidor, bot, interfaz web) que trabajan juntos |
| **Usuario** | Persona que accede a VigilaMed (Administrador, Tutor o Paciente) |
| **Rol** | Tipo de usuario que determina qué acciones puede realizar |
| **Autenticación** | Proceso de verificar la identidad del usuario (login con email/contraseña) |
| **Autorización** | Proceso de verificar qué permisos tiene el usuario según su rol |

---

### **Conceptos Médicos y del Paciente**

| Término | Definición |
|---------|-----------|
| **Paciente** | Persona que necesita seguimiento en su adherencia a medicamentos |
| **Tutor** | Profesional de salud (médico, enfermero) responsable de monitorear pacientes |
| **Tratamiento** | Plan médico para un paciente que incluye medicamentos específicos |
| **Medicamento** | Fármaco (medicina) que el paciente debe tomar |
| **Dosis** | Cantidad específica del medicamento (ej: 500mg, 2 cucharadas) |
| **Adherencia** | Nivel de cumplimiento del paciente en tomar sus medicinas a tiempo |
| **Historial Médico** | Antecedentes de salud del paciente (enfermedades previas, alergias, etc.) |
| **Tratamiento Activo** | Medicamento cuya fecha de inicio ya pasó pero fecha de fin no |
| **Tratamiento Finalizado** | Medicamento cuya fecha de fin ya pasó |

---

### **Conceptos de Programación y Horarios**

| Término | Definición |
|---------|-----------|
| **MedicationSchedule** | Horario programado para recordar al paciente tomar su medicina |
| **Hora de Alerta** | Hora exacta (HH:mm) en que el sistema enviará el recordatorio |
| **Días de la Semana** | Especifica en qué días (Lun-Dom) se debe enviar la alerta |
| **Frecuencia** | Número de veces al día/semana que debe tomarse el medicamento |
| **MedicationLog** | Registro en la base de datos de cada toma de medicamento |
| **Timestamp** | Marca de tiempo (fecha y hora exacta) de un evento |
| **Confirmación** | Acción del paciente respondiendo "Sí" (tomó) o "No" (no tomó) |
| **No Respondió** | Paciente no interactuó con la alerta en el tiempo establecido |

---

### **Conceptos de Telegram y Alertas**

| Término | Definición |
|---------|-----------|
| **Bot de Telegram** | Aplicación automatizada en Telegram que envía mensajes y recibe respuestas |
| **Chat ID** | Identificador único del chat del usuario en Telegram |
| **Alert** | Mensaje de recordatorio enviado al paciente por el bot |
| **Botones Interactivos** | Opciones "Sí" y "No" que el paciente puede presionar en Telegram |
| **Callback** | Respuesta que se ejecuta cuando el usuario presiona un botón |
| **Estado de Alerta** | Condición de la alerta: `pending` (no enviada), `sent` (enviada), `failed` (fallo) |
| **Mensajería Instantánea** | Comunicación en tiempo real a través de Telegram |

---

### **Conceptos de Dashboard y Reportes**

| Término | Definición |
|---------|-----------|
| **Dashboard** | Panel de control web donde el tutor ve información del paciente |
| **Tabla de Historial** | Lista de todas las tomas del medicamento con fecha, hora y respuesta |
| **Gráfico de Adherencia** | Visualización (barras, líneas) del % de medicinas tomadas vs faltadas |
| **Indicador Visual** | Icono o color que muestra el estado (Verde=Tomó, Rojo=No tomó, Gris=Pendiente) |
| **Filtro** | Herramienta para búsqueda (por paciente, fecha, medicamento) |
| **Reporte** | Documento descargable (PDF/Excel) con datos del historial |
| **Tiempo Real** | Información que se actualiza automáticamente sin necesidad de refrescar |

---

### **Conceptos Técnicos**

| Término | Definición |
|---------|-----------|
| **Backend** | Servidor que procesa la lógica del negocio y gestiona la base de datos |
| **Frontend** | Interfaz web que ven los usuarios (Tutor en navegador) |
| **API REST** | Interfaz que permite que frontend y backend se comuniquen via HTTP |
| **Base de Datos** | MongoDB Atlas - Almacenamiento en la nube de todos los datos |
| **Modelo** | Estructura que define cómo se guardan los datos en la BD |
| **Repositorio** | Capa de acceso a datos que abstrae la lógica de lectura/escritura |
| **Use Case** | Lógica de negocio de una operación específica (ej: CreateUser, ScheduleEvent) |
| **Entity** | Objeto de dominio con identidad única (ej: Patient, Treatment) |
| **DTO** | Objeto de transferencia de datos entre capas |
| **Validación** | Verificación de que los datos cumplan reglas (tipo, rango, formato) |
| **Encriptación** | Proceso de codificar información sensible (contraseñas) |
| **WebSocket** | Conexión bidireccional para actualizaciones en tiempo real |
| **Polling** | Técnica de actualización consultando el servidor periódicamente |

---

### **Conceptos de Seguridad**

| Término | Definición |
|---------|-----------|
| **Contraseña Encriptada** | Contraseña almacenada en formato ilegible usando bcrypt |
| **Token JWT** | Credencial temporal que autentica al usuario después del login |
| **Sesión** | Período de tiempo en que un usuario está autenticado |
| **Permisos** | Acciones que el usuario puede realizar según su rol |
| **Auditoría** | Registro de quién hizo qué y cuándo en el sistema |
| **Integridad de Datos** | Garantía de que los datos no se modifiquen sin autorización |
| **Backup** | Copia de seguridad de la base de datos |

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

---

**Última actualización:** 22/May/2026  
**Próxima tarea:** Frontend Angular Base (23-26/May)

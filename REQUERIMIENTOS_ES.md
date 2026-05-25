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

**Última actualización:** 22/May/2026  
**Próximo documento:** Glosario y Casos de Uso (16-19/May)

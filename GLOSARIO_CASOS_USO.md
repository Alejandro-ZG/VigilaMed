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

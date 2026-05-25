# CRONOGRAMA - PROYECTO VIGILAMED

**Proyecto:** VigilaMed - Sistema de Vigilancia Médica  
**Objetivo:** Sistema automatizado de recordatorio de medicamentos con bot de Telegram y dashboard web  
**Fecha de Inicio:** 04/May/2026  
**Fecha de Fin Prevista:** 15/Jun/2026  
**Total:** 6 semanas

---

## FASE 1: CIMENTACIÓN (04/May - 12/May)

Preparación del terreno, creación de cuentas e instalación de herramientas necesarias.

### 1. Infraestructura y Repo (04/May - 08/May)
**Objetivo:** Crear proyecto base y conectar con GitHub

**Actividades:**
- [ ] Inicializar proyecto Node.js + TypeScript
- [ ] Crear estructura de carpetas base (backend, frontend)
- [ ] Configurar TypeScript y archivos de configuración
- [ ] Crear repositorio en GitHub
- [ ] Realizar primer commit y push

**Entrega:** Proyecto base en GitHub listo para desarrollo

---

### 2. Conexión MongoDB Atlas (11/May - 12/May)
**Objetivo:** Base de datos en la nube configurada y servidor conectado

**Actividades:**
- [ ] Crear cuenta MongoDB Atlas
- [ ] Crear cluster VigilaMedDB
- [ ] Configurar seguridad (IP whitelist, usuarios)
- [ ] Crear archivo `.env` con conexión string
- [ ] Implementar función `connectDB()` en el servidor
- [ ] Verificar conexión exitosa

**Entrega:** BD activa en internet, servidor conectado y funcional

---

### HITO: AVANCE 1 (13/May)
**Presentación:** Primera defensa ante el docente  
**Debe incluir:**
- Propuesta del proyecto revisada y aprobada
- Demostración de viabilidad
- Fundamentos bien planteados

---

## FASE 2: DISEÑO Y DATOS (14/May - 26/May)

Definición de lógica, pantallas y estructura de datos.

### 3. Requerimientos E/S (14/May - 15/May)
**Objetivo:** Documentar todas las entradas y salidas del sistema

**Actividades:**
- [ ] Definir datos de entrada (tutores, pacientes, tratamientos)
- [ ] Definir datos de salida (alertas, gráficos, reportes)
- [ ] Documentar flujos de información
- [ ] Validar con stakeholders

**Entrega:** Tabla/documento de E/S completo y detallado

---

### 4. Glosario y Casos de Uso (16/May - 19/May) COMPLETADO
**Objetivo:** Definir terminología y casos de uso por rol

**Actividades:**
- [x] Crear glosario de términos técnicos (35 términos)
- [x] Documentar roles: Administrador, Tutor, Paciente
- [x] Diagramar casos de uso (UML)
- [x] Documentar flujos principales de cada rol

**Entrega:** Glosario + 14 casos de uso + diagramas de flujo COMPLETADO

---

### 5. Backend: Mongoose Models (20/May - 23/May)
**Objetivo:** Estructuras de datos en MongoDB

**Modelos a crear:**
- [ ] **User Model** - Usuarios del sistema (tutores, admins)
- [ ] **Patient Model** - Datos de pacientes
- [ ] **Treatment Model** - Tratamientos y medicamentos
- [ ] **MedicationSchedule Model** - Horarios de tomas
- [ ] **MedicationLog Model** - Historial de confirmaciones
- [ ] **Alert Model** - Alertas enviadas

**Campos por Modelo:**

**User:**
- id, name, email, password, role, createdAt, updatedAt

**Patient:**
- id, name, age, medicalHistory, tutorId, createdAt, updatedAt

**Treatment:**
- id, patientId, medicationName, dosage, startDate, endDate, notes

**MedicationSchedule:**
- id, treatmentId, time, daysOfWeek, createdAt

**MedicationLog:**
- id, scheduleId, patientId, timestamp, confirmed, response, createdAt

**Alert:**
- id, medicationLogId, telegramChatId, sentAt, status

**Entrega:** Modelos TypeScript + schemas Mongoose validados

---

### 6. Frontend: Base Angular (23/May - 26/May)
**Objetivo:** Pantallas iniciales del cliente web

**Pantallas a crear:**
- [ ] Pantalla de Login
- [ ] Pantalla de Registro
- [ ] Menú Principal
- [ ] Sección de Pacientes (listado básico)

**Diseño:**
- [ ] Paleta de colores: Azules y blancos
- [ ] Responsive (móvil y desktop)
- [ ] Componentes reutilizables

**Entrega:** Pantallas diseñadas y estructuradas (sin datos reales aún)

---

### HITO: AVANCE 2 (27/May)
**Presentación:** Segunda defensa ante el docente  
**Debe incluir:**
- Base de datos funcionando
- Servidor respondiendo correctamente
- Diseño visual de pantallas web
- Diagramas técnicos finales

---

## FASE 3: CONSTRUCCIÓN Y DESPLIEGUE (28/May - 15/Jun)

Integración completa y funcionalidad en vivo.

### 7. Backend: Bot Telegram (28/May - 05/Jun)
**Objetivo:** Bot automatizado enviando alertas y guardando respuestas

**Actividades:**
- [ ] Crear bot en BotFather (Telegram)
- [ ] Implementar conexión Telegram API
- [ ] Programar envío de mensajes a horas específicas
- [ ] Implementar botones "Sí/No" interactivos
- [ ] Guardar respuestas en base de datos
- [ ] Manejar errores y reintentos
- [ ] Logging y monitoreo

**Funcionalidades:**
- Envío automático de recordatorios
- Recepción de respuestas del paciente
- Actualización de historial de tomas
- Notificaciones al tutor en tiempo real

**Entrega:** Bot Telegram completamente funcional y probado

---

### 8. Frontend: Dashboards (06/Jun - 10/Jun)
**Objetivo:** Panel de control con datos en tiempo real

**Componentes:**
- [ ] Dashboard principal del Tutor
- [ ] Tabla de historial de tomas
- [ ] Gráficos de adherencia (barras, líneas)
- [ ] Indicadores de estado
- [ ] Filtros por fecha y paciente
- [ ] Alertas visuales

**Integración:**
- [ ] Conectar con API del servidor
- [ ] Actualización en tiempo real (WebSockets o polling)
- [ ] Autenticación y autorización

**Entrega:** Dashboard completo con datos reales actualizándose

---

### 9. Manuales y QA (11/Jun - 14/Jun)
**Objetivo:** Sistema probado y documentado

**QA (Control de Calidad):**
- [ ] Pruebas funcionales end-to-end
- [ ] Pruebas de alertas a horas exactas
- [ ] Validación de datos en historial
- [ ] Pruebas de seguridad
- [ ] Pruebas de rendimiento
- [ ] Pruebas en múltiples dispositivos

**Documentación:**
- [ ] Manual Técnico (arquitectura, APIs, instalación)
- [ ] Manual de Usuario (cómo usar el sistema)
- [ ] Reporte de bugs encontrados y solucionados

**Entrega:** Sistema sin errores críticos + Manuales en PDF

---

### HITO: ENTREGA FINAL (15/Jun)
**Presentación:** Defensa final ante terna evaluadora  
**Debe incluir:**
- Sistema VigilaMed al 100% funcional
- Página web completa
- Bot Telegram automatizado
- Base de datos en la nube
- Todos los componentes trabajando juntos sin fallas
- Documentación completa

**Resultado:** Proyecto aprobado y listo para producción

---

## ESTADO DEL PROYECTO

| Fase | Estado | Progreso |
|------|--------|----------|
| 1. Cimentación | Completada | 100% |
| 2. Diseño y Datos | En Progreso | 80% |
| 3. Construcción | Pendiente | 0% |

---

## UBICACIÓN ACTUAL (Estado al 22/May)

Estamos en la **FASE 2: DISEÑO Y DATOS**, completadas tareas 1-5, en camino al **Hito 2 (27/May)**.

**Completado HOY (22/May):**
- Tarea 3: Requerimientos E/S (REQUERIMIENTOS_ES.md)
- Tarea 4: Glosario y Casos de Uso (GLOSARIO_CASOS_USO.md)
  - 35 términos en glosario
  - 14 casos de uso detallados (Admin, Tutor, Paciente)
  - Diagramas de flujo y relaciones
  - Matriz de priorización

**Completado anteriormente:**
- Tarea 1: Infraestructura y Repo
- Tarea 2: MongoDB Connection
- Tarea 5: Backend Mongoose Models (6 modelos + repositorios + entidades)

**Próximas tareas (esta semana):**
1. Requerimientos E/S - HECHO
2. Glosario y Casos de Uso - HECHO
3. Frontend Angular Base (23-26/May) - PRÓXIMO
4. Hito 2 (27/May) - Presentación final

---

## 📝 NOTAS IMPORTANTES

- Mantener commits frecuentes en GitHub
- Documentar decisiones de diseño
- Validar con el docente antes de pasar a fase siguiente
- Hacer backups regulares
- Comunicar avances semanales

---

**Última actualización:** 22/May/2026  
**Próxima revisión:** 25/May/2026

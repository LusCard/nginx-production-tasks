# Actividad Práctica — Gestor de Tareas con Nginx, Docker y TypeScript

## Objetivo general

Desarrollar una aplicación web completa con **frontend, backend y base de datos**, en la que **Nginx** actúe como **proxy reverso** para gestionar las peticiones entre ambos servicios.  
La actividad busca integrar todos los componentes dentro de **contenedores Docker** y comprender cómo se comunican entre sí a través de **Docker Compose**.

---

## Requerimientos funcionales

### 1. Funcionalidad general

Desarrollar un **Gestor de Tareas** que permita realizar un CRUD completo:

- **Crear** una nueva tarea.
- **Listar** todas las tareas existentes.
- **Editar** una tarea.
- **Eliminar** una tarea.

Cada tarea debe tener como mínimo los siguientes campos:

- `id`
- `titulo`
- `descripcion`
- `estado` (“pendiente” o “completada”)

---

### 2. Backend

- Debe estar desarrollado en **Node.js + Express + TypeScript**.
- Exponer un **API REST** en `/api/tasks` con los endpoints de CRUD.
- Conectarse a una **base de datos** (MySQL, PostgreSQL o MongoDB).
- Utilizar variables de entorno para las configuraciones (archivo `.env`).
- Manejar respuestas con los códigos HTTP correspondientes.
- Incluir tipado fuerte (interfaces, DTOs, etc.).

---

### 3. Frontend

- Desarrollado con **HTML, CSS y JavaScript vanilla**, o con **React + Vite**.
- Debe consumir la API del backend utilizando `fetch` o `axios`.
- Mostrar el listado de tareas y permitir su creación, edición y eliminación.
- Comunicar errores o estados de carga al usuario.

---

### 4. Nginx

- Debe actuar como **proxy reverso** entre el frontend y el backend.
- El servidor debe:
  - Servir el **frontend** al ingresar en `http://localhost/`
  - Redirigir las peticiones del **API** hacia el backend en `http://localhost/api/`
- Se debe incluir un archivo de configuración `nginx.conf` personalizado.

---

### 5. Docker y Docker Compose

- Todos los servicios deben ejecutarse mediante contenedores:
  - `backend`
  - `frontend`
  - `db`
  - `nginx`
- El entorno debe iniciarse con un único comando:
  ```bash
  docker-compose up --build -d
  ```

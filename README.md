
# 📚 E-commerce de Libros

Este es un proyecto Full Stack desarrollado con **React**, **Node.js**, **Express** y **MongoDB**, que simula un e-commerce de libros con funcionalidades completas de carrito, login y administración.

---

## 🚀 Tecnologías utilizadas

- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB (con Atlas)
- **Estilos**: CSS con variables personalizadas
- **Manejo de imágenes**: subida y almacenamiento en carpeta `/uploads`

---

## 🛠️ Instalación y ejecución

### 🔙 Backend

1. Clonar el proyecto y entrar a la carpeta del backend:
   ```bash
   cd 01-Back-end-ecommerce
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear un archivo `.env` con las siguientes variables (podés usar `.env.example` como guía):

   ```
   PORT=4000
   MONGO_URI=tu_conexion_a_mongodb
   SECRET=una_clave_secreta_para_tokens
   ```

4. Levantar el servidor:
   ```bash
   npm run dev
   ```

   El backend se ejecutará en `http://localhost:4000`

---

### 💻 Frontend

1. Entrar a la carpeta del frontend:
   ```bash
   cd Integrador_Dani-Brown-ENTREGA-2-FINAL
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear un archivo `.env` con estas variables:

   ```
   VITE_API_URL=http://localhost:4000/api
   VITE_API_URL_FILES=http://localhost:4000
   ```

4. Ejecutar la aplicación:
   ```bash
   npm run dev
   ```

   Se abrirá en `http://localhost:5173`

---

## 🎯 Funcionalidades implementadas

- Catálogo de libros 
- Página de detalle del producto
- Carrito persistente con cantidad seleccionada
- Registro y login de usuarios
- Panel de administración:
  - CRUD de productos con subida de imágenes
  - Tabla de usuarios (con opción de eliminar)
- Rutas protegidas para admin y usuario autenticado

---

## 👩‍💻 Autora

**Daniela Brown**  
Bootcamp Full Stack – EDUCACIÓN IT  
Tercera Entrega – Proyecto Integrador




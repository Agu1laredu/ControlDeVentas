
# Sistema de Control de Ventas con React, TypeScript, Vite y Styled-components
Descripción del Proyecto
Este proyecto nace de la necesidad de establecer un control efectivo de las ventas en un emprendimiento familiar. Actualmente, la administración de ventas carece de un proceso estructurado, lo que motiva la creación de esta aplicación para simplificar y mejorar la gestión de ventas.

## Funcionalidades Principales
1. Registro de Productos
El sistema permite registrar nuevos productos de manera sencilla. Cada producto deberá incluir información básica como nombre, precio y talla. Estos productos se añaden a la lista de productos disponibles para su posterior registro en las ventas.

2. Registro de Clientes
Los clientes también pueden ser registrados en la plataforma. Los datos requeridos incluyen nombre, apellido y número de teléfono. Estos registros de clientes se utilizan para asociar las ventas a clientes específicos.

3. Registro de Ventas y Generación de PDF
La aplicación registra las interacciones entre productos y clientes como ventas. Cuando se realiza una venta, se genera un PDF con información detallada de la transacción. Además, el monto de la venta se suma al total del mes en curso. Al finalizar cada mes, se genera un PDF con un resumen de todas las ventas del mes.

4. Gestión de Usuarios
Se implementará un sistema de usuarios para almacenar todas las transacciones realizadas por cada usuario. Esto garantiza la trazabilidad de las acciones realizadas en la plataforma.

## Componentes y Tareas Requeridas
Para lograr estas funcionalidades, el proyecto se dividirá en las siguientes partes:

1. Backend de Usuario
Se desarrollará un backend que gestionará la autenticación de usuarios y almacenará las transacciones realizadas.

2. Sistema CRUD (Crear, Leer, Actualizar, Eliminar)
Se creará un sistema CRUD tanto para clientes como para productos en el backend. Esto permitirá la gestión completa de registros.

3. Funcionalidades del Sistema CRUD en el Frontend
Se implementará la interfaz de usuario para interactuar con el sistema CRUD. Los usuarios podrán crear, eliminar, editar y agregar clientes y productos.

4. Diseño Adaptativo
La interfaz de usuario será adaptable y responsive, brindando una experiencia óptima en dispositivos de escritorio y tabletas.
5. Interacción de Ventas
Se desarrollarán dropdowns para buscar productos y clientes al registrar una venta. Esto facilitará la selección del cliente que realiza la compra, los productos adquiridos y sus cantidades. Esta información se registrará en el historial del cliente y en los registros de ventas mensuales.

6. Instrucciones para Ejecutar el Proyecto
Para levantar el proyecto en tu entorno de desarrollo, sigue estos pasos:

- Clona el repositorio a tu máquina local.
- Ejecuta el comando yarn install para instalar las dependencias del proyecto.
- Inicia la aplicación con yarn run dev.


¡Disfruta de una gestión eficiente de ventas con esta aplicación! Siéntete libre de contribuir y mejorarlo según tus necesidades.
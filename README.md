# React + TypeScript + Vite + Styled-components


# ¿De que consta el proyecto? 

- Es un proyecto fomentado por la idea de falta de control de las ventas en un Emprendimiento familiar , este carece de tal practica y para solucionar la simpletud con la que se introducira esta nueva practica de administración se dará vida a este proyecto 

# Sistema de control de ventas : 


[Añadir-Un-Producto]

- Este proyecto tendra la capacidad de registrar un nuevo producto cuando se lo tenga/ desee para asi añadirlo a la lista de productos que se utilizara para el registro de ventas, el producto debera requerir cierta información o requisitos ( nombre producto, precio, talle  )


[Añadir-Un-Cliente]

- Este proyecto tendra la capacidad de registrar un nuevo cliente cuando se lo tenga/ desee para asi añadirlo a la lista de clientes que se utilizara para el registro de ventas , el producto debera requerir cierta información o requisitos ( nombre , apellido, telefono  )

[Registrar-La-Venta-y-Generar-PDF]


- Se registrar la interaccion que tendran los productos y los clientes tomandolas como ventas, en base a esta información primero, por darse el hecho se creara un pdf con la imformacion detallada de la transaccion y luego el monto adquiirido pasara a sumar en la cantidad de dineri que se registra en el mes adquirido por estos procesos  ( al terminar un mes y comenzar otro, este contador debera reiniciarse para no confundir el momento en que se esta ejecutando )

- Al finalizar cada mes tambien se generara un pdf con la informacion detallada de cada mes 
# para lograr esto se necesita : 

[Usuario] : Se debera crear un backend para un sistema de ususario y asi poder dejar guardado en la base de datos todas las transacciones realizadas por el dicho usuario 

- [sistema-crud] : Este consta de la lista para poder crear, eliminar, editar y agregar tanto un cliente como un producto  ( #Backend )
- [Funcionalidades-Sistema-Crud] : Crear TableData y conectarla a la DB para poder realizar las funcionalidades de sistema crud ( #FrontEnd )
- [diseño-adaptativo-pc-tablet] : Crear diseño adaptativo-responsive  ( #FrontEnd )
- [Interacción-De-Venta] :  se debera crear drowpdowns donde se puedan buscar tanto los productos como los clientes para elegir que cliente realiza la compra y que producto esta comprando y sus cantidades, en base a este suceso se crea el registro al cliente sumandoselo en su historial y en nuestro registro y a la vez sumando los montos de lo vendido a nuestro registro final del mes 


# Para levantar el proyecto sigue el siguiente proceso: 
- clonar el repositorio
- yarn install 
- yarn run dev 



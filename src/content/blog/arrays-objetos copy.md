---
title: "Introducción al DOM y su Manipulación"
description: "El Document Object Model (DOM) es una interfaz de programación para documentos HTML y XML."
pubDate: "Feb 18 2024"
heroImage: "../img/img_blog/sofi_funko.webp"
---

El Document Object Model (DOM) es una interfaz de programación para documentos HTML y XML. Representa la estructura del documento como un árbol de nodos, lo que permite a los desarrolladores acceder, manipular y actualizar dinámicamente los elementos y contenido de una página web utilizando JavaScript u otras tecnologías basadas en navegador.
![Sofi Funko](/img/img_blog/sofi_funko.webp)


## **Conceptos Clave**


1. **Nodos**: En el DOM, cada parte del documento, como elementos HTML, atributos, texto, comentarios, etc., se representa como un nodo. Los nodos pueden tener relaciones padre-hijo y pueden ser accedidos, modificados y eliminados mediante programación.



2. **Árbol de Nodos**: El DOM organiza los nodos en una estructura de árbol, donde el nodo raíz es el documento completo y los demás nodos son sus descendientes. Esta estructura jerárquica facilita la navegación y manipulación de los elementos del documento.

3. **Elementos**: Son los nodos que representan las etiquetas HTML en el documento, como `<div>`, `<p>`, `<h1>`, etc. Cada elemento puede tener atributos y contenido asociado.

4. **Atributos**: Son características adicionales de un elemento que se especifican en la etiqueta de apertura, como `id`, `class`, `src`, etc. Los atributos pueden ser accedidos y modificados mediante JavaScript para cambiar el comportamiento o estilo de un elemento.

5. **Eventos**: El DOM permite la interacción con los usuarios a través de eventos, como clics de mouse, pulsaciones de teclas, cambios de formulario, etc. Los eventos pueden ser escuchados y manejados con JavaScript para realizar acciones específicas en respuesta a las acciones del usuario.

6. **Selección de Elementos**: Los desarrolladores pueden seleccionar elementos del DOM utilizando varios métodos, como `getElementById()`, `querySelector()`, `getElementsByClassName()`, etc. Estos métodos permiten acceder a elementos específicos según su ID, clase, etiqueta u otros criterios de selección.

![tipos de Nodos](/img/img_blog/tipos_nodos.webp)

## **Métodos para Modificar el DOM con JavaScript**

1. **getElementById()**: Retorna el primer elemento que tenga el valor del atributo `id` especificado.

2. **querySelector()**: Retorna el primer elemento que coincida con un selector CSS especificado en el documento.

3. **createElement()**: Crea un nuevo elemento con el nombre de etiqueta especificado.

4. **appendChild()**: Agrega un nodo como el último hijo de un nodo padre especificado.

5. **innerHTML**: Proporciona o devuelve el contenido HTML de un elemento y permite cambiar el contenido HTML de un elemento.

6. **classList**: Proporciona métodos para agregar, quitar y alternar clases CSS en un elemento, lo que facilita la manipulación de estilos dinámicamente.

## **Ejemplos de Uso de Métodos**



## **Accediendo a Hijos/Padres de un Elemento**

Además de manipular directamente los hijos de un elemento, a menudo es útil poder acceder a los elementos padres e hijos de un elemento en el DOM. Aquí tienes algunos ejemplos de cómo hacerlo:

1. **Acceder al padre de un elemento**

Supongamos que queremos resaltar el fondo de un párrafo cuando se hace clic en él, pero también queremos cambiar el fondo del contenedor del párrafo. Podemos lograr esto accediendo al padre del párrafo:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Accediendo a Padres/Hijos del DOM</title>
    <style>
        .resaltado {
            background-color: yellow;
        }
    </style>
</head>
<body>
    <div id="contenedor">
        <p onclick="resaltarElemento(this)">Haz clic aquí</p>
    </div>
    <script>
        function resaltarElemento(elemento) {
            elemento.classList.add('resaltado');
            const padre = elemento.parentNode;
            padre.style.backgroundColor = 'lightblue';
        }
    </script>
</body>
</html>
```

En este ejemplo, al hacer clic en el párrafo, se ejecuta la función `resaltarElemento()`, pasando el párrafo como argumento. Dentro de esta función, agregamos la clase 'resaltado' al párrafo para resaltar su fondo. Luego, accedemos al padre del párrafo con `parentNode` y cambiamos el color de fondo del contenedor.

2. **Acceder a los hijos de un elemento**

Supongamos que queremos contar el número de elementos hijos de un contenedor y mostrar este número en un mensaje. Podemos lograr esto accediendo a la lista de hijos del contenedor:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Accediendo a Padres/Hijos del DOM</title>
</head>
<body>
    <div id="contenedor">
        <p>Primer párrafo</p>
        <p>Segundo párrafo</p>
        <p>Tercer párrafo</p>
    </div>
    <button onclick="contarHijos()">Contar Hijos</button>
    <script>
        function contarHijos() {
            const contenedor = document.getElementById('contenedor');
            const cantidadHijos = contenedor.children.length;
            alert('El contenedor tiene ' + cantidadHijos + ' hijos.');
        }
    </script>
</body>
</html>
```

En este ejemplo, al hacer clic en el botón "Contar Hijos", se ejecuta la función `contarHijos()`. Dentro de esta función, seleccionamos el contenedor `<div>` mediante `getElementById('contenedor')` y luego accedemos a su lista de hijos con `children`. Calculamos la longitud de esta lista para obtener el número de hijos y mostramos este número en un mensaje de alerta.



## **Creación de Nuevos Elementos**

Además de acceder y modificar elementos existentes en el DOM, es común crear nuevos elementos dinámicamente y agregarlos a la página web según sea necesario. Aquí tienes algunos ejemplos de cómo puedes crear y agregar nuevos elementos al DOM:

1. **Crear un nuevo elemento y agregarlo como hijo de otro elemento**

Supongamos que queremos agregar un nuevo elemento de lista `<li>` a una lista desordenada `<ul>` cada vez que el usuario haga clic en un botón:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Creación de Nuevos Elementos en el DOM</title>
</head>
<body>
    <ul id="miLista">
        <li>Elemento 1</li>
        <li>Elemento 2</li>
        <li>Elemento 3</li>
    </ul>
    <button onclick="agregarElemento()">Agregar Elemento</button>
    <script>
        function agregarElemento() {
            const lista = document.getElementById('miLista');
            const nuevoElemento = document.createElement('li');
            nuevoElemento.textContent = 'Nuevo elemento';
            lista.appendChild(nuevoElemento);
        }
    </script>
</body>
</html>
```

En este ejemplo, al hacer clic en el botón "Agregar Elemento", se ejecuta la función `agregarElemento()`. Dentro de esta función, creamos un nuevo elemento `<li>` con `createElement('li')` y le asignamos el texto 'Nuevo elemento' con `textContent`. Luego, utilizamos `appendChild(nuevoElemento)` para agregar este nuevo elemento como el último hijo de la lista desordenada.

2. **Crear un nuevo elemento con atributos y estilos**

Supongamos que queremos crear un nuevo botón con un texto personalizado y un estilo específico:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Creación de Nuevos Elementos en el DOM</title>
    <style>
        .botonPersonalizado {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="contenedorBoton"></div>
    <script>
        const contenedor = document.getElementById('contenedorBoton');
        const nuevoBoton = document.createElement('button');
        nuevoBoton.textContent = 'Haz clic aquí';
        nuevoBoton.classList.add('botonPersonalizado');
        contenedor.appendChild(nuevoBoton);
    </script>
</body>
</html>
```

En este ejemplo, creamos un nuevo botón utilizando `createElement('button')` y le asignamos el texto 'Haz clic aquí' con `textContent`. Luego, agregamos la clase 'botonPersonalizado' al botón con `classList.add('botonPersonalizado')` para aplicar estilos CSS personalizados. Finalmente, utilizamos `appendChild(nuevoBoton)` para agregar este nuevo botón como hijo del contenedor.

**Añadiendo Elementos al DOM**

Una de las capacidades fundamentales de JavaScript en la manipulación del DOM es la capacidad de agregar nuevos elementos al árbol de documentos de manera dinámica. Aquí hay algunos ejemplos de cómo puedes hacerlo:

1. **Añadir un nuevo párrafo al final del cuerpo del documento:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Añadir elementos al DOM</title>
</head>
<body>
    <script>
        // Crear un nuevo elemento de párrafo
        const nuevoParrafo = document.createElement('p');
        // Asignar texto al párrafo
        nuevoParrafo.textContent = 'Este es un nuevo párrafo añadido dinámicamente.';
        // Agregar el párrafo al final del cuerpo del documento
        document.body.appendChild(nuevoParrafo);
    </script>
</body>
</html>
```

En este ejemplo, se crea un nuevo elemento de párrafo utilizando `document.createElement('p')`, se le asigna texto utilizando la propiedad `textContent`, y luego se agrega al final del cuerpo del documento utilizando `document.body.appendChild(nuevoParrafo)`.
```html
<!DOCTYPE html>
<html>
<head>
    <title>Manipulación del DOM</title>
    <style>
        .resaltado {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="contenedor"></div>
    <button onclick="agregarElemento()">Agregar Elemento</button>
    <script>
        function agregarElemento() {
            const padre = document.getElementById('contenedor');
            const nuevoElemento = document.createElement('p');
            nuevoElemento.innerHTML = 'Nuevo elemento';
            nuevoElemento.classList.add('resaltado');
            padre.appendChild(nuevoElemento);
        }
    </script>
</body>
</html>

```

Este código crea un nuevo párrafo cuando se hace clic en el botón "Agregar Elemento", le asigna contenido y una clase, y lo agrega como hijo del div con el id 'contenedor'.

2. **Añadir un nuevo elemento a un contenedor específico:**


```html
<!DOCTYPE html>
<html>
<head>
    <title>Añadir elementos al DOM</title>
</head>
<body>
    <div id="contenedor">
        <!-- Este es el contenedor donde se añadirá el nuevo elemento -->
    </div>
    <script>
        // Obtener el contenedor
        const contenedor = document.getElementById('contenedor');
        // Crear un nuevo elemento de enlace
        const nuevoEnlace = document.createElement('a');
        // Asignar atributos al enlace
        nuevoEnlace.href = 'https://itssofi.dev/';
        nuevoEnlace.textContent = 'Mi portafolio';
        // Agregar el enlace al contenedor
        contenedor.appendChild(nuevoEnlace);
    </script>
</body>
</html>
```

En este ejemplo, se obtiene el contenedor mediante `document.getElementById('contenedor')`, se crea un nuevo elemento de enlace con `document.createElement('a')`, se le asignan atributos como `href` y `textContent`, y luego se agrega al contenedor utilizando `contenedor.appendChild(nuevoEnlace)`.



## **Recap: Más Ejemplos de Manipulación del DOM**

1. Cambiar el contenido de un elemento existente:

```javascript
const elemento = document.getElementById('miElemento');
elemento.innerHTML = 'Nuevo contenido';
```

2. Eliminar un elemento del DOM:

```javascript
const elemento = document.getElementById('elementoAEliminar');
elemento.parentNode.removeChild(elemento);
```

3. Agregar un manejador de eventos a un elemento:

```javascript
const boton = document.getElementById('miBoton');
boton.addEventListener('click', function() {
    alert('¡Haz hecho clic en el botón!');
});
```

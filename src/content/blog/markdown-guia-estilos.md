---
title: 'Guía de estilo de Markdown'
description: 'Aprende las bases para escribir en Markdown'
pubDate: 'Nov 11 2023'
heroImage: '../img/IA_coca.webp'
---

Aquí tienes una muestra de la sintaxis básica de Markdown que puedes usar al escribir contenido en Astro o cualquier otro editor que soporte Markdown 🖤.


## Encabezados

Los siguientes elementos HTML `<h1>`—`<h6>` representan seis niveles de encabezados de sección. `<h1>` es el nivel de sección más alto, mientras que `<h6>` es el más bajo.

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Párrafos

Markdown no requiere etiquetas especiales para los párrafos. Simplemente separa cada párrafo con una línea en blanco.

## Imágenes

#### Sintaxis

```markdown
![Texto alternativo](./ruta/completa/o/relativa/de/la/imagen)
```

#### Salida

![Marcador de posición del blog](/img/IA_coca.webp)

## Citas

El elemento de cita representa contenido que se cita de otra fuente, opcionalmente con una cita que debe estar dentro de un elemento `footer` o `cite`, y opcionalmente con cambios en línea como anotaciones y abreviaturas.

### Cita sin atribución

#### Sintaxis

```markdown
> Esto es una cita.  
> **Nota** que puedes usar _sintaxis de Markdown_ dentro de una cita.
```

#### Salida

> Esto es una cita.  
> **Nota** que puedes usar _sintaxis de Markdown_ dentro de una cita.

### Cita con atribución

#### Sintaxis

```markdown
> No te comuniques compartiendo memoria, comparte memoria comunicándote.<br>
> — <cite>Rob Pike</cite>
```

#### Salida

> No te comuniques compartiendo memoria, comparte memoria comunicándote.<br>
> — <cite>Rob Pike</cite>

: La cita anterior está extraída de la [charla](https://www.youtube.com/watch?v=PAAkCSZUG1c) de Rob Pike durante Gopherfest, el 18 de noviembre de 2015.

## Tablas

#### Sintaxis

```markdown
| Cursiva   | Negrita     | Código   |
| --------- | -------- | ------ |
| _cursiva_ | **negrita** | `código` |
```

#### Salida

| Cursiva   | Negrita     | Código   |
| --------- | -------- | ------ |
| _cursiva_ | **negrita** | `código` |

## Bloques de código

#### Sintaxis

Podemos usar 3 comillas invertidas ``` en una nueva línea y escribir el fragmento de código y cerrar con 3 comillas invertidas en una nueva línea y para resaltar la sintaxis específica del lenguaje, escribir una palabra del nombre del lenguaje después de las primeras 3 comillas invertidas, por ejemplo, html, javascript, css, markdown, typescript, txt, bash

````markdown
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Documento HTML5 de ejemplo</title>
  </head>
  <body>
    <p>Prueba</p>
  </body>
</html>
```
````

Salida

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Documento HTML5 de ejemplo</title>
  </head>
  <body>
    <p>Prueba</p>
  </body>
</html>
```

## Tipos de listas

### Lista ordenada

#### Sintaxis

```markdown
1. Primer elemento
2. Segundo elemento
3. Tercer elemento
```

#### Salida

1. Primer elemento
2. Segundo elemento
3. Tercer elemento

### Lista desordenada

#### Sintaxis

```markdown
- Elemento de la lista
- Otro elemento
- Y otro elemento más
```

#### Salida

- Elemento de la lista
- Otro elemento
- Y otro elemento más

### Lista anidada

#### Sintaxis

```markdown
1. Primer elemento
   - Elemento anidado
   - Otro elemento anidado
2. Segundo elemento
   - Elemento anidado
   - Otro elemento anidado
```

#### Salida

1. Primer elemento
   - Elemento anidado
   - Otro elemento anidado
2. Segundo elemento
   - Elemento anidado
   - Otro elemento anidado
```
---
title: "Javascript: Condicionales"
description: "Aprenderemos sobre condiciones en Javascript así como su implementación"
pubDate: "Jan 18 2024"
heroImage: "../img/img_blog/sofiRed.webp"
---
**Tomando Decisiones en JavaScript: El Poder de las Estructuras de Control de Flujo**

En el mundo de la programación, la capacidad de tomar decisiones es esencial para escribir código dinámico y adaptativo. En JavaScript, una de las herramientas clave para este propósito es la estructura de control de flujo `if`. Acompáñame mientras exploramos el uso de `if` y sus variantes.

![sofi](/img/img_blog/sofiRed.webp)

### 1. if-else: Tomando Rutas Diferentes

La estructura `if-else` nos permite ejecutar bloques de código diferentes según si una condición es verdadera o falsa. Veamos un ejemplo práctico:

```javascript
let edad = 18;

if (edad >= 18) {
  console.log("Eres mayor de edad");
} else {
  console.log("Eres menor de edad");
}
```

Aquí, el programa decide si una persona es mayor o menor de edad, imprimiendo el mensaje correspondiente. Es como tener dos caminos posibles en una encrucijada.


### 2. if-else if-else: Navegando Entre Opciones

Para situaciones más complejas con múltiples condiciones, podemos usar `else if` para evaluar casos adicionales:

```javascript
let hora = 14;

if (hora < 12) {
  console.log("Buenos días");
} else if (hora < 18) {
  console.log("Buenas tardes");
} else {
  console.log("Buenas noches");
}
```

Aquí, el programa saluda según la hora del día, brindando mensajes personalizados para la mañana, tarde y noche.

### 3. Operador Ternario: Elegancia en una Línea

El operador ternario es una forma concisa de expresar estructuras `if-else` en una sola línea:

```javascript
let esMayor = edad >= 18 ? "Mayor de edad" : "Menor de edad";
console.log(esMayor);
```

Este enfoque es especialmente útil cuando deseas asignar un valor basado en una condición de manera eficiente.

### 4. switch: Una Alternativa Estructurada

`switch` es ideal cuando tienes múltiples casos y deseas ejecutar diferentes bloques de código según el valor de una expresión:

```javascript
let diaDeLaSemana = "Lunes";

switch (diaDeLaSemana) {
  case "Lunes":
    console.log("Comienzo de la semana");
    break;
  case "Viernes":
    console.log("¡Viernes, por fin!");
    break;
  default:
    console.log("Es otro día de la semana");
}
```

Esta construcción es como un menú de opciones, donde el código se dirige al caso correspondiente.

### 5. Truthy y Falsy: Más Allá de lo Estrictamente Verdadero o Falso

En contextos booleanos, los valores pueden ser evaluados como `truthy` o `falsy`. Esto puede ser aprovechado en declaraciones `if` de la siguiente manera:

```javascript
let nombre = "";

if (nombre) {
  console.log("El nombre es truthy");
} else {
  console.log("El nombre es falsy");
}
```

Aquí, el programa determina si el nombre es considerado "truthy" o "falsy" en un contexto booleano.

Al comprender estas estructuras de control de flujo en JavaScript, te equipas con poderosas herramientas para guiar el comportamiento de tu código. ¡Explora, experimenta y toma decisiones informadas en tus programas!
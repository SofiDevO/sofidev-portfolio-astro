---
title: "Aprende a resolver el desafío de FizzBuzz"
description: "Resolviendo pruebas técnicas: FizzBuzz"
pubDate: "Mar 06 2024"
heroImage: "../img/img_blog/sofi_code.webp"

---
### Guía paso a paso para resolver el desafío FizzBuzz

El desafío FizzBuzz es uno de los desafíos más comunes  en entrevistas de trabajo. el objetivo es poner a prueba la capacidad de un candidato para escribir código básico y comprender conceptos fundamentales como bucles, condicionales y operaciones aritméticas. En esta guía, desglosaremos el problema paso a paso y explicaremos cómo resolverlo.

![Sofi image IA, coding](/img/img_blog/sofi_code.webp)

### Introducción a los múltiplos en matemáticas

Antes de comenzara ver la solución de FizzBuzz, es importante que puedas comprender qué son los múltiplos en matemáticas, ya que de esto va la cosa.
Y es que de nada sirve que memorices como hacerlo si al final de cuentas, no estás comprendiendo lo que estás escribiendo. Así que si ya tienes claro qué son los multiplos y como se obtienen, sáltate esta parte.

Un múltiplo de un número es simplemente otro número que resulta de multiplicar ese número por un entero. Por ejemplo, los primeros múltiplos de 3 son 3, 6, 9, 12, etc., ya que son obtenidos al multiplicar 3 por 1, 2, 3, 4, etc., respectivamente.
```javascript
Para encontrar los múltiplos de 3:
- Multiplicamos el número base (3) por los enteros sucesivos:
   3 * 1 = 3
   3 * 2 = 6
   3 * 3 = 9
   3 * 4 = 12
   y así sucesivamente
```
#### El múltiplo común

Cuando hablamos de múltiplos comunes, nos referimos a números que son múltiplos de dos o más números al mismo tiempo. Por ejemplo, los múltiplos comunes de 3 y 5 son números que son divisibles tanto por 3 como por 5. En matemáticas, podemos encontrar el múltiplo común más bajo de dos números utilizando el concepto de mínimo común múltiplo (mcm).

```javascript
Para encontrar el múltiplo común de dos números (a y b):
- Identificamos los múltiplos de cada número por separado.
- Buscamos el primer número que aparece en ambos conjuntos de múltiplos.

Por ejemplo, para encontrar el múltiplo común de 3 y 5:
- Multiplicamos cada número base (3 y 5) por los enteros sucesivos:
  Múltiplos de 3: 3, 6, 9, 12,13, 14, 15 ...
  Múltiplos de 5: 5, 10, 15, 20, ...
- Observamos que el primer número
  que aparece en ambos conjuntos de múltiplos es 15.
- Por lo tanto, 15 es el múltiplo común más bajo de 3 y 5.

```
### Entendiendo la logica de obtener un multiplo
Para determinar qué números no son múltiplos de un número dado **(por ejemplo, 3)**, puedes utilizar el operador de residuo ``(%)``.

#### Es o no multiplo

Si un número no es divisible por 3 (es decir, el resto de la división por 3 no es cero), entonces ese número no es un múltiplo de 3.


`Para cada número entero desde 1 hasta n: Si el número % 3  es igual a 0: Ese número  es un múltiplo de 3.`
En este código,` % ` es el operador de módulo, que devuelve el resto de la división entre dos números. **Si el resto de la división entre un número y 3  es cero**, significa que ese número  es un múltiplo de 3.

Por ejemplo, si aplicamos este código a los números del 1 al 10,
encontraremos que `los números que no son múltiplos de 3 son: 1, 2, 4, 5, 7, 8, 10.`
Esto se debe a que cuando dividimos estos números por 3, no obtenemos un residuo igual a cero.

```javascript
//ejemplo Si es multiplo

let residuo = 3 %3;

console.log(residuo);

//ejemplo NO es multiplo

let residuo = 5 %3;

console.log(residuo);
```

Ahora que hemos repasado estos conceptos básicos, podemos abordar el desafío de FizzBuzz.

## El reto
```javascript
// Escribe un programa que muestre por consola  los
//  números de 1 a 100 (ambos incluidos y con un salto de línea entre
//  cada impresión), sustituyendo los siguientes:
//  - Múltiplos de 3 por la palabra "fizz".
//  - Múltiplos de 5 por la palabra "buzz".
//  - Múltiplos de 3 y de 5 a la vez por la palabra "fizzbuzz".


```

#### Paso 1: Inicializar el bucle

Comencemos escribiendo un bucle que recorra los números del 1 al 100. Esto se puede lograr con un bucle `for` en muchos lenguajes de programación.

```javascript
for (let i = 1; i <= 100; i++) {
    // Cuerpo del bucle
}
```

Este bucle ejecutará el código dentro de su cuerpo 100 veces, con `i` tomando valores del 1 al 100 en cada iteración.

#### Paso 2: Comprobar los múltiplos de 3 y 5

Dentro del bucle, vamos a verificar si el número actual (`i`) es un múltiplo de 3, de 5, o de ambos. Si es un múltiplo de 3, imprimiremos "fizz". Si es un múltiplo de 5, imprimiremos "buzz". Y si es un múltiplo de ambos, imprimiremos "fizzBuzz".

```javascript
if (i % 3 === 0 && i % 5 === 0) {
    console.log("fizzBuzz");
} else if (i % 3 === 0) {
    console.log("fizz");
} else if (i % 5 === 0) {
    console.log("buzz");
} else {
    console.log(i);
}
```

La expresión `i % 3 === 0` verifica si `i` es divisible por 3 sin dejar un residuo, y lo mismo se aplica para 5. Si `i` es divisible por ambos, entonces es un múltiplo común de 3 y 5.

#### Paso 3: Ejecutar y probar la solución

Con el código completo, podemos ejecutarlo y ver los resultados. Esto nos permitirá verificar si nuestra solución funciona correctamente y produce la secuencia esperada de números y palabras según las reglas de FizzBuzz.

```javascript
function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("fizzBuzz");
        } else if (i % 3 === 0) {
            console.log("fizz");
        } else if (i % 5 === 0) {
            console.log("buzz");
        } else {
            console.log(i);
        }
    }
}

fizzBuzz(); // Llamamos a la función para ejecutarla
```

Al ejecutar este código, deberíamos ver la secuencia esperada de números y palabras de acuerdo con las reglas de FizzBuzz.

Con esto concluye nuestra guía paso a paso para resolver el desafío FizzBuzz. Esperamos que esta explicación haya sido clara y útil para comprender cómo abordar este problema común de programación. ¡Buena suerte en tus futuros desafíos de codificación!
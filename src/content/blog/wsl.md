---
title: "Entorno de desarrollo con Windows"
description: "Aprende a usar el Subsistema de Windows para Linux (WSL) para tener un entorno de desarrollo en Windows"
pubDate: "Nov 20 2023"
heroImage: "../img/img_blog/portadaWSl.webp"
---

Con el Subsistema de Windows para Linux (WSL), puedes ejecutar un entorno de GNU/Linux, ¡tal cual!, directamente desde Windows sin tener que lidiar con máquinas virtuales o reiniciar el sistema. Así que puedes disfrutar de la línea de comandos, utilidades y aplicaciones de Linux sin complicaciones. ¡Increíble, ¿no?! 😉

<iframe width="100%" height="315" src="https://www.youtube.com/embed/JKThdA1UbTw?si=d42An_QpFz0UoDhA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Pasos para validar que podemos instalar WSL

1. Mostrar la pantalla de ejecutar con el comando `Windows + R.`
2. Escribimos CMD para que muestre la terminal.
3. Escribimos winver para validar que tenemos la versión 2004 Build 19041 o mayores.

## Instalación de Windows Subsystem for Linux

1. Ejecutar Windows Powershell como administrador
2. Abrimos la guía de Windows [Aquí](https://learn.microsoft.com/en-us/windows/wsl/install) para obtener los códigos de instalación.
3. Para Instalar, ejecutar el comando: `wsl -–install`
4. `wsl --set-default-version 2`
5. Si no se puede hay que [actualizar el kernel ](https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)
6. Ejecutar de nuevo: wsl `--set-default-version 2`
7. Abrimos la tienda de Microsoft e Instalamos Ubuntu en su versión más reciente.
8. Al abrirlo se comenzará a instalar.

![captura de pantalla instalación de WSL](/img/img_blog/ejemploWSLterminal.webp)
**Nota:**
Si aún no te permite. deberás activar la virtualización de windows, desde el BIOS

## Instalar Windows terminal

### Instala Vscode en Windows

Ya debes tener instalado Visual studio Code EN WINDOWS.

Si no lo tienes, instálalo. [AQUÍ](https://code.visualstudio.com/download) PODRÁS INSTALAR VISUAL STUDIO CODE

Una vez que instales Vscode, Busca el plugin WSL for windos, o instálalo aquí:

[AQUÍ](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) PODRÁS INSTALAR EL PLUGIN WSL

Necesitas Conectar Wsl a vscode. Recuerda que todas tus extensiones y temas de vscode, deberás instalarlos también en wsl.

![Plugin WSl](/img/img_blog/pluginWSL.webp)

## Comandos básicos de la terminal Bash

<iframe width="560" height="315" src="https://www.youtube.com/embed/aFvk5UepU0o?si=ce1TO46-Lk5ufgQE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Comandos básicos en la terminal:

- `pwd`: Nos muestra la ruta de carpetas en la que te encuentras ahora mismo.
- `mkdir`: Nos permite crear carpetas (por ejemplo, mkdir Carpeta-Importante).
- `touch`: Nos permite crear archivos (por ejemplo, touch archivo.txt).
- `rm` : Nos permite borrar un archivo o carpeta (por ejemplo, rm archivo.txt). Mucho cuidado con este comando, puedes borrar todo tu disco duro.
- `cat`: Ver el contenido de un archivo (por ejemplo, cat nombre-archivo.txt).
- `ls`: Nos permite cambiar ver los archivos de la carpeta donde estamos ahora mismo. Podemos usar uno o más argumentos para ver más información sobre estos archivos (los argumentos pueden ser — + el nombre del argumento o – + una sola letra o shortcut por cada argumento).
- `ls -a`: Mostrar todos los archivos, incluso los ocultos.
- `ls -l`: Ver todos los archivos como una lista.
- `cd`: Nos permite navegar entre carpetas.
- `cd /` : Ir a la ruta principal.
- `cd ~`: Ir a la ruta de tu usuario.
- `cd carpeta/subcarpeta`: Navegar a una ruta dentro de la carpeta donde estamos ahora mismo.
- `cd ..` (cd + dos puntos): Regresar una carpeta hacia atrás.
- `history`: Ver los últimos comandos que ejecutamos y un número especial con el que podemos repetir su ejecución.
- `! + número`: Ejecutar algún comando con el número que nos muestra el comando history (por ejemplo, !72).
- `clear` : Para limpiar la terminal. También podemos usar los atajos de teclado Ctrl + L o Command + L.

## Personalizando nuestra terminal

<iframe width="560" height="315" src="https://www.youtube.com/embed/jA2PIgWX3BI?si=9eB4mngd5r5LCuP9" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Ahora tenemos que instalar ZSH, una alternativa a bash, que nos permite la instalación de temas y plugins

```bash
apt install zsh
```

En ocasiones será necesario instalar dando permisos de administrador, de esta manera:

```bash
sudo apt install zsh
```

Volver ZSH default:

```bash
chsh -s $(which zsh)
```

Cierra y abre la terminal para ver los cambios realizados.

### Luego de tener zsh instalado, podemos instalar Oh my zsh

Install oh-my-zsh via curl

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Install oh-my-zsh via wget

```bash
sh -c "$(wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

Oh My ZSH Sitio oficial: [Ir al sitio](https://ohmyz.sh/)

Ahora podremos instalar los temas en este reposiorio [ir al repo. ](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

**_Powerlevel10k_** es mi tema favorito (Y el de muchos) si lo quieres instalar, puedes hacerlo con este comando:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

Necesitarás esta FUENTE: [Descagar Fuente](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf)

Para establecer tu Theme, debes posisionarte en el Home de tu terminal, y abrir `.zshrc` en tu editor de código preferido. En mi caso yo uso Visual Studio Code. Por lo tanto solo tengo que ejecutar el siguiente comando:

```bash
code .zshrc
```

Ahora debes ubicar en el archivo `ZSH_THEME=` y agregar tu tema de la siguiente manera:

```zshrc
ZSH_THEME='powerlevel10k/powerlevel10k'
```

> Para comenzar a instalar los plugins, recuerda seguir los pasos del video. Recuerda que cada plugin tiene su propia documentación y forma de instalación.

Oh My ZSH Sitio oficial: [Ir al sitio](https://ohmyz.sh/)

[Aquí](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) podremos instalar los temas en este repositorio

## Para comenzar a instalar los plugins debemos acceder a este repositorio

PLUGINS: [Ir al repositorio](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)

- colorize (Ya vienen instalados)

- git (Ya vienen instalados)

Para instalar estos plugins, solo posicionate en el home y pega estos códigos:

- zsh-autosuggestions:

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions

```

- zsh-syntax-highlighting

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
```

- fast-syntax-highlighting

```bash
git clone https://github.com/zdharma-continuum/fast-syntax-highlighting.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/plugins/fast-syntax-highlighting
```

-zsh-autocomplete

```bash
git clone --depth 1 -- https://github.com/marlonrichert/zsh-autocomplete.git $ZSH_CUSTOM/plugins/zsh-autocomplete
```

Dentro de tu archivo de configuració `.zshrc` y ubica esta sección: `plugins=(git)`.

Deberás agregar tus plugins dentro del paréntesis de modo que luzcan así: `plugins=(git zsh-autosuggestions zsh-syntax-highlighting fast-syntax-highlighting zsh-autocomplete)`

[Ir al repositorio](https://gist.github.com/n1snt/454b879b8f0b7995740ae04c5fb5b7df)

## Alias

Los alias deben tener un formato como este ejemplo:

![Captura de pantalla aspecto de losplugins instalados ](/img/img_blog/aliasZSH.webp)

## Conclusión

Recuerda que tienes los videos para seguir paso a paso y todo funcione correctamente.

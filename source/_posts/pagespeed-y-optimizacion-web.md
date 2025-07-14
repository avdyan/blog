---
title: 'Optimiza la Velocidad de tu Web: Tutorial con WebP y PageSpeed'
tags:
  - Optimización Web
  - Tutorial
categories:
  - Tutoriales útiles
abbrlink: pagespeed-y-optimizacion-web
date: 2022-07-17 23:35:00
updated: 2025-07-12 23:35:00
cover: img/post-covers/pagespeed-y-optimizacion-web.jpeg
---

En este articulo voy a ir al grano, navegando por la web me he encontrado muchos sitios sin optimización o con problemas de carga, algunos están dentro del 40% al 70% de optimización según Google y esto podría estar afectando tanto a la experiencia de usuario como al posicionamiento en el buscador más grande del mundo, por eso les comparto este pequeño tutorial que posiblemente podría ayudar a algunos a utilizar herramientas nuevas, reforzar sus conocimientos y mejorar un poco la carga de su sitio web.

---

## Herramientas:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvqB6DwZXJg3lMMPaacU1KbicGOt_KdIYY0zDQl6q8AaJ-iy7ZxwyfHz_Ci7_mqiSBHqFdpxOW9lLiDQHrfEsbGzLC17Vg-hDVjqQVMSnpMjN9T31itPsXj8KcoFlBK2MEw2coa28X_USDjomBno9HltSbJ0kt7oNAPvnb7quVN7myJYnwEUxXA6fJ/s335/webp.webp)

### Imágenes en Webp

Creado y distribuido por Google, **Webp** es un formato contenedor de imágenes, ofrece la posibilidad de reducir el peso de una imagen desde un 60%, ademas de estar optimizado para trabajar con la mayoría de navegadores web. Esta será nuestra primer herramienta.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitlyV52UyTOD6CucNSodQaftqBFlVIHMRrrVrKrLLKQxW_iKu6FCxfUuiEicAmDVwah965C4RhQBr3NGQLFeBTeUGWTpE4uggXSVZNA4nL0ptzRejqG76Hv3JHX56vPum8kHeSSVEtPRjLUHW_jrRlQLASmqZf__KM-zVH7wJND0qe4ZcpcaoYfcuM/s512/kisspng-google-pagespeed-tools-website-google-search-web-p-5ccec86fac9811.916385711557055599707.png)

### PageSpeed Insights de Google

Herramienta para análisis y diagnostico de rendimiento. Diseñada por Google, **PageSpeed Insights** ofrece un análisis gratuito del rendimiento de tu sitio web. Esta sera nuestra segunda herramienta.

---

## Vamos a comenzar

Para empezar debemos saber que problemas tiene nuestro sitio web en cuestión de **performance**, para esto vamos a ingresar al sitio web oficial de **[PageSpeed](https://pagespeed.web.dev/)** y colocaremos la url de nuestro sitio.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjfygGt3Hvh6XIxNwpBAAvc_u7tlRrpUX7hb4up3DTlBe_5Bvfiqf9jDdbyiYJcw9DQL7Nvtf6wx_PwzuvRefG9-0Lt176AzfQxEGx1raNg_WasxJzRZilBE9FSmhxEDAxOfjSoTpaYsrjlC2cZWUtEZ0cdS8tb934dYtFIGjm5geoUjNJZvWo4P1hS/s1600/blog.png)

En este caso vemos un rendimiento bajo, visitando el sitio de manera orgánica notamos que es una app hecha con **React**, y que a pesar de obtener un porcentaje bajo en este análisis, la carga está oscilando entre 1 y 2 segundos promedio, entonces veremos que falla.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgCBt0LkA17JZH5LMMq_AlLlRKF3q92beB5NQ1oF8lPiGzHDpHplyGmBsC84Bw0E9EC72zV-qJwWVspa4Nw1UY3bFrZK6cq0KmqNHaTytm9Iihr8RsxD65PPSQ8kRlgWuSraqNBqlO8nlwQNq5npddshO83obrG-lr-JDQAQEyXfFJ-7xDXLFdBGy0e/s1600/Captura%20de%20pantalla%202022-07-17%20-%2023.25.03.png)

Al desplazarnos leemos una lista detallada de errores y posibles soluciones. Dentro de ellas encontramos que algunas imágenes se encuentran en formato **jpg** y **png**.

---

## Solución:

### Paso 1
Necesitamos convertir nuestros archivos png a webp. Ingresamos al siguiente url: **[convertio.co](https://convertio.co/es)**, nos mostrara un panel donde agregaremos y convertiremos nuestros archivos a webp.

### Paso 2
Remplazar estos archivos dentro de nuestro proyecto.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjI9VSTzD6ZXqIIURCqPUuzE8QgVCA_lZZ2zGJIjJ-I2FYuKjpVO0bx8I7P6ahhiQ6qsJsO64DuvkYvba8rReYKe051b0XIWOXZ9yRlSrHPY-UOU1wGn92wLaoO8q-SMMgpEqokpstIWH_tFR7n2LhMxTcEV5Xxrm-nhkxJ-7zdOLMYtkkfXpOBOCbx/s1600/araee.png)

### Paso 3
Agregar **lazy loading** a las imágenes. En Html es tan simple como agregar la propiedad `loading="lazy"` dentro de nuestra etiqueta img, de la siguiente manera:

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfxD3alCUGAZql2egBJAAvIUn2CbJ6uYovgS3S_VWkz4C9dKF8cFg9-DSRrwwvpSa1iiQ0vW9ltYs-wgcEDKsBPX4OemdRfeGDbuOkCxohje3lW0k1_8Kxioo6SkL_IzIsOdSLfqYEWeVujbNhJstmpCEjgc_ZdfiqMXX2yFLkBf6DpVkCkmfi-w7x/s1600/ll.png)

Ahora vamos a hacer un segundo análisis para ver el resultado.

![](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhh9i7l6w4Jr7s61BYghsBvOHdX4FOakoJUo9J80PvQAaT1BuE0vij1hCrJaSbwxx5rRGT7nbLJydF5vdThGOJQnJrlevWZleDqsDYfZBYhTSMQ4qs8YvKQHnKTsNRlnlisPBgc7g6HJ7oCv3wVzAYxEX5QxcJxCE5XOqdvwN6eHKrFI9VmVV34uENy/s1600/Captura%20de%20pantalla%202022-07-17%20-%2023.51.42.png)

Al ser un sitio web con **React** nos damos cuenta de que un ligero cambio en formatos de imágenes y un poco de **lazy loading** al momento de renderizar el **DOM** nos ayudaron a mejorar el performance y lo datos de rendimiento, mejorando la visión que tiene Google de nuestro sitio y haciéndolo un mejor candidato para posicionamiento **SEO**, es posible que en tu sitio experimentes una mejora notoria aunque no tan sorprendente como esta.

Ademas de lo anterior algunos consejos para mejorar el rendimiento del sitio web son:

* Utiliza un tamaño adecuado de imágenes para dispositivos móviles.
* Utiliza siempre buenas practicas al programar.
* El uso de bibliotecas como: **Bootstrap** o **Tailwind** podría afectar la carga si no se depura el código correctamente.
* Permite que tu **Hosting** cree una aceleración por medio de caché.

---

## Conclusión:
Mejorar el rendimiento de tu sitio web ayudará a tener una mejor interacción y crear una experiencia fluida para el usuario.

con 💜 s3ntin3l
Invítame un **[Cafecín](https://www.buymeacoffee.com/sentinelbot)** ☕
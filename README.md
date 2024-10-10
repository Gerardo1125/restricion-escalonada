#  Restricción de Calificación Escalonada

Módulo de restricción de acceso a una actividad o recurso mediante la calificación

## Idea

La aplicación propuesta tiene como principal objetivo poder implementar
restricciones de acceso a una actividad o recurso mediante la calificación de una
actividad seleccionada, usando como valores las notas mínimas y máximas con las
que el docente haya calificado dicha actividad. Dichos valores serán de carácter
escalonada, es decir, que se admitirá el ingreso de la nota específica o el rango de
notas con la que se desea manejar la restricción en lugar del uso de porcentajes lo
que confunde con mucha frecuencia a los docentes. 

Este plugin sólo aparece cuando

1. Al momento de crear una restricción para cualquier actividad se presentará junto con las demas opciones de restricciones propias del sistema

## Estructura del Projecto

La estructura del projecto que debería ser como lo siguiente:

```
.../
  ├── classes/                 #
     ├── privacy/              # Carpeta que contiene los providers del proyecto
     ├── callbacks.php         # Funciones que usa el plugin al momento de agregarlo o eliminar en la condición de restricción
     ├── condition.php         # Parte lógica del plugin (Conjunto de funciones y condiciones que cumple el plugin para su correcto funcionamiento)
     ├── frontend.php          # Archivo encargado de crear la Interfaz de usuario para poder usar el plugin
  ├── db/                      # Declaración e integración de la base de datos del proyecto
  ├── lang/eng                 # Declaración de variables que tendrán como valor un texto y se puede usar a nivel de todo el proyecto
  ├── version.php              # Configuración inicial del proyecto que contiene las versiones de moodle que soportara el proyecto
  ├── yui/                     # Carpeta que contiene la interfaz del formulario del plugin y tambien la automatización del build del proyecto
     ├── build/                # Carpeta autogenerada al momento de hacer build al proyecto
     ├── src/form/             # Carpeta que contiene la implementacion de la interfaz del formulario que se injecta a travez de javascript
  ├── README.md                # Documentación
```

## Condiciones de disponibilidad

Consulte la documentación global sobre las condiciones de disponibilidad condicional:
   https://docs.moodle.org/en/Conditional_activities_settings

## Advertencia

* Este plugin es 100% de código abierto y NO ha sido probado en Moodle Workplace, Totara o cualquier otro sistema de software propietario. Mientras estos últimos no recompensen a los desarrolladores de plugins, sólo podrá utilizar este plugin en entornos 100% de código abierto.

## Requerimientos

Este plugin requiere Moodle 3.11

## Instalación

Si usted posee el codigo fuente puede instalarlo como cualquier otro plugin en la carpeta /availability/condition/newgrade
Vea http://docs.moodle.org/en/Installing_plugins for details on installing Moodle plugins

O

1. Puede descargar el plugin de manera de un zip en la parte superior de la página en el botón de **Code** y **Descargar en formato de zip**, como se observa en la imagen a continuación.

![image](https://github.com/user-attachments/assets/b595c35b-6d62-4e25-8b7d-94e486dfd957)

2. Ingrese a su sitio Moodle como administrador y vaya a Administración > Administración del sitio > Plugins > Instalar plugins.
Suba el archivo ZIP, seleccione el tipo apropiado de plugin, acepte la casilla de aceptación, después elija el botón para 'Instalar un plugin desde un archivo ZIP'.

3. Revise que aparezca el mensaje de que pasó la validación (Validation passed!) y después elija el botón para Instalar el plugin (Install add-on).

![image](https://github.com/user-attachments/assets/3c7786ad-7263-4215-89f2-5902c13d173e)

Puede guiarse de la documentación de Moodle para instalar un plugin en el siguiente enlace: https://docs.moodle.org/all/es/Instalar_plugins#:~:text=Ingrese%20a%20su%20sitio%20Moodle,plugin%20desde%20un%20archivo%20ZIP

## Configuración inicial

Este plugin no necesita configuración tras su instalación.

## Repositorion del plugin

Este plugin se publicará y actualizará periódicamente en Github: https://github.com/Gerardo1125/newgrade

# Prueba Técnica Full Stack Developer (Merge and Deploy)

## Introducción
Este proyecto es una solución a la prueba técnica para el puesto de Full Stack Developer en Merge and Deploy. El objetivo es desarrollar una aplicación que permita validar el RUT chileno utilizando NestJS para el backend y Angular para el frontend.


## Tabla de Contenidos
- [Introducción](#introducción)
- [Requisitos del Proyecto](#requisitos-del-proyecto)
  - [Contexto](#contexto)
  - [Problema](#problema)
  - [Objetivo General](#objetivo-general)
- [Descripción de la Solución](#descripción-de-la-solución)
  - [Backend con NestJS](#backend-con-nestjs)
  - [Frontend con Angular](#frontend-con-angular)
  - [Mejoras Adicionales](#mejoras-adicionales)
  - [Documentación de Swagger](#documentación-de-swagger)
- [Instrucciones de Instalación y Uso](#instrucciones-de-instalación-y-uso)
  - [Clonar el Repositorio](#clonar-el-repositorio)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Limitaciones y Trabajo Futuro](#limitaciones-y-trabajo-futuro)

## Requisitos del Proyecto
### Contexto
En un laboratorio clínico, se enfrentan a un desafío recurrente relacionado con el ingreso de pacientes al sistema. En Chile, el documento de identificación más comúnmente utilizado es el Rol Único Tributario (RUT), el cual consta de un número único asociado a cada individuo, seguido de un dígito verificador.

### Problema
El laboratorio clínico enfrenta dificultades debido a ingresos incorrectos de pacientes en su sistema, causados principalmente por errores humanos al registrar los RUT. Estos errores pueden llevar a la pérdida de tiempo y recursos al corregir la información incorrecta, así como a posibles problemas legales o de privacidad del paciente si los datos incorrectos se utilizan para fines médicos.

### Objetivo General
Desarrollar una aplicación que permita validar un documento tipo RUT, utilizando NestJS para el backend y Angular para el frontend.

## Descripción de la Solución
### Backend con NestJS
- Implementado un controlador `POST /api/validation` que retorna un valor booleano para validar el RUT.
- Lógica de validación del RUT utilizando el algoritmo Módulo 11.

### Frontend con Angular
- Creado un componente que permite ingresar el RUT y muestra si es válido o no.
- Enviado el RUT al backend para validación y mostrando la respuesta.
### Mejoras Adicionales
- **Diseño de Interfaz de Usuario**: Diseños almacenados en la carpeta `docs/ui-designs/ui-designs.md`.
- **Diagramas de Flujo**: Diagramas de arquitectura, backend y frontend en la carpeta `docs/diagrams`.
- **Pruebas Unitarias**: Implementación parcial de pruebas unitarias en la rama `test/pruebas-unitarias`.
- **Manejo de Errores y Validación de Entrada**: Validaciones adicionales en el frontend para:
  - Asegurarse de que el RUT solo contiene números, guion y la letra "K".
  - Verificar que los números ingresados no exceden los 7 u 8 dígitos.
  - Reconocer un RUT tanto si se ingresa con puntos como sin puntos.
- **Intento de Integración con Base de Datos**: Intento de integración con una base de datos para almacenamiento de RUTs, pero se ennfrentaron problemas de conexión que no se pudieron resolver en el tiempo asignado. La configuración Docker para la base de datos está disponible en la rama `feature/base-de-datos`.


### Documentación de Swagger
- Implementado Swagger para documentar y probar la API.
- La documentación de la API se puede acceder en `http://localhost:3001/api-docs` cuando la aplicación está en ejecución.
- Para ejecutar la aplicación y ver la documentación Swagger, sigue las instrucciones en la sección de instalación.

## Instrucciones de Instalación y Uso
### Clonar el Repositorio
```bash
git clone https://github.com/CarmenArayaRodriguez/code-interview-fullstack-developer-merge-and-deploy.git
```
### Backend
```bash
cd api
npm install
npm run start:dev
```
### FontEnd
```bash
cd frontend
npm install
ng serve
```
## Limitaciones y Trabajo Futuro
- Integración completa de pruebas unitarias.
- Conexión establecida con la base de datos para almacenamiento de RUTs.
- Despliegue de la aplicación en un entorno cloud.

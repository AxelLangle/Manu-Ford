# 🤝 Guía de Contribución del Proyecto Ford MX

¡Bienvenido al equipo! Este documento explica cómo configurar el entorno de desarrollo y el flujo de trabajo de Git.

## 1. Configuración Inicial del Entorno (WSL2/Docker)

Este proyecto utiliza **Laravel Sail** sobre **WSL2 (Ubuntu)** y **Docker Desktop**.

**Requisitos Previos:**
-   Docker Desktop (Con integración a tu distribución de WSL/Ubuntu)
-   Visual Studio Code

**Pasos para el Nuevo Colaborador:**

1.  **Clonar el Repositorio:**
    ```bash
    git clone [https://github.com/RicardovillarrealM/pagina-ford-mx.git](https://github.com/RicardovillarrealM/pagina-ford-mx.git)
    cd pagina-ford-mx
    ```
    *Asegúrate de clonar en una carpeta fácil de acceder, como `C:\Users\TuUsuario\Code`.*

2.  **Configurar Sail:**
    ```bash
    cp .env.example .env 
    ./vendor/bin/sail install --with=mysql
    ```
    *Una vez que se crea el archivo `.env`, asegúrate de que **DB_HOST=host.docker.internal** si usas WSL2.*

3.  **Iniciar Docker:**
    ```bash
    ./vendor/bin/sail up -d
    ```

4.  **Ejecutar Migraciones Iniciales:** (Solo la primera vez)
    ```bash
    ./vendor/bin/sail artisan migrate
    ```

5.  **Ver Proyecto:** El proyecto ya debe ser visible en `http://localhost:8080`.

## 2. Flujo de Trabajo (Git)

Trabajaremos con dos ramas principales:
* **`develop`**: La rama de trabajo principal y estable.
* **`main`**: La rama de producción. **¡No subir commits directos aquí!**

### Para Empezar una Tarea (Issue):

1.  **Sincronizar `develop`:** Asegúrate de que tu rama local `develop` esté actualizada.
    ```bash
    git checkout develop
    git pull origin develop
    ```

2.  **Crear una Rama de Característica (`feature`):** Crea una nueva rama basada en `develop` usando el nombre de la tarea (ej. `feature/implementar-contacto`).
    ```bash
    git checkout -b feature/nombre-de-la-tarea
    ```

3.  **Trabajar:** Haz tus cambios y *commits* en esta nueva rama.

### Para Finalizar y Compartir:

1.  **Sube tus Cambios:**
    ```bash
    git push origin feature/nombre-de-la-tarea
    ```

2.  **Crear Pull Request (PR):** Ve a GitHub y crea un **Pull Request** para fusionar tu rama `feature/nombre-de-la-tarea` a la rama **`develop`**.

3.  **Revisión:** Espera la revisión del líder (Ricardo) o de un compañero antes de fusionar.
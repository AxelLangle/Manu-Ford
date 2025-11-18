---
name: Tarea de Desarrollo
about: Crear una nueva tarea para el proyecto web de Ford
title: ''
labels: ''
assignees: ''

---

title: "[TAREA]: "
labels: "tarea"
assignees: ""

body:
  - type: markdown
    attributes:
      value: |
        ## 📝 Descripción
        Describe brevemente qué hay que hacer.

  - type: textarea
    id: description
    attributes:
      label: Detalles
      description: Explica la tarea a realizar
      placeholder: "Ej: Maquetar la sección de contacto con el formulario..."
    validations:
      required: true

  - type: markdown
    attributes:
      value: |
        ## ✅ Criterios de Aceptación
        Marca lo que se debe cumplir para cerrar la tarea.

  - type: checkboxes
    id: criteria
    attributes:
      label: Checklist
      options:
        - label: El diseño coincide con el prototipo/Figma
        - label: Es responsive (Móvil y Desktop)
        - label: Código limpio y comentado
        - label: Probado en navegadores

  - type: input
    id: design_link
    attributes:
      label: 🔗 Link al Diseño (Figma/Drive)
      placeholder: Pegar link aquí...

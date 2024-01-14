export const productNameValidations = {
  required: {
    value: true,
    message: 'Nombre del Producto es requerido.',
  },
  minLength: {
    value: 2,
    message: 'Nombre del Producto debe contener al menos 2 caracteres.',
  },
  maxLength: {
    value: 45,
    message: 'Nombre del Producto debe contener menos de 45 caracteres.',
  }
}

export const stockValidations = {
  required: {
    value: true,
    message: 'Stock Producto es requerido.',
  },
  min: {
    value: 0,
    message: 'Stock debe ser mayor o igual cero.',
  },
  pattern: {
    value: /^[0-9]*$/,
    message: 'Ingrese stock válido.',
  }
}

export const priceValidations = {
  required: {
    value: true,
    message: 'Precio del Producto es requerido.',
  },
  min: {
    value: 0,
    message: 'Precio debe ser mayor o igual cero.',
  },
  pattern: {
    value: /^\d+(\.\d{1,2})?$/,
    message: 'Ingrese cantidad de precio válida.',
  },
}

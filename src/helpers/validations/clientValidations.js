export const rtnValidations = {
  required: {
    value: true,
    message: 'RTN es requerida.',
  },
  minLength: {
    value: 14,
    message: 'RTN debe contener al menos 14 caracteres.',
  },
  maxLength: {
    value: 14,
    message: 'RTN debe contener menos de 14 caracteres.',
  },
  pattern: {
    value: /^[0-9]*$/,
    message: 'Formato RTN inválido',
  },
}

export const fullNameValidations = {
  required: {
    value: true,
    message: 'Nombre Completo es requerido.',
  },
  minLength: {
    value: 2,
    message: 'Nombre Completo debe contener al menos 2 caracteres.',
  },
  maxLength: {
    value: 64,
    message: 'Nombre Completo debe contener menos de 64 caracteres.',
  },
  pattern: {
    value: /^[a-zA-Z\s]+$/,
    message: 'Nombre Completo inválido.',
  },
}

export const addressValidations = {
  required: {
    value: true,
    message: 'Dirección es requerida.',
  },
  minLength: {
    value: 2,
    message: 'Dirección debe contener al menos 2 caracteres.',
  },
  maxLength: {
    value: 255,
    message: 'Dirección debe contener menos de 155 caracteres.',
  },
}

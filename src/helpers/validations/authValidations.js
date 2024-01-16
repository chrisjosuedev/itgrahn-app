export const usernameValidations = {
  required: {
    value: true,
    message: 'Usuario es requerido.',
  },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: 'Formato de Usuario inválido.',
  },
}

export const passwordValidations = {
  required: {
    value: true,
    message: 'Contraseña es requerida.',
  },
  minLength: {
    value: 8,
    message: 'Contraseña debe contener al menos 8 caracteres.',
  },
}

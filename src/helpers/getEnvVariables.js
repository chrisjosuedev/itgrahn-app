export const getEnvVariables = () => {
  return {
    VITE_ISV: import.meta.env.VITE_ISV,
    VITE_API_URL: import.meta.env.VITE_API_URL,
  }
}

export const alertInfo = (title, icon, confirmText) => {
  return {
    title,
    icon,
    customClass: {
      confirmButton: "btn btn-dark mr-2",
      cancelButton: "btn btn-danger",
    },
    confirmButtonText: confirmText,
    cancelButtonText: "No",
    showCancelButton: true,
    buttonsStyling: false,
  };
};

export const alertSuccess = (title, icon = "success") => {
  return {
    position: "center",
    icon,
    title,
    showConfirmButton: false,
    timer: 2500,
  };
};

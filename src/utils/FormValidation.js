/* eslint-disable no-unused-vars */
export function minLengthValidation(inputData, minLenght) {
  const { value } = inputData;

  removeClassErrorSuccess(inputData);

  if (value.length >= minLenght) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

export function nameLastNameValidation(inputData) {
  const { value } = inputData;

  //Expresión para permitir solo letas en los campos de nombre y apellidos.
  const pattern = new RegExp("^[A-Z ]+$", "i");
  removeClassErrorSuccess(inputData);
  const resultado = pattern.test(value);

  if (resultado) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

export function emailValidation(inputData) {
  const emailValid =
    // eslint-disable-next-line no-useless-escape
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const { value } = inputData;

  removeClassErrorSuccess(inputData);
  const resultValidation = emailValid.test(value);

  if (resultValidation) {
    inputData.classList.add("success");
    return true;
  } else {
    inputData.classList.add("error");
    return false;
  }
}

function removeClassErrorSuccess(inputData) {
  inputData.classList.remove("success");
  inputData.classList.remove("error");
}

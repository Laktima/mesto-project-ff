

export function enableValidation (option) {
    
  const forms = document.querySelectorAll(option.formSelector);
  forms.forEach((form) => {
    const inputElements = form.querySelectorAll(option.inputSelector);
    const formButton = form.querySelector(option.submitButtonSelector);
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
          
        if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(inputElement.dataset.errorMessage)
        } 
        else {
            inputElement.setCustomValidity('')
        }
  
        if (!inputElement.validity.valid) {
            toggleErrorSpan(inputElement, option, inputElement.validationMessage)
          } else {
            toggleErrorSpan(inputElement, option)
          }
          checkDisableButton(inputElements, formButton, option)
      })
    })

  })

}

function toggleErrorSpan(inputElement, option, errorMessage){
  
    if (errorMessage) {
      showInputError(inputElement, errorMessage, option)
    } else {
      hideInputError(inputElement, option)
    }
  }


function showInputError(inputElement, errorMessage, option){
  const errorElement = document.querySelector(`#${inputElement.name}-error`)
  inputElement.classList.add(option.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(option.errorClass)
}

function hideInputError(inputElement, option){
  const errorElement = document.querySelector(`#${inputElement.name}-error`)
  inputElement.classList.remove(option.inputErrorClass)
  errorElement.textContent = ''
  errorElement.classList.remove(option.errorClass)
}


function checkDisableButton(inputElements, formButton, option) {
  const isErrors = Array.from(inputElements).some((inputElement) => !inputElement.validity.valid)
  if (isErrors) {
    formButton.classList.add(option.inactiveButtonClass)
    formButton.setAttribute('disabled', 'true')
  }
  else {
    formButton.classList.remove(option.inactiveButtonClass)
    formButton.removeAttribute('disabled')
  }
}

export function clearValidation(option, form) {
  const inputElements = form.querySelectorAll(option.inputSelector);
  inputElements.forEach((inputElement) => {
    hideInputError(inputElement, option)
  })
}




/*enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});*/
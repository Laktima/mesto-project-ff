

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
            toggleErrorSpan(inputElement, inputElement.validationMessage)
          } else {
            toggleErrorSpan(inputElement)
          }
          checkDisableButton(inputElements, formButton)
      })
    })

  })

}

function toggleErrorSpan(inputElement, errorMessage){
    const errorElement = document.querySelector(`#${inputElement.name}-error`)
  
    if (errorMessage) {
      inputElement.classList.add('popup__input_error')
      errorElement.textContent = errorMessage
      errorElement.classList.add('popup__span_error')
    } else {
      inputElement.classList.remove('popup__input_error')
      errorElement.textContent = ''
      errorElement.classList.remove('popup__span_error')
    }
  }

function checkDisableButton(inputElements, formButton) {
  const isErrors = Array.from(inputElements).some((inputElement) => !inputElement.validity.valid)
  if (isErrors) {
    formButton.classList.add('button-inactive')
    formButton.setAttribute('disabled', 'true')
  }
  else {
    formButton.classList.remove('button-inactive')
    formButton.removeAttribute('disabled')
  }
}

export function clearValidation(option, form) {
  const inputElements = form.querySelectorAll(option.inputSelector);
  inputElements.forEach((inputElement) => {
    const errorElement = form.querySelector(`#${inputElement.name}-error`)
    console.log(errorElement, inputElement)
    inputElement.classList.remove('popup__input_error')
    errorElement.textContent = ''
    errorElement.classList.remove('popup__span_error')
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
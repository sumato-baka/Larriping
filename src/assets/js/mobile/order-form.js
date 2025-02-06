$('input').on('input', (event) => {
    object = event.target;

    if ($(object).hasClass('order-form__phone')) {
        let regexp = new RegExp($(object).attr('pattern'))
        let value = $(object).val()

        if (regexp.test(value))
            object.setCustomValidity('')
        else
            object.setCustomValidity('Указан неверный номер телефона.')
    }
    else if ($(object).hasClass('order-form__name')) {
        let regexp = new RegExp($(object).attr('pattern'))
        let value = $(object).val()

        if (regexp.test(value))
            object.setCustomValidity('')
        else
            object.setCustomValidity('С заглавной, русскими буквами.')
    }
})

$('.order-form__blank').on('submit', (event) => {
    event.preventDefault()
})
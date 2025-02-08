$(window).on('load', () => {
    const mask = '+7(999) 999-99-99'
    const formSelector = '#order-form'
    const phoneSelector = '#order-form__phone'
    const nameSelector = '#order-form__name'
    const privacySelector = '#order-form__privacy-policy'

    const validator = new JustValidate(formSelector);
    const inputmask = new Inputmask(mask)

    inputmask.mask(phoneSelector)

    validator
        .addField(document.querySelector(phoneSelector),
            [
                {
                    validator: (value) => {
                        const phone = document.querySelector(phoneSelector).inputmask.unmaskedvalue()
                        return Boolean(Number(phone) && phone.length == 10)
                    },
                    errorMessage: 'Указан неверный номер телефона'
                }
            ],
            {
                errorsContainer: '.input-error-phone'
            })
        .addField(document.querySelector(nameSelector),
            [
                {
                    rule: 'required'
                },
                {
                    rule: 'minLength',
                    value: 2
                }
            ],
            {
                errorsContainer: '.input-error-name'
            })
        .addField(document.querySelector(privacySelector),
            [
                {
                    rule: 'required'
                }
            ],
            {
                errorsContainer: '.input-error-privacy-policy'
            })

    $(formSelector).on('submit', (event) => {
        event.preventDefault()
    })
})

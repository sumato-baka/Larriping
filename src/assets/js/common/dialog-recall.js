$(window).on('load', () => {
    const mask = '+7(999) 999-99-99'
    const formSelector = '#dialog-recall__form'
    const phoneSelector = '#dialog-recall__form-phone'
    const nameSelector = '#dialog-recall__form-name'
    const privacySelector = '#dialog-recall__form-privacy-policy'

    const validator = new JustValidate(formSelector);
    const inputmask = new Inputmask(mask)

    inputmask.mask(phoneSelector)

    validator
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
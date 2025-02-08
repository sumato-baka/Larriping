$('.content-slider__button-next').on('click', event => {
    let current = $(event.target)
        .parents('.content-slider')
        .find('.content-slider__item-current');

    let next_arr = $(event.target)
        .parents('.content-slider')
        .find('.content-slider__item-next')

    if (next_arr.length > 0) {
        current
            .removeClass('content-slider__item-current')
            .addClass('content-slider__item-previous')
            .find('.image-comparer__slider')
            .attr('tabindex', '-1')

        next_arr.first().removeClass('content-slider__item-next')
            .addClass('content-slider__item-current')
            .find('.image-comparer__slider')
            .attr('tabindex', '')
    }
})

$('.content-slider__button-previous').on('click', event => {
    let current = $(event.target)
        .parents('.content-slider')
        .find('.content-slider__item-current')


    let previous_arr = $(event.target)
        .parents('.content-slider')
        .find('.content-slider__item-previous')

    if (previous_arr.length > 0) {
        current.removeClass('content-slider__item-current')
            .addClass('content-slider__item-next')
            .find('.image-comparer__slider')
            .attr('tabindex', '-1')

        previous_arr.last()
            .removeClass('content-slider__item-previous')
            .addClass('content-slider__item-current')
            .find('.image-comparer__slider')
            .attr('tabindex', '')
    }
})

$('.content-slider').each((index, element) => {
    $(element).find('.content-slider__item').first().addClass('content-slider__item-current');
    $(element).find('.content-slider__item').not('.content-slider__item-current').addClass('content-slider__item-next').find('.image-comparer__slider').attr('tabindex', '-1')
})

var contentSiderSelector = '.content-slider'

$(contentSiderSelector).each((index, element) => {
    $(element)
        .find('.content-slider__item')
        .first()
        .addClass('content-slider__item-current');

    $(element)
        .find('.content-slider__item')
        .not('.content-slider__item-current')
        .addClass('content-slider__item-next')
        .find('.image-comparer__slider')
        .attr('tabindex', '-1')
})

$(contentSiderSelector).on('touchstart.content-slider', event => {
    if ($(event.target).hasClass('image-comparer__slider-button'))
        return

    let x1 = event.originalEvent.touches[0].clientX
    let x2

    $(contentSiderSelector).on('touchmove.content-slider', event => {
        x2 = event.originalEvent.touches[0].clientX
    })

    $(contentSiderSelector).on('touchend.content-slider', () => {
        let diff = x1 - x2

        if (diff > 0)
            contentSliderNext($(event.target).parents(contentSiderSelector))
        else if (diff < 0)
            contentSliderPrevious($(event.target).parents(contentSiderSelector))

        $(contentSiderSelector).off('touchmove.content-slider')
        $(contentSiderSelector).off('touchend.content-slider')
    })
})

$('.content-slider__button-next').on('click', event => {
    contentSliderNext($(event.target).parents(contentSiderSelector))
})

$('.content-slider__button-previous').on('click', event => {
    contentSliderPrevious($(event.target).parents(contentSiderSelector))
})

/**
 * @param {JQuery<HTMLElement>} context Triggered .content-slider
 */
function contentSliderNext(context) {
    let current = context
        .find('.content-slider__item-current');

    let next_arr = context
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
}

/**
 * 
 * @param {JQuery<HTMLElement>} context Triggered .content-slider
 */
function contentSliderPrevious(context) {
    let current = context
        .find('.content-slider__item-current')

    let previous_arr = context
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
}
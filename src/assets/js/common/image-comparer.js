var imageComparerSelector = '.image-comparer'

$(document).on('touchstart.image-comparer', event => {
    if (!$(event.target).hasClass('image-comparer__slider-button'))
        return

    let comparer = $(event.target).parent(imageComparerSelector)
    let comparerWidth = comparer.width()
    let comparerOffsetLeft = comparer.offset().left

    let comparerLeftBound = comparerOffsetLeft
    let comparerRightBound = comparerOffsetLeft + comparerWidth

    let x
    let relativeXPercent

    $(document).on('touchmove.image-comparer', event => {
        x = event.originalEvent.touches[0].clientX
        relativeXPercent = (x - comparerLeftBound) / comparerWidth * 100
        console.log(x)

        if (x > comparerLeftBound && x < comparerRightBound)
            comparer.css('--position', `${relativeXPercent}%`)
    });

    $(document).on('touchend.image-comparer', () => {
        $(document).off('touchmove.image-comparer')
        $(document).off('touchend.image-comparer')
    });
});

$(document).on('mousedown.image-comparer', event => {
    if (event.button != 0)
        return

    if (!$(event.target).hasClass('image-comparer__slider-button'))
        return

    let comparer = $(event.target).parent(imageComparerSelector)
    let comparerWidth = comparer.width()
    let comparerOffsetLeft = comparer.offset().left

    let comparerLeftBound = comparerOffsetLeft
    let comparerRightBound = comparerOffsetLeft + comparerWidth

    let x
    let relativeXPercent

    $(document).on('mousemove.image-comparer', event => {
        x = event.clientX
        relativeXPercent = (x - comparerLeftBound) / comparerWidth * 100

        if (x > comparerLeftBound && x < comparerRightBound)
            comparer.css('--position', `${relativeXPercent}%`)
    });

    $(document).on('mouseup.image-comparer', () => {
        $(document).off('mousemove.image-comparer')
        $(document).off('mouseup.image-comparer')
    });
});
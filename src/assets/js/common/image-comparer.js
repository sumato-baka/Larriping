const slider = $('.image-comparer__slider')

slider.on('touch').on('input', (e) => {
    let container = $(e.target).parent('.image-comparer')

    container.css('--position', `${e.target.value}%`)
})
let menu_elements = ['mobile-menu', 'mobile-menu__side', 'mobile-menu__base', 'mobile-menu__bottom']

function swapMenuVisibility(show) {
    menu_elements.forEach(element => {
        if (show)
            $(`.${element}`).addClass(`${element}-active`)
        else
            $(`.${element}`).removeClass(`${element}-active`)
    })
}

$(document).on('scroll', () => {
    swapMenuVisibility(false);
})

$('.page-header__mobile-button').on('click', () => {
    swapMenuVisibility(true);
})

$(document).on('click', (event) => {
    if ($(event.target).hasClass('mobile-menu__base'))
        menu_elements.forEach(element => {
            $(`.${element}`).removeClass(`${element}-active`)
        })
})
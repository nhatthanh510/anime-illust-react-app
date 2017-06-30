$( document ).ready(function() {
    const currentUrl = window.location.href ;
    $('.nav-item.active').removeClass('active');
    $( ".nav-item" ).each(function() {
        const itemHref = $(this).find('a').attr('href');
        if (currentUrl.indexOf(itemHref) > -1) {
            $(this).addClass('active');
            return false; 
        }
    });

    $('.nav-item').click(function() {
        $('.nav-item.active').removeClass('active');
        $(this).addClass('active');
    });
    
    $('body').css('opacity', '1');
});
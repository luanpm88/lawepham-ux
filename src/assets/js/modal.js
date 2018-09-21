$(function() {
    $('.modal-control').click(function(e){
        e.preventDefault();
        $('.modal-content').addClass('hienra');
        $('.wraper-frontend').addClass('display');
        console.log('ban vua click do');
        
        var url = $(this).attr('href');
        var method = $(this).attr('data-method');
        //var slogan = 'Desktop Font: An installable TTF font with ligatures.You can easily insert the icons in any desktop.';
        var load = htmlLoader();
        var html = '<div class="modal fade" role="dialog" id="myModal">'+
                        '<div class="modal-dialog modal-select">'+
                            '<div class="modal-content">'+
                                '<p>'+load+'</p>'+    
                            '</div>'+
                        '</div>'+
                    '</div>';

        $('body').append(html);
        var modal = $('#myModal');                
            modal.modal('show');
        
        $.ajax({
                url: url,
                type: method,
                dataType: 'html',
            }).always(function(response) {
                $('#myModal .modal-content').html(response);
            });
        return false;
    });
    
    $('.icon-rm').click(function(){
        $('.modal').addClass('andi');
    });
    
});

function htmlLoader() {
    //return '<div class="loader-outer"><div class="loader"><div class="ball-pulse"><div></div><div></div><div></div></div></div></div>';
    //return '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
    var khoi =  '<div class="sk-fading-circle">'+
                '<div class="sk-circle1 sk-circle"></div>'+
                '<div class="sk-circle2 sk-circle"></div>'+
                '<div class="sk-circle3 sk-circle"></div>'+
                '<div class="sk-circle4 sk-circle"></div>'+
                '<div class="sk-circle5 sk-circle"></div>'+
                '<div class="sk-circle6 sk-circle"></div>'+
                '<div class="sk-circle7 sk-circle"></div>'+
                '<div class="sk-circle8 sk-circle"></div>'+
                '<div class="sk-circle9 sk-circle"></div>'+
                '<div class="sk-circle10 sk-circle"></div>'+
                '<div class="sk-circle11 sk-circle"></div>'+
                '<div class="sk-circle12 sk-circle"></div>'+
          '</div>';
    return khoi;
}
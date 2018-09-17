function linkMethodRun(link) {
    var method = link.attr("link-method");
    var action = link.attr("href");

    if(typeof(method) != 'undefined') {
        var newForm = $('<form>', {
            'action': action,
            'method': 'POST'
        });
        newForm.append($('<input>', {
            'name': '_token',
            'value': CSRF_TOKEN,
            'type': 'hidden'
        }));
        newForm.append($('<input>', {
            'name': '_method',
            'value': method,
            'type': 'hidden'
        }));
        $(document.body).append(newForm);
        newForm.submit();
    }
}

function removeMaskLoading() {
    $('.mask-loading-effect').remove();
}

function addMaskLoading(text) {
    if (typeof(text) === 'undefined') {
        var text = '';
    }
    $('body').append('<div class="mask-loading-effect"><div class="content">'+htmlLoader()+'</div><div>');
}

function confirmModal(message, callback, remote, param) {
    // if message is remote
    if (typeof(remote) != 'undefined' && remote) {
        var url = message;
        message = htmlLoader();
    }

    var html = '<div id="confirmModal" class="modal fade" role="dialog">'+
        '<div class="modal-dialog">'+
            '<div class="modal-content">'+
                '<div class="modal-header">'+
                    '<h3 class="modal-title">Are you sure?</h3>'+
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                '</div>'+
                '<div class="modal-body">'+
                    '<p>'+message+'</p>'+
                '</div>'+
                '<div class="modal-footer text-left">'+
                    '<button type="button" class="btn btn-secondary btn-confirm">Confirm</button>'+
                    '<a href="javascript:;" class="btn" data-dismiss="modal">Cancel</a>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';

    // Create box if not exists
    $('#confirmModal').remove();
    $('body').append(html);
    var modal = $('#confirmModal');

    // add callback
    $('#confirmModal .btn-confirm').off('click');
    $('#confirmModal .btn-confirm').click(function() {
        callback();
        modal.modal('hide');
    });

    modal.modal('show');

    // if message is remote
    if (typeof(param) == 'undefined') {
        param = {};
    }
    if (typeof(remote) != 'undefined' && remote) {
        $.ajax({
            method: "GET",
            url: url,
            data: param,
        }).done(function( data ) {
            $('#confirmModal .modal-body').html(data);
        });
    }
}

function notify(message, type) {
    $.notify({
        title: '',
        message: message
    },{
        type: type,
        placement: {
            from: "bottom",
            align: "right"
        },
    });
}

function htmlLoader() {
    return '<div class="loader-outer"><div class="loader"><div class="ball-pulse"><div></div><div></div><div></div></div></div></div>';
}

function ajaxConditionBox(container) {
    container.find('.ajax-condition-box').each(function() {
        var box = $(this);
        var form = box.closest('form');
        var url = box.attr('data-url');
        var control_selector = box.attr('data-control');

        container.find(control_selector).on('change keyup', function() {
            data = form.serialize();

            box.find('*').css('visibility', 'hidden');
            box.prepend(htmlLoader());

            $.ajax({
                method: "GET",
                url: url,
                data: data
            }).done(function( data ) {
                box.html(data);
                applyJs(box);
            });
        });
        // $(control_selector).eq(0).trigger('change');
    });
}

function applyJs(container) {
    // Dataselect
    container.find('.dataselect').each(function() {
        $(this).dataselect();
    });

    // Select
    // container.find('select').select2();

    // Select
    container.find('.datepicker').datepicker();

    // Datalist
    container.find('.datalist').each(function() {
        $(this).datalist();
    });

    // Ajaxlink
    container.find('.ajaxlink').each(function() {
        $(this).ajaxlink();
    });

    // Ajax condition box
    ajaxConditionBox(container);

    // File upload

}

$(function() {
    // Apply init js
    applyJs($('body'));

    // Ajax modal
    $(document).on('click', '.ajax-modal', function(e) {
        e.preventDefault();

        var link = $(this);
        var url = link.attr('href');

        // Create box if not exists
        var modal = $('.ajax-modal-box[rel="'+url+'"]');
        if (modal.length === 0) {
            $('body').prepend('<div class="ajax-modal-box" rel="'+url+'"><div class="ajax-modal-container"><div class="text-center mt-20"><div class="loader"><div class="ball-clip-rotate-multiple"><div></div><div></div></div></div></div></div></div>');
            modal = $('.ajax-modal-box[rel="'+url+'"]');
        }

        // Show modal
        modal.addClass('open');
        modal.fadeIn();
        modal.addClass('loading');

        var container = modal.find('.ajax-modal-container');
        $.ajax({
            method: "GET",
            url: url
        }).done(function( data ) {
            container.html( data );
            applyJs(container);
        });
    });
    $(document).on('click', '.ajax-modal-close', function(e) {
        e.preventDefault();

        $(this).closest('.ajax-modal-box').removeClass('open');
        $(this).closest('.ajax-modal-box').fadeOut();
    });

    // Custom option grid
    $(document).on('click', 'ul.option-grid .box', function() {
        var input = $(this).parent().find('input');

        if (input.is(':checked') && input.attr('type') == 'checkbox') {
            input.prop('checked', false).change();
        } else {
            input.prop('checked', true).change();
        }
    });

    $( ".page-dark-bg" ).css( "min-height", $(window).height()-60 );

    // Link with data-method
    $(document).on('click', 'a[link-method]', function(e) {
        e.preventDefault();

        // confirm
        var link = $(this);
        var confirm = link.attr('data-confirm');
        var confirm_url = link.attr('data-confirm-url');

        // confirm message
        if (typeof(confirm) != 'undefined' && confirm.trim() != '') {
            confirmModal(confirm, function() {
                linkMethodRun(link);
            });
            return;
        }

        // confirm url
        if (typeof(confirm_url) != 'undefined' && confirm_url.trim() != '') {
            confirmModal(confirm_url, function() {
                linkMethodRun(link);
            }, true);
            return;
        }

        linkMethodRun(link);
    });

    var serializeHash = function () {
        var attrs = {};

        $.each($(this).serializeArray(), function(i, field) {
            if (field.name.endsWith("[]")) {
                field.name = field.name.substr(0, field.name.length-2);
                if (typeof(attrs[field.name]) == 'undefined') {
                    attrs[field.name] = [field.value];
                } else {
                    attrs[field.name].push(field.value);
                }
            } else {
                attrs[field.name] = field.value;
            }
        });

        return attrs;
    };

    $.fn.extend({ serializeHash: serializeHash });
});

$( window ).resize(function() {
  $( ".page-dark-bg" ).css( "min-height", $(window).height()-60 );
});

//sort+upload+remove
$( document ).ready(function() {
    $('.nutchon').click(function() {
        console.log('ban da click');
    $('input[name=uploadfile]').click();
    });
});

//ckeckbox-all
$(document).on('click', '#check_all', function() {
    $("input:checkbox").not(this).prop('checked', this.checked);
    $("input:checked").not(this).each(function(e, value){
        console.log(this.value);
    });
  });
// xem image truoc khi upload
function img_pathUrl(input) {
    $('#img_url')[0].src = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
    }

//delete_all checkbox
$(document).ready(function(){
	jQuery('.delete_all').on('click', function() { 
		var allVals = [];  
		$(".checkall:checked").each(function() {  
			allVals.push($(this).attr('data-id'));
		});
		if (allVals.length <=0)  
		{  
			alert("Please select row.");  
		}  
		else {  
			WRN_PROFILE_DELETE = "Are you sure you want to delete this row?";  
			var check = confirm(WRN_PROFILE_DELETE);  
			if (check == true) {  
			  $.each(allVals, function( index, value ) {
				  $('table tr').filter("[data-row-id='" + value + "']").remove();
			  });
			}  
		}  
	});
});

//Sidebar menu
$(document).ready(function(){
    $('.menu-bien').click(function(){
        $('.bien').toggleClass('hien');
    });
});

$(document).ready(function(){
    //ham xu ly click nut chon anh
    $('.btn-anh').click(function(){
        $('.inp-anh').trigger('click');
    });
    
    $('.ion-android-add-circle').click(function(){
        console.log('hien chua');
        $('ul.list_item_group_2').toggleClass('display');
        return false;
    });
    
    $(document).on('click',".btn-anh-remove" ,function() {
        if(confirm("Bạn Có Muốn Xóa ?"))
        {
            $(this).parent("input#img_file").fadeOut();
            //$(this).closest("input" ).fadeOut();
            $("#img_file").val(null); //xóa tên của file trong input
        }
        else
        return false;
    });
    
    ////ham xu ly nut menu-contact
    //$('.an').click(function(){
    //   $('.sidebar').addClass('hien-sidebar');
    //   $('.sidebar').removeClass('lnr lnr-cross');
    //});
    $('.btn-remove').click(function(){
        console.log('haha');
        $('.image-upload').attr("data-content","").popover('hide');
        $('#img_url').val("");
        $('.inp-anh input:file').val("");
    });
});
 function img_pathUrl(input){
        $('#img_url')[0].src = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
    }   

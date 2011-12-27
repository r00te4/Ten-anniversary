$(document).ready(function(){
  $(".close").live('click',function() {
   $(".back-cover").hide();
    $("#dialog_main_container").hide();
    $("#dialog_main_container").removeClass('dialog-main-big'); 
    $('.dialog-main').hide();
  });

   $('ul.upload-pic-list').each(function() {
              if ($(this).children().size() > 1) {
                  $(this).sortable({
                      cursor: cursor_w(),
                      axis: 'x',
                      containment: 'parent',
                      tolerance: 'pointer',
                      placeholder: 'ul.upload-pic-list li',
                      cancel: 'a,input'
                      //stop: function(event,ui){alert($(this).css('left'));},
                  });
                  //$(this).children('li, .service-name, .icon').css('cursor', Customize.sortCursor());
              }
          });

    function cursor_w() {
        var cursor = 'ew-resize';
        if ($.browser.msie && parseInt($.browser.version) < 9) {
            cursor = 'ew-resize';
        }
        return cursor;
    }

    $('.dialog-uploadbtn_real').change(function(){
      img = $(this).parents('li').find('img');
      file = $(this).val();
      if(!image_valid($(this).val())){alert('图片必须是:jpg,gif,bmp,png !');return;}
      if(this.files){
       img.attr('src', this.files[0].getAsDataURL());
      }else if(file.indexOf('\\') > -1 || file.indexOf('\/') > -1){
       img.attr('src', file);
      }
    });  
    
   $('._clear').live('click', function(){
      $(this).parents('li').find('.dialog-uploadbtn_real').val('');
      $(this).parents('li').find('.upload-pic-title').val('');
      $(this).parents('li').find('img').attr("src", "");
      return false;
   });
  
   $('#shl_submit').live('click', function(){
      if($('#highlight_pic').val() && image_valid($('#highlight_pic').val()) == false ){
        alert('图片格式不正确');
        return false;
      }
      if($('#highlight_title').val()==''){ $('#hl_title_error').show(); return false;}
      $('.dialog-btns').html($('#loading_image').html());
      $('#highlight_new').submit();
   });

  $('.dialog-btn').live('click',function(){
    if(!$(this).hasClass('close') && !$(this).hasClass('agree_join')){

    return true;}
  });
/*
    var item = $('.dialog-uploadbtn_real'), interval;
    new AjaxUpload(item, {
      action: item.parents('form.mhl').attr("action"),
      name: 'highlight[pic]',
      onComplete: function(file, response) {}
    }); 
*/
   $('#choose_highlight, #single_highlight').live('click', function(){
     $.get('/activities/dialog', {"call_for": this.id}, null, 'script');
   });
   $('#multi_highlight').live('click', function(){
     if(this.id == 'multi_highlight'){ alert("开发中！先点下面那个！"); return false;} 
   });

   $('.hl_submit').live('click', function(){
      $.post($('.hl').attr('action'), $('.hl').serialize(),null, "script" );
      $('ul.upload-pic-list li').each(function(a){
        var pic_file = $(this).find('.dialog-uploadbtn_real').val();
        var form = $(this).find('form.mhl');
        if( pic_file != null && pic_file != ''){
           $(this).find('.sort').val(a); 
           $(this).find('.mhl_submit').click();              
        }      
      }); 
    });

  backcover = function(){
    $(".back-cover").css("width",$("body").width());
    $(".back-cover").css("height",$("body").height());
    $('.back-cover').show();
  };

  $('.join').live('click', function(){
   if($('.activity_join').length != 0){
    backcover();
    $(".activity_join").css("margin-top",-$(".activity_join").height()/2 + $(document).scrollTop()).css("margin-left",-$(".activity_join").width()/2).show();
    }else{
      $.get('/activities/dialog',null,null,'script');
    }
  });

  $('.reject').live('click', function(){
     user_id = $(this).parents('dl').find('.user_id').val();
     activity_id = $(this).parents("dl").find('.activity_id').val();
     call_for = $(this).parent("dd").find('.call_for').val();
     data = {"call_for": call_for, 'user_id': user_id, 'activity_id': activity_id};
     $.get('/activities/dialog', data, null, 'script');
  });

  $('.agree').live('click', function(){
     user_id = $(this).parents('dl').find('.user_id').val();
     activity_id = $(this).parents("dl").find('.activity_id').val();
     call_for = $(this).parent("dd").find('.call_for').val();
     $.get('/activities/dialog', {"call_for": call_for, 'user_id': user_id, 'activity_id': activity_id}, null, 'script');
  });

/*
	$('.show_login_dialog').click(function(){
	  $(".back-cover").css("width",$("body").width());
	  $(".back-cover").css("height",$("body").height());
	  $(".back-cover").show();
	  $("#login_dialog").show();
		login_dialog("login_form");
	});	
*/	
  $(".close-login").live('click',function() {
      $(".back-cover").hide();
      $("#login_dialog").hide();
  });

	$(".show_city").live('click', function(){
		$(".city_list").hide();
		name = this.id.split("_")[1]
		$("#city_" + name).show();
	})
//login_dialog("login_form");

});

var login_dialog = function(form_name){
//			$(".login_form").removeClass("active");
			$('#'+form_name).addClass("active");
			var $form_wrapper	= $('#form_wrapper'),
				//所有表单形式中指定一个是激活的
				$currentForm	= $form_wrapper.children('form.active'),
				//改变形式的链接
				$linkform		= $form_wrapper.find('.linkform');
			//表单宽度、高度 存储与使用						
			$form_wrapper.children('form').each(function(i){

				var $theForm	= $(this);
				//渐隐
//alert($theForm.width());
				if(!$theForm.hasClass('active'))
					$theForm.hide();
				$theForm.data({
					width	: $theForm.width(),
					height	: $theForm.height()
				});
			});


			/*
			点击一个链接（新的形式展示）
			当前的移除
			高的、宽度
			激活新的边展示出来
			*/
			$linkform.bind('click',function(e){
				var $link	= $(this);
				var target	= $link.attr('rel');
				$currentForm.fadeOut(400,function(){
					//移除
					$currentForm.removeClass('active');
					//新的
					$currentForm= $form_wrapper.children('form.'+target);
					//激活
					$form_wrapper.stop()
		                 .animate({
			                width	: $currentForm.data('width') + 'px',
			                height	: $currentForm.data('height') + 'px'
		                 },500,function(){
			                //获得新的表单样式
			                $currentForm.addClass('active');
			                //显示新的表单
			                $currentForm.fadeIn(400);
		                 });
				});
				e.preventDefault();
			});

			function setWrapperWidth(){
				$form_wrapper.css({
					width	: $currentForm.data('width') + 'px',
					height	: $currentForm.data('height') + 'px'
				});
			}

			/*
			在这里完善提交按钮的功能
			如果，你提交了表格，记得要验证 
			*/
			$form_wrapper.find('input[type="submit"]')
				 .click(function(e){
	//				e.preventDefault();
				 });

			//设置宽度与高度
			setWrapperWidth();



}

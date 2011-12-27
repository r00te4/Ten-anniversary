$(document).ready(function(){

  $('#user_password').live('focus',function(){
      if($(this).parents('p').find('.tips_js').hasClass('no-pass')) $(this).parents('p').find('.tips_js').removeClass('no-pass');
      $(this).parents('p').find('.tips_js').html('密码长度不小于6位');
      $(this).parents('p').find('.tips_js').addClass('tip-txt');
  });

  $('#user_password').live('blur',function(){
      $(this).parents('p').find('.tips_js').addClass('tip-txt');
      if($(this).val().replace(/\s/g, '').length < 6){
        $(this).parents('p').find('.tips_js').html('<font  class="error_info" style="color:red;">密码长度不小于6位！</font>');       
      }else{
        $(this).parents('p').find('.tips_js').html('');
        $(this).parents('p').find('.tips_js').removeClass('tip-txt');
      }
  });

  $('#user_password_confirmation').live('focus',function(){
    if($(this).parents('p').find('.tips_js').hasClass('no-pass')) $(this).parents('p').find('.tips_js').removeClass('no-pass');
    $(this).parents('p').find('.tips_js').html('请输入确认密码');
    $(this).parents('p').find('.tips_js').addClass('tip-txt');
  });

  $('#user_password_confirmation').live('blur',function(){
      $(this).parents('p').find('.tips_js').addClass('tip-txt');
     if ($('#user_password').val()!=$(this).val())
        $(this).parents('p').find('.tips_js').html('<font  class="error_info" style="color:red;">两次密码不一致！</font>');       
     else{
        $(this).parents('p').find('.tips_js').html('');
        $(this).parents('p').find('.tips_js').removeClass('tip-txt');
      }
  });

  $('#user_truename').live('focus',function(){
      if($(this).parents('p').find('.tips_js').hasClass('no-pass')) $(this).parents('p').find('.tips_js').removeClass('no-pass');
      $(this).parents('p').find('.tips_js').html('真实姓名或现实邻里称呼(8个字以内)');
      $(this).parents('p').find('.tips_js').addClass('tip-txt');
  });

  $('#user_truename').live('blur',function(){
      $(this).parents('p').find('.tips_js').addClass('tip-txt');
      if ($(this).val().replace(/\s/g, '') == '')
        $(this).parents('p').find('.tips_js').html('<font  class="error_info" style="color:red;">必须填写姓名！</font>');       
      else if($(this).val().replace(/[^\x00-\xff]/g,"aa").length > 16){
        $(this).parents('p').find('.tips_js').html('<font  class="error_info" style="color:red;">姓名过长，最多8个汉字！</font>');       
      }else{
        $(this).parents('p').find('.tips_js').html('');
        $(this).parents('p').find('.tips_js').removeClass('tip-txt');
      }
  });

  $('#user_email').focus(function(){
      if($(this).parents('p').find('.tips_js').hasClass('no-pass')) $(this).parents('p').find('.tips_js').removeClass('no-pass');
      $(this).parents('p').find('.tips_js').html('该邮箱用作登录帐号和找回密码');
      $(this).parents('p').find('.tips_js').addClass('tip-txt');
  });

  $('#user_email').blur(function(){
      email = $(this).val();
      if(!email_valid(email)){
      $('#user_email').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').html('邮箱格式不正确！');  
      }else{
        $(this).parents('p').find('.tips_js').html('');
        $(this).parents('p').find('.tips_js').removeClass('tip-txt');
      }
  });

  $('#captcha').focus(function(){
      if($(this).parents('p').find('.tips_js').hasClass('no-pass')) $(this).parents('p').find('.tips_js').removeClass('no-pass');
      $(this).parents('p').find('.tips_js').html('请输入下图中的字符，不区分大小写');
      $(this).parents('p').find('.tips_js').addClass('tip-txt');
  });

  $('#captcha').blur(function(){
      if($(this).val().replace(/\s/g, '') == ''){
        $('#captcha').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').html('请填写验证码！');  
      }else{
        $(this).parents('p').find('.tips_js').html('');
        $(this).parents('p').find('.tips_js').removeClass('tip-txt');
      }
  });


  $("#signup_form").live('submit',function(){
    email = $('#email').val();
    if(!email_valid(email)){
      $('#email').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').html('邮箱格式不正确！');  
      return false;}
    else{
        $('.signup_button').attr('data-disable-with', '提交...');
        $('.signup_button').css('color', '#888');
        return true;
    }
  });
  $('#service_item').live('click change',function(){
     $(this).parents('p').find('.tips_js').addClass('tip-txt');
     if($('#service_item').attr('checked') != true ){
      $('#service_item').parents('p').find('.tips_js').addClass('no-pass');
      $('#service_item').parents('p').find('.tips_js').text('您还未同意遵守服务条款');  
     }else{
      $('#service_item').parents('p').find('.tips_js').removeClass('no-pass');
      $('#service_item').parents('p').find('.tips_js').text('');     
      $('#service_item').parents('p').find('.tips_js').removeClass('tip-txt');  
     }
  });

  $('#change_pass_form').live('submit',function(){
    if($('#user_password').val().length < 6 ){
      $('#user_password').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').html('密码长度不小于6位！');  
      return false;  
    }
    if($('#user_password').val()!=$('#user_password_confirmation').val()){
      $('#user_password_confirmation').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').text('两次密码不一致');
      return false;
    }
    return true;
  });

/*
  $('#resident_address').live('input keyup', function(){
    $('#address_name').text($(this).val());
    if($(this).val().replace(/[^\x00-\xff]/g,"aa").length > 16)
      alert("地址最多输入8个汉字，或16个英文/数字。");
  });
*/

  $("#user_edit").live('submit',function(){
    if($('#user_password').val().length < 6){ 
      $('#user_password').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').html('密码长度不小于6位！');  
      a = false;}else a = true;
    if($('#user_password_confirmation').val() != $('#user_password').val()){
      $('#user_password_confirmation').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').text('两次密码不一致'); 
      b = false;}else b = true;
    if(!email_valid($('#user_email').val())){
      $('#user_email').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').html('邮箱格式不正确！');
      c = false;}else c = true;
    if($('#user_truename').val().replace(/[^\x00-\xff]/g,"aa").length > 14 || $('#user_truename').val() =='' ){
      $('#user_truename').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').text('必须填写姓名！');
      d = false;} else d = true;
    if($('#service_item').attr('checked') != true ){
      $('#service_item').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').text('您还未同意遵守服务条款'); 
      e = false;} else e= true;
    if($('#captcha').val().replace(/\s/g, '') == ''){
      $('#captcha').parents('p').find('.tips_js').addClass('tip-txt').addClass('no-pass').html('请填写验证码！');
      f = false;}else f = true;
    if(a && b && c && d && e && f){
      $('.signup_button').attr('data-disable-with', '提交...');
      $('.signup_button').css('color', '#888');
      return true;
    }else return false;
  });

  $('.user_names').live('input keyup',function(){
     val = $(this).val();
     if(val.replace(/[^\x00-\xff]/g,"aa").length == val.length ){
       $(this).attr('maxlength', 14);
     } else {
       $(this).attr('maxlength', 7);
       $(this).val(val.substring(0, 7));
     }
  });

/*
	$(".community").click( function(){
		document.documentElement.scrollTop=document.body.clientHeight;
    document.body.scrollTop=document.body.clientHeight;
		$("#resident_address").focus().effect("highlight",{}, 1000);
	})

	$(".letter_community").live('click', function(){
		name = this.id.split("_")[2]
		if(name == "all"){
			$(".community_letter_list").show();			
		}else{
			$(".community_letter_list").hide();
			$("#community_list_" + name).show();
		}
	})

  $('#user_password').live('keyup',function(){
  digitalspaghetti.password.options = {	
		  'displayMinChar': false,
		  'minChar': 6,
		  'minCharText': 'You must enter a minimum of %d characters',
		  'colors': ["#f00", "#c06", "#f60", "#3c0", "#3f0"],
		  'scores': [20, 30, 43, 50],
		  'verdicts':	['Weak', 'Normal', 'Medium', 'Strong', 'Very Strong'],
		  'raisePower': 1.4,
		  'debug': false
	  };
    score = digitalspaghetti.password.calculateScore($(this).val());
    if( score <= 15){
        $('.password-level').find('span').each(function(){$(this).removeClass('password-class');}); 
                      $('#pd_txt').html("<font style='color:red;'>(密码强度:弱)</font>");
    }else if(15 < score && score <= 25){ 
        $('.password-level').find('span').each(function(){$(this).removeClass('password-class');}); 
                      $('#normal').addClass('password-class');
                      $('#pd_txt').html("<font style='color:orange;'>(密码强度:普通)</font>");
    }else if(25 < score && score <= 35){ 
        $('.password-level').find('span').each(function(){ $(this).addClass('password-class'); }); 
                      $('#strong').removeClass('password-class');
                      $('#pd_txt').html("<font style='color:blue;'>(密码强度:较强)</font>");
    }else if(score > 35){ 
        $('.password-level').find('span').each(function(){$(this).addClass('password-class'); }); 
                      $('#pd_txt').html("<font style='color:green;'>(密码强度:很强)</font>");
    }else{ 
        $('.password-level').find('span').each(function(){$(this).removeClass('password-class'); }); 
    }
  });
*/
});

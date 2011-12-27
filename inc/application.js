var SHOWCARD;
var HIDECARD;

function isEmpty(val){
  if(val.replace(/\s/ig, '') == ''){
    return true;}
  else{
    return false;}
}


function image_valid(img){
 return /\.(jpg|png|jpeg|gif)/i.test(img.toLowerCase());
}

function email_valid(email){
 if (/[\w]+@[\w]+(\.\w+){1,3}/.test(email))
  return true;
 else 
  return false;
}

 on_upload = function(file, ext) {
        if (!image_valid('.' + ext)) {
             alert('图片格式不对！');
            return false;
        }   
        $('#upload-pic-prev').html($('#loading_image').html());
        $('#upload-pic-prev').show();
        return true;
    }

function unlogin(){
 who_is = $('#who').val();
 a = true;
    if (who_is  == 'unknown'){
      data = {'info':"您还没有登录，<a href='/login'>登录</a> 或者 <a href='/signup'>注册</a>？"};
      $.get('/users/is_not_owner', data, null, 'script');
      a = false;
    }else if (who_is  == 'guest'){
      data = {'info':'您不是本小区的居民！'};
      $.get('/users/is_not_owner', data, null, 'script');
      a = false;        
   }
  return a;
} 

var show_face = function(ele){
    $(ele).each(function(){
      content = $(this).html();
//alert('content' + content);
      result = content.replace(/\[[a-z]+\]/g,function(word){return '<img src=http://www.zuilinke.com/images/face/basic/' + word.substring(1,word.length - 1) + '.gif />';});
//alert('result' + result);
      $(this).html(result); 
    });
  }



$(document).ready(function(){
//发起活动删除隐藏
  $('.playbill-cancel').click(function(){
    $('.playbill-btn').hide();
    $('#activity_poster').val('');
  });

  $('#activity_poster').change(function(){
    $('.playbill-btn').show();  
  });

  $('.freeradio').click(function(){
    if(this.value == "true"){
      $('#activity_fee').attr('disabled',true);
    }else{
      $('#activity_fee').attr('disabled',false);
    }
  });
//---------------------------------------------

$("#remmend_btn").toggle(
    function(){
      $(".invite-form").slideDown(); 
    },
    function(){
      $(".invite-form").slideUp(); 
    }
);

if($('#inboxes_count').text() == '0'){
  $('.inbox_count').empty();
}

if($('h6.more-info').length > 0){
  $(window).scroll(function(){
    if($(window).scrollTop() + 150 >= $(document).height() - $(window).height())
      $("h6.more-info > a").click();
  });
}

  $('.unlogin').live('click', function(){
    unlogin();
  });

  $('#simple_signup').submit(function(){
    emails = $('#simple_email').val();
    pass_word = $('#simple_password').val();
    names = $('#simple_name').val();
    captchas = $('#captcha').val();
    var error_msg = '';
    if ( isEmpty(emails) || !email_valid(emails)){
      error_msg += '请正确输入邮箱! ';
    }
    if ( isEmpty(pass_word) || 6 > pass_word.length){
      error_msg += '请输入6位以上的密码！ ';
    }
    if ( isEmpty(names) || 7 < names.length){
      error_msg += '请输入不多于7个字的姓名！ ';
    } 
    if (isEmpty(captchas)){
      error_msg += '请输入验证码！ ';
    }
    if ($('#service_item').attr('checked') != true ){ 
      error_msg += '未同意服务条款！ '; 
    }
    if (isEmpty($('#simple_address').val()) ){ 
      error_msg += '请填写楼号！ '; 
    }
    if ( isEmpty(error_msg) ){
      return true;
    }else{
      alert( error_msg );
      error_msg = '';
      return false;
    }
  });
/*
  $('#simple_signup_dialog').live('submit',function(){
    emails = $('#simple_email_dialog').val();
    pass_word = $('#simple_password_dialog').val();
    names = $('#simple_name_dialog').val();
    captchas = $('#captcha_dialog').val();
    var error_msg = '';
    if ( isEmpty(emails) || !email_valid(emails)){
      error_msg += '请正确输入邮箱! ';
    }
    if ( isEmpty(pass_word) || 6 > pass_word.length){
      error_msg += '请输入6位以上的密码！ ';
    }
    if ( isEmpty(names) || 7 < names.length){
      error_msg += '请输入不多于7个字的姓名！ ';
    } 
    if (isEmpty(captchas)){
      error_msg += '请输入验证码！ ';
    }
    if ($('#service_item_dialog').attr('checked') != true ){ 
      error_msg += '未同意服务条款！ '; 
    }
    if (isEmpty($('#simple_address_dialog').val()) ){ 
      error_msg += '请填写楼号！ '; 
    }
    if ( isEmpty(error_msg) ){
      return true;
    }else{
      alert( error_msg );
      error_msg = '';
      return false;
    }
  });
*/
	$("#test_sch").live('click',function(){
    emails = $('#simple_email_dialog').val();
    pass_word = $('#simple_password_dialog').val();
    names = $('#simple_name_dialog').val();
    captchas = $('#captcha_dialog').val();
    var error_msg = '';
    if ( isEmpty(emails) || !email_valid(emails)){
      error_msg += '请正确输入邮箱! ';
    }
    if ( isEmpty(pass_word) || 6 > pass_word.length){
      error_msg += '请输入6位以上的密码！ ';
    }
    if ( isEmpty(names) || 7 < names.length){
      error_msg += '请输入不多于7个字的姓名！ ';
    } 
    if (isEmpty(captchas)){
      error_msg += '请输入验证码！ ';
    }
    if ($('#service_item_dialog').attr('checked') != true ){ 
      error_msg += '未同意服务条款！ '; 
    }
    if (isEmpty($('#simple_address_dialog').val()) ){ 
      error_msg += '请填写楼号！ '; 
    }
    if ( isEmpty(error_msg) ){
      return true;
    }else{
      alert( error_msg );
      error_msg = '';
      return false;
    }
	})


$(".reply").live('click',function(){
  val = $('#content').val();
  user_name =  $(this).parents('.content-title').find(".publish_name").text();
  user_id = $(this).parents('.content-title').find('.user_id').val();
  $('#to_user_id').val(user_id);
  if ( /^(回复).*:/.test(val))
     $('#content').val(val.replace(/^(回复).*:/, '回复'+user_name+':'));
  else
     $('#content').val('回复'+user_name+': ' + val);
}); 

$('#reject_card').live('click', function(){
  $('#reject_card_reason').show();
});

$('#agree_card').live('click', function(){
  $('#reject_card_reason').hide();
});

  $('.comment-btn').live('click', function(){
    var form = $(this).parents('form');
    var divcontainer = $(this).parents('.comment-type-community');
    form.submit(function(){
      to_user = divcontainer.find('.publish_user').val();
      content = form.find('textarea').val();
      if (!(/^(回复).*:/.test(content))) form.find('.to_user_id').val(to_user);
      if(content == '' || content == null)
        return false;
      else{
       form.find('.comment-btn').attr('disabled', 'disabled');
       //form.find('textarea').val(content.replace(/^(回复).*:/, ''));
       return true;
      }
    });
  });

$('.tip-close').live('click', function(){
  $(this).parents('.tip-pop').hide();
});

/*输入框获得焦点清空默认值*/
$(".invite-text").focus(function(){
  if($(this).val() == "朋友邮箱")
    $(this).val("");
}); 
$(".invite-text").blur(function(){
  if($(this).val() == "")
    $(this).val("朋友邮箱");
});

$('#invite_form').submit(function(){
    email = $('#email').val() ;
    if(email == ''){
      return false;
    }else {
      if(!email_valid(email)){
        return false;
      }else{
        return true;
      }
    }
  });

  $(".showcard").live("mouseover mouseout", function(event) {
    if ( event.type == "mouseover" ) {
      user_id = $(this).attr('href').split("\/")[2];
      if ((user_id != null && user_id != '' && !isNaN(user_id))) {
        SHOWCARD = setTimeout(function(){$.get('/communities/get_card', {"user_id" : user_id, "left" : event.pageX, "top" : event.pageY});}, 250);
        clearTimeout(HIDECARD);
      }
    } else {
      HIDECARD = setTimeout(function(){$('#card').hide();}, 250);
      clearTimeout(SHOWCARD);
    }
  });

  $("#card").live("mouseover mouseout", function(event) {
    if ( event.type == "mouseover" ) {
      clearTimeout(HIDECARD);
    } else {
      HIDECARD = setTimeout(function(){$('#card').hide();}, 250);
    }
  });

  $("a.close").live("click", function() {
    $(".back-cover").hide();
    $("#dialog_main_container").hide();
    $(".dialog-main-big").hide();
    return false;
  });

  $("div.top-tips > a.top-close").live("click", function() {
    $(".top-tips").slideUp();
  });

  $(".cancel-btn").live("click", function() {
    $(".back-cover").hide();
    $("#dialog_main_container").hide();
    return false;
  });

//背景
var cookies=document.cookie.split(";");
var a_list = $(".community a");

for(var i=0;i<cookies.length;i++){
	var s=cookies[i].split("=");
	if(s[0]=="themename")
  {
    $("#themecss").attr("href",s[1]) ;
    del_class(a_list);
    var num = s[1].substring(19,20) ;
    $(".community a.bg_c"+num).addClass("bg_c"+num+"_selected");
  }
}
     
function del_class(list)
{
    for(var i = 1;i<=list.length;i++) 
      {
        $(".community a").removeClass("bg_c"+i+"_selected"); 
      }
}
$(".community a").live('click',function() {
del_class(a_list);
$(this).addClass($(this).attr("class")+"_selected");
var href_txt = "/stylesheets/theme_"+$(this).attr("class").substring(4,5)+".css";
$("#themecss").attr("href",href_txt) ;
document.cookie ="themename="+href_txt+";max-age="+ (60*60*24*30)+';path='+"/";
});
$('.city').live('click',function(){
  $('.city-name').find('.selected').removeClass('selected');
  $('.community-letter').find('.selected').removeClass('selected');
  $('.show-all').addClass('selected');
  $(this).addClass('selected');
  $('.letters').show();
  $('#city_name').text($(this).text());
  $('#select_city').val($(this).attr('value'));
  $('#city_community').html('<span class="must-star">*</span>'+$(this).text()+'小区');
  data = {'city_id': $('#select_city').val(),'interface':$('#interface').val()};
  $.get('/admin/communities_index', data, null, "script"); 
});

$('.letter_action').live('click', function(){
  $('.sel-letters').find('.sel-now').removeClass('sel-now');
  if (!$(this).hasClass('all-letters'))$(this).addClass('sel-now');
   if($(this).hasClass('all-letters'))
    data = {'city_id': $('#select_city').val(),'interface':$('#interface').val()};
   else
    data = {"first_cell":$(this).text(), 'city_id': $('#select_city').val(),'interface':$('#interface').val()};
  if($(this).attr('sign_up') == 'true') data['sign_up'] = true;
   $.get('/admin/communities_index', data, null, "script"); 
});

$('.community').live('click', function(){
  $(this).parents('.community-list').find('.selected').removeClass('selected');
  $(this).addClass('selected');
  $("#community_name").text($(this).text());
  $('#resident_community_id').val($(this).attr('value'));
});

$('.submit-now').live('click',function(){
// if ($("input[name='resident[community_id]']:checked").length == 0){alert('请选择小区!'); return false; }
// else 
 if( $('#resident_community').val() == '' || $('#resident_community').val() == null ) {
    alert('请填写小区!');
    $('#resident_community').focus();
    return false;}
 else if ($('#resident_community').val() != $('#resident_community_name').val())
{ alert('对不起，您填写的小区暂未开通!'); return false; }
 else if ($('#resident_address').val() == ''  || $('#resident_address').val() == null)
{ alert('请填写楼栋!');$('#resident_address').focus(); return false; }
 else if ($('#user_email').length > 0 && ($('#user_email').val() == ''  || $('#user_email').val() == null || !email_valid($('#user_email').val())))
{ alert('请正确填写您的邮箱!');$('#user_email').focus(); return false; }
 else{
    if($('.dialog-content').length > 0){
      $('#add_communities_form').append("<input type='hidden' name='call_for', value='dialog'/>");
      $('#add_communities_form').attr('data-remote',true);
      return true;
    }else{
      return true;
    }}
});
var notice = $('#notice').val();
if (notice != '' && notice !=null ){
  $('#tip_content').html(notice);
  $('.top-tips').slideDown();
  setTimeout(function(){$('.top-tips').slideUp();},2000);
}

$(".more-info a").live('click',function(){
  $('.more-info').html($('#loading_image').html());
});


});

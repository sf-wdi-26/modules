$(function(){
  $('header nav > ul > li:nth-child(4) ul li:nth-child(1)').on('click', function(){
    event.preventDefault();
    $(this).siblings().slideToggle();
  });
})
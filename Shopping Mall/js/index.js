$(function () {
  // 1. 显示隐藏电梯导航
  let toolTop = $(".recommend").offset().top;
  toggleTool();
  function toggleTool() {
    if ($(document).scrollTop() >= toolTop) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    }
  }
  $(window).scroll(function () {
    toggleTool();
  });

  // 2. 点击电梯导航页面可以滚动到相应内容区域
  $(".fixedtool li").click(function () {
    // 点击li需要计算出页面要去往的位置
    // 选出对应索引号的内容区的盒子 计算它的.offset().top
    let current = $(".floor .wrap").eq($(this).index()).offset().top;
    // 页面动画滚动效果
    $("body,html").stop().animate({
      scrollTop: current,
    });
    // 给当前小li添加current
    $(this).addClass("current").siblings().removeClass();
  });
});

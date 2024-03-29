$(function () {
  // 当我们点击小li 此时不需要执行 页面滚动事件里面的li的背景选择
  // 节流阀 互斥锁
  let flag = true;
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
    // 3. 页面滚动到某个内容区域，左侧电梯导航相应添加和删除current类名
    if (flag) {
      $(".floor .wrap").each(function (i, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
        }
      });
    }
  });

  // 2. 点击电梯导航页面可以滚动到相应内容区域
  $(".fixedtool li").click(function () {
    flag = false;
    // 点击li需要计算出页面要去往的位置
    // 选出对应索引号的内容区的盒子 计算它的.offset().top
    let current = $(".floor .wrap").eq($(this).index()).offset().top;
    // 页面动画滚动效果
    $("body,html")
      .stop()
      .animate(
        {
          scrollTop: current,
        },
        function () {
          flag = true;
        }
      );
    // 给当前小li添加current
    $(this).addClass("current").siblings().removeClass();
  });
});

//浏览器窗口大小改变时，改变字体大小
(function (doc, win) {
  var doc = doc.documentElement;
  // 当DOM加载后执行
  doc.addEventListener("DOMContentLoaded", Resize, false);
  // 当屏幕发生变化时执行
  win.addEventListener("resize", debounce(Resize, 500), false);
  Resize();

  function Resize() {
    doc.style.fontSize = doc.clientWidth / 96 + "px"; //屏幕宽度为1920时 font-size = 20px;
  }

  // 防抖
  function debounce(fn, wait) {
    var timeout = null;
    return function () {
      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(fn, wait);
    };
  }
})(document, window);

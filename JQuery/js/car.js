$(function () {
  // 1. 全选 全不选功能
  $(".checkall").change(function () {
    $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
  });
  // 2. 小复选框功能
  $(".j-checkbox").change(function () {
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
      $(".checkall").prop("checked", true);
    } else {
      $(".checkall").prop("checked", false);
    }
  });
  // 3. 商品数量增减功能
  $(".increment").click(function () {
    var n = $(this).siblings("input").val();
    n++;
    $(this).siblings("input").val(n);
  });
  $(".decrement").click(function () {
    var n = $(this).siblings("input").val();
    n--;
    $(this).siblings("input").val(n);
  });
});

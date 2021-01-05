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
    let n = $(this).siblings("input").val();
    n++;
    $(this).siblings("input").val(n);
    // 4. 小计计算功能
    // let p = $(this).parent().parent().siblings(".list-price").children().html();
    let p = $(this)
      .parents(".list-stock")
      .siblings(".list-price")
      .children()
      .html();
    p = p.substr(2);
    let price = (p * n).toFixed(2);
    $(this)
      .parents(".list-stock")
      .siblings(".list-total")
      .html("¥ " + price);
  });
  $(".decrement").click(function () {
    let n = $(this).siblings("input").val();
    if (n == 1) {
      return;
    }
    n--;
    $(this).siblings("input").val(n);
    let p = $(this)
      .parents(".list-stock")
      .siblings(".list-price")
      .children()
      .html();
    p = p.substr(2);
    let price = (p * n).toFixed(2);
    $(this)
      .parents(".list-stock")
      .siblings(".list-total")
      .html("¥ " + price);
  });
  // 5. 本文框输入功能
  $(".itxt").change(function () {
    let n = $(this).val();
    let p = $(this)
      .parents(".list-stock")
      .siblings(".list-price")
      .children()
      .html();
    p = p.substr(2);
    let price = (p * n).toFixed(2);
    $(this)
      .parents(".list-stock")
      .siblings(".list-total")
      .html("¥ " + price);
  });
});

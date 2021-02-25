$(function () {
  // 1. 全选 全不选功能
  $(".checkall").change(function () {
    $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
    // 添加商品背景颜色
    if ($(this).prop("checked")) {
      $(".list-item").addClass("check-list-item");
    } else {
      $(".list-item").removeClass("check-list-item");
    }
  });
  // 2. 小复选框功能
  $(".j-checkbox").change(function () {
    if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
      $(".checkall").prop("checked", true);
    } else {
      $(".checkall").prop("checked", false);
    }
    // 添加商品背景颜色
    if ($(this).prop("checked")) {
      $(this).parents(".list-item").addClass("check-list-item");
    } else {
      $(this).parents(".list-item").removeClass("check-list-item");
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

    getSum();
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
    getSum();
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
    getSum();
  });
  // 6. 计算总计和总额模块
  getSum();
  function getSum(domEle) {
    let count = 0; // 计算总件数
    let money = 0; // 计算总价钱
    $(".itxt").each(function (index, ele) {
      count += parseInt($(ele).val());
    });
    $(".total-count").text(count);
    $(".list-total").each(function (index, ele) {
      money += parseFloat($(ele).text().substr(2));
    });
    $(".total-sum").text("¥ " + money.toFixed(2));
  }
  // 7. 删除商品
  // (1) 商品后面的删除按钮
  $(".list-del a").click(function () {
    $(this).parents(".list-item").remove();
    getSum();
  });
  // (2) 删除选中的商品
  $(".control-del").click(function () {
    $(".j-checkbox:checked").parents(".list-item").remove();
    getSum();
  });
  // (3) 清空购物车 删除全部商品
  $(".control-clear").click(function () {
    $(".list-item").remove();
    getSum();
  });
});

window.onload = function () {
  var regtel = /^1[3|4|5|6|7|8|9]\d{9}$/; // 手机号码的正则表达式
  var regqq = /^[1-9]\d{4,}$/;
  var regname = /^[\u4e00-\u9fa5]{2,8}$/;
  var regmsg = /^\d{6}$/;
  var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
  var tel = document.querySelector("#tel");
  var qq = document.querySelector("#qq");
  var name = document.querySelector("#nickname");
  var msg = document.querySelector("#msg");
  var pwd = document.querySelector("#pwd");
  var surepwd = document.querySelector("#surepwd");
  regexp(tel, regtel); // 手机号码
  regexp(qq, regqq); // QQ号码
  regexp(name, regname); // 昵称
  regexp(msg, regmsg); // 短信验证码
  regexp(pwd, regpwd); // 密码

  // 表单验证的函数
  function regexp(ele, reg) {
    ele.onblur = function () {
      if (reg.test(this.value)) {
        this.nextElementSibling.className = "success";
        this.nextElementSibling.innerHTML =
          '<i class="iconfont icon-success error_icon"></i>恭喜您输入正确</span>';
      } else {
        this.nextElementSibling.className = "error";
        this.nextElementSibling.innerHTML =
          '<i class="iconfont icon-error error_icon"></i>格式不正确，请重新输入</span>';
      }
    };
  }
  surepwd.onblur = function () {
    if (this.value == pwd.value) {
      this.nextElementSibling.className = "success";
      this.nextElementSibling.innerHTML =
        '<i class="iconfont icon-success error_icon"></i>恭喜您输入正确</span>';
    } else {
      this.nextElementSibling.className = "error";
      this.nextElementSibling.innerHTML =
        '<i class="iconfont icon-error error_icon"></i>两次密码输入不正确</span>';
    }
  };
};

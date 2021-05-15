var t = null;
t = setTimeout(time, 1000); // 开始运行
function time() {
  clearTimeout(t); //清除定时器
  dt = new Date();
  var y = dt.getFullYear();
  var mt = dt.getMonth() + 1;
  mt = mt < 10 ? "0" + mt : mt;
  var day = dt.getDate();
  day = day < 10 ? "0" + day : day;
  var h = dt.getHours();
  h = h < 10 ? "0" + h : h;
  var m = dt.getMinutes();
  m = m < 10 ? "0" + m : m;
  var s = dt.getSeconds();
  s = s < 10 ? "0" + s : s;
  document.querySelector(".showTime").innerHTML =
    y + "-" + mt + "-" + day + "    " + h + "-" + m + "-" + s;
  t = setTimeout(time, 1000);
}

(function () {
  setInterval(getPlan, 2000);
  var i = 0;
  function getPlan() {
    $.ajax({
      url: "data/plan.json",
      type: "GET",
      dataType: "JSON",
      data: {},
      success: function (res) {
        if (res.code == "000") {
          i >= res.lists.length - 1 ? (i = 0) : i++;
          var data = res.lists[i];
          $("#planNumber").html(data.planNumber);
          $("#fulfilNumber").html(data.fulfilNumber);
          $("#fulfil").html(data.fulfil);
          $("#adopt").html(data.adopt);
          $("#PPM").html(data.PPM);
        } else {
          alert(res.message);
        }
      },
    });
  }
  getPlan();
})();

(function () {
  var state = document.querySelector(".state");
  var stateBody = document.querySelector(".state-body");
  var stateBody1 = document.querySelector(".state-body1");
  stateBody1.innerHTML = stateBody.innerHTML;
  setInterval(() => {
    if (state.scrollTop >= stateBody.scrollHeight) {
      state.scrollTop = 0;
    } else {
      state.scrollTop++;
    }
  }, 20);
})();

(function () {
  var option = {
    series: [
      {
        name: "FPY",
        type: "gauge",
        radius: "116%",
        startAngle: 220,
        endAngle: -40,
        center: ["26%", "64%"],
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [0.4, "#127cf5"],
              [1, "#263249"],
            ],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        title: {
          fontSize: 16,
          color: "#fff",
          offsetCenter: [0, "34%"],
        },
        detail: {
          color: "#fff",
          fontSize: 20,
          fontWeight: 600,
          textBorderColor: "#000",
          textBorderWidth: 1,
          textShadowBlur: 20,
          textShadowColor: "#fff",
          offsetCenter: [0, "-12%"],
          formatter: function (value) {
            return value + "%";
          },
        },
        data: [
          {
            value: 45,
            name: "FPY",
          },
        ],
      },
      {
        name: "UPH",
        type: "gauge",
        color: ["#f00"],
        radius: "116%",
        startAngle: 220,
        endAngle: -40,
        center: ["76%", "64%"],
        axisLine: {
          lineStyle: {
            width: 14,
            color: [
              [0.986, "#127cf5"],
              [1, "#263249"],
            ],
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          show: false,
        },
        title: {
          fontSize: 16,
          color: "#fff",
          offsetCenter: [0, "34%"],
        },
        detail: {
          color: "#fff",
          fontSize: 20,
          fontWeight: 600,
          textBorderColor: "#000",
          textBorderWidth: 1,
          textShadowBlur: 20,
          textShadowColor: "#fff",
          offsetCenter: [0, "-12%"],
          formatter: function (value) {
            return value + "%";
          },
        },
        data: [
          {
            value: 98.6,
            name: "UPH",
          },
        ],
      },
    ],
  };
  var element = document.querySelectorAll(".meter .chart");
  element.forEach((item) => {
    var myChart = echarts.init(item);
    myChart.setOption(option);
  });
})();

(function () {
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  var data = {
    name: [
      "CLO1",
      "CLO3",
      "LO2",
      "LO3",
      "LO5",
      "LO7",
      "LO9",
      "L22",
      "L23",
      "SLO1",
    ],
    num1: [
      98,
      94,
      30,
      180,
      268,
      350,
      482,
      360,
      375,
      300,
      320,
      140,
      192,
      110,
      124,
      68,
      86,
    ],
    num2: [
      97,
      92,
      28,
      176,
      256,
      342,
      488,
      390,
      380,
      310,
      324,
      170,
      168,
      89,
      145,
      68,
      88,
    ],
  };

  var option = {
    grid: {
      left: "2%",
      right: "2%",
      bottom: "2%",
      top: "16%",
      containLabel: true,
    },

    xAxis: [
      {
        type: "category",
        data: data.name,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#65abe7",
            opacity: 0.2,
          },
        },
        axisLabel: {
          textStyle: {
            color: "#65abe7",
            fontStyle: 700,
            fontSize: 14,
          },
          rotate: 50,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitNumber: 5,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#65abe7",
            fontStyle: "700",
            fontSize: 10,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#0f2a42"],
            opacity: 1,
          },
        },
      },
    ],
    series: [
      {
        name: "",
        type: "bar",
        data: data.num1,
        barWidth: 10,
        barGap: 0,
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#41e8d3",
              },
              {
                offset: 1,
                color: "#86f8d9",
              },
            ]),
          },
        },
      },
      {
        name: "",
        type: "bar",
        data: data.num2,
        barWidth: 10,
        barGap: 0,
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#597eef",
              },
              {
                offset: 1,
                color: "#3d66ea",
              },
            ]),
          },
        },
      },
    ],
  };
  myChart.setOption(option);
})();

(function () {
  var myChart = echarts.init(document.querySelector(".bar1 .chart"));
  setInterval(getMove, 2000);
  var i = 0;
  var data = [];
  var arr = [];

  function getMove() {
    $.ajax({
      url: "data/move.json",
      type: "get",
      dataType: "JSON",
      data: {},
      success: function (res) {
        if (res.code == "000") {
          i = i >= res.lists.length - 1 ? 0 : i;
          var newArr = [];
          data = res.lists.slice(i, i + 10);
          i = i + 10;
          data.forEach((item) => {
            newArr.push(item.name);
          });
          arr = newArr;
          option.series[0].data = data;
          option.yAxis.data = arr;
          myChart.setOption(option);
        } else {
          alert(res.message);
        }
      },
    });
  }
  getMove();

  var option = {
    grid: {
      top: "14%",
      left: "4%",
      right: "16%",
      bottom: "8%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      textStyle: {
        color: "#6e7079",
      },
      backgroundColor: "#fff",

      formatter: function (params) {
        var res =
          "<div style='text-align: center;'>" +
          params[0].name +
          "</div>" +
          "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(20,122,241,0.9)'></span>移动率 " +
          "<span style='margin-left:10px;font-size:15px;font-weight: 600;'>" +
          params[0].value +
          "</span>";

        return res;
      },
    },

    xAxis: [
      {
        type: "value",
        min: 0,
        axisLabel: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: {
      type: "category",
      position: "left",
      inverse: true,
      axisLabel: {
        textStyle: {
          color: "#5d9fd9",
          fontSize: 10,
          fontWeight: 700,
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      data: arr,
    },
    series: [
      {
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "right",
            textStyle: {
              color: "#65abe7",
              fontSize: 14,
              fontWeight: 700,
            },
            formatter: "{c}" + "%",
          },
        },
        barWidth: 14,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: "#157af1",
              },
              {
                offset: 1,
                color: "#00c5f1",
              },
            ]),
          },
        },
        data: data,
      },
    ],
  };
})();

(function () {
  var myChart = echarts.init(document.querySelector(".bar2 .chart"));
  var option = {
    grid: {
      top: "18%",
      bottom: "2%",
      left: "4%",
      right: "6%",
      containLabel: true,
    },
    legend: {
      left: "right",
      top: "10%",
      textStyle: {
        color: "#0a9ef3",
        fontSize: 12,
      },
    },
    xAxis: {
      data: [
        "4-11",
        "4-12",
        "4-13",
        "4-14",
        "4-15",
        "4-16",
        "4-17",
        "4-18",
        "4-19",
        "4-20",
      ],
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#657ca8",
        },
      },

      axisLabel: {
        show: true,
        margin: 10,
        fontSize: 14,
        textStyle: {
          color: "#4073a1",
        },
      },
    },
    yAxis: [
      {
        type: "value",
        gridIndex: 0,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },

        axisLabel: {
          show: true,
          fontSize: 14,
          textStyle: {
            color: "#4073a1",
          },
        },
      },
    ],
    series: [
      {
        name: "UPH",
        type: "bar",
        barWidth: 20,
        itemStyle: {
          normal: {
            color: "#0a9ef3",
          },
        },
        data: [2000, 1800, 1780, 3000, 4200, 3200, 2100, 1400, 1300, 3100],
        z: 10,
        zlevel: 0,
      },
      {
        // 分隔
        type: "pictorialBar",
        itemStyle: {
          normal: {
            color: "#001027",
          },
        },
        width: 20,
        symbolRepeat: "fixed",
        symbolMargin: 3,
        symbol: "rect",
        symbolClip: true,
        symbolSize: [20, 4],
        symbolPosition: "start",
        symbolOffset: [0, 0],
        data: [2000, 1800, 1780, 3000, 4200, 3200, 2100, 1400, 1300, 3100],

        z: 0,
        zlevel: 1,
      },
      {
        name: "周转率",
        type: "line",
        smooth: false,
        showAllSymbol: false,
        symbolSize: 14,
        itemStyle: {
          color: "#da525a",
          borderColor: "#da525a",
          borderWidth: 3,
        },
        lineStyle: {
          color: "#da525a",
          width: 3,
        },

        data: [2000, 1800, 1780, 3000, 4200, 3200, 2100, 1400, 1300, 3100],
        z: 0,
        zlevel: 1,
      },
    ],
  };
  myChart.setOption(option);
})();

(function () {
  var myChart = echarts.init(document.querySelector(".pie .chart"));
  setInterval(getBad, 2000);
  var i = 0;
  var data = [];

  function getBad() {
    $.ajax({
      url: "data/bad.json",
      type: "get",
      dataType: "JSON",
      data: {},
      success: function (res) {
        if (res.code == "000") {
          i = i >= res.lists.length - 1 ? 0 : i;
          data = res.lists.slice(i, i + 5);
          i = i + 5;
          option.series[0].data = data;
          myChart.setOption(option);
        } else {
          alert(res.message);
        }
      },
    });
  }
  getBad();

  var option = {
    color: ["#dbd02a", "#f48349", "#cf6385", "#4394dc", "#930bfb"],
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} :  {d}%",
    },

    legend: {
      right: "1%",
      top: "center",
      orient: "vertical",
      itemWidth: 32,
      itemHeight: 16,
      itemGap: 10,
      textStyle: {
        fontSize: 14,
        color: "#65abe7",
      },
    },
    series: [
      {
        name: "前五大不良",
        type: "pie",
        roseType: "area",
        radius: [20, 64],
        center: ["40%", "52%"],
        label: {
          show: true,
          position: "outside",
          fontSize: 24,
          formatter: "{c|{c}}\n{c|{b}}",
          rich: {
            c: {
              fontSize: 15,
              color: "#fff",
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              width: 2,
            },
          },
        },
        data: data,
      },
    ],
  };
  myChart.setOption(option);
})();

(function () {
  var myChart = echarts.init(document.querySelector(".line .chart"));
  var color = ["#3573fc", "#d64a70"];
  var name = ["1", "2", "3", "4", "5", "6", "7", "8"];
  var value1 = [100, 138, 350, 173, 180, 150, 180, 230];
  var value2 = [233, 233, 200, 180, 199, 233, 210, 180];

  var option = {
    legend: {
      right: "10%",
      top: "8%",
      icon: "circle",
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        padding: [5, 0, 0, 0],
        fontSize: 14,
        fontWeight: 600,
        color: color,
      },
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "28%",
      bottom: "3%",
      left: "3%",
      right: "4%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#657ca8",
          },
        },
        axisLabel: {
          margin: 12,
          textStyle: {
            color: "#65abe7",
            fontSize: 14,
          },
        },
        data: name,
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "#65abe7",
            fontSize: 16,
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },

        splitLine: {
          lineStyle: {
            color: "#0f2a42",
          },
        },
      },
    ],
    series: [
      {
        name: "PD",
        type: "line",
        smooth: true,
        showSymbol: false,

        zlevel: 0,
        lineStyle: {
          normal: {
            color: color[0],
            width: 2,
          },
        },
        itemStyle: {
          color: color[0],
          borderColor: color[0],
          borderWidth: 2,
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(51, 110, 242,0.3)",
                },
                {
                  offset: 1,
                  color: "rgba(255,255,255,0)",
                },
              ],
              false
            ),
          },
        },
        data: value1,
      },
      {
        name: "AI",
        type: "line",
        smooth: true,
        showSymbol: false,

        zlevel: 2,
        lineStyle: {
          normal: {
            color: color[1],
            width: 2,
          },
        },
        itemStyle: {
          color: color[1],
          borderColor: color[1],
          borderWidth: 2,
        },

        data: value2,
      },
    ],
  };
  myChart.setOption(option);
})();

(function () {
  var myChart = echarts.init(document.querySelector(".bar3 .chart"));
  var option = {
    grid: [
      {
        left: "8%",
        top: "32%",
        right: "0%",
        bottom: "20%",
      },
    ],
    xAxis: [
      {
        gridIndex: 0,
        show: false,
      },
    ],
    yAxis: [
      {
        gridIndex: 0,
        splitLine: "none",
        axisTick: "none",
        axisLine: "none",
        axisLabel: {
          verticalAlign: "bottom",
          align: "left",
          padding: [0, 0, 8, 8],
          textStyle: {
            color: "#147cf1",
            fontSize: "14",
          },
        },
        data: ["line1", "line2", "line3", "line4"],
        inverse: true,
      },
      {
        gridIndex: 0,
        splitLine: "none",
        axisTick: "none",
        axisLine: "none",
        data: [625.32, 400.32, 300.32, 200.32],
        inverse: true,
        axisLabel: {
          show: true,
          verticalAlign: "bottom",
          align: "right",
          padding: [0, 42, 8, 0],
          textStyle: {
            color: "#147cf1",
            fontSize: "14",
          },
        },
      },
    ],
    series: [
      {
        name: "line1",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: [625.32],
        barWidth: 10,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              ["rgba(19, 128, 241, 0.2)", "rgba(1, 196, 241, 1)"].map(
                (color, offset) => ({
                  color,
                  offset,
                })
              )
            ),
          },
        },
        z: 2,
      },
      {
        name: "line2",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: [, 400.32],
        barWidth: 10,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              ["rgba(19, 128, 241, 0.2)", "rgba(1, 196, 241, 1)"].map(
                (color, offset) => ({
                  color,
                  offset,
                })
              )
            ),
          },
        },
        z: 2,
      },
      {
        name: "line3",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: [, , 300.32],
        barWidth: 10,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              ["rgba(19, 128, 241, 0.2)", "rgba(1, 196, 241, 1)"].map(
                (color, offset) => ({
                  color,
                  offset,
                })
              )
            ),
          },
        },
        z: 2,
      },
      {
        name: "line4",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        data: [, , , 200.32],
        barWidth: 10,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              ["rgba(19, 128, 241, 0.2)", "rgba(1, 196, 241, 1)"].map(
                (color, offset) => ({
                  color,
                  offset,
                })
              )
            ),
          },
        },
        z: 2,
      },
      {
        name: "外框",
        type: "bar",
        xAxisIndex: 0,
        yAxisIndex: 0,
        barGap: "-100%",
        data: [1554, 1554, 1554, 1554],
        barWidth: 10,
        itemStyle: {
          normal: {
            color: "rgba(12, 48, 84, 0.15)",
          },
        },
        z: 0,
      },
    ],
  };
  myChart.setOption(option);
})();

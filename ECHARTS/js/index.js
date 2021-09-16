function timer() {
  clearInterval(timer);
  var timer = setInterval(function () {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var h = now.getHours();
    var min = now.getMinutes();
    var s = now.getSeconds();
    var weekend = now.getDay();
    var weekArr = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    weekend = weekArr[weekend];

    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;
    h = h < 10 ? "0" + h : h;
    min = min < 10 ? "0" + min : min;
    s = s < 10 ? "0" + s : s;

    var date = y + "-" + m + "-" + d;
    var time = h + ":" + min + ":" + s;
    $(".time").text(date + "  " + time);
  }, 1000);
}
timer();

// 线体
let linesData = [
  {
    line: "ZgL-ZZ-1XIAN",
    state: 0,
    machine: 0001,
    norms: "80%",
    delayed: "1H",
    PPM: 50,
    FPY: 55,
    UPH: 95,
    totalProgress: 1000,
    progress: 500,
  },
  {
    line: "ZgL-ZZ-2XIAN",
    state: 1,
    machine: 0002,
    norms: "90%",
    delayed: "2H",
    PPM: 60,
    FPY: 66,
    UPH: 96,
    totalProgress: 1000,
    progress: 600,
  },
  {
    line: "ZgL-ZZ-3XIAN",
    state: 0,
    machine: 0003,
    norms: "100%",
    delayed: "3H",
    PPM: 70,
    FPY: 77,
    UPH: 97,
    totalProgress: 1000,
    progress: 700,
  },
];
let meterPool = {};
$(".lines-list").html(`
  ${linesData
    .map((item, index) => {
      return `  
        <div class="lines-item">
          <div class="item-left">
            <div class="item-top">
              <div class="state-info">
                ${item.line}
                <div>
                  <a href="#">
                    <img src="./images/play.jpg" alt="" />
                    线体状态
                  </a>
                  <span class="state-signal ${
                    item.state ? "" : "state-working"
                  }">${item.state ? "空闲" : "运作"}</span>
                </div>
              </div>
              <div class="param-list">
                <div class="param-item">
                  <span class="param-name">机种</span><span>${
                    item.machine
                  }</span>
                </div>
                <div class="param-item">
                  <span class="param-name">PPM</span><span>${item.PPM}</span>
                </div>
                <div class="param-item">
                  <span class="param-name">规格</span><span>${item.norms}</span>
                </div>
                <div class="param-item">
                  <span class="param-name">延时</span><span>${
                    item.delayed
                  }</span>
                </div>
              </div>
            </div>
            <div class="progress">
              <span class="progress-bar" style="width: ${
                (item.progress / item.totalProgress) * 100
              }%;"></span>
              <span class="progress-text">${
                item.progress + "/" + item.totalProgress
              }</span>
            </div>
          </div>
          <div class="item-right meter${index}">
            <div class="chart"></div>
          </div>
        </div>`;
    })
    .join("")}
  `);
linesData.forEach((item, i) => {
  meterPool["chart" + i] = echarts.init(
    document.querySelector(".meter" + i + " .chart")
  );
  meterPool["option" + i] = {
    series: [
      {
        name: "FPY",
        type: "gauge",
        radius: "100%",
        startAngle: 220,
        endAngle: -40,
        center: ["28%", "60%"],
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [item.FPY / 100, "#127cf5"],
              [1, "#263249"],
            ],
          },
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
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
            value: item.FPY,
            name: "FPY",
          },
        ],
      },
      {
        name: "UPH",
        type: "gauge",
        radius: "100%",
        startAngle: 220,
        endAngle: -40,
        center: ["72%", "60%"],
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [item.UPH / 100, "#127cf5"],
              [1, "#263249"],
            ],
          },
        },
        splitLine: {
          show: false,
        },

        axisLabel: {
          show: false,
        },
        axisTick: {
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
            value: item.UPH,
            name: "UPH",
          },
        ],
      },
    ],
  };
  meterPool["chart" + i].setOption(meterPool["option" + i]);
});

// 时段产量
let yieldData = {
  xAxis: [
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
  value1: [
    98, 94, 30, 180, 268, 350, 482, 360, 375, 300, 320, 140, 192, 110, 124, 68,
    86,
  ],
  value2: [
    97, 92, 28, 176, 256, 342, 488, 390, 380, 310, 324, 170, 168, 89, 145, 68,
    88,
  ],
};
let yieldChart = echarts.init(document.querySelector("#yield .chart"));
let yieldOption = {
  grid: {
    top: "18%",
    left: "9%",
    right: "5%",
    bottom: "16%",
  },
  xAxis: [
    {
      type: "category",
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
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      data: yieldData.xAxis,
    },
  ],
  yAxis: [
    {
      type: "value",
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
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#0f2a42",
          opacity: 1,
        },
      },
    },
  ],
  series: [
    {
      name: "",
      type: "bar",
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
      data: yieldData.value1,
    },
    {
      name: "",
      type: "bar",

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
      data: yieldData.value2,
    },
  ],
};
yieldChart.setOption(yieldOption);

// 设备移动率
let impactingData = {
  yAxis: ["设备1", "设备2", "设备3", "设备4", "设备5"],
  value: [23, 45, 26, 85, 46],
};
let impactingChart = echarts.init(document.querySelector("#impacting .chart"));
let impactingOption = {
  grid: {
    top: "14%",
    left: "10%",
    right: "12%",
    bottom: "6%",
  },
  tooltip: {
    axisPointer: {
      type: "shadow",
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
    data: impactingData["yAxis"],
  },
  series: [
    {
      type: "bar",
      barWidth: 14,
      label: {
        normal: {
          show: true,
          position: "right",
          height: 50,
          textStyle: {
            color: "#65abe7",
            fontSize: 14,
            fontWeight: 700,
          },
          formatter: "{c}" + "%",
        },
      },

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
      data: impactingData["value"],
    },
  ],
};
impactingChart.setOption(impactingOption);

// 时段直通车
let trainData = {
  xAxis: [
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
  value: [2000, 1800, 1780, 3000, 4200, 3200, 2100, 1400, 1300, 3100],
};
let trainChart = echarts.init(document.querySelector("#train .chart"));
let trainOption = {
  grid: {
    top: "18%",

    left: "11.2%",
    right: "5%",
    bottom: "12%",
  },
  legend: {
    right: "3%",
    top: "12%",
    textStyle: {
      color: "#0a9ef3",
      fontSize: 12,
    },
  },
  xAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: "#657ca8",
      },
    },
    axisLabel: {
      show: true,
      margin: 10,
      textStyle: {
        color: "#4073a1",
        fontSize: 14,
      },
    },
    axisTick: {
      show: false,
    },
    data: trainData["xAxis"],
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        fontSize: 14,
        textStyle: {
          color: "#4073a1",
        },
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
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
      data: trainData["value"],
    },
    {
      // 分隔
      type: "pictorialBar",
      z: 0,
      zlevel: 1,
      width: 20,
      symbol: "rect",
      symbolClip: true,
      symbolRepeat: "fixed",
      symbolMargin: 3,
      symbolSize: [20, 4],
      symbolOffset: [0, 4],
      symbolPosition: "start",
      itemStyle: {
        normal: {
          color: "#001027",
        },
      },
      data: trainData["value"],
    },
    {
      name: "周转率",
      type: "line",
      z: 0,
      zlevel: 1,
      smooth: false,
      showAllSymbol: false,
      symbolSize: 10,
      itemStyle: {
        color: "#da525a",
        borderColor: "#da525a",
        borderWidth: 3,
      },
      lineStyle: {
        color: "#da525a",
        width: 3,
      },
      data: trainData["value"],
    },
  ],
};
trainChart.setOption(trainOption);

// 前五大不良
let badData = [
  {
    value: 10,
    name: "不良原因1",
  },
  {
    value: 5,
    name: "不良原因2",
  },
  {
    value: 15,
    name: "不良原因3",
  },
  {
    value: 25,
    name: "不良原因4",
  },
];
let badChart = echarts.init(document.querySelector("#bad .chart"));
let badOption = {
  color: ["#dbd02a", "#f48349", "#cf6385", "#4394dc", "#930bfb"],
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} :  {d}%",
  },
  legend: {
    right: "2%",
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
      radius: [34, 90],
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
      data: badData,
    },
  ],
};
badChart.setOption(badOption);

// 直通率对比
let directData = {
  xAxis: ["1", "2", "3", "4", "5", "6", "7", "8"],
  value1: [100, 138, 350, 173, 180, 150, 180, 230],
  value2: [233, 233, 200, 180, 199, 233, 210, 180],
};
let directChart = echarts.init(document.querySelector("#direct .chart"));
let directOption = {
  grid: {
    top: "20%",
    left: "11%",
    right: "5%",
    bottom: "14%",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    top: "6%",
    right: "4%",
    icon: "circle",
    itemWidth: 14,
    itemHeight: 14,
    textStyle: {
      padding: [4, 0, 0, 0],
      fontSize: 14,
      fontWeight: 600,
      color: ["#3573fc", "#d64a70"],
    },
  },
  xAxis: [
    {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "#657ca8",
        },
      },
      axisLabel: {
        textStyle: {
          color: "#65abe7",
          fontSize: 14,
          padding: [6, 0, 0, 0],
        },
      },
      axisTick: {
        show: false,
      },
      data: directData["xAxis"],
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
      zlevel: 0,
      smooth: true,
      showSymbol: false,
      itemStyle: {
        color: "#3573fc",
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
      data: directData["value1"],
    },
    {
      name: "AI",
      type: "line",
      zlevel: 2,
      smooth: true,
      showSymbol: false,

      itemStyle: {
        color: "#d64a70",
      },

      data: directData["value2"],
    },
  ],
};
directChart.setOption(directOption);

// 线体效率对比
let efficiencyData = {
  xAxis: ["line1", "line2", "line3", "line4"],
  value1: [625.32, 400.32, 300.32, 200.32],
  value2: [1000, 1000, 1000, 1000],
};
let efficiencyChart = echarts.init(
  document.querySelector(".efficiency .chart")
);
let efficiencyOption = {
  grid: [
    {
      top: "26%",
      left: "6%",
      right: "0%",
      bottom: "18%",
    },
  ],
  xAxis: [
    {
      show: false,
    },
  ],
  yAxis: [
    {
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        align: "left",
        verticalAlign: "bottom",
        padding: [0, 0, 8, 8],
        textStyle: {
          color: "#147cf1",
          fontSize: "14",
        },
      },
      data: efficiencyData["xAxis"],
    },
    {
      inverse: true,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },

      axisLabel: {
        show: true,
        align: "right",
        verticalAlign: "bottom",

        padding: [0, 42, 8, 0],
        textStyle: {
          color: "#147cf1",
          fontSize: "14",
        },
      },
      data: efficiencyData["value1"],
    },
  ],
  series: [
    {
      type: "bar",
      barWidth: 10,
      z: 1,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "rgba(19, 128, 241, 0.2)",
            },
            {
              offset: 1,
              color: "rgba(1, 196, 241, 1)",
            },
          ]),
        },
      },
      data: efficiencyData["value1"],
    },
    {
      type: "bar",
      barGap: "-100%",
      barWidth: 10,
      z: 0,
      itemStyle: {
        normal: {
          color: "rgba(12, 48, 84, 0.15)",
        },
      },
      data: efficiencyData["value2"],
    },
  ],
};
efficiencyChart.setOption(efficiencyOption);

listScroll(".lines", ".lines-list", 20);
tableScroll(".work .table-body", ".work .table-body table", 20);
tableScroll(".warning .table-body", ".warning .table-body table", 20);

// 数据项滚动
function listScroll(parent, list, speed) {
  var parent = document.querySelector(parent);
  var list = document.querySelector(list);
  var height = $(list.firstElementChild).outerHeight(true);
  var listNum = Math.ceil($(parent).outerHeight(true) / height);

  if (list.offsetHeight >= parent.offsetHeight) {
    $(list).append($(list.innerHTML));
    var length = $(list).children().length - listNum;
    let timer = setInterval(scroll, speed);
    let top = 0;
    function scroll() {
      if (-height * length >= top) {
        top = 0;
      } else {
        top--;
      }
      $(list).css("transform", "translateY(" + top + "px)");
      parent.onmouseenter = function () {
        clearInterval(timer);
      };
      parent.onmouseleave = function () {
        timer = setInterval(scroll, speed);
      };
    }
  }
}

// 表格滚动
function tableScroll(parent, list, speed) {
  var parent = document.querySelector(parent);
  var list = document.querySelector(list);

  if (list.offsetHeight >= parent.offsetHeight) {
    $(list).append($(list.innerHTML));
    let parentHeight = $(parent).height();
    let height = $(list).height();
    let timer = setInterval(scroll, speed);
    let top = 0;
    function scroll() {
      if (-height + parentHeight >= top) {
        top = 0;
      } else {
        top--;
      }
      $(list).css("transform", "translateY(" + top + "px)");
      parent.onmouseenter = function () {
        clearInterval(timer);
      };
      parent.onmouseleave = function () {
        clearInterval(timer);
        timer = setInterval(scroll, speed);
      };
    }
  }
}

// 图表自适应窗口，无刷新
window.onresize = function () {
  yieldChart.resize();
  impactingChart.resize();
  trainChart.resize();
  badChart.resize();
  directChart.resize();
  efficiencyChart.resize();
  for (var i in meterPool) {
    if (i.indexOf("chart") != -1) {
      meterPool[i].resize();
    }
  }
};

let renderData = {
  plan: function (data) {
    $("#planNumber").html(data.planNumber);
    $("#fulfilNumber").html(data.fulfilNumber);
    $("#fulfil").html(data.fulfil);
    $("#adopt").html(data.adopt);
    $("#PPM").html(data.PPM);
  },
  impacting: function (data) {
    impactingOption.yAxis.data = data["yAxis"];
    impactingOption.series[0].data = data["value"];
    impactingChart.setOption(impactingOption);
  },
  bad: function (data) {
    badOption.series[0].data = data;
    badChart.setOption(badOption);
  },
};

let dataIndex = 1;
function requestData() {
  $.ajax({
    url: "data/data" + dataIndex + ".json",
    type: "get",
    dataType: "JSON",
    success: function (res) {
      if (res.code == "200") {
        if (dataIndex < 3) {
          dataIndex++;
        } else {
          dataIndex = 1;
        }
        for (const key in res.data) {
          renderData[key](res.data[key]);
        }
      }
    },
  });
}

setTimeout(() => {
  requestData();
}, 500);
let time = 1000; //接口间隔轮询请求的时间间隔 单位毫秒，当前默认值为10秒请求一次
setInterval(() => {
  requestData();
}, time);

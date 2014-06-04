(function() {
  var chart, draw, drawChart, submit, validate;
  var a, func, nu, gu, x0, xn, t0, tn, xcount, tcount;

  $(document).ready(function() {
    a = $("#a");
    func = $("#func");
    nu = $("#nu");
    gu = $("#gu");
    x0 = $("#x0");
    xn = $("#xn");
    t0 = $("#t0");
    tn = $("#tn");
    xcount = $("#xcount");
    tcount = $("#tcount");
    
    chart = $("#chart");
    submit = $("#submit");
    chart.css("width", $(document).width() - 340);
    chart.css("height", $(document).height - 90);
    submit.on("click", draw);
  });

  draw = function() {
    chart.html("<div class=\"progress progress-striped active\">\n  <div class=\"progress-bar\"  role=\"progressbar\" style=\"width: 100%\"></div>\n</div>");
    submit.button('loading');
    $.ajax({
      type: "POST",
      url: "/data",
      data: {
        a: a.val(),
        func: func.val(),
        nu: nu.val(),
        gu: gu.val(),
        x0: x0.val(),
        xn: xn.val(),
        t0: t0.val(),
        tn: tn.val(),
        xcount: xcount.val(),
        tcount: tcount.val()
      },
      success: function(data) {
        chart.empty();
        submit.button('reset');
        drawChart(data);
      },
      error: function(data) {
        chart.empty();
        submit.button('reset');
        bootbox.alert("/data POST error");
      }
    });
  };

  drawChart = function(data) {
    $.jqplot("chart", [data], {
      axes: {
        xaxis: {
          label: "X",
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer
        },
        yaxis: {
          label: 'Y',
          labelRenderer: $.jqplot.CanvasAxisLabelRenderer
        }
      },
      series: [
        {
          showMarker: false
        }
      ]
    });
  };

  

}).call(this);
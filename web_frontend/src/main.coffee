textarea = null
chart = null
submit = null

$(document).ready ->
  textarea = $("#formula")
  chart = $("#chart")
  submit = $("#submit")

  chart.css "width", $(document).width() - 340
  chart.css "height", $(document).height - 90
  textarea.on "keypress", validate
  submit.on "click", draw

draw = -> 
  chart.html """
    <div class="progress progress-striped active">
      <div class="progress-bar"  role="progressbar" style="width: 100%"></div>
    </div>
  """
  submit.button 'loading'
  $.ajax
    type: "POST"
    url: "/data"
    data:
      formula: textarea.val()
    success: (data) ->
      chart.empty()
      submit.button 'reset'
      drawChart data
    error: (data) ->
      chart.empty()
      submit.button 'reset'
      bootbox.alert "/data POST error"

drawChart = (data)->
  $.jqplot "chart", data, 
    axes:
      xaxis:
        label: "X"
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
      yaxis:
        label: 'Y'
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
    series: [showMarker: false]

validate = ->
  console.log "validate()"
  # TODO
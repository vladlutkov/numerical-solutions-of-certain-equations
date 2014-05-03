textarea = null
chart = null
submit = null

$(document).ready ->
  textarea = $("#formula")
  chart = $("#chart")
  submit = $("#submit")

  chart.css "width", $(document).width() - 340
  chart.css "height", $(document).height - 90
  textarea.on "keyup", validate
  submit.on "click", draw

draw = ->
  return unless validate()
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
  $.jqplot "chart", [data], 
    axes:
      xaxis:
        label: "X"
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
      yaxis:
        label: 'Y'
        labelRenderer: $.jqplot.CanvasAxisLabelRenderer
    series: [showMarker: false]

validate = ->
  valid = true
  #formula area
  parent = textarea.parent()
  parent.removeClass "has-error"
  parent.children(".alert").remove()

  if not textarea.val() or textarea.val() is ""
    valid = false
    message = "Поле не должно быть пустым"

  unless /^(x|\d|\+|-|\*|\/|\(|\)|\s|Math\.\w+)*$/.test(textarea.val())
    valid = false
    message = "Неправильная формула. Прочтите документацию."

  unless valid
    parent.addClass "has-error"
    parent.append """
        <div class="alert alert-danger">#{message}</div>
      """
  valid

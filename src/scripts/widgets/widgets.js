const DISPLAY_FUNCTIONS = [runProfile, runProgress, runWeather, runNews, runSettings]

const handleWidgetSelection = () => {
  const lastWidget = localStorage.getItem(WIDGETS.LAST_WIDGET_LABEL)
  const widgetButton = document.querySelectorAll('.widget')
  const widgetWindows = document.querySelectorAll('#dashboard > div')
  
  widgetWindows.forEach((window) => {
    window.classList.remove('selected')
    window.classList.add('hidden')
  })

  widgetButton.forEach((widget) => {
    if(widget.id === lastWidget){
      widget.classList.add('selected')
      const currentWindow = document.getElementById(`${widget.id}-window`)
      currentWindow.classList.remove('hidden')
      currentWindow.classList.add('selected')
      DISPLAY_FUNCTIONS[WIDGETS.WIDGETS_LIST.indexOf(widget.id)](currentWindow)
    }else{
      widget.classList.remove('selected')
    }
  })
}

const handleWidgetClick = (element) => {
  const widgetId = element.currentTarget.id
  const index = WIDGETS.WIDGETS_LIST.indexOf(widgetId)

  if(index !== -1) {
    localStorage.setItem(WIDGETS.LAST_WIDGET_LABEL, WIDGETS.WIDGETS_LIST[index])
    handleWidgetSelection()
  }
}

const initWidgets = () => { 
  const widgetButton = document.querySelectorAll('.widget')

  widgetButton.forEach((widget) => {
    widget.addEventListener('click', (element) => {
      handleWidgetClick(element);
      resetTimeout();
    })
  })
}
const initLocalStorage = () => {
  const lastWidget = localStorage.getItem(WIDGETS.LAST_WIDGET_LABEL)

  if(!(lastWidget !== null && lastWidget !== undefined && WIDGETS.WIDGETS_LIST.includes(lastWidget))){
    localStorage.setItem(WIDGETS.LAST_WIDGET_LABEL, WIDGETS.WIDGETS_LIST[0])
  }

  handleWidgetSelection()
}
import '@/styles/widget.css'

const Widget = ({widget, activeWidget}) => {
  return (
    <div className="widget-container" onClick={() => activeWidget(widget)}>
      <img src={widget.src}/>
    </div>
  )
}

export default Widget
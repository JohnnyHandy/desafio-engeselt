import React,{useRef} from 'react'
import './modal.css'
import Info from '../info/info'
import Form from '../form/form'

const Modal = (props)=>{
    const node = useRef()

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    } 
      
  };
  let modalComponent = props.viewMode ? 
    <Info 
    toggle={()=>props.toggle()} 
    edit={()=>{
    props.editFromView()
    }} 
    delete={(index)=>{
        props.deleteFromView(index)
    }}
    list={props.list} 
    index={props.index}/> : 
    <Form
    clearForm={()=>props.clearForm()}
    list={props.list}
    index={props.index}
    toggle={()=>props.toggle()}
    editMode={props.editMode}
    idAsset={props.idAsset}
    handleClick={handleClick}
    submit={(info)=>props.submit(info)}
    editedList={(data)=>props.editedList(data)}
    /> 
    let modalClass = props.show ? "modal display-block" : "modal display-none";
return(
    <div className={modalClass} >
        <div className='modal-main' ref={node}>
            {modalComponent}
        </div>
    </div>
)
}

export default Modal
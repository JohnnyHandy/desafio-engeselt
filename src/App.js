import React,{useState} from 'react';
import './App.css';
import {updateObject} from './assets/utility/utility'
import Modal from './components/modal/modal'
import Plus from './assets/images/plus.svg'
import Profile from './assets/images/profile.svg'
import Pen from './assets/images/pen.svg'
import Trash from './assets/images/trash.svg'
import axios from './axios'

function App() {
  const [firstLoad,setFirstLoad] = useState(true)
  const [list,setList]=useState([])
  const [modal,toggleModal]=useState(false)
  const [index,setIndex] = useState(null)
  const [editMode,setEditMode]=useState(false)
  const [viewMode,setViewMode]=useState(false)
  const [filterValue,setFilterValue]=useState('')
  const [filterKind,setFilterKind]=useState('')
  function getData(){
    if(firstLoad){
      axios.get('/list/-LsyVbsARYCavcnhp_HK.json').then(
        response=>{
          if(response.data instanceof Array){
            setList(response.data)

          }else{

          }

          
        }
      ).catch(
        error=>console.log(error)
      )
      setFirstLoad(false)
    } 
  }
  getData()
  function postData(){
    axios.put('/list/-LsyVbsARYCavcnhp_HK.json',list).then(
      response=>console.log(response)
    ).catch(
      error=>console.log(error)
    )
  }
   function saveToList(data){
    setList(list=>[...list,data])
  }
  postData()
  function deleteItem(index){
    let items =list
    const deleteItems = [ 
        ...items.slice(0,index),
        ...items.slice(index+1)
    ].map((item, index) => ( updateObject(item,{id:index})))
    setList(deleteItems)
    postData()
  }
  const listComponent = list.map((i,index)=>{
    let displayStyle
    if((filterKind !== '') && (filterValue !=='')){
      if(filterKind ==='name'){
        displayStyle = i.name.includes(filterValue) ? 'flex' : 'none'
      }else if(filterKind==='email'){
        displayStyle = i.email.includes(filterValue) ? 'flex' : 'none'
      }else if (filterKind==='number'){
        displayStyle = i.phone.includes(filterValue) ? 'flex':'none'
      }
    }
    return (
      <div key={index} style={{display:displayStyle}} className='contactList'>
            <div className='field'>
                {i.name}
              </div>
              <div className='field'>
                {i.email}
              </div>
              <div className='field'>
                {i.phone}
              </div>
              <div className='field tools-field'>
                <div onClick={()=>{
                  setEditMode(true)
                  setIndex(i.id)
                  toggleModal(true)
                  }}>
                  <span>EDITAR</span>
                  <img src={Pen} alt='Pen'/>
                </div>
                <div onClick={()=>{
                  toggleModal(true)
                  setViewMode(true)
                  setIndex(i.id)
                }}>
                  <span>VER MAIS</span>
                  <img src={Profile} alt='profile'/>
                </div>
                <div onClick={()=>deleteItem(i.id)}> 
                  <span>EXCLUIR </span>
                  <img src={Trash} alt='trash'/>
                </div>
              </div>
        </div>
      )
  
  })
  
  return (
    <div className="App">
      <div className="container">
     {modal ? <Modal 
     submit={(data)=>{
       saveToList(data)
       
      }} 
     list={list} 
     editedList={(data)=>{
       setList(data)
       setEditMode(false)
      }}
     index={index}
     editFromView={()=>{
       setViewMode(false)
       setEditMode(true)
      }}
      deleteFromView={
        (index)=>{
          deleteItem(index)
          setViewMode(false)
          setIndex(null)
          toggleModal(false)
        }
      }
     editMode={editMode}
     viewMode={viewMode} 
     idAsset={list.length} 
     show={modal} 
     toggle={()=>{
      toggleModal(false)
      setIndex(null)
      setViewMode(false)
      setEditMode(false)
      }}/> :null}
        <div className='title'>
          Catálogo Telefônico
        </div>
        <div className='filterContainer'>
            <div className='filterText'>
                <p>Procurar</p>
                <input onChange={event=>setFilterValue(event.target.value)} placeholder='Filtrar aqui' type='text' value={filterValue}/>
              </div>
              <div className='filterSelect'>
                <p>Filtrar por</p>
                <select onChange={(event)=>{
                  setFilterKind(event.target.value)
                }}>
                  <option defaultValue></option>
                  <option value='name'>Nome</option>
                  <option value='email'>Email</option>
                  <option value='phone'>Telefone</option>
                </select>
              </div>   
        </div>
        <div className='listContainer'>
          <div className='sheetContainer'>
            <div className='upperBar'>
              <div className='field'>
                NOME
              </div>
              <div className='field'>
                E-MAIL
              </div>
              <div className='field'>
                TELEFONE
              </div>
              <div className='field'>
                
              </div>
            </div>
            {listComponent}
          </div>
          <div className='toolsContainer'>
            <div className='tool' onClick={()=>toggleModal(true)}>
              <img src={Plus} alt='plus'/>
              <span>NOVO CONTATO</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

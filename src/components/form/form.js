import React,{useState,useEffect} from 'react'
import Cross from '../../assets/images/cross.svg'
import {updateObject} from '../../assets/utility/utility'
const Form = (props=>{
    const [nameValue,setNameValue]=useState('')
    const [adressValue,setAdressValue]=useState('')
    const [numberValue,setNumberValue]=useState('')
    const [bairroValue,setBairroValue]=useState('')
    const [cityValue,setCityValue]=useState('')
    const [stateValue,setStateValue]=useState('')
    const [phoneValue,setPhoneValue]=useState('')
    const [emailValue,setEmailValue]=useState('')
    const [genderValue,setGenderValue]=useState('')
    const [dateValue,setDateValue]=useState('')
    const [isValid,setValidStatus] =  useState(null)
    const [validation,setValidation]=useState(false)

    
    useEffect(() => {
        if(props.editMode){
            editForm()
        }
        
    // add when mounted
    document.addEventListener("mousedown", props.handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", props.handleClick);
    };
    // eslint-disable-next-line
  },[props.editMode,props.handleClick]);
    function editForm(){
        if(props.list.length!==0)  {
            props.list.map((i,index)=>{
                if(i.id===props.index){
                    setNameValue(i.name)
                    setAdressValue(i.adress)
                    setNumberValue(i.number)
                    setBairroValue(i.bairro)
                    setCityValue(i.city)
                    setStateValue(i.state)
                    setPhoneValue(i.phone)
                    setEmailValue(i.email)
                    setGenderValue(i.gender)
                    setDateValue(i.date)   
                }
                return null
            })
        } 
      }
      function validateEmail(email){
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(validation){
            if(re.test(email)){
                setValidStatus(true)
            }else{
                setValidStatus(false)
            }
        }else{
            setValidStatus(null)
        }
    }
    
    function exportInfo(){
        let items = props.list
        if(props.editMode){
          const editedItem = [...items].map((item,index)=>{
              if(index===props.index){
                  return updateObject(item,{
                      name:nameValue,
                      adress:adressValue,
                      number:numberValue,
                      bairro:bairroValue,
                      city:cityValue,
                      state:stateValue,
                      phone:phoneValue,
                      email:emailValue,
                      date:dateValue,
                      edited:new Date().toISOString().slice(0,10)
                  })
                  
              } else {
                  return updateObject(item)
              }
          })
          props.editedList(editedItem)
        }else{
          const info={
              id:props.idAsset,
              name:nameValue,
              adress:adressValue,
              number:numberValue,
              bairro:bairroValue,
              city:cityValue,
              state:stateValue,
              gender:genderValue,
              date:dateValue,
              phone:phoneValue,
              email:emailValue,
              created:new Date().toISOString().slice(0,10)
            }
        props.submit(info)
        }
      clearForm()
      props.toggle()
      
    }
    function clearForm(){
        setNameValue('')
        setAdressValue('')
        setNumberValue('')
        setBairroValue('')
        setCityValue('')
        setStateValue('')
        setPhoneValue('')
        setEmailValue('')
        setGenderValue('')
        setDateValue('')  
      }

      let emailClass = (isValid === true || isValid ===null)  ? '' : 'invalid'
    return(
        <>
        <div onClick={()=>{
                props.toggle()
                clearForm()
                }} className='closeModal'>
                    <img src={Cross} alt='cross'/>
        </div>
        <div className='form'>
            <div className='fieldContainer'>
                <label htmlFor='name'>Name</label>
                <input className='field' type='text' placeholder='Nome' id='name' name='name' value={nameValue}
                onChange={event=>setNameValue(event.target.value)}/>
            </div>
            <div className='fieldContainer'>
                <label htmlFor='adress'>Endereço</label>
                <input className='field' type='text' id='adress' name='adress' placeholder='Endereço' value={adressValue}
                onChange={event=>setAdressValue(event.target.value)}/>
            </div>
            <div className='fieldContainer'>
                <label htmlFor='number'>Número</label>
                <input className='field' type='text' id='number' name='number' placeholder='N°' value={numberValue}
                onChange={event=>setNumberValue(event.target.value)}/>
            </div>
            <div className='fieldContainer'>
                <label htmlFor='bairro'>Bairro</label>
                <input className='field' type='text' id='bairro' name='bairro' placeholder='Bairro' value={bairroValue}
                onChange={event=>setBairroValue(event.target.value)}/>
            </div>
            <div className='fieldContainer'>
                <label htmlFor='city'>Cidade</label>
                <input className='field' type='text' id='city' name='city' placeholder='Cidade' value={cityValue}
                onChange={event=>setCityValue(event.target.value)}/>
            </div>
            <div className='fieldContainer'>
                <label htmlFor='state'>Estado</label>
                <input className='field' type='text' id='state' name='state' placeholder='Estado' value={stateValue}
                onChange={event=>setStateValue(event.target.value)}/>
            </div>
            <div>
                <label htmlFor='phone'>Telefone</label>
                <input className='field' type='text' id='phone' name='phone' placeholder='Telefone' value={phoneValue}
                onChange={event=>setPhoneValue(event.target.value)}/>
            </div>
            <div className='fieldContainer'>
                <label htmlFor='email'>Email</label>
                <input className={'field '+emailClass} type='email' id='email' name='email' placeholder='Email' value={emailValue}
                onChange={event=>{
                    if(event.target.value!==''){
                        setValidation(true)
                        validateEmail(event.target.value)  
                    }else{
                        setValidation(false)
                    }       
                    setEmailValue(event.target.value)  
                }}
                    />
            </div>
            <div className='fieldContainer'>
                <label htmlFor='gender'>Gênero</label>
                <input type="radio" name="gender" value="male" onChange={event=>setGenderValue(event.target.value)}/> M<br/>
                <input type="radio" name="gender" value="female" onChange={event=>setGenderValue(event.target.value)}/> F<br/>   
            </div>
            <div className='fieldContainer'>
                <label htmlFor='date'>Data de nascimento</label>
                <input className='field' type='date' id='date' name='date' value={dateValue}
                onChange={event=>setDateValue(event.target.value)}/>
            </div>
            <button className='submitButton'
            onClick={()=>exportInfo()}>{props.editMode ? 'Editar': 'Salvar'}</button>           
        </div>
        </>
    )
})

export default Form
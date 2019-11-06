import React from 'react'
import Cross from '../../assets/images/cross.svg'

const Info = (props)=>{
    let nameInfo
    let adressInfo
    let numberInfo
    let bairroInfo
    let cityInfo
    let stateInfo
    let phoneInfo
    let emailInfo
    let genderInfo
    let dataInfo
    props.list.map((i,index)=>{
        if(index===props.index){
            nameInfo=i.name
            adressInfo = i.adress
            numberInfo = i.number
            bairroInfo = i.bairro
            cityInfo = i.city
            stateInfo = i.state
            phoneInfo = i.phone
            emailInfo = i.email
            genderInfo = i.gender
            dataInfo = i.date
        }
        return null
    })
    return(
        <>
        <div onClick={()=>{
            props.toggle()
            }} className='closeModal'>
                <img src={Cross} alt='cross'/>
        </div>
        <div className='info'>
            <div className='info-item'>
                <span>Nome:</span>
                <p>{nameInfo}</p>
            </div>
            <div className='info-item'>
                <span>Endereço:</span>
                <p>{adressInfo}</p>
            </div>
            <div className='info-item'> 
                <span>Número:</span>
                <p>{numberInfo}</p>
            </div>
            <div className='info-item'>
                <span>Bairro:</span>
                <p>{bairroInfo}</p>
            </div>
            <div className='info-item'>
                <span>Cidade:</span>
                <p>{cityInfo}</p>
            </div>
            <div className='info-item'>
                <span>Estado:</span>
                <p>{stateInfo}</p>
            </div>
            <div className='info-item'>
                <span>Telefone:</span>
                <p>{phoneInfo}</p>
            </div>
            <div className='info-item'>
                <span>Email:</span>
                <p>{emailInfo}</p>
            </div>
            <div className='info-item'>
                <span>Genero:</span>
                <p>{genderInfo}</p>
            </div>
            <div className='info-item'>
                <span>Data:</span>
                <p>{dataInfo}</p>
            </div>
            <div className='buttons-container'>
                <div className='edit-button' onClick={props.edit}>Editar</div>
                <div className='edit-button' onClick={()=>props.delete(props.index)}>Deletar</div>
            </div>
        </div>
        </>
    )
}

export default Info
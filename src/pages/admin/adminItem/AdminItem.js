import React from 'react'
import './adminItem.scss'
import bitmap from './../../../assets/adminImg/Bitmap.png'

function AdminItem() {
    return (
        <div className='admin-item'>
            <input type='checkbox'/>
            <img className='admin-item-avatar' src={bitmap} alt='avatar'/>
            <p className='admin-item-name'>Ad name</p>
            <p className='admin-item-titles'>1,512</p>
            <p className='admin-item-titles'>€2.21</p>
            <p className='admin-item-titles'>12</p>
            <p className='admin-item-titles'>€0.07</p>
            <p className='admin-item-titles'>2.25%</p>
            <p className='admin-item-titles'>33 </p>
            <p className='admin-item-titles'>3</p>
            <p className='admin-item-titles'>€0.11</p>
            <p className='admin-item-titles'>51</p>
            <p className='admin-item-titles'>€0.11</p>
        </div>
    )
}

export default AdminItem
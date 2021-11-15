import React , {useState} from 'react';
import './admin.scss'
import AdminItem from './adminItem/AdminItem';
import searchIcon from './../../assets/images/search.png'
import filterIcon from './../../assets/adminImg/filterIcon.png';
import avatar from './../../assets/adminImg/Profile.png';
import bell from './../../assets/adminImg/bell.png';
import arrow from './../../assets/adminImg/arrowPanel.png';
import arrowProfile from './../../assets/adminImg/arrow.png';

import { ReactComponent as Overview } from './../../assets/adminImg/Overview.svg';
import { ReactComponent as HomeIcon } from './../../assets/adminImg/homeIcon.svg';


function Admin() {

    const [openLIst, setOpenList] = useState(false)
    const [openOptionList, setOpenOptionList] = useState(false)

    return(
        <div className='admin'>
            <div className='admin__nav'>
                <div className='admin__nav-block-left'>
                    <p className='admin__logo'>Rupert AI</p>
                    <div className='admin__search-container'>
                        <img src={searchIcon} alt='search icon'  className='admin__search-icon'/>
                        <input type='search' placeholder='Search…' className='admin-search'/>
                    </div>   
                </div>
                <div className='admin__nav-block-right'>
                    <div className='admin__user-notification'>
                        <p className='admin__user-notification-number'>111</p>
                        <img src={bell} alt='bell icon'  className='admin__user-notification-icon'/>
                    </div>
                    <div className='admin__user'>
                        <img src={avatar} alt='avatar' className='admin__user-avatar'/>
                        <div>
                            <p className='admin__user-data'>Ad Account #1</p>
                            <p className='admin__user-name'>Name Surname</p>
                        </div>
                        <img src={arrowProfile} alt='avatar' className='arrowProfile'/>
                    </div>
                </div>
            </div>
            <div className='admin-main'>
                <ul className='admin-panel'>
                    <h1 className='admin-panel__title'>Maim</h1>
                    <li className='admin-panel__select '>
                        <Overview  className='admin-panel__select-icon'/>
                        <p className='admin-panel__select-title'>Overview</p>
                    </li>
                    <li className={!openLIst ? 'admin-panel__select' :  'admin-panel__select admin-panel__select--active'} onClick={() => setOpenList(openLIst => !openLIst)}>
                        <HomeIcon className='admin-panel__select-icon'/>
                        <p className='admin-panel__select-title'>Ads</p>
                        <img src={arrow} className='admin-panel__select-arrow' alt='arrow icon'/>
                    </li>
                    {openLIst ? (
                        <>
                            <div className='custom-select'>
                                <div className={openOptionList ? 'custom-select__block ' : ' custom-select__block custom-select__block--active ' }  onClick={() => setOpenOptionList(openOptionList => !openOptionList)}>
                                    <p className='custom-select__title'>Campaign #1</p>
                                    <img src={arrow} className='admin-panel__select-arrow' alt='arrow icon'/>
                                </div>
                                {
                                    openOptionList ? (
                                        <ul className='custom-select__box'>
                                            <li className='custom-select__list'>
                                                <p className='custom-select__list__name'>Campaign #1</p>
                                                <p className='custom-select__list__number'>195</p>
                                            </li>
                                            <li className='custom-select__list'>
                                                <p className='custom-select__list__name'>Campaign #2</p>
                                                <p className='custom-select__list__number'>8</p>
                                            </li>
                                        </ul>
                                    ) : null
                                } 
                            </div>
                        </>
                    ) : null
                    }
                </ul>
                <div className='admin-container'>
                    <div className='admin-container__filter'>
                        <h1 className='admin-container__filter-title'>Ads</h1>
                        <div className='admin-container__filter-select-block'>
                            <p className='admin-container__filter-show'>Show:</p>
                            <select className='admin-container__filter-select'>
                                <option>Ad set #1</option>
                                <option>Ad set #2</option>
                                <option>Ad set #3</option>
                            </select>
                        </div>
                        <input type='date' className='admin-container__filter-date'/>
                        <button  className='admin-container__filter-btn'>Test selected (3) ads</button>      
                    </div>
                    <div className='admin-container__filter-block'>
                        <div className='admin-container__filter-box'>
                            <div className='admin__search-container'>
                                <img src={searchIcon} alt='search icon'  className='admin__search-icon'/>
                                <input type='search' placeholder='Search…' className='admin-search'/>
                            </div>  
                            <div className='admin-container__filter-select-block'>
                                <p className='admin-container__filter-show'>Show:</p>
                                <select className='admin-container__filter-select'>
                                    <option>Due Date</option>
                                    <option>Ad set #2</option>
                                    <option>Ad set #3</option>
                                </select>
                            </div>
                            <img src={filterIcon} alt='filter Icon'  className='filterIcon-icon'/>
                        </div>
                        <div className='admin-container__filter-nav'>
                            <input type='checkbox'/>
                            <p className='admin-container__filter-nav-name'>Ad name</p>
                            <p className='admin-container__filter-nav-titles'>Impressions</p>
                            <p className='admin-container__filter-nav-titles'>Amount spent</p>
                            <p className='admin-container__filter-nav-titles'>Clicks</p>
                            <p className='admin-container__filter-nav-titles'>CPC</p>
                            <p className='admin-container__filter-nav-titles'>CTR</p>
                            <p className='admin-container__filter-nav-titles'>Engagement</p>
                            <p className='admin-container__filter-nav-titles'>Post reactions</p>
                            <p className='admin-container__filter-nav-titles'>Engagement cost</p>
                            <p className='admin-container__filter-nav-titles'>Link clicks</p>
                            <p className='admin-container__filter-nav-titles'>Outbound clicks</p>
                        </div>
                        <div className='items-container'>
                            <AdminItem/>
                            <AdminItem/>
                            <AdminItem/>
                            <AdminItem/>
                            <AdminItem/>
                            <AdminItem/>
                            <AdminItem/>
                            <AdminItem/>
                            <AdminItem/>
                        </div>         
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
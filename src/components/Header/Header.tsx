import React, {FunctionComponent} from 'react';
import {Slide} from '../Slide/Slide';
import {TopHeader} from '../TopHeader/TopHeader';

export const Header: FunctionComponent<any> = function (props) {
  
  return (
    <>
      <div className='topbar'
           style={{height: '52px'}} >
        <TopHeader
          history={props.history}
          title='日常管理'
          showHome={false} />
      </div >
      <Slide />
      <div className='title' >
        <i className='icon iconfont icon-gonggao'
           style={{color: '#ed9248'}} />
        <span className='list' >通知公告：</span >
        <span className='more' >更多</span >
      </div >
    </>
  )
}
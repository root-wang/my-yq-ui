import React, {FunctionComponent, useEffect} from 'react';
import './Notice.css'

type Props = {
  open: boolean;
  msg: string
};
export const Notice: FunctionComponent<Props> = (props) => {
  useEffect(() => {
  }, [props.open]);
  
  return (
    props.open ?
      <div >
        <div className='notice-container' >
          <div className='notice-message' >{props.msg}</div >
        </div >
      </div > :
      <></>
  );
};
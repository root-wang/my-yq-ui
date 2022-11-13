import React, {ChangeEvent, FunctionComponent, useContext, useEffect, useState} from 'react';
import {ClientContext} from '../../App';
import './Login.css'
import {LoginResp} from '../../typings/User';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import {Bounce, Flip, Slide, toast, ToastContainer, Zoom} from 'react-toastify';

enum USERINFO {
  USERNAME = 'username',
  PASSWORD = 'password'
}

export const Login: FunctionComponent<{ fn: (data: LoginResp) => void }> = function (props) {
  
  const toastId = React.useRef('')
  
  const [username, setUsername] = useState('请输入用户名')
  const [password, setPassword] = useState('')
  const [msg, changeMsg] = useState<{ msg: string }>({msg: ''})
  
  const notify = () => {
    if (!toast.isActive(toastId.current) && msg.msg) {
      toastId.current = toast.error(
        msg.msg, {
          theme: "colored"
        }) as string;
    }
  }
  
  useEffect(() => {
    notify()
  }, [msg])
  
  const saveUserInf = (type: USERINFO) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const {value} = e.target;
      type === USERINFO.USERNAME ? setUsername(value) : setPassword(value)
    }
  }
  
  const client = useContext(ClientContext);
  
  async function login() {
    try {
      if (toast.isActive(toastId.current)) {
        return
      }
      const data: LoginResp = await ( await client.post('/login', JSON.stringify({
        username,
        password
      })) ).data
      changeMsg({msg: data.msg})
      client.loginChecked(!data.status)
      client.setToken(data.token ?? '')
      props.fn(data)
    } catch (e) {
      console.error(e)
    }
  }
  
  return (
    <div >
      <KeyboardEventHandler
        handleKeys={['enter']}
        onKeyEvent={(key: any, e: any) => {
          console.log("enter")
          login().catch(e => {
            console.error(e)
          })
        }
        } >
        
        <div className={'login-input'}
        >
          <div >
            <input placeholder='请输入用户名'
                   size={25}
                   type='text'
                   onChange={saveUserInf(USERINFO.USERNAME)}
                   autoComplete={'false'}
            /><span ></span >
          </div >
        </div >
        
        <div className={'login-input'} >
          <div >
            <input placeholder='请输入登录密码'
                   type='password'
                   size={25}
                   onChange={saveUserInf(USERINFO.PASSWORD)}
                   autoComplete={'false'}
            /><span ></span >
          </div >
        </div >
        
        <div
          className={'login-button'}
        >
          <input
            onClick={login}
            type='submit'
            value='登录' />
        </div >
        <ToastContainer
          closeButton={false}
          closeOnClick={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          transition={[Slide, Zoom, Bounce, Flip][Math.floor(Math.random() * 4)]}
          // role='alert'
        />
      </KeyboardEventHandler >
    </div >
  )
  
  
}
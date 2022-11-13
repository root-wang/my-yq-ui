import React, {FunctionComponent, useContext, useState} from 'react';
import {ClientImpl} from './components/Http/Client'
import {Header} from './components/Header/Header';
import {List} from './components/List/List';
import {Footer} from './components/Footer/Footer';
import {History} from 'history'
import {Login} from './components/Login/Login';
import {LoginResp} from './typings/User';

interface appProps {
  history: History
}

const client = new ClientImpl({
  baseURL: 'http://162.14.117.4:3000/api',
  // baseURL: 'http://127.0.0.1:3000/api',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const ClientContext = React.createContext(client);


const App: FunctionComponent<appProps> = function (props) {
  
  const client = useContext(ClientContext)
  
  const [login, changeLogin] = useState<boolean>(client.getLoginState())
  
  const checkLogin = (data: LoginResp) => {
    changeLogin(!data.status)
  }
  
  return (
    <ClientContext.Provider value={client} >
      <div className='container usercenter' >
        <Header {...props}/>
        {
          login ? <List /> : <Login fn={checkLogin} />
        }
        <Footer />
      </div >
    </ClientContext.Provider >
  );
}

export default App;

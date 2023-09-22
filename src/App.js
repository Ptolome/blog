import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import {Home,Login,Registration,MyPosts} from './pages'
import { Menu } from './components/Menu';
import { Posts } from './components/Posts';
import {Post} from './components/Post';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectorIsAuth } from './redux/slices/auth';
import { useEffect } from 'react';



function App() {
  const dispatch=useDispatch()
  const isAuth = useSelector(selectorIsAuth)
 
 useEffect(()=>{
    dispatch(fetchAuthMe())
    
  },[])
  return (
  <>
    <Menu/>
    <Switch>
      <Route path="/" exact component={Posts}/>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Registration}/>
      <Route path="/posts/:id?" component={Post}/>
      <Route path="/account" component={MyPosts}/>
    </Switch>
  </>
    
    
  );
}

export default App;


import './App.css';
import ScrollToTop from './scrollToTop/ScrollToTop';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Home from './pages/home/Home'
import AboutUs from './pages/about/About'
import Contacts from './pages/contacts/Contacts'
import NoMatch from './pages/noMatch/NoMatch';
import Navbar from './components/navbar/Navbar'
import AdminDashboard from './pages/admin/Admin'

function App() {
  return (

    <BrowserRouter>
      <div className='page' id='page'>
          {/* <Navbar/> */}
          <div  id='routerContent'>
              <ScrollToTop />
              <Switch>
                  <Route path='/about' render={() => <AboutUs/>}></Route>
                  <Route path='/contacts' render={() => <Contacts/>}></Route>
                  <Route path='/admin' render={() => <AdminDashboard/>}></Route>
                  <Route exact path='/' render={() => <Home/>}></Route>
                  <Route component={NoMatch}/>
              </Switch>
          </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

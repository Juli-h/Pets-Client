import './App.css';
import React from 'react';
import NewPet from './components/pets/NewPet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './components/Homepage';
import SearchPage from './components/SearchPage';
import ListUsers from './components/ListUsers';
import MyPetsPage from './components/pets/MyPetsPage';
import PetPage from './components/pets/PetPage';
import ListPets from './components/pets/ListPets';
import NavBar from './components/NavBar';
import AuthProvider, { useAuth } from "./context/Auth";
import ProfileSettings from './components/ProfileSettings';
import AdminPage from './components/AdminPage';
import EditPet from './components/pets/EditPet';
import UserPage from './components/UserPage';

const AppRouter = () => {
  let auth = useAuth();
  if (!auth.isInitiallyLoaded) {
    return <div></div>;
  }
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/details" component={PetPage} />
          <Route path="/detailsusers" component={UserPage} />
          <Route path="/edit" component={EditPet} />
          <Route path="/pets">
            <MyPetsPage />
          </Route>
          <Route path="/settings">
            <ProfileSettings />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/newpet">
            <div className="container mt-5">
              <div className="mt-5">
                <NewPet />
              </div>
            </div>
          </Route>
          <Route path="/listpets">
            <ListPets />
          </Route>
          <Route path="/user">
            <ListUsers />
          </Route>
          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
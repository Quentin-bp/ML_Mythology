import routes from './routes/routes';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import MainPage from './layouts/MainPage/MainPage'
import "./assets/index.css"

function App() {
  const buildRoute = (route, index) => {
    const Component = route.component;
    return (
      <Route key={index} element={<><Outlet /></>}>
        <Route key={index} path={route.path} element={
          <MainPage>
            <Component />
          </MainPage>
        } />
      </Route>
    )
  }

  return (
      <Router>
        <Routes>
          {
            routes.map((route, index) => buildRoute(route, index))
          }
        </Routes>
      </Router>
  );
}

export default App;

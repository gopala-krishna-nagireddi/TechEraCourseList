import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import CourseDetailedView from './components/CourseDetailedView'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseDetailedView} />
    <Route component={NotFound} />
  </Switch>
)

export default App

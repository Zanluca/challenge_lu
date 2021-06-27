import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Detail from './pages/Detail'

export default function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/detail/:characterId">
          <Detail />
        </Route>
        <Route path="/:startsWith">
          <Home />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

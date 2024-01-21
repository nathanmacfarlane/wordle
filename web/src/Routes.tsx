import { Router, Route, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'
import RootLayout from './layouts/RootLayout/RootLayout'
import GroupsPage from './pages/GroupsPage/GroupsPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/auth" page={AuthPage} name="auth" />
      <PrivateSet wrap={RootLayout} unauthenticated="auth">
        <Route path="/" page={HomePage} name="home" />
        <Route path="/groups" page={GroupsPage} name="groups" />
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

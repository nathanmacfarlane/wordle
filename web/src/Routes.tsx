import { Router, Route, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'
import RootLayout from './layouts/RootLayout/RootLayout'
import GroupsPage from './pages/GroupsPage/GroupsPage'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import TodayPage from './pages/TodayPage/TodayPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/auth" page={AuthPage} name="auth" />
      <PrivateSet wrap={RootLayout} unauthenticated="auth">
        <Route path="/" page={HomePage} name="home" />
        <Route path="/today" page={TodayPage} name="today" />
        <Route path="/leagues" page={GroupsPage} name="leagues" />
        <Route path="/leagues/{id}" page={GroupPage} name="league" />
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

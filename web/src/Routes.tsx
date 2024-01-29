import { Router, Route, PrivateSet } from '@redwoodjs/router'

import { useAuth } from './auth'
import FullscreenLoading from './components/FullscreenLoading/FullscreenLoading'
import RootLayout from './layouts/RootLayout/RootLayout'
import BoardPage from './pages/BoardPage/BoardPage'
import HistoryPage from './pages/HistoryPage/HistoryPage'
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import TodayPage from './pages/TodayPage/TodayPage'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/auth" page={AuthPage} name="auth" />
      <PrivateSet wrap={RootLayout} unauthenticated="auth" whileLoadingAuth={FullscreenLoading} whileLoadingPage={FullscreenLoading}>
        <Route path="/" page={TodayPage} name="today" />
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/profile/{id}" page={ProfilePage} name="user-profile" />
        <Route path="/history" page={HistoryPage} name="history" />
        <Route path="/leaderboard" page={LeaderboardPage} name="leaderboard" />
        <Route path="/leagues" page={GroupsPage} name="leagues" />
        <Route path="/leagues/{id}" page={GroupPage} name="league" />
        <Route path="/board/{date}" page={BoardPage} name="board" />
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes

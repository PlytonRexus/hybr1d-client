import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import PageLoader from './PageLoader'

const PostList = lazy(() => import('../../pages/PostList'))

const RouteList = function () {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route exact path='/' component={PostList} />
        <Route exact path='/search' component={PostList} />
        <Route exact path='/posts' component={PostList} />
        <Route path='/posts/:id' component={PostList} />
      </Routes>
    </Suspense>
  )
}

export default RouteList

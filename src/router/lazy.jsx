
/* ------------------------------- React.lazy ------------------------------- */

import React, { lazy, Suspense } from 'react'
import ErrorBoundary from '../components/ErrorBoundary'

export function Lazy () {
  const LazyComponent = lazy(() => import(/* webpackChunkName: "Lazy" */'../components/Lazy'))
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent></LazyComponent>
      </Suspense>
    </ErrorBoundary>
  )
}

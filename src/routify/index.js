import { pipe } from '../util'

import RenderLayout from './RenderLayout.svelte'
import App from '../app/App.svelte'
import DefaultIndex from './DefaultIndex.svelte'
import DefaultFallback from './DefaultFallback.svelte'

const renderLayout = {
  component: () => RenderLayout,
  path: '../../_layout',
}

const appLayout = {
  component: () => App,
  path: '../_layout',
}

// Child.sub.svench <=> Child/sub.svench
const transformDotDelemiters = routes =>
  routes.map(({ path, shortPath, ...route }) => ({
    ...route,
    extraNesting: path.split('.').length - 1,
    path: path.replace(/\./g, '/'),
    shortPath: shortPath.replace(/\./g, '/'),
  }))

const prependLayouts = (...layouts) => routes =>
  routes.map(({ layouts: currentLayouts, ...route }) => ({
    ...route,
    layouts: [...layouts, ...currentLayouts],
  }))

const addDefaultIndexAndFallback = routes => {
  const isUserIndex = r =>
    (r.isIndex && r.path === '/index') || r.shortPath === ''
  const isUserFallback = r => r.isFallback && r.path === '/_fallback'
  let hasUserIndex = false
  let hasUserFallback = false
  for (const route of routes) {
    if (!hasUserIndex && isUserIndex(route)) hasUserIndex = true
    if (!hasUserFallback && isUserFallback(route)) hasUserFallback = true
    if (hasUserIndex && hasUserFallback) break
  }
  const extraRoutes = []
  if (!hasUserIndex) {
    extraRoutes.push({
      component: () => DefaultIndex,
      isIndex: true,
      path: '/index',
      shortPath: '',
      layouts: [],
      regex: '^(/index)?/?$',
      name: '/index',
      ranking: 'C',
      params: {},
    })
  }
  if (!hasUserFallback) {
    extraRoutes.push({
      component: () => DefaultFallback,
      isFallback: true,
      path: '/_fallback',
      shortPath: '',
      layouts: [],
      name: '/_fallback',
      ranking: 'A',
      params: {},
    })
  }
  if (extraRoutes.length) {
    return [...routes, ...extraRoutes]
  }
  return routes
}

// NOTE default index and fallback don't use user's _layout because it's
// technically difficult (layouts are processed at compile time by Routify),
// and it's not high value (even possibly better -- default index and fallback
// can be thought as being one level bellow root)
export const augmentRoutes = pipe(
  transformDotDelemiters,
  addDefaultIndexAndFallback,
  prependLayouts(renderLayout, appLayout)
)

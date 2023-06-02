import { type App } from 'vue'

/**
 * Register layouts in the app instance
 *
 * @param {App<Element>} app
 */

export function registerLayouts(app: App<Element>) {
  const layouts = import.meta.glob<any>('@/layouts/*.vue', { eager: true })
  console.log('layouts:', layouts)

  Object.entries(layouts).forEach(([, layout]) => {
    app.component(layout?.default?.name, layout?.default)
  })
}

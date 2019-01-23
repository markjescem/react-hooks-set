import { useEffect } from 'react'
import createStorage from './utils/createStorage'

function usePagePosition() {
  const storage = createStorage('local')

  useEffect(() => {
    let pagePositions = storage.getItem('pagePositions')
    const scrollPage = document.getElementById('scrollPage')
    const pathname = window.location.pathname

    if (pagePositions[pathname]) {
      if (scrollPage) {
        scrollPage.scrollTop = pagePositions[pathname]
      } else {
        window.scrollTo(0, pagePositions[pathname])
      }
    }
    return () => {
      pagePositions = {
        ...pagePositions,
        ...{
          [pathname]: scrollPage ? scrollPage.scrollTop : window.scrollY
        }
      }
      storage.setItem('pagePositions', pagePositions)
    }
  }, [])
}

export default usePagePosition

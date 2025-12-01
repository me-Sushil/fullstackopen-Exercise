import { createContext, useReducer, useCallback } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return null
    default:
      return state
  }
}

export const NotificationProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const showNotification = useCallback((message) => {
    dispatch({ type: 'SHOW', payload: message })

    const timeout = setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

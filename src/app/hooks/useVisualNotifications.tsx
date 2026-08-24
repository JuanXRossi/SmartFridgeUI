import { useContext } from 'react'
import { Context as VisualNotificationsContext } from '@/app/context/VisualNotificationsContext'

const useVisualNotifications = () => {
  return useContext(VisualNotificationsContext)
}

export default useVisualNotifications

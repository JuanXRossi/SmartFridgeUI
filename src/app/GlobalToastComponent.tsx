import Toast from './components/ToastComponent'
import useVisualNotifications from './hooks/useVisualNotifications'

export default function GlobalToast() {
  const {
    actions: { closeToast },
    state: { toastState },
  } = useVisualNotifications()

  const handleCloseToast = () => {
    closeToast({
      state: false,
    })
  }

  return <Toast open={toastState} handleClose={handleCloseToast} />
}

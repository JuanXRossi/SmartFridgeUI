import { toast, Toaster } from 'sonner'
import { ToastState } from '@/app/context/VisualNotificationsContext'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/app/hooks/useMediaQuery'

type Severity = 'success' | 'warning' | 'error' | 'info'

interface ToastProps {
  severity?: Severity
  message?: string
  open: ToastState
  handleClose: () => void
  autoHideDuration?: number
}

const styles = {
  toaster: 'w-[calc(100vw-2rem)] sm:w-[380px]',
  baseToast:
    'rounded-[10px] border border-l-4 px-3 py-2.5 sm:px-4 sm:py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)]',
  success: 'bg-[#F3FBF0] border-[#4CAF50] text-[#2E5B2E]',
  error: 'bg-[#FDF3F1] border-[#E5484D] text-[#7A2A2A]',
  warning: 'bg-[#FDF7EC] border-[#E5A93B] text-[#7A5A16]',
  info: 'bg-[#F1F6FB] border-[#3B82C4] text-[#1E4E70]',
}

const severityColorMap: Record<Severity, string> = {
  success: styles.success,
  error: styles.error,
  warning: styles.warning,
  info: styles.info,
}

export default function Toast({
  severity = 'success',
  message,
  open,
  handleClose,
  autoHideDuration = 4000,
}: ToastProps) {
  const isDesktop = useMediaQuery('(min-width: 640px)')

  useEffect(() => {
    if (open.state) {
      const severityToUse = open.severity || severity
      const toastMessage = open.message || message
      const duration = open.autoHideDuration || autoHideDuration

      const toastOptions = {
        duration,
        unstyled: true,
        className: cn(styles.baseToast, severityColorMap[severityToUse]),
        onAutoClose: handleClose,
      }

      if (open.button) {
        toast(toastMessage, {
          ...toastOptions,
          action: {
            label: open.button.label,
            onClick: open.button.onClick,
          },
        })
      } else {
        toast(toastMessage, toastOptions)
      }
    }
  }, [open.state])

  return (
    <Toaster
      visibleToasts={1}
      position={isDesktop ? 'bottom-right' : 'bottom-center'}
      className={styles.toaster}
    />
  )
}

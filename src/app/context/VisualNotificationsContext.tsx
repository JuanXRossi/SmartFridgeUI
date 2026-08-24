'use client'

import React from 'react'
import CreateDataContext from './CreateDataContext'

export interface ToastState {
  state?: boolean
  severity?: 'success' | 'warning' | 'error' | 'info'
  message?: string
  autoHideDuration?: number
  button?: {
    label: string
    onClick: () => void
  }
}

interface VisualNotificationsState {
  toastState: ToastState
}

const initialState: VisualNotificationsState = {
  toastState: {
    state: false,
    severity: 'success',
    message: '',
    autoHideDuration: 3000,
    button: {
      label: '',
      onClick: () => {},
    },
  },
}

type Action =
  | { type: 'setToastState'; payload: ToastState }
  | { type: 'updateToastState'; payload: ToastState }

const reducer = (
  state: VisualNotificationsState,
  action: Action,
): VisualNotificationsState => {
  switch (action.type) {
    case 'setToastState':
      return { ...state, toastState: action.payload }
    case 'updateToastState':
      return {
        ...state,
        toastState: { ...state.toastState, ...action.payload },
      }
    default:
      return state
  }
}

const openToast =
  (dispatch: React.Dispatch<Action>) => (toastState: ToastState) => {
    dispatch({ type: 'setToastState', payload: { state: true, ...toastState } })
  }

const closeToast =
  (dispatch: React.Dispatch<Action>) => (toastState: ToastState) => {
    dispatch({
      type: 'updateToastState',
      payload: { state: false, ...toastState },
    })
  }

export const { Context, Provider } = CreateDataContext(
  reducer,
  { openToast, closeToast },
  initialState,
)

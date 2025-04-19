'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Toast = {
  id: number
  message: string
  type?: 'success' | 'error' | 'info'
}

type ToastContextType = {
  addToast: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

let toastId = 0

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast['type'] = 'info') => {
    const id = toastId++
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
  <div className="  fixed top-4 right-4 space-y-2 z-50">
  

    {toasts.map((toast) => (
      <div
        key={toast.id}
        className="px-4 py-3 rounded-lg shadow-lg bg-orange-1 text-white w-64"
      >
        {toast.message}
      </div>
    ))}
  </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

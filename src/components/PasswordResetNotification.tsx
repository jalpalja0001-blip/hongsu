'use client'

import { useState, useEffect } from 'react'
import { X, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PasswordResetNotification() {
  const { user, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      // 팝업을 본 적이 있는지 확인
      const hasSeenNotification = localStorage.getItem('password-reset-notification-seen')
      
      if (!hasSeenNotification) {
        setIsVisible(true)
      }
    }
  }, [isAuthenticated, user])


  const handleClose = () => {
    setIsVisible(false)
    // 로컬 스토리지에 팝업을 본 것으로 기록
    localStorage.setItem('password-reset-notification-seen', 'true')
  }

  const handleResetPassword = () => {
    // 팝업을 본 것으로 기록
    localStorage.setItem('password-reset-notification-seen', 'true')
    // 기존 비밀번호 재설정 페이지로 이동
    window.location.href = '/forgot-password'
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-orange-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              {t('notification.passwordReset.title')}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            {t('notification.passwordReset.message')}
          </p>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-800">
              <strong>{t('notification.passwordReset.tempPassword')}:</strong> abcd123
            </p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleResetPassword}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            {t('notification.passwordReset.resetButton')}
          </button>
          <button
            onClick={handleClose}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            {t('notification.passwordReset.laterButton')}
          </button>
        </div>
      </div>
    </div>
  )
}

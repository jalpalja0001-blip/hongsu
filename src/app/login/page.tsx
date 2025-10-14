'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '@/lib/auth';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswordResetNotice, setShowPasswordResetNotice] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  // 이미 로그인된 경우 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // 기존 사용자인지 확인하는 함수
  const checkIfExistingUser = (email: string) => {
    const migratedUsers = [
      'sprince1004@naver.com',
      // 다른 마이그레이션된 사용자 이메일들 추가
    ];
    return migratedUsers.includes(email);
  };

  // 이메일 입력 시 기존 사용자인지 확인
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    
    // 기존 사용자이고 팝업을 본 적이 없으면 안내 표시
    if (checkIfExistingUser(emailValue)) {
      const hasSeenNotice = localStorage.getItem('password-reset-notice-seen');
      if (!hasSeenNotice) {
        setShowPasswordResetNotice(true);
      }
    }
  };

  // 팝업 닫기
  const handleCloseNotice = () => {
    setShowPasswordResetNotice(false);
    localStorage.setItem('password-reset-notice-seen', 'true');
  };

  // 비밀번호 재설정 페이지로 이동
  const handleResetPassword = () => {
    window.location.href = '/forgot-password';
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 팝업이 표시된 상태에서는 로그인 막기
    if (showPasswordResetNotice) {
      return;
    }
    
    setLoading(true);
    setError('');

    const result = await signIn(email, password);
    
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error || '로그인에 실패했습니다.');
    }
    
    setLoading(false);
  };

  return (
    <>
      {/* 비밀번호 재설정 안내 팝업 */}
      {showPasswordResetNotice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="h-6 w-6 text-orange-500 mr-2">⚠️</div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('notification.passwordReset.title')}
                </h3>
              </div>
              <button
                onClick={handleCloseNotice}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                {t('notification.passwordReset.message')}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleResetPassword}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                {t('notification.passwordReset.resetButton')}
              </button>
              <button
                onClick={handleCloseNotice}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                {t('notification.passwordReset.laterButton')}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t('auth.login.title')}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('auth.login.noAccount')}{' '}
            <Link href="/register" className="font-medium text-red-600 hover:text-red-500">
              {t('auth.login.register')}
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                {t('auth.login.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={showPasswordResetNotice}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={t('auth.login.email')}
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t('auth.login.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={showPasswordResetNotice}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder={t('auth.login.password')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || showPasswordResetNotice}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('auth.login.loading') : t('auth.login.submit')}
            </button>
          </div>

          <div className="text-center">
            <Link href="/forgot-password" className="text-sm text-red-600 hover:text-red-500">
              {t('auth.login.forgot')}
            </Link>
          </div>

        </form>
      </div>
    </div>
    </>
  );
}

'use client'

import { userAuthAtom } from '@/atoms/userAuthAtom'
import useLoadUser from '@/hooks/useLoadUser'
import { useAtom } from 'jotai'
import React from 'react'

// import useFcmToken from '@/hooks/useFcmToken'
import Loader from '../Loader'
import LoginRequired from './LoginRequired'

interface Props {
  children: React.ReactNode
  type: 'public' | 'private'
}

const AuthWrapper = ({ children, type }: Props) => {
  // * Hooks
  useLoadUser()
  // const { loadToken } = useFcmToken()
  // * Atoms
  const [user] = useAtom(userAuthAtom)

  if (type === 'private') {
    if (user === 'loading') {
      return (
        <div className='flex sm:pt-[40vh]  py-[20vh] w-screen items-center justify-center'>
          <Loader />
        </div>
      )
    }

    if (!user) {
      return (
        <div className='flex pt-[36vh] gap-4 flex-col w-screen items-center justify-center'>
          <LoginRequired />
        </div>
      )
    }
  }

  return <>{children}</>
}

export default AuthWrapper


import { dialogAtom } from '@/atoms/dialogAtom'
import { useHandleDialogType } from '@/hooks/useHandleDialogType'
import { userAuthAtom } from '@/atoms/userAuthAtom'
import { auth, db } from '@/firebase'
import { SecureUser } from '@/types'
import { getSecureUser } from '@/utils/getSecureUser'

// import dayjs from 'dayjs'
import { onAuthStateChanged, onIdTokenChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'


const useLoadUser = () => {
  // * Atoms
  const [user, setUser] = useAtom(userAuthAtom)
  const [secureUser, setSecureUser] = useState<SecureUser | undefined>(
    undefined
  )
  const [dialog] = useAtom(dialogAtom)
  const { handleDialogType } = useHandleDialogType()

  

  // * Effects
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User logged in🔥🔥', user.emailVerified)
        const secureUser = await getSecureUser(user)

        setUser({ ...user, ...secureUser })
        if (!user.emailVerified) {
          handleDialogType('verifyEmail', 'add')
        }

        const unsubscribeToken = onIdTokenChanged(auth, (user) => {
          if (user?.emailVerified) {
            if(dialog && dialog.includes('verifyEmail')) {
              handleDialogType('verifyEmail', 'remove')
            }
            console.log('Email is verified')
          }
        })

        return () => unsubscribeToken()
      } else {
        setUser(undefined)
      }
    })
    return () => unsub()
  }, [])


  useEffect(() => {
    if (user && user !== 'loading') {
      const userRef = doc(db, 'secureUsers', user.uid)

      const unsub = onSnapshot(
        userRef,
        (doc) => {
          const data = doc.data() as SecureUser
          // fetchNotificationStatus(user.uid)
          setSecureUser({ ...data })
          // if(!user?.subscription && auth.currentUser?.emailVerified) { 
          //   const offerDialogShown = localStorage.getItem('offerDialogShown')
          //   if (!offerDialogShown) {
          //     setDialog('offerDialog')
          //     localStorage.setItem('offerDialogShown', 'true')
          //   }
          // }
        },
        (err) => {
          console.log(err)
        }
      )
      return () => unsub()
    }
  }, [user !== 'loading' && user?.uid])

  useEffect(() => {
    if (user && user !== 'loading') {
      setUser({ ...user, ...secureUser })
    }
  }, [secureUser])
}

export default useLoadUser

import { db } from '@/firebase'
import { SecureUser } from '@/types'
import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export const getSecureUser = async (user: User) => {
  const secureUserDoc = await getDoc(doc(db, 'secureUsers', user.uid))
  const secureUser = secureUserDoc.data() as SecureUser | undefined
  return secureUser
}

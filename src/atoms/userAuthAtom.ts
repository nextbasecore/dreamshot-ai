import { SecureUser } from '@/types'
import { User as FirebaseUser } from 'firebase/auth'
import { atom } from 'jotai'


export type UserAuth = SecureUser & FirebaseUser;

export const userAuthAtom = atom<UserAuth | undefined | null | 'loading'>(
    'loading',
);

export type User = {
    isPremium: boolean;
    emailPreferences?: {
        promotionalEmails: boolean;
    };
} & UserAuth;


export const userAtom = atom<User | undefined>((get) => {
    const user = get(userAuthAtom);
  
    if (user === 'loading' || user === null || user === undefined) {
      return undefined;
    }
  
    return {
      ...user,
      isPremium: !!user.subscription && !user.subscription.isExpired,
    };
});
  
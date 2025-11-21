interface Props {
  email: string | null | undefined
}

const UserProfileIconPlaceHolder = ({ email }: Props) => {
  return (
    <div className='w-full group overflow-hidden transition-all text-center flex items-center justify-center font-bold h-full  rounded-full'>
      <img
        className='group-hover:opacity-100 transition-all'
        src={`https://avatar.vercel.sh/${email}`}
        alt='profile'
      ></img>
      <span className='absolute text-white'>
        {email?.slice(0, 2).toUpperCase() ?? 'DS'}
      </span>
    </div>
  )
}

export default UserProfileIconPlaceHolder

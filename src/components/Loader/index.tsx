import { twMerge } from 'tailwind-merge'

export interface LoaderProps extends React.SVGProps<SVGSVGElement> {
  size?: 'big' | 'medium' | 'small'
  color?: string
}

const Loader = ({ size = 'big', color = 'white', ...props }: LoaderProps) => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={twMerge(
        `flex-shrink-0 ${
          size === 'small' ? 'h-4 w-4' : size === 'medium' ? 'h-10 w-10' : 'h-12 w-12'
        } animate-spin`,
        props.className
      )}
      style={{
        ...props.style,
        // fallback for animate-spin if not using Tailwind
        animation: props.className?.includes('animate-spin')
          ? undefined
          : 'rotation 1s linear infinite',
      }}
    >
      <circle
        cx="24"
        cy="24"
        r="19"
        stroke={color}
        strokeWidth="5"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M43 24a19 19 0 0 0-19-19"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      <style>
        {`
          @keyframes rotation {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </svg>
  )
}

export default Loader

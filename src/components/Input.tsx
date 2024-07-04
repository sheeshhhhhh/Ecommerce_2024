
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string,
    name: string,
    label: string
}

const Input:React.FC<InputProps> = ({
    className,
    name,
    label,
    ...props
}) => {
  return (
    <div>
        <label
        className='block mb-1 font-semibold'>
            {label}
        </label>
        <input 
        {...props}
        name={name}
        className={`w-[300px] h-[36px] px-3 py-2 border-[1px] border-input-border rounded-md mb-1 
        placeholder:text-input-border
        ${' ' + className}` }
        />
    </div>
  )
}

export default Input
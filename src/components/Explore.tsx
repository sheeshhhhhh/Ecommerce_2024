import Link from "next/link"

type ExploreProps = {
    size?: number
} 

const Explore = ({
    size
} : ExploreProps) => {
  return (
    <Link 
    className={`font-bold text-3xl ${size && `size-[${size}px]`}`}
    href={`/explore?page=1`}>
        Explore
    </Link>
  )
}

export default Explore
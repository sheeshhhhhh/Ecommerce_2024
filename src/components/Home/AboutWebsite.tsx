
import facebook from '../../../public/SocialMedia_logo/icons8-facebook.svg'
import instagram from '../../../public/SocialMedia_logo/icons8-instagram.svg'
import X from '../../../public/SocialMedia_logo/icons8-x-logo.svg'
import tiktok from '../../../public/SocialMedia_logo/icons8-tiktok.svg'
import youtube from '../../../public/SocialMedia_logo/icons8-youtube.svg'
import Link from 'next/link'
import Image from 'next/image'

const SocialMedias = [
  {href: 'https://www.instagram.com/discord/',    icons:instagram },
  {href: 'https://www.facebook.com/discord/.com', icons:facebook  },
  {href: 'https://www.youtube.com/discord',       icons:youtube   },
  {href: 'https://www.tiktok.com/@discord',       icons:tiktok    },
  {href: 'https://x.com/discord',                 icons:X         },
]

const AboutWebsite = () => {

  const Resources = ["College", "Support", "Safety", "Blog", "Feedback", "StreamKit", "Creators", "Community", "Developers", "Gaming"];
  const Company = ["About", "Jobs", "Brand", "Newsroom"];

  return (
    <div className='px-[400px] py-[50px] bg-[#084B83]'>
        <div className='flex gap-[120px] px-10'>
          <div className='mx-5 flex gap-3'>
            {SocialMedias.map((info, idx) => {
              return (
                <Link key={idx} href={info.href}>
                  <Image
                  className='size-[25px]' 
                  src={info.icons} alt='' />
                </Link>
              )
            })
            }
          </div>
          <div className='flex gap-[70px]'>
            <div className='flex flex-col gap-1'>
              <h2 className='ml-3 font-bold mb-[10px] text-lg'>Company</h2>
              {Company.map((info, idx) => {
                return <h3 key={idx} className='text-white hover:underline hover:underline-offset-1 cursor-pointer' >{info}</h3>
              })}
            </div>
            <div className='flex flex-col gap-1'>
              <h2 className='ml-3 font-bold mb-[10px] text-lg'>Resources</h2>
              {Resources.map((info, idx) => {
                return <h3 key={idx} className='text-white hover:underline hover:underline-offset-1 cursor-pointer'>{info}</h3>
              })}
            </div>
          </div>
        </div>
    </div>
  )
}

export default AboutWebsite
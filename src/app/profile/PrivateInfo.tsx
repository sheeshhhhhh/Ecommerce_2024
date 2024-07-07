import Link from 'next/link'

import DiplayGender from './DiplayGender'
import DisplayAddress from './DisplayAddress'
import DisplayBirthday from './DisplayBirthday'
import DisplayPhoneNumber from './DisplayPhoneNumber'

import { privateInfoType } from './page'


const PrivateInfo = ({
  privateInfo
}: {
  privateInfo: privateInfoType | null
}) => {


  return (
    <div className='h-[200px] p-3 flex flex-col justify-between'>
      <div>
        <DisplayPhoneNumber phoneNumber={privateInfo?.phoneNumber} />
        <DisplayAddress address={privateInfo?.address} />
        <DiplayGender gender={privateInfo?.gender} />
        <DisplayBirthday birthday={privateInfo?.birthday} />
      </div>
      <div>
        <div className='divider'></div>
        <h2>
          Want to earn money? {" "}
          <Link 
          className='text-blue-700 hover:underline hover:underline-offset-2 font-medium'
          href={'/settings/business'}>
            Create Business
          </Link>
        </h2>
      </div>
    </div>
  )
}

export default PrivateInfo
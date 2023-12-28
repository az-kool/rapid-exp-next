import Image from 'next/image'
import facepalm from '../../public/facepalm.webp'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-left justify-between p-12">
      <Image src={facepalm}
        alt='facepalm'
      />
      <p className='bg-slate-100 dark:bg-slate-900 p-4'>Finally working</p>

    </main>
  )
}

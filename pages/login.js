import BottomNav from '../components/BottomNav'
import { LockClosedIcon } from '@heroicons/react/outline'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import bgImage from '../public/img/beams.jpg'
import logoImage from '../public/wesanbi-logo.svg'

export default function Login({ providers }) {

  return (
    <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center relative overflow-hidden sm:py-12">
      <img src='https://www.studentimpact.jp/wp-content/uploads/2022/01/beams.jpg' className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none" width="1308" />
      <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative px-6 pt-10 pb-8 bg-white z-10 shadow-xl ring-1 ring-gray-900/5 sm:max-w-lg sm:mx-auto sm:rounded-lg sm:px-10">
        <div className="max-w-md mx-auto">
          <Image src={logoImage} alt="Wesanbi" className="h-16" />
          <div className="divide-y divide-blue-300/50">
            <div className="py-8 text-center text-base leading-7 space-y-6 text-gray-600">
              <p className="font-bold">みんなとつながる、もっと豊かになる礼拝へ</p>
              
            </div>
            <div className="pt-8 text-base leading-7">
              <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="メール"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="パスワード"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-secondary hover:text-secondary-focus">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  {Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                      <button className="group mb-4 relative w-full flex btn rounded-full bg-[#1DB954] btn-secondary" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        {provider.name}
                      </button>
                    </div>
                  ))}
                    {/* <button
                      type="submit"
                      className="group relative w-full flex btn btn-primary"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      Sign in
                    </button> */}
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    
      // <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      //   <div className="max-w-sm w-full space-y-8 bg-slate-200 rounded-xl p-8">
      //     <div className="text-center">
      //       <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">ログイン</h2>
      //       <p className="mt-2 text-center text-sm text-primary">
      //         または{' '}
      //         <a href="#" className="font-medium text-primary hover:text-primary-focus">
      //           すぐ始めましょう！
      //         </a>
      //       </p>
      //     </div>
      //     <form className="mt-8 space-y-6" action="#" method="POST">
      //       <input type="hidden" name="remember" defaultValue="true" />
      //       <div className="rounded-md shadow-sm -space-y-px">
      //         <div>
      //           <label htmlFor="email-address" className="sr-only">
      //             Email address
      //           </label>
      //           <input
      //             id="email-address"
      //             name="email"
      //             type="email"
      //             autoComplete="email"
      //             required
      //             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      //             placeholder="Email address"
      //           />
      //         </div>
      //         <div>
      //           <label htmlFor="password" className="sr-only">
      //             Password
      //           </label>
      //           <input
      //             id="password"
      //             name="password"
      //             type="password"
      //             autoComplete="current-password"
      //             required
      //             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      //             placeholder="Password"
      //           />
      //         </div>
      //       </div>

      //       <div className="flex items-center justify-between">
      //         <div className="flex items-center">
      //           <input
      //             id="remember-me"
      //             name="remember-me"
      //             type="checkbox"
      //             className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      //           />
      //           <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
      //             Remember me
      //           </label>
      //         </div>

      //         <div className="text-sm">
      //           <a href="#" className="font-medium text-accent hover:text-accent-focus">
      //             Forgot your password?
      //           </a>
      //         </div>
      //       </div>

      //       <div>
      //         {Object.values(providers).map((provider) => (
      //           <div key={provider.name}>
      //             <button className="group relative w-full flex btn btn-primary" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
      //             <span className="absolute left-0 inset-y-0 flex items-center pl-3">
      //               <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
      //               </span>
      //               Login with {provider.name}
      //             </button>
      //           </div>
      //         ))}
      //           {/* <button
      //             type="submit"
      //             className="group relative w-full flex btn btn-primary"
      //           >
      //             <span className="absolute left-0 inset-y-0 flex items-center pl-3">
      //               <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
      //             </span>
      //             Sign in
      //           </button> */}
      //       </div>
      //     </form>
      //   </div>
      // </div>
    
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers
    }
  }
}
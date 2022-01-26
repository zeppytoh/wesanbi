import Head from 'next/head'
import { getSession } from "next-auth/react"
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import BottomNav from '../components/BottomNav'
import Player from '../components/Player'

export default function Home() {
  return (
    <>
      <main className="flex bg-black">
        <Sidebar />
        <Center />
        {/* <div className="bg-slate-100 container mx-auto text-center h-screen">
          <Image src="/wesanbi-logo.svg" width="900" height="300" />
        </div> */}
      </main>

      <div className="sticky bottom-0">
        <Player />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
import React from 'react'
import Example from "./Example"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton

} from '@clerk/nextjs'
export default function LeftSlider() {
  return (
    <>
    <ClerkProvider>
     <button>
              <SignedOut >
                <SignInButton className="w-[100px] h-[30px] bg-slate-400 " />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </button> 
            </ClerkProvider>
            <Example/>
    </>
  )
}

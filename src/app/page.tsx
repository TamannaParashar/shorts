"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogIn, LogOut, User } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950">
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-600 border-gray-800">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">Welcome</CardTitle>
            <CardDescription className="text-gray-400">Sign in to your account to continue</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!session ? (
            <div className="space-y-4">
              
              <Button
                onClick={() => signIn("google")}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 transition-colors duration-200"
                size="lg"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign in with Google
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <Avatar className="w-20 h-20 mx-auto ring-4 ring-blue-600/20">
                  <AvatarImage src={session.user?.image ?? ""} alt={session.user?.name ?? "Profile"} />
                  <AvatarFallback className="bg-blue-600 text-white text-xl">
                    {session.user?.name?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-xl font-semibold text-white">Welcome back, {session.user?.name}!</h2>
                </div>
              </div>

              <Button
                onClick={() => signOut()}
                variant="outline"
                className="w-full border-gray-700 bg-gray-800 hover:bg-gray-700 text-white py-3 transition-colors duration-200"
                size="lg"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign out
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    {session && (<div className="flex justify-center mt-5 space-x-4">
        <Link href='/add-image' className="rounded-lg bg-gray-600 font-bold block text-white px-6 py-3 border border-transparent hover:border-blue-600">Add image</Link>
  
        <Link href='/add-video' className="rounded-lg bg-gray-600 font-bold block text-white px-6 py-3 border border-transparent hover:border-blue-600">Add video</Link>

        <Link href='/get-video' className="rounded-lg bg-gray-600 font-bold block text-white px-6 py-3 border border-transparent hover:border-blue-600">Get videos</Link>
      </div>
    )}
      </div>
  )
}
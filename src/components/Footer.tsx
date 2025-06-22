import React from 'react'

export default function Footer() {
  return (
      <div className="fixed bottom-0 left-0 w-full flex justify-around bg-gray-950 py-3">
        <p className='text-gray-400'>Tamanna Parashar</p>
        <p className='text-gray-400'>&copy; {new Date().getFullYear()} privacy policy reserved</p>
      </div>
  )
}

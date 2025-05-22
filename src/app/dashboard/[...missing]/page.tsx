'use client'

import { useEffect } from 'react'
import { toast } from 'react-hot-toast' // or 'lotify'

export default function DashboardNotFoundCatchAll() {
  useEffect(() => {
    toast.error('Dashboard page not found!')
  }, [])

  return (
    <div className="h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold text-red-500 mb-2">404</h1>
        <p className="text-lg text-gray-600">This dashboard page does not exist.</p>
      </div>
    </div>
  )
}

'use client'
import { redirect } from 'next/navigation'
import React from 'react'

const Logout = () => {
    localStorage.clear()
    redirect("http://localhost:3000/login")
  
}

export default Logout
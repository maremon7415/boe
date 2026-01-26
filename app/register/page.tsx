"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { UserPlus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register/register-form"
import { SuccessView } from "@/components/register/success-view"

export default function RegisterPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container px-4 mx-auto max-w-4xl">

          {isSubmitted ? (
            <div className="py-20">
              <SuccessView />
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <UserPlus className="h-6 w-6" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                  Join The Brotherhood
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Create your profile to start your journey.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <RegisterForm onSuccess={() => setIsSubmitted(true)} />
              </motion.div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
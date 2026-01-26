"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SuccessView() {
    const router = useRouter()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-lg mx-auto"
        >
            <div className="mb-6 flex justify-center">
                <div className="p-4 bg-green-500/10 rounded-full animate-pulse">
                    <CheckCircle2 className="h-20 w-20 text-green-500" />
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Application Received!</h1>
            <p className="text-muted-foreground mb-8 text-lg">
                Thank you. We have received your details and will process your registration shortly.
            </p>
            <Button onClick={() => router.push("/")} size="lg" variant="outline">
                Return Home
            </Button>
        </motion.div>
    )
}
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { Loader2, ArrowRight, Eye, EyeOff, User, Lock, Gamepad2 } from "lucide-react"
import toast from "react-hot-toast"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
})

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const { login, loggedIn } = useAuth()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    })

    useEffect(() => {
        if (loggedIn) router.push("/player/profile")
    }, [loggedIn, router])

    const onSubmit = async (values) => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Login failed")

            toast.success("Login successful")
            login(data.token, data.user)
            // User requested refresh and redirect to home
            window.location.href = "/"
        } catch (error) {
            toast.error(error.message || "Invalid credentials")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 mt-25">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-xl">
                        <div className="p-8 text-center space-y-3">
                            <div className="mx-auto w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Gamepad2 className="w-7 h-7 text-primary" />
                            </div>

                            <h1 className="text-2xl font-semibold">Welcome Back</h1>
                            <p className="text-sm text-muted-foreground">
                                Sign in to continue
                            </p>
                        </div>

                        <div className="px-8 pb-8">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="email"
                                                            placeholder="commander@boe.com"
                                                            className="pl-10 h-11"
                                                            disabled={isLoading}
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="flex items-center justify-between">
                                                    <FormLabel>Password</FormLabel>
                                                    <Link
                                                        href="/forgot-password"
                                                        className="text-xs text-primary hover:underline"
                                                    >
                                                        Forgot?
                                                    </Link>
                                                </div>

                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="••••••••"
                                                            className="pl-10 pr-10 h-11"
                                                            disabled={isLoading}
                                                            {...field}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-4 w-4" />
                                                            ) : (
                                                                <Eye className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full h-11"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Authenticating
                                            </>
                                        ) : (
                                            <>
                                                Sign In <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>

                            <p className="mt-6 text-center text-sm text-muted-foreground">
                                New here?{" "}
                                <Link href="/register" className="text-primary font-medium hover:underline">
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    )
}

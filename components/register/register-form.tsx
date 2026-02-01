"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    User, Mail, Calendar, Smartphone, Gamepad2,
    Facebook, Disc, Twitter, Youtube, CheckCircle2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import toast from "react-hot-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// --- KEEPING YOUR LOGIC EXACTLY AS IS ---
const registerSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Date of birth is required." }),
    bloodGroup: z.string().optional(),
    gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required." }),
    efootballId: z.string().min(1, { message: "eFootball ID is required." }),
    deviceName: z.string().min(2, { message: "Device name is required." }),
    deviceModel: z.string().min(2, { message: "Device model is required." }),
    facebook: z.string().min(5, { message: "Facebook profile is required." }),
    discord: z.string().optional(),
    twitter: z.string().optional(),
    youtube: z.string().optional(),
    agreeToTerms: z.literal(true, { errorMap: () => ({ message: "You must accept the terms." }) }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

interface RegisterFormProps {
    onSuccess: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "", email: "", password: "", dob: "", bloodGroup: "", gender: "Male",
            efootballId: "", deviceName: "", deviceModel: "",
            facebook: "", discord: "", twitter: "", youtube: "",
            agreeToTerms: undefined,
        },
    })

    async function onSubmit(data: RegisterFormValues) {
        try {
            const payload = {
                clubId: "DEFAULT_CLUB_ID",
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                dob: new Date(data.dob),
                bloodGroup: data.bloodGroup || "",
                gender: data.gender,
                efootballId: data.efootballId,
                device: { name: data.deviceName, model: data.deviceModel },
                socialAccounts: {
                    facebook: data.facebook,
                    discord: data.discord || "",
                    twitter: data.twitter || "",
                    youtube: data.youtube || "",
                },
            }

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const resData = await response.json()
            if (!response.ok) throw new Error(resData.message || "Registration failed")

            toast.success("Account created successfully.")
            onSuccess()
        } catch (error: any) {
            toast.error(error.message || "Registration failed")
        }
    }

    return (
        <Card className="border-border/50 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-primary/5 border-b pb-8 text-center sm:text-left">
                <CardTitle className="text-2xl font-bold tracking-tight">Player Registration</CardTitle>
                <CardDescription className="text-base">
                    Complete your profile to join the squad.
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 px-6 sm:px-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

                        {/* --- Section 1: Personal --- */}
                        <div className="space-y-6">
                            <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3 border border-border/50">
                                <div className="p-2 bg-background rounded-md shadow-sm text-primary">
                                    <User className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-lg tracking-tight">Personal Details</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} className="h-11 transition-all focus-visible:ring-primary/20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                                <Input className="pl-10 h-11 transition-all focus-visible:ring-primary/20" placeholder="email@example.com" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} className="h-11 transition-all focus-visible:ring-primary/20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="dob" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <div className="relative group w-full">
                                                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary pointer-events-none" />
                                                <Input type="date" className="pl-10 h-11 w-full transition-all focus-visible:ring-primary/20" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="gender" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11 transition-all focus:ring-primary/20">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {["Male", "Female", "Other"].map(g => (
                                                    <SelectItem key={g} value={g}>{g}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blood Group <span className="text-muted-foreground text-xs font-normal">(Optional)</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-11 transition-all focus:ring-primary/20">
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                                                    <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* --- Section 2: Gaming --- */}
                        <div className="space-y-6">
                            <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3 border border-border/50">
                                <div className="p-2 bg-background rounded-md shadow-sm text-primary">
                                    <Smartphone className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-lg tracking-tight">Gaming & Device</h3>
                            </div>

                            <FormField control={form.control} name="efootballId" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>eFootball ID <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <Gamepad2 className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                                            <Input className="pl-10 h-11 transition-all focus-visible:ring-primary/20 font-mono" placeholder="000-000-000" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="deviceName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Device Name <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. iPhone 15 Pro" {...field} className="h-11 transition-all focus-visible:ring-primary/20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="deviceModel" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Device Model <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. A2848" {...field} className="h-11 transition-all focus-visible:ring-primary/20" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* --- Section 3: Socials --- */}
                        <div className="space-y-6">
                            <div className="bg-muted/50 p-3 rounded-lg flex items-center gap-3 border border-border/50">
                                <div className="p-2 bg-background rounded-md shadow-sm text-primary">
                                    <Facebook className="h-5 w-5" />
                                </div>
                                <h3 className="font-semibold text-lg tracking-tight">Social Presence</h3>
                            </div>

                            <FormField control={form.control} name="facebook" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Facebook Profile <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <div className="relative group">
                                            <Facebook className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-blue-600" />
                                            <Input className="pl-10 h-11 transition-all focus-visible:ring-primary/20" placeholder="Profile Link or ID" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField control={form.control} name="discord" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discord</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <Disc className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-indigo-500" />
                                                <Input className="pl-10 h-11 transition-all focus-visible:ring-primary/20" placeholder="username" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="twitter" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Twitter (X)</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <Twitter className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-sky-500" />
                                                <Input className="pl-10 h-11 transition-all focus-visible:ring-primary/20" placeholder="@handle" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="youtube" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>YouTube</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <Youtube className="absolute left-3 top-3 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-red-600" />
                                                <Input className="pl-10 h-11 transition-all focus-visible:ring-primary/20" placeholder="Channel" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        {/* --- Footer: Terms & Submit --- */}
                        <div className="space-y-6 pt-4 border-t">
                            <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-primary/20 bg-primary/5 p-4 shadow-sm">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="font-semibold text-foreground">
                                            I agree to the Terms and Conditions
                                        </FormLabel>
                                        <FormDescription className="text-xs">
                                            By creating an account, you agree to our Code of Conduct and confirm that all provided data is accurate.
                                        </FormDescription>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )} />

                            <Button
                                type="submit"
                                className="w-full h-12 text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <span className="flex items-center gap-2">Processing...</span>
                                ) : (
                                    <span className="flex items-center gap-2">Create Account <CheckCircle2 className="h-5 w-5" /></span>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
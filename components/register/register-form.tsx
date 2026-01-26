"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    User, Mail, Calendar, Smartphone, Gamepad2,
    Facebook, Disc, Twitter, Youtube
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const registerSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    dob: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', { message: "Date of birth is required." }),
    bloodGroup: z.string().optional(),
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
    const { toast } = useToast()
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "", email: "", password: "", dob: "", bloodGroup: "",
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

            toast({ title: "Success", description: "Account created successfully." })
            onSuccess()
            console.log(resData)
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        }
    }

    return (
        <Card className="border-border shadow-lg">
            <CardHeader className="bg-muted/30 pb-8 border-b">
                <CardTitle>Player Registration</CardTitle>
                <CardDescription>Fill in your details to join the club.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary font-semibold text-lg border-b pb-2">
                                <User className="h-5 w-5" /> Personal Information
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name *</FormLabel>
                                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email *</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9" placeholder="email@example.com" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password *</FormLabel>
                                        <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="dob" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date of Birth *</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input type="date" className="pl-9" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                            <FormField control={form.control} name="bloodGroup" render={({ field }) => (
                                <FormItem className="md:w-1/2">
                                    <FormLabel>Blood Group</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
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

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-2 text-primary font-semibold text-lg border-b pb-2">
                                <Smartphone className="h-5 w-5" /> Gaming & Device
                            </div>
                            <FormField control={form.control} name="efootballId" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>eFootball ID *</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Gamepad2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input className="pl-9" placeholder="Game ID" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="deviceName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Device Name *</FormLabel>
                                        <FormControl><Input placeholder="iPhone, Samsung" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="deviceModel" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Device Model *</FormLabel>
                                        <FormControl><Input placeholder="15 Pro, S24" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-2 text-primary font-semibold text-lg border-b pb-2">
                                <Facebook className="h-5 w-5" /> Socials
                            </div>
                            <FormField control={form.control} name="facebook" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Facebook Profile *</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Facebook className="absolute left-3 top-2.5 h-4 w-4 text-blue-600" />
                                            <Input className="pl-9" placeholder="Profile Link/ID" {...field} />
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
                                            <div className="relative">
                                                <Disc className="absolute left-3 top-2.5 h-4 w-4 text-indigo-500" />
                                                <Input className="pl-9" placeholder="username" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="twitter" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Twitter</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Twitter className="absolute left-3 top-2.5 h-4 w-4 text-sky-500" />
                                                <Input className="pl-9" placeholder="@handle" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="youtube" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>YouTube</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Youtube className="absolute left-3 top-2.5 h-4 w-4 text-red-500" />
                                                <Input className="pl-9" placeholder="Channel" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>

                        <FormField control={form.control} name="agreeToTerms" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>I accept the terms and conditions</FormLabel>
                                    <FormDescription>I confirm the above data is accurate.</FormDescription>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )} />

                        <Button type="submit" className="w-full h-12 text-lg" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Processing..." : "Create Account"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
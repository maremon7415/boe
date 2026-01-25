"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { UserPlus, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    dob: "",
    bloodGroup: "",
    efootballId: "",
    deviceName: "",
    deviceModel: "",
    discordId: "",
    facebookId: "",
    twitterId: "",
    youtubeId: "",
    agreeToTerms: false,
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        bloodGroup: formData.bloodGroup,
        efootballId: formData.efootballId,
        device: {
          name: formData.deviceName,
          model: formData.deviceModel,
        },
        socialAccounts: {
          discord: formData.discordId,
          facebook: formData.facebookId,
          twitter: formData.twitterId,
          youtube: formData.youtubeId,
        },
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      setIsSubmitted(true)
      toast({
        title: "Registration Successful!",
        description: "Your account has been created successfully.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16">
          <section className="py-20 min-h-[80vh] flex items-center justify-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-green-500/10 rounded-full">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">APPLICATION RECEIVED!</h1>
                <p className="text-xl text-muted-foreground mb-8 text-balance">
                  Thanks for your submission. We will notify you via email as soon as possible regarding your application status. Stay connected with BOE.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="outline" className="bg-transparent">
                    <a href="/">Return Home</a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <UserPlus className="h-10 w-10" />
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">JOIN BOE</h1>
              </div>
              <p className="text-xl text-muted-foreground text-balance">
                Ready to become part of the Brotherhood? create your account below and take the first step toward
                excellence.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Create Account</CardTitle>
                  <CardDescription>
                    Fill in your details to register as a member.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b border-border pb-2">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                            required
                            minLength={6}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={formData.dob}
                            onChange={(e) => handleChange("dob", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bloodGroup">Blood Group (Optional)</Label>
                        <Select value={formData.bloodGroup} onValueChange={(value) => handleChange("bloodGroup", value)}>
                          <SelectTrigger id="bloodGroup">
                            <SelectValue placeholder="Select blood group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Gaming & Device Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b border-border pb-2">Gaming & Device</h3>
                      <div className="space-y-2">
                        <Label htmlFor="efootballId">eFootball ID (Optional)</Label>
                        <Input
                          id="efootballId"
                          placeholder="e.g. 123456789"
                          value={formData.efootballId}
                          onChange={(e) => handleChange("efootballId", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="deviceName">Device Name</Label>
                          <Input
                            id="deviceName"
                            placeholder="e.g. iPhone, Samsung Galaxy"
                            value={formData.deviceName}
                            onChange={(e) => handleChange("deviceName", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="deviceModel">Device Model</Label>
                          <Input
                            id="deviceModel"
                            placeholder="e.g. 15 Pro Max, S24 Ultra"
                            value={formData.deviceModel}
                            onChange={(e) => handleChange("deviceModel", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Social Accounts */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold border-b border-border pb-2">Social Accounts (Optional)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="discordId">Discord Username</Label>
                          <Input
                            id="discordId"
                            placeholder="username#1234"
                            value={formData.discordId}
                            onChange={(e) => handleChange("discordId", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="facebookId">Facebook Profile URL or ID</Label>
                          <Input
                            id="facebookId"
                            placeholder="Link or username"
                            value={formData.facebookId}
                            onChange={(e) => handleChange("facebookId", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="twitterId">X (Twitter) Handle</Label>
                          <Input
                            id="twitterId"
                            placeholder="@username"
                            value={formData.twitterId}
                            onChange={(e) => handleChange("twitterId", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="youtubeId">YouTube Channel</Label>
                          <Input
                            id="youtubeId"
                            placeholder="Channel Link"
                            value={formData.youtubeId}
                            onChange={(e) => handleChange("youtubeId", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 space-y-0">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleChange("agreeToTerms", checked as boolean)}
                          required
                        />
                        <div className="space-y-1 leading-none">
                          <Label
                            htmlFor="terms"
                            className="text-sm font-normal cursor-pointer leading-relaxed text-muted-foreground"
                          >
                            I agree to the terms and conditions, code of conduct, and confirm that all information provided is accurate.
                          </Label>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button type="submit" size="lg" className="w-full" disabled={!formData.agreeToTerms || isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold mb-2">Join</div>
                    <p className="text-sm text-muted-foreground">Sign Up for Free</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold mb-2">Compete</div>
                    <p className="text-sm text-muted-foreground">Join Tournaments</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl font-bold mb-2">Win</div>
                    <p className="text-sm text-muted-foreground">Earn Rewards</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

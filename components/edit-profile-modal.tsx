"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, Upload, Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { User } from "@/lib/types"

interface EditProfileModalProps {
    user: User
    trigger?: React.ReactNode
}

export function EditProfileModal({ user, trigger }: EditProfileModalProps) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { refreshProfile, token } = useAuth()
    const { toast } = useToast()

    const [formData, setFormData] = useState({
        fullName: user.fullName || "",
        email: user.email || "",
        efootballId: user.efootballId || "",
        deviceName: user.device?.name || "",
        deviceModel: user.device?.model || "",
        dob: user.dob ? new Date(user.dob).toISOString().split('T')[0] : "",
        bloodGroup: user.bloodGroup || "",
        gender: user.gender || "",
        facebook: user.socialAccounts?.facebook || "",
        twitter: user.socialAccounts?.twitter || "",
        discord: user.socialAccounts?.discord || "",
        youtube: user.socialAccounts?.youtube || "",
    })

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(user.avatar || null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    variant: "destructive",
                    title: "File too large",
                    description: "Image size must be less than 5MB.",
                })
                return
            }
            setImageFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const errors = []
            if (!formData.fullName || formData.fullName.length < 2) errors.push("Full Name is required.")
            if (!formData.efootballId) errors.push("eFootball ID is required.")
            if (!formData.gender) errors.push("Gender is required.")
            if (!formData.dob) errors.push("Date of Birth is required.")
            if (!formData.deviceName || formData.deviceName.length < 2) errors.push("Device Name is required.")
            if (!formData.deviceModel || formData.deviceModel.length < 2) errors.push("Device Model is required.")
            if (!formData.facebook || formData.facebook.length < 5) errors.push("Facebook profile is required.")

            if (errors.length > 0) {
                toast({
                    variant: "destructive",
                    title: "Validation Error",
                    description: errors[0],
                })
                setIsLoading(false)
                return
            }

            const data = new FormData()
            data.append("fullName", formData.fullName)
            data.append("efootballId", formData.efootballId)
            data.append("deviceName", formData.deviceName)
            data.append("deviceModel", formData.deviceModel)
            data.append("dob", formData.dob)
            data.append("bloodGroup", formData.bloodGroup)
            data.append("gender", formData.gender)

            // Append social links
            if (formData.facebook) data.append("facebook", formData.facebook)
            if (formData.twitter) data.append("twitter", formData.twitter)
            if (formData.discord) data.append("discord", formData.discord)
            if (formData.youtube) data.append("youtube", formData.youtube)

            if (imageFile) {
                data.append("image", imageFile)
            }

            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data,
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Failed to update profile")
            }

            toast({
                title: "Success",
                description: "Profile updated successfully.",
            })

            await refreshProfile()
            setOpen(false)
        } catch (error: any) {
            console.error("Profile update error:", error)
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Something went wrong.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Edit Profile</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Update your personal details and profile information.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="flex flex-col items-center justify-center space-y-3 mb-6">
                        <div className="relative group cursor-pointer" onClick={() => document.getElementById("avatar-upload")?.click()}>
                            <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                                <AvatarImage src={imagePreview || "/placeholder-user.jpg"} className="object-cover" />
                                <AvatarFallback>{formData.fullName.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                        <p className="text-xs text-muted-foreground">Click to upload new image</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="efootballId">eFootball ID <span className="text-red-500">*</span></Label>
                            <Input
                                id="efootballId"
                                name="efootballId"
                                value={formData.efootballId}
                                onChange={handleInputChange}
                                placeholder="Your Game ID"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bloodGroup">Blood Group <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                            <select
                                id="bloodGroup"
                                name="bloodGroup"
                                value={formData.bloodGroup}
                                onChange={handleInputChange}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="" disabled>Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth <span className="text-red-500">*</span></Label>
                        <Input
                            id="dob"
                            name="dob"
                            type="date"
                            value={formData.dob}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="border-t border-border pt-4 mt-2">
                        <p className="text-sm font-medium mb-3">Device Information</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="deviceName">Device Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="deviceName"
                                    name="deviceName"
                                    value={formData.deviceName}
                                    onChange={handleInputChange}
                                    placeholder="e.g. iPhone, Samsung"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="deviceModel">Device Model <span className="text-red-500">*</span></Label>
                                <Input
                                    id="deviceModel"
                                    name="deviceModel"
                                    value={formData.deviceModel}
                                    onChange={handleInputChange}
                                    placeholder="e.g. 14 Pro, S23 Ultra"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-border pt-4 mt-2">
                        <p className="text-sm font-medium mb-3">Social Connections</p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="facebook">Facebook <span className="text-red-500">*</span></Label>
                                <Input
                                    id="facebook"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleInputChange}
                                    placeholder="Profile URL"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="twitter">Twitter</Label>
                                <Input
                                    id="twitter"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleInputChange}
                                    placeholder="@handle"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="discord">Discord</Label>
                                <Input
                                    id="discord"
                                    name="discord"
                                    value={formData.discord}
                                    onChange={handleInputChange}
                                    placeholder="username#1234"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="youtube">YouTube</Label>
                                <Input
                                    id="youtube"
                                    name="youtube"
                                    value={formData.youtube}
                                    onChange={handleInputChange}
                                    placeholder="Channel URL"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

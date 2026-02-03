import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { isAuthenticated } from "@/lib/auth";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function PUT(req) {
  try {
    // Authenticate User
    const user = await isAuthenticated(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse FormData
    const formData = await req.formData();
    const fullName = formData.get("fullName");
    const efootballId = formData.get("efootballId");
    const deviceName = formData.get("deviceName");
    const deviceModel = formData.get("deviceModel");
    const dob = formData.get("dob");
    const bloodGroup = formData.get("bloodGroup");
    const gender = formData.get("gender");

    const imageFile = formData.get("image");

    // Social Links
    const facebook = formData.get("facebook");
    const twitter = formData.get("twitter");
    const discord = formData.get("discord");
    const youtube = formData.get("youtube");

    // Other fields if needed (gender, bloodGroup, etc. based on prompt "edit his profile")
    // Let's assume generic profile update for now.

    await connectDB();

    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (efootballId) updateData.efootballId = efootballId;
    if (dob) updateData.dob = dob;
    if (bloodGroup) updateData.bloodGroup = bloodGroup;
    if (gender) updateData.gender = gender;

    // Update Device Info
    if (deviceName || deviceModel) {
      updateData.device = {
        name: deviceName || user.device?.name || "Unknown",
        model: deviceModel || user.device?.model || "Unknown",
      };
    }

    // Handle Social Accounts Update
    if (
      facebook !== null ||
      twitter !== null ||
      discord !== null ||
      youtube !== null
    ) {
      updateData.socialAccounts = {
        ...user.socialAccounts, // Keep existing if not provided? Or replace?
        // Usually form provides all current values. Let's assume form sends specific keys.
        // But to be safe, we merge.
      };
      if (facebook !== null) updateData.socialAccounts.facebook = facebook;
      if (twitter !== null) updateData.socialAccounts.twitter = twitter;
      if (discord !== null) updateData.socialAccounts.discord = discord;
      if (youtube !== null) updateData.socialAccounts.youtube = youtube;
    }

    // Handle Image Upload
    if (imageFile && imageFile instanceof File) {
      if (imageFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        return NextResponse.json(
          { error: "Image size too large (max 5MB)" },
          { status: 400 },
        );
      }

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Delete old image if exists
      if (user.avatarPublicId) {
        try {
          await cloudinary.uploader.destroy(user.avatarPublicId);
        } catch (err) {
          console.error("Failed to delete old image:", err);
          // Continue even if delete fails
        }
      }

      // Upload new image
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "gaming-club-avatars",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          )
          .end(buffer);
      });

      updateData.avatar = uploadResult.secure_url;
      updateData.avatarPublicId = uploadResult.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
      new: true,
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

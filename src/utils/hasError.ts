import { profileInfoType } from "@/app/settings/editProfile/page";

// Type guard function to check if profileInfo has an error
export function hasError(profileInfo: profileInfoType): profileInfo is { error: string } {
    return (profileInfo as { error: string }).error !== undefined;
}
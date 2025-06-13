import {cn} from "@/shared/lib/cn/cn.ts";

interface ProfileHeaderProps{
    mobileOnly?: boolean;
    desktopOnly?: boolean;
    fullName: string;
}

export function ProfileHeader({
    mobileOnly = false,
    desktopOnly = false,
    fullName
}: ProfileHeaderProps){
    return (
        <div className={cn(
            'flex justify-center',
            mobileOnly && 'block md:hidden',
        desktopOnly && 'hidden md:block',
        )}>

        <h2 className={cn(
            'font-raleway text-2xl lg:text-3xl',
            'font-small text-gray-900'
        )}>

            {fullName}
        </h2>
    </div>
    );
}
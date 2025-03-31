import {ProfileHeader} from '@/features/profile/profile-header';
import {PersonalInfoCard} from "@/features/profile/personal-info";
import {ContactsCard} from "@/features/profile/contacts";
import {EducationAndWorkCard} from "@/features/profile/education-and-work";

export function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-raleway text-2xl lg:text-3xl font-small ">Профиль</h2>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1 space-y-3">

                    <ProfileHeader mobileOnly/>

                    <PersonalInfoCard/>

                    <ContactsCard/>
                </div>

                <div className="md:col-span-2 space-y-3">
                    <ProfileHeader desktopOnly/>

                    <EducationAndWorkCard/>

                </div>
            </div>
        </div>
    );
}

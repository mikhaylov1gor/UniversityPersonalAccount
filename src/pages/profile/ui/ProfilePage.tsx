import {ProfileHeader} from '@/features/profile/profile-header';
import {PersonalInfoCard} from "@/features/profile/personal-info";
import {ContactsCard} from "@/features/profile/contacts";
import {EducationAndWorkCard} from "@/features/profile/education-and-work";
import {useEffect, useState} from "react";
import {ProfileDto} from "@/shared/models/responses/profile/profileDto.ts";
import {ProfileStoreApi} from "@/shared/services/profile.service.ts";
import {useTranslation} from "react-i18next";

export function ProfilePage() {
    const [profileData, setProfileData] = useState<ProfileDto | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await ProfileStoreApi.getCurrentUserProfile();
                setProfileData(data);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading){
        return <div>
            <h1> Загрузка</h1>
        </div>
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-raleway text-2xl lg:text-3xl font-small">Профиль</h2>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1 space-y-3">

                    <ProfileHeader
                        mobileOnly
                        fullName={ `${profileData.lastName == null ? "undefined" : profileData.lastName} 
                                    ${profileData.firstName == null ? "undefined" : profileData.firstName} 
                                    ${profileData.patronymic == null ? "undefined" : profileData.patronymic}`}
                    />

                    <PersonalInfoCard
                        gender={profileData.gender == null ? "undefined" : profileData.gender as string}
                        birthDate={profileData.birthDate == null ? "undefined" : profileData.birthDate}
                        citizenship={profileData.citizenship == null ? "undefined" : profileData.citizenship.name}
                        snils="000 000 000 000"
                        email={profileData.email == null ? "undefined" : profileData.email}
                        avatarId={profileData.avatar.id}
                    />

                    <ContactsCard
                        contacts ={profileData.contacts}
                        address={profileData.address}
                    />
                </div>

                <div className="md:col-span-2 space-y-3">
                    <ProfileHeader
                        desktopOnly
                        fullName={ `${profileData.lastName == null ? "undefined" : profileData.lastName} 
                                    ${profileData.firstName == null ? "undefined" : profileData.firstName} 
                                    ${profileData.patronymic == null ? "undefined" : profileData.patronymic}`}
                    />

                    <EducationAndWorkCard/>
                </div>
            </div>
        </div>
    );
}

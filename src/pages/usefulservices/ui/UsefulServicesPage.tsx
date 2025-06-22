import React, { useEffect, useMemo, useState } from 'react';
import { useLoadUsefulServices } from '@/shared/hooks/useLoadUsefulServices.ts';
import { UsefulServicesList } from '@/features/usefulService/ui/UsefulServicesList';
import { ProfileDto } from '@/shared/models/responses/profile/profileDto';
import { useTranslation } from 'react-i18next';
import { ProfileStoreApi } from '@/shared/services/profile.service';
import { UsefulServiceCategory } from '@/shared/models/enums/usefulServiceCategory';
import { UserType } from '@/shared/models/enums/userType';

const getCategoriesByUserTypes = (types: UserType[] = []): UsefulServiceCategory[] => {
    const categories: UsefulServiceCategory[] = [];

    if (types.includes(UserType.Student)) {
        categories.push(UsefulServiceCategory.Students);
    }

    if (types.includes(UserType.Employee)) {
        categories.push(UsefulServiceCategory.Employees);
    }

    return categories.length > 0
        ? categories
        : [UsefulServiceCategory.ForAll, UsefulServiceCategory.Students, UsefulServiceCategory.Employees];
};

export const UsefulServicesPage: React.FC = () => {
    const [profile, setProfile] = useState<ProfileDto | null>(null);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProfile = async () => {
            setIsProfileLoading(true);
            try {
                const data = await ProfileStoreApi.getCurrentUserProfile();
                setProfile(data);
            } catch (err) {
                console.error('Failed to load profile:', err);
            } finally {
                setIsProfileLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const categories = useMemo(
        () => getCategoriesByUserTypes(profile?.userTypes),
        [profile?.userTypes]
    );

    const {
        items: services,
        meta,
        loading: isServicesLoading,
        error,
        loadPage
    } = useLoadUsefulServices(categories, 5);

    return (
        <>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <UsefulServicesList
                services={services}
                meta={meta}
                loading={isProfileLoading || isServicesLoading}
                onPageChange={loadPage}
            />
        </>
    );
};

export default UsefulServicesPage;

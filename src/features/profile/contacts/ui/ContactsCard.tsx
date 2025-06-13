import {useTranslation} from "react-i18next";
import {ContactDto} from "@/shared/models/responses/contactDto.ts";
import {ContactTypes} from "@/shared/models/enums/contactTypes.ts";

interface ContactsCardProps {
    contacts: ContactDto[],
    address: string
}

export function ContactsCard({contacts, address}: ContactsCardProps){
    const { t } = useTranslation();

    const getContactsByType = (type: ContactTypes) => {
        return contacts.filter(contact => contact.type === type);
    };

    const phones = getContactsByType(ContactTypes.Phone);
    const socialMedias = getContactsByType(ContactTypes.SocialMedia);

    const renderContacts = (contacts: ContactDto[], label: string) => {
        if (!contacts.length) return null;

        return (
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                {contacts.map((contact, index) => (
                    <p
                        key={`${contact.type}-${index}`}
                        className="pb-2 border-b border-gray-200 text-gray-900"
                    >
                        {contact.value}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-gray-900">
                    {t("profilePage.contacts.title")}
                </h2>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {/* Телефоны */}
                {phones.length > 0 && (
                    <>
                        <div>
                            <p className="text-sm text-gray-500">
                                {t("profilePage.contacts.phone")}
                            </p>
                            {phones.map((phone, index) => (
                                <p
                                    key={`phone-${index}`}
                                    className="pb-2 border-b border-gray-200 text-gray-900"
                                >
                                    {phone.value}
                                </p>
                            ))}
                        </div>
                    </>
                )}

                {phones.length > 1 && phones.slice(1).map((phone, index) => (
                    <div key={`additional-phone-${index}`}>
                        <p className="text-sm text-gray-500">
                            {t("profilePage.contacts.phone")}
                        </p>
                        <p className="pb-2 border-b border-gray-200 text-gray-900">
                            {phone.value}
                        </p>
                    </div>
                ))}

                {socialMedias.length > 0 && (
                    <div>
                        <p className="text-sm text-gray-500">
                            {t("profilePage.contacts.socialMedia")}
                        </p>
                        {socialMedias.map((social, index) => (
                            <p
                                key={`social-${index}`}
                                className="pb-2 border-b border-gray-200 text-gray-900"
                            >
                                {social.value}
                            </p>
                        ))}
                    </div>
                )}

                <div>
                    <p className="text-sm text-gray-500">
                        {t("profilePage.contacts.address")}
                    </p>
                    <p className="text-gray-900">
                        {address || t("profilePage.contacts.noAddress")}
                    </p>
                </div>
            </div>
        </div>
    );
}
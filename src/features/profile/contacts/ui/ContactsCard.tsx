import { useTranslation } from "react-i18next";
import { ContactDto } from "@/shared/models/responses/contactDto.ts";
import { ContactTypes } from "@/shared/models/enums/contactTypes.ts";
import styles from "./ContactsCard.module.scss";

interface ContactsCardProps {
    contacts: ContactDto[],
    address: string
}

export function ContactsCard({ contacts, address }: ContactsCardProps) {
    const { t } = useTranslation();

    const getContactsByType = (type: ContactTypes) => {
        return contacts.filter(contact => contact.type === type);
    };

    const phones = getContactsByType(ContactTypes.Phone);
    const socialMedias = getContactsByType(ContactTypes.SocialMedia);

    const renderContacts = (contacts: ContactDto[], label: string) => {
        if (!contacts.length) return null;

        return (
            <div className={styles['contacts-card__contact-group']}>
                <p className={styles['contacts-card__label']}>{label}</p>
                {contacts.map((contact, index) => (
                    <p
                        key={`${contact.type}-${index}`}
                        className={styles['contacts-card__value']}
                    >
                        {contact.value}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <div className={styles['contacts-card']}>
            <div className={styles['contacts-card__header']}>
                <h3 className={styles['contacts-card__title']}>
                    {t("profilePage.contacts.title")}
                </h3>
            </div>

            <div className={styles['contacts-card__grid']}>
                {/* Телефоны */}
                {phones.length > 0 && (
                    <div className={styles['contacts-card__contact-group']}>
                        <p className={styles['contacts-card__label']}>
                            {t("profilePage.contacts.phone")}
                        </p>
                        {phones.map((phone, index) => (
                            <p
                                key={`phone-${index}`}
                                className={styles['contacts-card__value']}
                            >
                                {phone.value}
                            </p>
                        ))}
                    </div>
                )}

                {phones.length > 1 && phones.slice(1).map((phone, index) => (
                    <div key={`additional-phone-${index}`} className={styles['contacts-card__contact-group']}>
                        <p className={styles['contacts-card__label']}>
                            {t("profilePage.contacts.phone")}
                        </p>
                        <p className={styles['contacts-card__value']}>
                            {phone.value}
                        </p>
                    </div>
                ))}

                {socialMedias.length > 0 && (
                    <div className={styles['contacts-card__contact-group']}>
                        <p className={styles['contacts-card__label']}>
                            {t("profilePage.contacts.socialMedia")}
                        </p>
                        {socialMedias.map((social, index) => (
                            <p
                                key={`social-${index}`}
                                className={styles['contacts-card__value']}
                            >
                                {social.value}
                            </p>
                        ))}
                    </div>
                )}

                <div className={styles['contacts-card__contact-group']}>
                    <p className={styles['contacts-card__label']}>
                        {t("profilePage.contacts.address")}
                    </p>
                    <p className={styles['contacts-card__value']}>
                        {address || t("profilePage.contacts.noAddress")}
                    </p>
                </div>
            </div>
        </div>
    );
}
import styles from "./CreateUpdateEventPage.module.scss"
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {EventDto} from "@/shared/models/responses/event/eventDto.ts";
import Input from "@/shared/ui/atoms/Input/Input.tsx";
import React, {useEffect, useState} from "react";
import {Col, Row} from "react-grid-system";
import Button from "@/shared/ui/atoms/Button/Button.tsx";
import {ToolBar} from "@/shared/ui/atoms/ToolBar/ToolBar.tsx";
import {EventType} from "@/shared/models/enums/event/eventType.ts";
import {EventAuditory} from "@/shared/models/enums/event/eventAuditory.ts";
import {EventFormat} from "@/shared/models/enums/event/eventFormat.ts";
import {EventsStoreApi} from "@/shared/services/events.service.ts";
import {Switcher} from "@/shared/ui/atoms/Switcher/Switcher.tsx";
import {UploadImageInput} from "@/shared/ui/atoms/UploadImageInput/UploadImageInput.tsx";
import {RouteName} from "@/shared/config/router";
import {EventCreateDto} from "@/shared/models/requests/event/eventCreateDto.ts";
import {EventEditDto} from "@/shared/models/requests/event/eventEditDto.ts";
import {FilesStoreApi} from "@/shared/services/files.service.ts";
import {toast} from "@/app/providers/Toast/ToastController.ts";
import DropdownInput from "@/shared/ui/atoms/DropdownInput/DropdownInput.tsx";
import {AddressSuggestions, DaDataAddress, DaDataSuggestion} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

export const CreateUpdateEventPage = () => {
    const {t} = useTranslation();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    // Подгрузка
    const [event, setEvent] = useState<EventDto>(null);

    // Параметры
    const [title, setTitle] = useState<string>(null);
    const [dateFrom, setDateFrom] = useState<string>(null);
    const [isDateFromRequired, setIsDateFromRequired] = useState<boolean>(false);
    const [dateTo, setDateTo] = useState<string >(null);
    const [isDateToRequired, setIsDateToRequired] = useState<boolean>(false);
    const [eventType, setEventType] = useState<EventType>(EventType.Open);
    const [targetAudience, setTargetAudience] = useState<EventAuditory>(EventAuditory.All);
    const [registrationDateTo, setRegistrationDateTo] = useState<string>(null);
    const [isRegistrationRequired, setIsRegistrationRequired] = useState<boolean>(false);
    const [eventFormat, setEventFormat] = useState<EventFormat>(EventFormat.Offline);
    const [link, setLink] = useState<string>("https://");
    const [address, setAddress] = useState<string>(null);
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [isDigest, setIsDigest] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null);
    const [addressSuggestion, setAddressSuggestion] = useState<DaDataSuggestion<DaDataAddress> | null>(null);

    // Toolbars
    const [description, setDescription] = useState(event?.description);
    const [digest, setDigest] = useState(event?.digestText);
    const [notification, setNotification] = useState(event?.notificationText);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                if (id) {
                    const data = await EventsStoreApi.retrieveFullDetailsForAdmin(id);
                    console.log("Запрос на получения подробностей мероприятия", data)
                    setEvent(data);
                    setTitle(data?.title)
                    setIsDateFromRequired(data?.isTimeFromNeeded)
                    setDateFrom(data?.dateTimeFrom)
                    setIsDateToRequired(data?.isTimeToNeeded)
                    setDateTo(data?.dateTimeTo)
                    setEventType(data?.type)
                    setTargetAudience(data?.auditory)
                    setRegistrationDateTo(data?.registrationLastDate)
                    setIsRegistrationRequired(data?.isRegistrationRequired)
                    setEventFormat(data?.format)
                    setLink(data?.link)
                    setAddress(data?.addressName)
                    setLatitude(data?.latitude)
                    setLongitude(data?.longitude)
                    setIsDigest(data?.isDigestNeeded)

                    setDescription(data?.description);
                    setNotification(data?.notificationText)
                    setDigest(data?.digestText)
                }

            } catch (error) {
                console.error("Ошибка при загрузке события:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, []);

    const submit = async () =>{
        try{
            console.log(event?.picture?.id);
            let pictureId = event?.picture?.id == null ? null : event.picture.id;
            if (file) {
                const formData = new FormData();
                formData.append('file', file, file.name);
                const fileDto = await FilesStoreApi.postFileFormData(formData);
                pictureId = fileDto.id;
            }

            if( id ){
                const eventEditDto: EventEditDto = {
                    id: id!,
                    title,
                    description,
                    digestText: digest,
                    pictureId: pictureId,
                    isTimeFromNeeded: isDateFromRequired,
                    dateTimeFrom: dateFrom,
                    isTimeToNeeded: isDateToRequired,
                    dateTimeTo: dateTo,
                    link,
                    addressName: address,
                    latitude: latitude ?? null,
                    longitude: longitude ?? null,
                    isRegistrationRequired,
                    registrationLastDate: registrationDateTo ?? null,
                    isDigestNeeded: isDigest,
                    notificationText: notification,
                    type: eventType,
                    format: eventFormat,
                    auditory: targetAudience
                };

                console.log(eventEditDto)
                await EventsStoreApi.editEventForAdmin(eventEditDto);

                toast.success("Страница успешно отредактирована");
                navigate(RouteName.ADMIN_PAGE_EVENTS);
            }
            else{
                const eventCreateDto: EventCreateDto = {
                    title,
                    description,
                    digestText: digest,
                    pictureId: pictureId,
                    isTimeFromNeeded: isDateFromRequired,
                    dateTimeFrom: dateFrom,
                    isTimeToNeeded: isDateToRequired,
                    dateTimeTo: dateTo,
                    link,
                    addressName: address,
                    latitude: latitude,
                    longitude: longitude,
                    isRegistrationRequired,
                    registrationLastDate: registrationDateTo,
                    isDigestNeeded: isDigest,
                    notificationText: notification,
                    type: eventType,
                    format: eventFormat,
                    auditory: targetAudience
                };

                await EventsStoreApi.createEventForAdmin(eventCreateDto);

                toast.success("Страница успешно создана");
                navigate(RouteName.ADMIN_PAGE_EVENTS);
            }
        }
        catch (error){

            console.log("Ошибка при изменении/создании мероприятия")
            toast.warning("Ошибка при изменении/создании мероприятия: ")
        }
    }


    if (loading) return(<h1>Загрузка...</h1>)

    return (
        <>
            <h1 className={styles.title}>
                {t(`admin.events.createUpdate.titles.${id == null ? 'create' : 'update'}` as any)}
            </h1>
            <div className={styles.card}>
                <div style={{zIndex: 1000}} className={styles.toolbar}>
                    <Input
                        width="100%"
                        label={t("admin.events.createUpdate.name" as any)}
                        onInput={(e: React.FormEvent<HTMLInputElement>) =>
                            setTitle(e.currentTarget.value)}
                        value={title}
                    />
                </div>

                <div style={{zIndex: 1000}} className={styles.toolbar}>
                    <h4>{t("admin.events.createUpdate.description" as any)}</h4>
                    <ToolBar value={description} onChange={setDescription}/>
                </div>

                <Row>
                    <Col md={6} className={styles.row}>
                        <Input
                            type={"date"}
                            width="100%"
                            label={t("admin.events.createUpdate.dateFrom" as any)}
                            value={dateFrom ? new Date(dateFrom).toISOString().split('T')[0] : ''}
                            onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                setDateFrom(e.currentTarget.value)}
                            disabled={!isDateFromRequired}
                        />
                        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            <p style={{margin: 0}}>{t("admin.events.createUpdate.time" as any)}</p>
                            <Switcher
                                isOn={isDateFromRequired}
                                onToggle={() => setIsDateFromRequired(!isDateFromRequired)}
                            />
                        </div>
                    </Col>

                    <Col style={{display: 'flex', flexDirection: 'row', gap: '1rem'}} md={6}>
                        <Input
                            type={"date"}
                            width="100%"
                            label={t("admin.events.createUpdate.dateTo" as any)}
                            value={dateTo ? new Date(dateTo).toISOString().split('T')[0] : ''}
                            onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                setDateTo(e.currentTarget.value)}
                            disabled={!isDateToRequired}
                        />
                        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            <p style={{margin: 0}}>{t("admin.events.createUpdate.time" as any)}</p>
                            <Switcher
                                isOn={isDateToRequired}
                                onToggle={() => setIsDateToRequired(!isDateToRequired)}
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <DropdownInput
                            width="100%"
                            label={t("admin.events.createUpdate.type" as any)}
                            items={Object.values(EventType)}
                            allowEmpty={false}
                            value={eventType}
                            onChange={(value) => setEventType(value as EventType)}
                        />
                    </Col>
                    <Col md={6}>
                        <DropdownInput
                            width="100%"
                            label={t("admin.events.createUpdate.targetAudience" as any)}
                            items={Object.values(EventAuditory)}
                            allowEmpty={false}
                            value={targetAudience}
                            onChange={(value) => setTargetAudience(value as EventAuditory)}
                        />
                    </Col>
                </Row>

                <div className={styles.row} style={{marginTop: "0.5rem"}}>
                    <h4>{t("admin.events.createUpdate.isRegistrationRequired" as any)}</h4>
                    <Switcher
                        isOn={isRegistrationRequired}
                        onToggle ={() => setIsRegistrationRequired(!isRegistrationRequired)}
                    />
                </div>

                {isRegistrationRequired && (
                    <>
                        <Input
                            type={"date"}
                            width="100%"
                            label={t("admin.events.createUpdate.registrationEndDate" as any)}
                            value={registrationDateTo ? new Date(registrationDateTo).toISOString().split('T')[0] : ''}
                            onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                setRegistrationDateTo(e.currentTarget.value)}
                        />
                    </>
                )}

                <DropdownInput
                    width="100%"
                    label={t("admin.events.createUpdate.format" as any)}
                    items={Object.values(EventFormat)}
                    allowEmpty={false}
                    value={eventFormat}
                    onChange={(value) => setEventFormat(value as EventFormat)}
                />

                {eventFormat === EventFormat.Online ? (
                    <>
                        <Input
                            width="100%"
                            label={t("admin.events.createUpdate.link" as any)}
                            value={link}
                            onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                setLink(e.currentTarget.value)}
                        />
                    </>
                ) :(
                    <>
                        <div className={styles.toolbar}>
                            <div className={styles.row} style={{marginTop: "0.5rem"}}>
                                <h4>{t("admin.events.createUpdate.addressTitle" as any)}</h4>
                            </div>

                            <div style={{marginBottom: "1rem"}}>
                                <AddressSuggestions
                                    token="80b7ad778dd1e67bc1848278a4c754cc56f7d96f"
                                    value={addressSuggestion}
                                    onChange={(suggestion) => {
                                        if (suggestion) {
                                            setAddress(suggestion.value);
                                            setLatitude(parseFloat(suggestion.data.geo_lat));
                                            setLongitude(parseFloat(suggestion.data.geo_lon));
                                        }
                                    }}
                                    inputProps={{
                                        placeholder: t("admin.events.createUpdate.address" as any),
/*                                        className: styles.addressInput,*/
                                    }}
                                />
                            </div>

                            <Row>
                                <Col xs={6}>
                                    <Input
                                        width="100%"
                                        label={t("admin.events.createUpdate.latitude" as any)}
                                        value={latitude}
                                        readOnly
                                    />
                                </Col>
                                <Col xs={6}>
                                    <Input
                                        width="100%"
                                        label={t("admin.events.createUpdate.longitude" as any)}
                                        value={longitude}
                                        readOnly
                                    />
                                </Col>
                            </Row>
                        </div>

                    </>
                )}

                <div className={styles.toolbar}>
                    <div className={styles.row} style={{marginTop: "0.5rem"}}>
                        <h4>{t("admin.events.createUpdate.eventNotification" as any)}</h4>
                    </div>
                    <ToolBar value={notification} onChange={setNotification}/>
                </div>

                <div className={styles.toolbar}>
                    <div className={styles.row} style={{marginTop: "0.5rem"}}>
                        <h4>{t("admin.events.createUpdate.isDigest" as any)}</h4>
                        <Switcher
                            isOn={isDigest}
                            onToggle={() => setIsDigest(!isDigest)}
                        />
                    </div>

                    {isDigest && (
                        <ToolBar value={digest} onChange={setDigest}/>
                    )}
                </div>

                <div className={styles.toolbar}>
                    <h4 style={{marginBottom: "0.5rem"}}>{t("admin.events.createUpdate.files" as any)}</h4>
                    <UploadImageInput onFileSelect={(file) => setFile(file)}/>
                </div>

                <div className={styles.buttons}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Button
                                variant="primary"
                                onClick={() => submit()}
                            >
                                {t("common.save" as any)}
                            </Button>
                        </Col>
                        <Col xs={12} md={6}>
                            <Button
                                variant="outline"
                                onClick={() => navigate(RouteName.ADMIN_PAGE_EVENTS)}
                            >
                                {t("common.cancel" as any)}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}
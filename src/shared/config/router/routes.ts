export const RouteName = {
    LOGIN_PAGE: '/login',
    PROFILE_PAGE: '/profile',
    USEFUL_SERVICES_PAGE: '/useful-services',
    CERTIFICATES_PAGE: '/certificates',
    EVENTS_PAGE: '/events',
    EVENT_PAGE: (id: string | number) => `/event/${id}`,
    ADMIN_PAGE: '/admin',
    ADMIN_PAGE_USERS: '/admin/users',
    ADMIN_PAGE_USER_PROFILE: (id: string | number) => `/admin/user/${id}`,
    ADMIN_PAGE_EVENTS: '/admin/events',
    ADMIN_PAGE_UPDATE_EVENT: (id: string | number) => `/admin/event/update/${id}`,
    ADMIN_PAGE_CREATE_EVENT: `/admin/event/create`,
    ERROR500: '/500',
    ERROR404: '*'
}
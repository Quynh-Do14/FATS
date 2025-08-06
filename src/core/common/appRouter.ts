const PREFIX = "";
const ADMIN_PREFIX = "/FATS/admin";

export const ROUTE_PATH = {

    LOGIN: `${PREFIX}/login`,
    REGISTER: `${PREFIX}/register`,
    VERIFY_EMAIL: `${PREFIX}/auth/verify-email`,
    FORGOT_PASSWORD: `${PREFIX}/auth/forgot-password`,
    RESET_PASSWORD: `${PREFIX}/auth/reset-password`,

    ///Client
    HOME_PAGE: `${PREFIX}/`,
    CHAT_BOX_PAGE: `${PREFIX}/chat-box`,
    PERSONAL_FINANCE_PAGE: `${PREFIX}/goal-spending/personal-finance/:id`,
    TEAM_FINANCE_PAGE: `${PREFIX}/team-finance/:id`,

    HISTORY_TRANSITION: `${PREFIX}/history-transition`,
    GOAL_SPENDING_PAGE: `${PREFIX}/personal-goal`,
    TEAM_PAGE: `${PREFIX}/team`,
    GOAL_SPENDING_TEAM_PAGE: `${PREFIX}/team/spending-team/:id`,
    SELECT_CHAT_BOT: `${PREFIX}/select-bot`,
    BLOG: `${PREFIX}/blog`,
    BLOG_BY_ID: `${PREFIX}/blog/view/:id`,
    PAYMENT_INFO: `${PREFIX}/payment-info`,
    PAYMENT_RESULT: `${PREFIX}/payment`,
    PROFILE: `${PREFIX}/profile`,
    JOIN_TEAM: `${PREFIX}/members/t/join/:id`,

    ADVISOR: `${PREFIX}/advisor`,
    ADVISOR_ENTERTAINMENT: `${PREFIX}/advisor/entertainment`,
    ADVISOR_INVEST: `${PREFIX}/advisor/invest`,

    WATCH: `${PREFIX}/watch`,

    ATTENDANCE: `${PREFIX}/attendance`,


    CONTACT: `${PREFIX}/contact`,

    USE_PRIVATE_POLICY: `${PREFIX}/policy/user-private-policy`,
    REFUND_POLICY: `${PREFIX}/policy/refund-policy`,
    SERVICE_POLICY: `${PREFIX}/policy/service-policy`,
    PAYMENT_POLICY: `${PREFIX}/policy/payment-policy`,
    SERVICE_STANDARD: `${PREFIX}/policy/service-standard`,
    TERM_OF_SERVICE: `${PREFIX}/policy/term-of-service`,
    TRANSACTION_POLICY: `${PREFIX}/policy/transaction-policy`,

    ///Management
    MANAGE_LAYOUT: `${ADMIN_PREFIX}`,

    CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/category`,
    ADD_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/category/add`,

    BLOG_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/blog-category-management`,
    ADD_BLOG_CATEGORY_MANAGEMENT: `${ADMIN_PREFIX}/blog-category-management/add`,

    BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog-management`,
    ADD_BLOG_MANAGEMENT: `${ADMIN_PREFIX}/blog-management/add`,

    BANNER_MANAGEMENT: `${ADMIN_PREFIX}/banner`,
    ADD_BANNER_MANAGEMENT: `${ADMIN_PREFIX}/banner/add`,

    USER_MANAGEMENT: `${ADMIN_PREFIX}/user-management`,
    ADD_USER_MANAGEMENT: `${ADMIN_PREFIX}/user-management/add`,

    VIDEO_MANAGEMENT: `${ADMIN_PREFIX}/video-management`,
    ADD_VIDEO_MANAGEMENT: `${ADMIN_PREFIX}/video-management/add`,
}
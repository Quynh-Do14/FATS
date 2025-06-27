export class Endpoint {
    static Auth = class {
        static Login = "/auth/login"
        static Register = "/auth/signup"
        static Profile = "/auth/get/profile"
        static ProfileUpdate = "/auth/update-profile"
        static Customer = "/customers/update"
        static ChangePassword = "/profile/change-password"
        static RefreshToken = "/auth/refresh-token"
        static SelectBot = "/auth/user/change-bot"
        static Verify = "/auth/verify"
        static ForgotPassword = "/auth/forgot-password"
        static ResetPassword = "/auth/reset-password"

    }
    static Goal = class {
        static Personal = class {
            static Get = "/goals/user/all"
            static GetById = "/goals/detail"
            static Add = "/goals/user/create"
            static Delete = "/goals/user/delete"
            static Allocation = "/goals/user/allocation"
            static Achieved = "/goals/user/achieved"
        }
        static Team = class {
            static Get = "/goals/user/team"
            static GetById = "/goals/detail"
            static Add = "/goals/team/create"
            static Delete = "/goals/team/delete"
        }
    }
    static Team = class {
        static Get = "/members/user/all"
        static GetById = "/teams/user/info"
        static Create = "/teams/user/create"
        static Update = "/teams/user/update"
        static Join = "/members/t/join"
        static Member = "/teams/users"
        static AddMember = "/members/add-member"
        static Leave = "/members/user/leave"
        static Delete = "/teams/user/delete"
        static Lock = "/teams/user/block"
        static UnLock = "/teams/user/unblock"
    }
    static Chat = class {
        static Personal = class {
            static Get = "/chat-logs/me/all"
            static Add = "/ai/chat"
            static GetBill = "/ai/bill/info"
        }
        static Team = class {
            static Get = "/chat-logs/team/all"
            static Add = "/ai/chat/team"
            static GetBill = "/ai/bill/info"
        }
    }
    static Income = class {
        static Personal = class {
            static Get = "/incomes/user/get"
            static Create = "/incomes/user/create/personal"
        }
        static Team = class {
            static Get = "/incomes/user/get"
            static Create = "/incomes/user/create"
        }
    }

    static Spending = class {
        static Personal = class {
            static Get = "/spends/user/get"
            static Create = "/spends/user/create/personal"
        }
        static Team = class {
            static Get = "/spends/user/get"
            static Create = "/spends/user/create"
        }

    }
    static Static = class {
        static Personal = class {
            static GetStatisticalGoal = "/spends/user/statistical/personal"
        }
        static Team = class {
            static GetStatisticalGoal = "/spends/team/statistical"
        }
        static Common = class {
            static Personal = "/spends/user/statistical/day-of-week/personal"
            static Team = "/spends/user/statistical/day-of-week"
        }
    }
    static SpendingType = class {
        static Team = class {
            static Get = "/types/team/all"
            static GetById = "/types/team"
            static Add = "/types/team/create"
            static Update = "/types/team/update"
            static Delete = "/types/team/delete"
        }
        static User = class {
            static Get = "/types/user/all"
            static GetById = "/types/user"
            static Add = "/types/user/create"
            static Update = "/types/user/update"
            static Delete = "/types/user/delete"
        }
    }

    static IncomeType = class {
        static Team = class {
            static Get = "/income-types/team/all"
            static GetById = "/income-types/team"
            static Add = "/income-types/team/create"
            static Update = "/income-types/team/update"
            static Delete = "/income-types/team/delete"
        }
        static User = class {
            static Get = "/income-types/user/all"
            static GetById = "/income-types/user"
            static Add = "/income-types/user/create"
            static Update = "/income-types/user/update"
            static Delete = "/income-types/user/delete"
        }
    }
    static Icon = class {
        static Get = "/icons/public/all"
        static Create = "/icons/admin/create"
        static Delete = "/icons/admin/delete"
    }
    static Subscription = class {
        static Payment = "/payment"
        static Get = "/subscriptions/private/histories"
        static Create = "subscriptions/private/subscribe"
        static Package = "/subscriptions/public/plans"
    }
    static Budget = class {
        static Get = "/budgets/private/my-budget"
        static Create = "/budgets/private/create"
        static Update = "/budgets/private/update"
    }

    static History = class {
        static Personal = class {
            static Spend = "/spends/user/all"
            static Income = "/incomes/user/all"
        }
        static Team = class {
            static Spend = "/spends/team/all"
            static Income = "/incomes/team/all"
        }
    }
}
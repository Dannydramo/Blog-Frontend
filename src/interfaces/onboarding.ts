export interface RegisterProps {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginProps {
    email: string;
    password: string;
}

export interface ForgotPasswordProps {
    email: string;
}

export interface ResetPasswordProps {
    password: string;
    confirmPassword: string;
}

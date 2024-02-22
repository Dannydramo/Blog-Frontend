import { ChangeEventHandler } from "react";

export type TextFieldProps = {
    type: string;
    placeholder: string;
    name: string;
    register: any;
    errors: any;
    onChange: ChangeEventHandler<HTMLInputElement>;
    className: string;
};

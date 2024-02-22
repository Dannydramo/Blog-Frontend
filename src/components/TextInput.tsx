import { TextFieldProps } from "@/interfaces/forms";
import React from "react";

const TextInput: React.FC<TextFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    errors,
    onChange,
    className,
}) => {
    return (
        <>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className={`flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
                {...register(name)}
                onChange={onChange}
            />
            {errors[name] && (
                <p className="text-red-400 text-sm mt-2">
                    {errors[name].message}
                </p>
            )}
        </>
    );
};

export default TextInput;


import React from 'react'

type Props = {
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    required: boolean | false;
    placeholder: string;
    signOut: () => void;
}

function TextInput({ id, name, autoComplete, required, placeholder }: Props) {
    return (
        <input
            id={id}
            name={name}
            type="text"
            autoComplete={autoComplete}
            required={required}
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder={placeholder}
        />
    )
}

export default TextInput


import { ActionCreatorWithPayload, AnyAction } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { SingleValue } from 'react-select/dist/declarations/src';


interface Option {
    readonly _id: string;
    readonly name: string;

}

type Props = {
    options: Option[];
    value: Option;
    isLoading: boolean;
    setValue: ActionCreatorWithPayload<any, any>;

}
const Autocomplete = ({
    options,
    value,
    isLoading,
    setValue
}: Props): JSX.Element => {
    const dispatch = useDispatch()
    // const localOptions: OptionL[] = options.map((option) => { return { label: option.name, value: option._id } })


    // const [isLoading, setIsLoading] = useState(false);
    // const [options, setOptions] = useState(defaultOptions);
    // const [value, setValue] = useState<Option | null>();

    // const handleCreate = (inputValue: string) => {
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         const newOption = createOption(inputValue);
    //         setIsLoading(false);
    //         setOptions((prev) => [...prev, newOption]);
    //         setValue(newOption);
    //     }, 1000);
    // };

    const handleChange = (newValue: SingleValue<{
        label: string;
        value: string;
    }>) => {
        dispatch(setValue({ _id: newValue?.value, name: newValue?.label }))
    }


    return (
        <CreatableSelect isClearable
            isDisabled={isLoading}
            isLoading={isLoading}
            placeholder={"Оберіть"}
            onChange={handleChange}
            // onCreateOption={handleCreate}
            options={options.map((option) => { return { label: option.name, value: option._id } })}
            value={{ label: value.name, value: value._id }} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" styles={{
                input: (base) => ({
                    ...base,
                    'input:focus': {
                        boxShadow: 'none',
                    },
                }),
            }} />)

}


export default Autocomplete
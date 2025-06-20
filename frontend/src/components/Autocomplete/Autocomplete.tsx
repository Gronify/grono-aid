
import { ActionCreatorWithPayload, AnyAction } from '@reduxjs/toolkit';
import React, { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { SingleValue } from 'react-select/dist/declarations/src';
import { DtoCreateRegion } from '../../core/lib/dto/address';


interface Option {
    readonly _id: string;
    readonly name: string;

}

type Props = {
    options: Option[];
    value: Option;
    isLoading: boolean;
    setValue: ActionCreatorWithPayload<any, any>;
    handleCreate?: (inputValue: string) => void;

}
const Autocomplete = ({
    options,
    value,
    isLoading,
    setValue,
    handleCreate
}: Props): JSX.Element => {
    const dispatch = useDispatch()

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
            onCreateOption={handleCreate}
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
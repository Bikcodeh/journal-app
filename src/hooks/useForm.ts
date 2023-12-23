import { ChangeEvent } from 'react';
import { FormValidations } from './../interface/index';
import { useEffect, useMemo, useState } from 'react';

export interface FormType {
    [key: string]: string;
}

export const useForm = <T extends FormType>(initialForm: T, formValidations: FormValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState<{ [key: string]: string | null }>({});

    useEffect(() => {
        createValidations()
    }, [formState])

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm])


    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }
        return true;
    }, [formValidation]);


    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const createValidations = () => {
        const formCheckedValues: { [key: string]: string | null } = {};
        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return {
        ...formState,
        ...formValidation,
        formState,
        onInputChange,
        onResetForm,
        isFormValid
    }
}
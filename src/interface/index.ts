type ValidationFunction = (value: string) => boolean;

export interface FormValidations {
    [key: string]: [ValidationFunction, string];
}
import {IconDefinition} from '@fortawesome/fontawesome-svg-core';

export type ButtonProps = {
    type : string;
    loading?:boolean;
    textStyle ?: string;
    valueIcon ?: IconDefinition;
    valueText ?: string;
} & React.HTMLAttributes<HTMLButtonElement>;
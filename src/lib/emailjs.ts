import emailjs from '@emailjs/browser';
import { RefObject } from 'react';

export const sendEmail = async (ref: RefObject<HTMLFormElement | null>,serviceId: string, templateId: string, publickKey: string) =>{
    try{
        if(ref.current){
            await emailjs.sendForm(serviceId, templateId, ref.current, {
                publicKey: publickKey
            });
            return true;
        }
        return false
    }catch(error: unknown){
        return false;
    }
}
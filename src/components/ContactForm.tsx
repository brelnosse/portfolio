import { fas } from '@fortawesome/free-solid-svg-icons';
//@ts-ignore
import '../assets/style/contactform.css';
import Button from './Button';
import Underlined from './Underlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { sendEmail } from '../lib/emailjs';
import SocialMedia from './SocialMedia';

const validateForm = (data:{name: string; email: string; message: string}) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (data.name.trim().length < 2) return "Nom trop court";
  if (!emailRegex.test(data.email)) return "Email invalide";
  if (data.message.trim().length < 10) return "Message trop court";
  
  return null;
};

const ContactForm:React.FC<{isVisible: boolean; setIsVisible: (v: boolean) => void; setIsAlertVisible: (v: boolean) => void, setAlertDatas: Dispatch<SetStateAction<{ type: string; title: string; description: string; }>>}> = ({isVisible, setIsVisible, setIsAlertVisible, setAlertDatas}) => {
    const form = useRef<HTMLFormElement>(null);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [formData, setFormData] = useState<{name: string; email: string; message: string}>({
        name: '',
        email: '',
        message: ''
    });
    const handleChange = (key: string, value: string) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }
    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        
        if(validateForm(formData) == null){
            if(form.current){
                setIsloading(true);
                try{
                if(await sendEmail(
                    form, 
                    process.env.REACT_APP_EMAILJS_SERVICE || 'YOUR EMAIJS SERVICE KEY', 
                    process.env.REACT_APP_EMAILJS_TEMPLATE || 'YOUR EMAIJS TEMPLATE KEY',
                    process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR EMAIJS PUBLIC KEY'))
                    {
                        setIsAlertVisible(true);
                        setAlertDatas({
                            type: 'success',
                            title: 'Message envoyé !',
                            description: 'Votre message a bien été envoyé.'
                        })
                        setIsAlertVisible(true);
                        (form.current as HTMLFormElement).reset()
                    }else{
                        setIsAlertVisible(true);
                        setAlertDatas({
                            type: 'error',
                            title: 'Erreur lors de l\'envoi du message',
                            description: 'Une erreur inattendu est survenue lors de l\'envoi du message'
                        })
                        setIsAlertVisible(true);
                    }  
                }catch(error: unknown){
                    console.log(error)
                }finally{
                    setIsloading(false);
                }
            }
        }else{
            setIsAlertVisible(true);
            setAlertDatas({
                type: 'error',
                title: validateForm(formData) || '',
                description: 'Certaines données ont été mal renseignée.'
            })
        }
    }
    useEffect(()=> {
        if(isVisible){
            document.querySelector('body')?.classList.add('no-scroll');
        }else{
            document.querySelector('body')?.classList.remove('no-scroll');
        }
        return () => {
            document.querySelector('body')?.classList.remove('no-scroll');
        }
    }, [isVisible]);
    return (
        <div className={`contactForm${isVisible ? ' visible': ' hide'}`}>
            <div className="form-header">
                <div className="s-c-r">
                    <SocialMedia />
                </div>
                <span 
                    className="closeForm"
                    onClick={()=>{
                        setIsVisible(false);
                    }}>
                    <FontAwesomeIcon icon={fas.faTimes}/>
                </span>
            </div>
            <div className="formContainer">
                <div className="contactForm_left">
                    <Underlined text='Contactez-moi'/>
                    <img src={require('../assets/images/sendMail.png')} alt="Contact form" />
                </div> 
                <form className="contactForm_right" ref={form} onSubmit={handleSubmit}>
                    <input type="hidden" name="title" value={"Portfolio"}/>
                    <input type="hidden" name="time" value={new Date().toLocaleDateString()}/>
                    <div className="form-group">
                        <label htmlFor="name">Nom et prénom</label>
                        <input type="text" placeholder='John Doe' name="name" onChange={(e)=>{
                            handleChange('name', e.target.value)
                        }} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">E-mail</label>
                        <input type="email" placeholder='johndoe@gmail.com' name="email" onChange={(e)=>{
                            handleChange('email', e.target.value)
                        }} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Message</label>
                        <textarea id="message" name="message" onChange={(e)=>{
                            handleChange('message', e.target.value)
                        }} required></textarea>
                    </div>
                    <Button type='light' valueIcon={fas.faPaperPlane}valueText='Envoyer le message' loading={isLoading}/>
                </form>
            </div>
        </div>
    );
}
export default ContactForm;
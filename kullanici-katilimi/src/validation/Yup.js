import * as Yup from "yup";

export const FormSchema = Yup.object().shape({
    name: Yup
            .string()
            .trim()
            .required("Lütfen Adınızı ve Soyadınızı Giriniz")
            .min(10,"Lütfen Adınızı ve Soyadınızı Tam Giriniz!"),

    email: Yup
            .string()
            .required("Lütfen Bir Email Adresi Giriniz")
            .email("Lütfen Geçerli Bir Email Adresi Giriniz!"),

    password: Yup
            .string()
            .required("Lütfen Bir Password Oluşturunuz")
            .min(8,"En Az 8 Karakter Olmalı!"),
    terms: Yup  
            .boolean()
            .oneOf([true],"Onaylamadan Üye Olamazsınız")
})



import * as yup from "yup"

export const editValidationScheme = yup
    .object().shape({
        fullName: yup.string().required('Full name is required'),

        phone: yup.string().required('Phone number is required')
            .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid'),
    })

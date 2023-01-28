export interface Newuser {
    username : string
    first_name: string
    last_name: string
    tech_stack : string[]
    email: string
    dob : Date
    user_gender: string
    phone_number: string
    country: string
    profession: string
    organisation: string
}

/*
        firstname: ['',Validators.required],
        lastname: [''],
        dob: ['',Validators.required],
        gender: ['',Validators.required], 
        email: ['', Validators.required],
        phone: ['',Validators.required],
        country: [null,Validators.required],
        profession: [null,Validators.required]
*/
export interface LoginData {
    id:number,
    email:string,
      username?: string,
      password?: string,
      name?:{
          fName?: string,
          lName?: string
      },
      address?:{
          city?: string,
          street?: string,
          number?: number,
          zipCode?: number,
      },
      phone?: number,
      favourite?:any[];
}
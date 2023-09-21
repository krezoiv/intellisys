export class UsersModel {

    constructor(
        public codido: string,
        public usuario: string,
        public password: string,
        public idCargo: number,
        public idStatus: number,

    ){}

}

export class UsersLoginModel {

    constructor(
        public codido: string,
        public usuario: string,
        public password: string,
        public idCargo: number,
        public idStatus: number,

    ){}

}
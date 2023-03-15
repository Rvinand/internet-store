module.exports = class UserDto {
    id;
    name;
    email;
    avatar;
    background;
    role;
    isActivated;

    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.email = model.email
        this.avatar = model.avatar
        this.background = model.background
        this.role = model.role
        this.isActivated = model.isActivated
    }
}
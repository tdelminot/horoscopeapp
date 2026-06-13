class UserModel {
  constructor(id, name, birthDate, birthPlace, sign = null) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.birthPlace = birthPlace;
    this.sign = sign;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      birthDate: this.birthDate,
      birthPlace: this.birthPlace,
      sign: this.sign
    };
  }

  static fromJSON(json) {
    return new UserModel(
      json.id,
      json.name,
      json.birthDate,
      json.birthPlace,
      json.sign
    );
  }
}

export default UserModel;
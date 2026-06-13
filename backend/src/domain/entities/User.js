class User {
  constructor(id, name, birthDate, birthPlace, sign = null) {
    this.id = id;
    this.name = name;
    this.birthDate = new Date(birthDate);
    this.birthPlace = birthPlace;
    this.sign = sign;
    this.createdAt = new Date();
  }

  calculateSign() {
    const month = this.birthDate.getMonth() + 1;
    const day = this.birthDate.getDate();

    const zodiacSigns = [
      { name: "Capricorne", start: [12, 22], end: [1, 19] },
      { name: "Verseau", start: [1, 20], end: [2, 18] },
      { name: "Poissons", start: [2, 19], end: [3, 20] },
      { name: "Bélier", start: [3, 21], end: [4, 19] },
      { name: "Taureau", start: [4, 20], end: [5, 20] },
      { name: "Gémeaux", start: [5, 21], end: [6, 20] },
      { name: "Cancer", start: [6, 21], end: [7, 22] },
      { name: "Lion", start: [7, 23], end: [8, 22] },
      { name: "Vierge", start: [8, 23], end: [9, 22] },
      { name: "Balance", start: [9, 23], end: [10, 22] },
      { name: "Scorpion", start: [10, 23], end: [11, 21] },
      { name: "Sagittaire", start: [11, 22], end: [12, 21] }
    ];

    for (const sign of zodiacSigns) {
      if ((month === sign.start[0] && day >= sign.start[1]) ||
          (month === sign.end[0] && day <= sign.end[1])) {
        return sign.name;
      }
    }
    return "Capricorne";
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      birthDate: this.birthDate,
      birthPlace: this.birthPlace,
      sign: this.sign,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;
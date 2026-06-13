class HoroscopeModel {
  constructor(userId, sign, date, daily, love, career, health) {
    this.userId = userId;
    this.sign = sign;
    this.date = date;
    this.daily = daily;
    this.love = love;
    this.career = career;
    this.health = health;
  }

  static fromJSON(json) {
    return new HoroscopeModel(
      json.userId,
      json.sign,
      json.date,
      json.daily,
      json.love,
      json.career,
      json.health
    );
  }
}

export default HoroscopeModel;
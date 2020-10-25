import moment from 'moment';

class Goal {
  constructor(id, ownerId, date, number) {
    this.id = id;
    this.ownerId = ownerId;
    this.date = date;
    this.number = number;
  }
  get readableDate() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}

export default Goal;

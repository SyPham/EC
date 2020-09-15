import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarsService {

constructor() { }
    monthComparator(date1, date2) {
      let d1 = new Date(date1);
      let d2 = new Date(date2);
      if (d1.getMonth() === d2.getMonth()) {
          return 1;
      }
      return -1;
    }
    addDays(date, days) {
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    getMondaysInMonth(obj: number) {
      let mon = obj - 1 || new Date().getMonth();
      if (obj === 1) {
        mon = 0;
      }

      let d = new Date(new Date().getFullYear(), mon),
      month = d.getMonth(),
      mondays = [];
      d.setDate(1);

      // Get the first Monday in the month
      while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1);
      }

      // Get all the other Mondays in the month
      while (d.getMonth() === month) {
        mondays.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
      }
      return this.toFormatDatesArray(mondays);
    }
    getWednesdaysInMonth(month) {
      let wednesdays = [];
      this.getMondaysInMonth(month).map(item => {
        let wednesday = this.addDays(item, 1);
        if (this.monthComparator(item, wednesday) === 1) {
            wednesdays.push(wednesday);
          }
      });
      return this.toFormatDatesArray(wednesdays);
    }
    getTuesdaysInMonth(month) {
      let wednesdays = [];
      this.getMondaysInMonth(month).map(item => {
        let wednesday = this.addDays(item, 2);
        if (this.monthComparator(item, wednesday) === 1) {
            wednesdays.push(wednesday);
          }
      });
      return this.toFormatDatesArray(wednesdays);
    }
    getThursdaysInMonth(month) {
      let wednesdays = [];
      this.getMondaysInMonth(month).map(item => {
          let wednesday = this.addDays(item, 3);
          if (this.monthComparator(item, wednesday) === 1) {
              wednesdays.push(wednesday);
          }
      });
      return this.toFormatDatesArray(wednesdays);
    }
    getFridaysInMonth(month) {
      let wednesdays = [];
      this.getMondaysInMonth(month).map(item => {
          let wednesday = this.addDays(item, 4);
          if (this.monthComparator(item, wednesday) === 1) {
              wednesdays.push(wednesday);
          }
      });
      return this.toFormatDatesArray(wednesdays);
    }
    getSaturdaysInMonth(month) {
      let wednesdays = [];
      this.getMondaysInMonth(month).map(item => {
          let wednesday = this.addDays(item, 5);
          if (this.monthComparator(item, wednesday) === 1) {
              wednesdays.push(wednesday);
          }
      });
      return this.toFormatDatesArray(wednesdays);
    }
    getSundaysInMonth(month) {
      let wednesdays = [];
      this.getMondaysInMonth(month).map(item => {
        let wednesday = this.addDays(item, 6);
        if (this.monthComparator(item, wednesday) === 1) {
          wednesdays.push(wednesday);
        }
      });
      return wednesdays;
    }
    getDatesOfMonth(index = 0) {
      if (index === 0) {
          return '#N/A';
      }
      let _datesOfMonth = ['#N/A', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Nighth',
          'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth',
          'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'NineTeenth',
          'Twentieth', 'Twenty-first', 'Twenty-second', 'Twenty-third', 'Twenty-fourth', 'Twenty-fifth', 'Twenty-sixth', 'Twenty-seventh', 'Twenty-eight', 'Twenty-nineth', 'Thirtieth', 'Thirty-first'];
      let _datesOfMonthShort = _datesOfMonth.map(item => {
          return item.substring(item.length - 2, item.length);
      });
      return index + _datesOfMonthShort[index];
    }

    getFirstDateByMonth(month: number): string {
      let date = new Date(new Date().getFullYear(), month);
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      return firstDay.toLocaleString();
    }
    getLastDateByMonth(month) {
      let date = new Date(new Date().getFullYear(), month);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return lastDay;
    }
    checkQuarterly(quarterly, date) {
      let qu = [
          'First quarter',
          'Second quarter',
          'Third quarter',
          'Fourth quarter'
      ];
      let quTemp = qu.map(item => {
          return item.substr(0, 3);
      });
      let quarterNumber = quTemp.indexOf(quarterly);
      let q1 = [1, 2, 3, 4], q2 = [4, 5, 6, 7], q3 = [7, 8, 9, 10], q4 = [10, 11, 12];
      if (date === '') {
          return {
              status: false,
              quarter: qu[quarterNumber]
          };
      }
      let dateTemp = new Date(date);
      let month = dateTemp.getMonth() + 1;
      let firstDate = dateTemp.getDate();
      if (q1.includes(month) && quarterNumber === 0) {
          if (month === 4 && firstDate === 1) {
              return {
                  status: true,
                  quarter: qu[quarterNumber]
              };
          }
          if (month >= 1 && month <= 3) {
              return {
                  status: true,
                  quarter: qu[quarterNumber]
              };
          }
      }
      if (q2.includes(month) && quarterNumber === 1) {
          if (month === 7 && firstDate === 1) {
              return {
                  status: true,
                  quarter: qu[quarterNumber]
              };
          }
          if (month >= 4 && month <= 6) {
              return {
                  status: true,
                  quarter: qu[quarterNumber]
              };
          }
      }
      if (q3.includes(month) && quarterNumber === 2) {
          if (month === 10 && firstDate === 1) {
              return {
                  status: true,
                  quarter: qu[quarterNumber]
              };
          }
          if (month >= 7 && month <= 9) {
              return {
                  status: true,
                  quarter: qu[quarterNumber]
              };
          }
      }
      if (q4.includes(month) && quarterNumber === 3) {
          return {
              status: true,
              quarter: qu[quarterNumber]
          };
      }
      return {
          status: false,
          quarter: qu[quarterNumber]
      };
    }

    toFormatDatesArray(dates: any) {
      return dates.map(date => {
          return this.toFormatDate(date, true);
      });
  }

  toFormatDate(dateIso: string, showyear = true) {
    if((dateIso || '') === '') {
         return '';
    }
    let date = new Date(dateIso);
    let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    if (showyear) {
        return `${day} ${monthNames[monthIndex]}, ${year}`;
    } else {
        return `${day} ${monthNames[monthIndex]}`;
    }
  }

  // -------------------
  getFirstDateLastDateQuarter(numberic: number) {
        switch (numberic) {
            case 1:
                return {
                    firstDate: this.toFormatDate(this.getFirstDateByMonth(1)),
                    lastDate: this.toFormatDate(this.getFirstDateByMonth(3)),
                };
            case 2: return {
                firstDate: this.toFormatDate(this.getFirstDateByMonth(4)),
                lastDate: this.toFormatDate(this.getFirstDateByMonth(6)),
            };
            case 3: return {
                firstDate: this.toFormatDate(this.getFirstDateByMonth(7)),
                lastDate: this.toFormatDate(this.getFirstDateByMonth(9)),
            };
            case 4: return {
                firstDate: this.toFormatDate(this.getFirstDateByMonth(10)),
                lastDate: this.toFormatDate(this.getFirstDateByMonth(12)),
            };
        }
    }
    getQuarter(d) {
        d = d || new Date();
        let q1 = [1, 2, 3], q2 = [4, 5, 6], q3 = [7, 8, 9], q4 = [10, 11, 12];
        if (q1.includes(d.getMonth())) {
            return 1;
        }
        if (q2.includes(d.getMonth())) {
            return 2;
        }
        if (q3.includes(d.getMonth())) {
            return 3;
        }
        if (q4.includes(d.getMonth())) {
            return 4;
        }
    }
    getDateInMonth(month) {
        let m = new Date(new Date().getFullYear(), month, 0).getDate();
        return m;
    }
    toDateTimeNowISO() {
        let date = new Date();
        date.toISOString(); // '2011-12-19T15:28:46.493Z'
        return date;
    }

    toTitleCase(str) {
        return str.replace(/\S+/g, str => str.charAt(0).toUpperCase() + str.substr(1).toLowerCase());
    }

    convertDate(inputFormat) {
        function pad(s) {
            return s < 10 ? '0' + s : s;
        }
        let d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    }
    dateNow(ch = '/') {
      function pad(s) {
          return s < 10 ? '0' + s : s;
      }
      let date = new Date();
      let day = date.getDate(); // yields date
      let month = date.getMonth() + 1; // yields month (add one as '.getMonth()' is zero indexed)
      let year = date.getFullYear(); // yields year
      // let hour = date.getHours(); // yields hours
      // let minute = date.getMinutes(); // yields minutes
      // let second = date.getSeconds(); // yields seconds
      // After this letruct a string with the above results as below
      let time = pad(month) + ch + pad(day) + ch + year; // + ' ' + hour + ':' + minute + ':' + second;
      return time;
    }
    dateFormat(date) {
        let d = new Date(date);
        let m, day, month;
        m = d.getMonth() + 1;
        if (m < 10) {
            month = '0' + m;
        }
        if (d.getDate() < 10) {
            day = '0' + d.getDate();
        } else {
            day = d.getDate();
        }
        let year = d.getFullYear();
        let formattedDate = month + '-' + day + '-' + year;
        return formattedDate;
    }
    JSONDateWithTime(dateStr) {
        let d = new Date(dateStr);
        // tslint:disable-next-line:one-variable-per-declaration
        let m: any, day: any, month: any;
        m = d.getMonth() + 1;
        if (m < 10) {
            month = '0' + m;
        } else {
            month = m;
        }
        if (d.getDate() < 10) {
            day = '0' + d.getDate();
        } else {
            day = d.getDate();
        }
        let year = d.getFullYear();
        let formattedDate = `${day}/${month}/${year}`;
        let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
        let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
        let seconds = d.getSeconds();
        let formattedTime = hours + ':' + minutes;
        formattedDate = formattedTime + ' - ' + formattedDate;
        // Ngày giờ hiện tại
        // tslint:disable-next-line:one-variable-per-declaration
        let date = new Date(), dateObj: string;
        let dayNow = date.getDate();
        let monthNow = date.getMonth() + 1;
        let yearNow = date.getFullYear();
        let hoursNow = date.getHours();
        let minutesNow = date.getMinutes();
        let secondsNow = date.getSeconds();

        dateObj = formattedDate;
        if (hoursNow - (hours as number) as number === 0 &&
            minutesNow - (minutes as number) === 0 &&
            yearNow - year === 0 &&
            monthNow - month === 0 &&
            dayNow - day === 0) {
            if (secondsNow - seconds === 0) {
                dateObj = 'just recently';
            } else if (secondsNow - seconds === 1) {
                dateObj = secondsNow - seconds + ' second ago';
          } else {
             dateObj = secondsNow - seconds + ' seconds ago';
          }
        }
        if (hoursNow - (hours as number) === 0 &&
            minutesNow - (minutes as number) > 0 &&
            yearNow - year === 0 &&
            monthNow - month === 0 &&
            dayNow - day === 0) {
            if (minutesNow - (minutes as number) === 1) {
                dateObj = minutesNow - (minutes as number) + ' minute ago';
            } else {
                dateObj = minutesNow - (minutes as number) + ' minutes ago';
            }
        }
        if (hoursNow - (hours as number) > 0 &&
            yearNow - year === 0 &&
            monthNow - month === 0 &&
            dayNow - day === 0) {
            if (hoursNow - (hours as number) === 1) {
                dateObj = hoursNow - (hours as number) + ' hour ago';
            } else {
                dateObj = hoursNow - (hours as number) + ' hours ago';
            }
        }
        if (yearNow - year === 0 &&
            monthNow - month === 0 &&
            dayNow - day > 0 &&
            dayNow - day <= 7) {
            if (dayNow - day === 1) {
                dateObj = dayNow - day + ' day ago';
            } else {
                dateObj = dayNow - day + ' days ago';
            }
        }
        if (yearNow - year === 0 && monthNow !== month) {
            day = dayNow - day;
            let mon = monthNow - month;
            day = mon * 30 + day;
            if (0 < day && day <= 7) {
                dateObj = day + ' days ago';
            }
        }
        return dateObj;
    }
}


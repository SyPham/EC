
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EC_API.Helpers
{
    public static class CodeUtility
    {

        //        public static IEnumerable<T> Flatten<T>(
        //    this IEnumerable<T> e
        //, Func<T, IEnumerable<T>> f
        //) => e.SelectMany(c => f(c).Flatten(f)).Concat(e);
        public static IEnumerable<T> Flatten<T>(
            this IEnumerable<T> source,
            Func<T, IEnumerable<T>> childSelector)
        {
            HashSet<T> added = new HashSet<T>();
            Queue<T> queue = new Queue<T>();
            foreach (T t in source)
                if (added.Add(t))
                    queue.Enqueue(t);
            while (queue.Count > 0)
            {
                T current = queue.Dequeue();
                yield return current;
                if (current != null)
                {
                    IEnumerable<T> children = childSelector(current);
                    if (children != null)
                        foreach (T t in childSelector(current))
                            if (added.Add(t))
                                queue.Enqueue(t);
                }
            }
        }
        public static IEnumerable<TSource> DistinctBy<TSource, TKey>
   (this IEnumerable<TSource> source, Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();
            foreach (TSource element in source)
            {
                if (seenKeys.Add(keySelector(element)))
                {
                    yield return element;
                }
            }
        }
        public static DateTime ToParseStringDateTime(this string dateString)
        {
            DateTime dateTime;
            if (DateTime.TryParse(dateString, out dateTime))
                return dateTime;
            else
                return DateTime.MinValue;
        }
        private static Random random = new Random();
        public static string RandomString( int length)
        {
            const string chars = "0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public static IEnumerable<DateTime> AllDatesInMonth(this int month, int year)
        {

            int days = DateTime.DaysInMonth(year, month);
            for (int day = 1; day <= days; day++)
            {
                yield return new DateTime(year, month, day);
            }
        }
        public static IEnumerable<DateTime> AllDatesInMonth(this int month)
        {
            int year = DateTime.Now.Year;
            int days = DateTime.DaysInMonth(year, month);
            for (int day = 1; day <= days; day++)
            {
                yield return new DateTime(year, month, day);
            }
        }
        public static IEnumerable<DateTime> ToGetMondaysInMonth(this int month)
        {
            return AllDatesInMonth(month).Where(x => x.DayOfWeek.Equals(DayOfWeek.Monday));
        }
        public static IEnumerable<DateTime> ToGetTuesdaysInMonth(this int month)
        {
            return AllDatesInMonth(month).Where(x => x.DayOfWeek.Equals(DayOfWeek.Tuesday));
        }
        public static IEnumerable<DateTime> ToGetWednesdaysInMonth(this int month)
        {
            return AllDatesInMonth(month).Where(x => x.DayOfWeek.Equals(DayOfWeek.Wednesday));
        }
        public static IEnumerable<DateTime> ToGetThurdaysInMonth(this int month)
        {
            return AllDatesInMonth(month).Where(x => x.DayOfWeek.Equals(DayOfWeek.Thursday));
        }
        public static IEnumerable<DateTime> ToGetFridaysInMonth(this int month)
        {
            return AllDatesInMonth(month).Where(x => x.DayOfWeek.Equals(DayOfWeek.Friday));
        }
        public static IEnumerable<DateTime> ToGetSaturdaysInMonth(this int month)
        {
            return AllDatesInMonth(month).Where(x => x.DayOfWeek.Equals(DayOfWeek.Saturday));
        }
        public static IEnumerable<DateTime> ToGetSundaysInMonth(this int month)
        {
            return AllDatesInMonth(month).Where(x => x.DayOfWeek.Equals(DayOfWeek.Sunday));
        }

        public static string ToParseDatetimeToStringISO8061(this DateTime dateTime)
        {
            return dateTime.Date.ToString("yyyy-MM-ddTHH:mm:ssZ");
        }
        public static string ToStringDateTime(this DateTime? dt, string format)
        => dt == null ? "" : ((DateTime)dt).ToString(format);
        public static bool IsDouble(this object value)
        {
            var flag = false;
            if (value == null || value.ToString() == string.Empty)

                return flag;

            double result = 0;

            double.TryParse(value.ToString(), out result);

            return false;
        }
      
        public static string GetLastDateOfNextQuarter(this string quarter)
        {
            var quarters = new string[]{
                  "First quarter",
                  "Second quarter",
                  "Third quarter",
                  "Fourth quarter"
                };

            var listMonthOfQuarter = new List<int[]>()
            {
                new int[]{1,2,3,4},
                new int[]{4,5,6,7},
                new int[]{7,8,9,10},
                new int[]{10,11,12}
            };
            int quarterIndex = Array.IndexOf(quarters, quarter);
            int year = DateTime.Now.Year;
            var month = listMonthOfQuarter.ElementAt(quarterIndex).LastOrDefault();
            if (month == 12)
            {
                month = 4;
                year = year + 1;
                quarterIndex = 1;
            }
            var date = new DateTime(year, month, 1).ToStringFormat("{0:MMM d}");
            return quarters[quarterIndex] + ", " + date;
        }

        /// <summary>
        /// Cắt chuỗi bắt đầu từ bên trái
        /// </summary>
        /// <param name="value">Giá trị</param>
        /// <param name="length">Chiều dài cần cắt</param>
        /// <returns></returns>
        public static string ToLeft(this string value, int length)
        {
            string somestring = value;
            if (somestring.IsNullOrEmpty())
            {
                return string.Empty;
            }
            if (length > somestring.Length)
            {
                return string.Empty;
            }

            string newstring = somestring.Substring(0, length);
            return newstring;
        }
        /// <summary>
        /// Cắt chuỗi bắt đầu từ bên phải
        /// </summary>
        /// <param name="value">Giá trị</param>
        /// <param name="length">Chiều dài chuỗi</param>
        /// <returns></returns>
        public static string ToRight(this string value, int length)
        {
            string somestring = value;
            var stringLength = somestring.Length;

            if (somestring.IsNullOrEmpty())
            {
                return string.Empty;
            }
            if (length > stringLength)
            {
                return string.Empty;
            }
            string newstring = somestring.Substring(stringLength - length, length);
            return newstring;
        }
        /// <summary>
        /// Cắt chuỗi theo khoảng
        /// </summary>
        /// <param name="value">Giá trị</param>
        /// <param name="From">Là giá trị bắt đầu (thuộc kiểu int)</param>
        /// <param name="End">Là giá trị kết thúc (thuộc kiểu int)</param>
        /// <returns></returns>
        public static string ToMid(this string value, int From, int End)
        {
            string somestring = value;
            if (somestring.IsNullOrEmpty())
            {
                return string.Empty;
            }
            if (From > End || From > somestring.Length || End > somestring.Length)
            {
                return string.Empty;
            }
            string newstring = somestring.Substring(From, End);
            return newstring;
        }
        public static DateTime ToGetMondayOfWeek(this int year, int week)
        {
            if (week == 0)
                week = 1;
            // 4 January is always in week 1 (see http://en.wikipedia.org/wiki/ISO_week_date)
            DateTime jan4 = new DateTime(year, 1, 4);

            // get a day in the requested week
            DateTime day = jan4.AddDays((week - 1) * 7);

            // get day of week, with [mon = 0 ... sun = 6] instead of [sun = 0 ... sat = 6]
            int dayOfWeek = ((int)day.DayOfWeek + 6) % 7;

            return day.AddDays(-dayOfWeek);
        }
        public static DateTime ToGetSaturdayOfWeek(int year, int week)
        {
            if (week == 0)
                week = 1;
            // 4 January is always in week 1 (see http://en.wikipedia.org/wiki/ISO_week_date)
            DateTime jan4 = new DateTime(year, 1, 4);

            // get a day in the requested week
            DateTime day = jan4.AddDays((week - 1) * 7);

            // get day of week, with [mon = 0 ... sun = 6] instead of [sun = 0 ... sat = 6]
            int dayOfWeek = ((int)day.DayOfWeek + 6) % 7;

            return day.AddDays(-dayOfWeek).AddDays(6);
        }

        public static DateTime ToGetStartDayOfWeek(int year, int dayofweek)
        {
            var fromDate = new DateTime(year, 1, 1);
            var fw = fromDate.Millisecond + 518400000 + (dayofweek - 1);
            return new DateTime();
        }

        public static DateTime ToGetStartDateOfMonth(int year, int month)
        {
            var firstDayOfMonth = new DateTime(year, month, 1);
            //var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1);
            return firstDayOfMonth;
        }
        public static DateTime ToGetEndDateOfMonth(int year, int month)
        {
            var lastDayOfMonth = ToGetStartDateOfMonth(year, month).AddMonths(1).AddDays(-1);
            return lastDayOfMonth;
        }
        public static Tuple<DateTime, DateTime> ToGetStartAndEndDateOfQuarter(int year, int quarter)
        {
            if (quarter == 1)
                return Tuple.Create(ToGetStartDateOfMonth(year, 1), ToGetEndDateOfMonth(year, 2));
            else if (quarter == 2)
                return Tuple.Create(ToGetStartDateOfMonth(year, 3), ToGetEndDateOfMonth(year, 5));
            else if (quarter == 3)
                return Tuple.Create(ToGetStartDateOfMonth(year, 6), ToGetEndDateOfMonth(year, 9));
            else if (quarter == 4)
                return Tuple.Create(ToGetStartDateOfMonth(year, 10), ToGetEndDateOfMonth(year, 12));
            return Tuple.Create(new DateTime(), new DateTime());
        }

        public static Tuple<DateTime, DateTime> ToGetStartAndEndDateOfYear(int year)
        {
            return Tuple.Create(ToGetStartDateOfMonth(year, 1), ToGetStartDateOfMonth(year, 12));
        }
        /// <summary>
        /// Kiểm tra giá trị value có phải là định dạng email không?
        /// Nếu là định dạng email, trả về true; Ngược lại, trả về false.
        /// VD đúng: henry@gmail.com; hello@zing.vn; henry@viettel.vn.
        /// VD sai: demo@demo@.com; a@gmail.com; toan.gmail.com; gmail.com@; dung   @gmail.com
        /// </summary>
        /// <param name="value">Giá trị cần kiểm tra</param>
        /// <returns>Nếu là định dạng email, trả về true; Ngược lại, trả về false.</returns>
        public static bool IsEmailFormat(this object value)
        {
            if (value == null)
                return false;

            //Khai báo một mẫu công thức dùng để kiểm tra
            string pattern = @"^[a-zA-Z0-9_\.]+@[a-zA-Z]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$";

            //Khai báo một item thuộc lớp Regex
            Regex item = new Regex(pattern);

            //Kiểm tra giá trị value có khớp mẫu công thức không?
            if (item.IsMatch(value.ToString()) == true)
                return true;
            else
                return false;
        }
        /// <summary>
        /// Gets the end of quarter.
        /// </summary>
        /// <param name="date">The date.</param>
        /// <returns></returns>
        public static DateTime GetEndOfQuarter(this DateTime date)
        {
            int daysInYear = GetDaysInYear(date);
            double quarter = ((double)date.DayOfYear) / ((double)daysInYear);

            if (quarter < 0.25)
            {
                return new DateTime(new DateTime(date.Year, 4, 1).Ticks - 1);
            }

            else if (quarter < 0.5)
            {
                return new DateTime(new DateTime(date.Year, 7, 1).Ticks - 1);
            }

            else if (quarter < 0.75)
            {
                return new DateTime(new DateTime(date.Year, 10, 1).Ticks - 1);
            }

            else
            {
                return new DateTime(new DateTime(date.Year + 1, 1, 1).Ticks - 1);
            }
        }
        /// <summary>
        /// Gets the days in year.
        /// </summary>
        /// <param name="date">The date.</param>
        /// <returns></returns>
        public static int GetDaysInYear(DateTime date)
        {
            if (date.Equals(DateTime.MinValue))
            {
                return -1;
            }

            DateTime thisYear = new DateTime(date.Year, 1, 1);
            DateTime nextYear = new DateTime(date.Year + 1, 1, 1);

            return (nextYear - thisYear).Days;
        }
        public static DateTime QuarterEnddate(this DateTime curDate, int whichQtr)
        {
            int tQtr = (curDate.Month - 1) / 3 + 1 + whichQtr;
            return new DateTime(curDate.Year, (tQtr * 3) + 1, 1).AddDays(-1);
        }
        public static string ToUrlEncode(this string value)
        {
            string result = value;

            string symbols = @"/\#$ ";
            if (result.Contains("-"))
            {
                result = result.Replace("-", "_");
            }
            foreach (var item in symbols)
            {
                result = result.Replace(item, '-');
            }

            string pattern = "-+";
            Regex regex = new Regex(pattern);
            result = regex.Replace(result, "-");

            return result;
        }
        public static DateTime QuarterStartDate(this DateTime curDate, int whichQtr)
        {
            return QuarterEnddate(curDate, whichQtr).AddDays(1).AddMonths(-3);
        }
        public static int ConvertStringDayOfWeekToNumber(this string dayofweek)
        {
            var value = dayofweek.ToSafetyString().ToUpper();
            int result;
            switch (value)
            {
                case "MON":
                    result = 2;
                    break;
                case "TUE":
                    result = 3;
                    break;
                case "WED":
                    result = 4;
                    break;
                case "THU":
                    result = 5;
                    break;
                case "FRI":
                    result = 6;
                    break;
                case "SAT":
                    result = 7;
                    break;
                case "SUN":
                    result = 8;
                    break;
                case "MONDAY":
                    result = 2;
                    break;
                case "TUESDAY":
                    result = 3;
                    break;
                case "WEDNESDAY":
                    result = 4;
                    break;
                case "THURSDAY":
                    result = 5;
                    break;
                case "FRIDAY":
                    result = 6;
                    break;
                case "SATURDAY":
                    result = 7;
                    break;
                case "SUNDAY":
                    result = 8;
                    break;
                default:
                    result = 0;
                    break;
            }
            return result;
        }
        public static string ConvertNumberDayOfWeekToString(this int? dayofweek)
        {
            var value = dayofweek;
            string result;
            switch (value)
            {
                case 2:
                    result = "Monday";
                    break;
                case 3:
                    result = "Tuesday";
                    break;
                case 4:
                    result = "Wednesday";
                    break;
                case 5:
                    result = "Thursday";
                    break;
                case 6:
                    result = "Friday";
                    break;
                case 7:
                    result = "Saturday";
                    break;
                case 8:
                    result = "Sunday";
                    break;
                default:
                    result = "Not found";
                    break;
            }
            return result;
        }
        public static int GetQuarterOfYear(this DateTime date)
        {
            if (date.Month >= 4 && date.Month <= 6)
                return 1;
            else if (date.Month >= 7 && date.Month <= 9)
                return 2;
            else if (date.Month >= 10 && date.Month <= 12)
                return 3;
            else
                return 4;
        }
        /// <summary>
        /// Trả về tuần trong năm.
        /// </summary>
        /// <param name="date"></param>
        /// <returns>Trả về tuần trong năm.</returns>
        public static int GetIso8601WeekOfYear(this DateTime date)
        {
            // Seriously cheat.  If its Monday, Tuesday or Wednesday, then it'll
            // be the same week# as whatever Thursday, Friday or Saturday are,
            // and we always get those right
            DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(date);
            if (day >= DayOfWeek.Monday && day <= DayOfWeek.Wednesday)
            {
                date = date.AddDays(3);
            }

            // Return the week of our adjusted day
            return CultureInfo
                .InvariantCulture
                .Calendar
                .GetWeekOfYear(date, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }
        public static int GetQuarter(this DateTime dt)
        {
            return (dt.Month - 1) / 3 + 1;
        }
        //public static int GetQuarter(this DateTime date)
        //{
        //    if (date.Month >= 1 && date.Month <= 3)
        //        return 1;
        //    else if (date.Month >= 4 && date.Month <= 6)
        //        return 2;
        //    else if (date.Month >= 7 && date.Month <= 9)
        //        return 3;
        //    else
        //        return 4;
        //}
        /// <summary>
        /// Chuyển value về dạng chuỗi.
        /// Trả về dạng chuỗi của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng chuỗi của value.</returns>
        public static string ToSafetyString(this object value)
        {
            if (value == null)
            {
                return string.Empty;
            }

            return value.ToString();

        }
        public static bool IsDate(this String date)

        {

            try

            {

                DateTime dt = DateTime.Parse(date);

                return true;

            }
            catch

            {

                return false;

            }

        }
        /// <summary>
        /// Chuyển value về dạng chuỗi.
        /// Trả về dạng chuỗi của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng chuỗi của value.</returns>
        public static string ToSafetyString(this object value, string format)
        {
            if (value == null)
                return string.Empty;
            DateTime date;
            // date = DateTime.ParseExact(value.ToString(), format, CultureInfo.InvariantCulture, DateTimeStyles.None, out date);

            DateTime.TryParseExact(value.ToString(), format, CultureInfo.InvariantCulture,
                            DateTimeStyles.None, out date);
            return date.ToString();

        }
        /// <summary>
        /// Chuyển value về dạng số nguyên(byte).
        /// Trả về dạng số nguyên(byte) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số nguyên (byte) của value.</returns>
        public static byte ToByte(this object value)
        {
            if (value == null)
                return 0;
            //Khai báo giá trị chứa kết quả mặ định, mặc định là 0
            byte result = 0;

            //Thử ép value thành kiểu byte
            byte.TryParse(value.ToString(), out result);

            //Trả về kết quả đã ép kiểu
            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số nguyên(SByte).
        /// Trả về dạng số nguyên(SByte) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số nguyên (SByte) của value.</returns>
        public static SByte ToSByte(this object value)
        {
            if (value == null || value.ToString() == string.Empty)
                return 0;
            sbyte result = 0;
            sbyte.TryParse(value.ToString(), out result);
            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số nguyên(Short).
        /// Trả về dạng số nguyên(Short) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số nguyên (Short) của value.</returns>
        public static short ToShort(this object value)
        {
            if (value == null || value.ToString() == string.Empty)
                return 0;
            short result = 0;
            short.TryParse(value.ToString(), out result);
            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số nguyên(ToUInt).
        /// Trả về dạng số nguyên(ToUInt) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số nguyên (ToUInt) của value.</returns>
        public static uint ToUInt(this object value)
        {
            if (value == null || value.ToString() == string.Empty)
                return 0;

            ushort result = 0;

            ushort.TryParse(value.ToString(), out result);

            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số nguyên(Ushort).
        /// Trả về dạng số nguyên(Ushort) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số nguyên (Ushort) của value.</returns>
        public static ushort ToUShort(this object value)
        {
            if (value == null || value.ToString() == string.Empty)
                return 0;

            ushort result = 0;

            ushort.TryParse(value.ToString(), out result);

            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số nguyên(int).
        /// Trả về dạng số nguyên(int) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số nguyên (int) của value.</returns>
        public static int ToInt(this object value)
        {
            if (value == null || value.ToString() == string.Empty)
                return 0;
            int result = 0;
            int.TryParse(value.ToString(), out result);
            return result;
        }
        /// <summary>
        /// Chuyển value về dạng số thực(Float).
        /// Trả về dạng số thực(Float) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số thực (Float) của value.</returns>
        public static float ToFloat(this object value)
        {
            if (value == null || value.ToString() == string.Empty)
                return 0;
            float result = 0;
            float.TryParse(value.ToString().Trim(), out result);
            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số thực(Double).
        /// Trả về dạng số thực (Double) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số thực (double) của value.</returns>
        public static double ToDouble(this object value)
        {
            if (value == null || value.ToString() == string.Empty)

                return 0;

            double result = 0;

            double.TryParse(value.ToString().Trim(), out result);

            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số thực(Long).
        /// Trả về dạng số thực (Long) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số thực (Long) của value.</returns>
        public static long ToLong(this object value)
        {
            if (value == null || value.ToString() == string.Empty)

                return 0;

            long result = 0;

            long.TryParse(value.ToString(), out result);

            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số thực(Long).
        /// Trả về dạng số thực (Long) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số thực (Long) của value.</returns>
        public static ulong ToULong(this object value)
        {
            if (value == null || value.ToString() == string.Empty)

                return 0;

            ulong result = 0;

            ulong.TryParse(value.ToString(), out result);

            return result;
        }

        /// <summary>
        /// Chuyển value về dạng số thực(decimal).
        /// Trả về dạng số thực (decimal) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng số thực (decimal) của value.</returns>
        public static decimal ToDecimal(this object value)
        {
            if (value == null || value.ToString() == string.Empty)
                return 0;

            decimal result = 0;

            decimal.TryParse(value.ToString(), out result);

            return result;
        }
        public static string ToTitleCase(this string value)
        {
            string title = value.ToSafetyString();

            TextInfo textInfo = new CultureInfo("en-US", false).TextInfo;

            title = textInfo.ToTitleCase(title);
            return title;
        }
        /// <summary>
        /// Chuyển value về dạng kí tự (char).
        /// Trả về dạng kí tự (char) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng kí tự (char) của value.</returns>
        public static char ToChar(this object value)
        {
            //Tối ưu hơn phân cách khi dùng hàm ||
            if (value == null || value.ToString() == string.Empty || (value.ToString().Length > 1))
            {
                return ' ';
            }
            char result = ' ';
            char.TryParse(value.ToString(), out result);
            return result;
        }

        /// <summary>
        /// Chuyển value về dạng luận lý (bool).
        /// Trả về dạng luận lý (bool) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng luận lý (bool) của value.</returns>
        public static bool ToBool(this object value)
        {
            if (value == null)
            {
                return false;
            }

            if (value.ToInt() == 1)
            {
                return true;
            }

            bool result = false;
            bool.TryParse(value.ToString(), out result);
            return result;
        }

        /// <summary>
        /// Chuyển value về dạng ngày giờ (DateTime).
        /// Trả về dạng ngày giờ (DateTime) của value
        /// </summary>
        /// <param name="value">Giá trị cần chuyển đổi. </param>
        /// <returns>Trả về dạng ngày giờ (DateTime) của value.</returns>
        public static DateTime ToDateTime(this object value)
        {
            if (value == null || value.ToString() == string.Empty || value.ToString() == " ")
                return DateTime.MinValue;

            DateTime result = DateTime.MinValue;

            string[] formats = {"d/M/yyyy", "dd/MM/yyyy", "d/M/yyyy HH:mm:ss", "d/M/yyyy HH:mm", "dd/MM/yyyy HH:mm", "HH:mm:ss", "HH:mm",
"d-M-yyyy", "dd-MM-yyyy", "MM-dd-yyyy","MM-dd-yy", "yyyy-MM-dd", "d-M-yyyy HH:mm:ss", "d-M-yyyy HH:mm", "dd-MM-yyyy HH:mm", "HH:mm:ss", "HH:mm"};//HH phủ cả từ 1-24h còn hh chỉ phủ từ 1-12h

            string[] dateStrings = {"5/1/2009 6:32 PM", "05/01/2009 6:32:05 PM",
                              "5/1/2009 6:32:00", "05/01/2009 06:32",
                              "05/01/2009 06:32:00 PM", "05/01/2009 06:32:00"};
            DateTime.TryParseExact(value.ToString(), formats,
                                    //new CultureInfo("en-US"),//Lấy văn hóa của Mỹ
                                    CultureInfo.CurrentCulture,//Lấy văn hóa của máy tính đang dùng
                                    DateTimeStyles.None,
                                    out result);
            return result;

        }


        public static bool IsNullOrEmpty(this object value)
        {
            if (value == null)
            {
                return true;
            }
            return string.IsNullOrEmpty(value.ToString());
        }
        public static DateTime ToParseIso8601(this string ISO8601String)
        {
            if (ISO8601String == "#N/A")
                return new DateTime();

            if (ISO8601String.IsNullOrEmpty())
                return new DateTime();
            var result = DateTime.Parse(ISO8601String, null, DateTimeStyles.AssumeLocal);
            return result;
        }
        public static bool IsNewDateTime(this DateTime date)
        {
            var result = date;
            if (result.Date == new DateTime().Date)
                return true;
            else
                return false;

        }
        public static string IsNotAvailable(this string value)
        {
            string result = value;
            if (result.IsNullOrEmpty())
                return "";
            else
                return result;

        }
        public static string FindDatesOfMonth(this object value)
        {
            var _datesOfMonth = new string[]{"","First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Nighth",
            "Tenth","Eleventh","Twelfth","Thirteenth","Fourteenth",
                "Fifteenth","Sixteenth","Seventeenth","Eighteenth","NineTeenth",
                "Twentieth","Twenty-first","Twenty-second","Twenty-third","Twenty-fourth","Twenty-fifth","Twenty-sixth","Twenty-seventh","Twenty-eight","Twenty-nineth","Thirtieth","Thirty-first"};
            return _datesOfMonth[value.ToInt()];
        }
        public static string FindShortDatesOfMonth(this object value)
        {
            var _datesOfMonth = new string[]{"","First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Nighth",
            "Tenth","Eleventh","Twelfth","Thirteenth","Fourteenth",
                "Fifteenth","Sixteenth","Seventeenth","Eighteenth","NineTeenth",
                "Twentieth","Twenty-first","Twenty-second","Twenty-third","Twenty-fourth","Twenty-fifth","Twenty-sixth","Twenty-seventh","Twenty-eight","Twenty-nineth","Thirtieth","Thirty-first"};

            if (value.ToInt() > 0)
            {
                string temp = _datesOfMonth[value.ToInt()].ToRight(2);
                return value + temp;
            }
            return _datesOfMonth[value.ToInt()];
        }
        /// <summary>
        /// Example
        /// create date time 2008-03-09 16:05:07.123
        /// DateTime dt = new DateTime(2008, 3, 9, 16, 5, 7, 123);
        /// String.Format("{0:y yy yyy yyyy}", dt);   "8 08 008 2008"   year
        /// String.Format("{0:M MM MMM MMMM}", dt);   "3 03 Mar March"  month
        /// String.Format("{0:d dd ddd dddd}", dt);   "9 09 Sun Sunday" day
        /// String.Format("{0:h hh H HH}",     dt);   "4 04 16 16"      hour 12/24
        /// String.Format("{0:m mm}",          dt);   "5 05"            minute
        /// String.Format("{0:s ss}",          dt);   "7 07"            second
        /// String.Format("{0:f ff fff ffff}", dt);   "1 12 123 1230"   sec.fraction
        /// String.Format("{0:F FF FFF FFFF}", dt);   "1 12 123 123"    without zeroes
        /// String.Format("{0:t tt}",          dt);   "P PM"            A.M. or P.M.
        /// String.Format("{0:z zz zzz}",      dt);   "-6 -06 -06:00"   time zone
        /// month/day numbers without/with leading zeroes
        /// String.Format("{0:M/d/yyyy}", dt);             "3/9/2008"
        /// String.Format("{0:MM/dd/yyyy}", dt);           "03/09/2008"
        ///
        /// day/month names
        /// String.Format("{0:ddd, MMM d, yyyy}", dt);     "Sun, Mar 9, 2008"
        /// String.Format("{0:dddd, MMMM d, yyyy}", dt);   "Sunday, March 9, 2008"
        ///
        /// two/four digit year
        /// String.Format("{0:MM/dd/yy}", dt);             "03/09/08"
        /// String.Format("{0:MM/dd/yyyy}", dt);           "03/09/2008"
        /// String.Format("{0:t}", dt); "4:05 PM"                         ShortTime
        /// String.Format("{0:d}", dt); "3/9/2008"                        ShortDate
        /// String.Format("{0:T}", dt); "4:05:07 PM"                      LongTime
        /// String.Format("{0:D}", dt); "Sunday, March 09, 2008"          LongDate
        /// String.Format("{0:f}", dt); "Sunday, March 09, 2008 4:05 PM"  LongDate+ShortTime
        /// String.Format("{0:F}", dt); "Sunday, March 09, 2008 4:05:07 PM" FullDateTime
        /// String.Format("{0:g}", dt); "3/9/2008 4:05 PM"                ShortDate+ShortTime
        /// String.Format("{0:G}", dt); "3/9/2008 4:05:07 PM"             ShortDate+LongTime
        /// String.Format("{0:m}", dt); "March 09"                        MonthDay
        /// String.Format("{0:y}", dt); "March, 2008"                     YearMonth
        /// String.Format("{0:r}", dt); "Sun, 09 Mar 2008 16:05:07 GMT"   RFC1123
        /// String.Format("{0:s}", dt); "2008-03-09T16:05:07"             SortableDateTime
        /// String.Format("{0:u}", dt); "2008-03-09 16:05:07Z"            UniversalSortableDateTime
        /// </summary>
        /// <param name="date"></param>
        /// <param name="format"></param>
        /// <returns>
        /// </returns>
        public static string ToStringFormat(this DateTime date, string format = "{0:MM/dd/yyyy}")
        {
            if (date.IsNewDateTime())
                return "";
            else
                return String.Format(format, date);
        }
       
        private static bool CheckDate(this string date)
        {
            try
            {
                DateTime dt = DateTime.Parse(date);
                return true;
            }
            catch
            {
                return false;
            }
        }
        public static string ToStringFormatISO(this string dateISO, string format = "{0:MM/dd/yyyy}")
        {
            var date = dateISO.ToParseIso8601();
            if (date.Date == new DateTime().Date)
                return "";
            else
                return String.Format(format, date);
        }
        public static string ToJoin(this object[] value, string charactor = ",")
        {
            return string.Join(charactor, value);
        }
        public static string SHA256Hash(this string value)
        {
            StringBuilder Sb = new StringBuilder();

            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(value.ToSafetyString()));

                foreach (Byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToSafetyString();
        }

        public static string ReplaceSpecial(this string value)
        {
            if (value != string.Empty)
            {
                value = Regex.Replace(value, @"(\s+|@|&|'|\(|\)|<|>|#|+|-)", "");
            }
            return value;
        }

    }
}

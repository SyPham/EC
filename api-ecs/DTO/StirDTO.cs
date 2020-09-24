using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class StirDTO
    {
        public StirDTO()
        {
            this.CreatedTime = DateTime.Now;
        }
        public int ID { get; set; }
        public string GlueName { get; set; }
        public int SettingID { get; set; }
        public int MixingInfoID { get; set; }
        public double TotalMinutes { get; set; }
        public int RPM { get; set; }
        public bool Status { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}

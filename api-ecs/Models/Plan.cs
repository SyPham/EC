using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class Plan
    {
        public Plan()
        {
            CreatedDate = DateTime.Now;
        }

        public int ID { get; set; }
        public int BuildingID { get; set; }
        public int BPFCEstablishID { get; set; }
        public int Quantity { get; set; }
        public string BPFCName { get; set; }
        public int HourlyOutput { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime DueDate { get; set; }
        public int WorkingHour { get; set; }
        public Building Building { get; set; }
        public BPFCEstablish BPFCEstablish { get; set; }
        public ICollection<PlanDetail> PlanDetails { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class PlanForCloneDto
    {
        public int ID { get; set; }
        public int HourlyOutput { get; set; }
        public int WorkingHour { get; set; }
        public int BPFCEstablishID { get; set; }
        public int BuildingID { get; set; }
        public DateTime DueDate { get; set; }
    }
}

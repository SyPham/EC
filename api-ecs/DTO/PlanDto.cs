using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class PlanDto
    {
        public int ID { get; set; }
        public int BuildingID { get; set; }
        public string BuildingName { get; set; }
        public string ModelName { get; set; }
        public string ModelNoName { get; set; }
        public string ArticleName { get; set; }
        public string ProcessName { get; set; }
        public int BPFCEstablishID { get; set; }
        public int HourlyOutput { get; set; }
        public int WorkingHour { get; set; }
        public int ModelNameID { get; set; }
        public int ModelNoID { get; set; }
        public int ArticleNoID { get; set; }
        public int ArtProcessID { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

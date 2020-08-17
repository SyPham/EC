using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class ModelNameDtoForBPFCSchedule
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ArtNo { get; set; }
        public int ArtNoID { get; set; }
        public string ModelNo { get; set; }
        public string Supplier { get; set; }
        public int CreatedBy { get; set; }
        public bool CreatedStatus { get; set; }
        public int ApprovedBy { get; set; }
        public bool ApprovedStatus { get; set; }
        public string Season { get; set; }
        public DateTime? BuildingDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ArticleNo { get; set; } 
        public string Process { get; set; }
    }
}

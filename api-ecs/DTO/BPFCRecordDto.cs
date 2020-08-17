using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class BPFCRecordDto
    {
        public int ID { get; set; }
        public int ModelNameID { get; set; }
        public int ModelNoID { get; set; }
        public int ArticleNoID { get; set; }
        public int ArtProcessID { get; set; }
        public string ModelName { get; set; }
        public string ModelNo { get; set; }
        public string ArticleNo { get; set; }
        public string ArtProcess { get; set; }
        public string Supplier { get; set; }
        public bool ApprovalStatus { get; set; }
        public bool FinishedStatus { get; set; }
        public int ApprovalBy { get; set; }
        public string Season { get; set; }
        public DateTime? BuildingDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? UpdateTime { get; set; }
    }
}

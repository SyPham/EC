using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class BPFCEstablishDtoForImportExcel
    {
        public string ModelName { get; set; }
        public string ModelNo { get; set; }
        public string ArticleNo { get; set; }
        public string Process { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

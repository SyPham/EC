using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class ModelNameForImportExcelDto
    {
        public string Process { get; set; }
        public string ModelName { get; set; }
        public string ModelNo { get; set; }
        public string ArticleNo { get; set; }
        public int CreatedBy { get; set; }
        public List<string> ArticleNos { get; set; }
        public List<string> Processes { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

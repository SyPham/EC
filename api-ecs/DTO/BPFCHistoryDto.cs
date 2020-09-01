using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class BPFCHistoryDto
    {
        public int ID { get; set; }
        public int BPFCEstablishID { get; set; }
        public int GlueID { get; set; }
        public string Action { get; set; }
        public string Before { get; set; }
        public string BeforeAllow { get; set; }
        public string After { get; set; }
        public int UserID { get; set; }
        public string AfterAllow { get; set; }
        public DateTime CreatedTime { get; set; }

    }
}

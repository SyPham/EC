using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class BPFCHistory
    {
        public BPFCHistory()
        {
            this.CreatedTime = DateTime.Now;

        }
        public int ID { get; set; }
        public int BPFCEstablishID { get; set; }
        public string Action { get; set; }
        public DateTime CreatedTime { get; set; }
        public string Before { get; set; }
        public string After { get; set; }
        public int GlueID { get; set; }
        public int UserID { get; set; }
        public string Remark { get; set; }
    }
}

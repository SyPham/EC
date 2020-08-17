using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class Comment
    {
        public int ID { get; set; }
        public int CreatedBy { get; set; }
        public int BPFCEstablishID { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }

    }
}

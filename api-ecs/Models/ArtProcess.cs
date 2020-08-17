using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class ArtProcess
    {
        public int ID { get; set; }
        public int ArticleNoID { get; set; }
        public int ProcessID { get; set; }
        public Process Process { get; set; }
        public ICollection<BPFCEstablish> BPFCEstablishes { get; set; }
        public ArticleNo ArticleNo { get; set; }
    }
}

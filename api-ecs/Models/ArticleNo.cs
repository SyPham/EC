using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class ArticleNo
    {
        public ArticleNo()
        {
            CreatedDate = DateTime.Now;
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public int ModelNoID { get; set; }
        public DateTime CreatedDate { get; set; }
        public ModelNo ModelNos { get; set; }
        public ICollection<BPFCEstablish> BPFCEstablishes { get; set; }
        public ICollection<ArtProcess> ArtProcesses { get; set; }
    }
}

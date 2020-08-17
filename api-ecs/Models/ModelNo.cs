using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class ModelNo
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int ModelNameID { get; set; }
        public ModelName ModelName { get; set; }
        public ICollection<ArticleNo> ArticleNos { get; set; }
        public ICollection<BPFCEstablish> BPFCEstablishes { get; set; }
    }
}

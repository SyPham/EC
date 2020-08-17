using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class CloneDto
    {
        public int ModelNameID { get; set; }
        public int ModelNOID { get; set; }
        public int ArticleNOID { get; set; }
        public int ArtProcessID { get; set; }
        public int CloneBy { get; set; }
        public int BPFCID { get; set; }

    }
}

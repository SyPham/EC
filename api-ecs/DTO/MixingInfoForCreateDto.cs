using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class MixingInfoForCreateDto
    {
        public int ID { get; set; }
        public int GlueID { get; set; }
        public string ChemicalA { get; set; }
        public string ChemicalB { get; set; }
        public string ChemicalC { get; set; }
        public string ChemicalD { get; set; }
        public string ChemicalE { get; set; }
        public string BatchA { get; set; }
        public string BatchB { get; set; }
        public string BatchC { get; set; }
        public string BatchD { get; set; }
        public string BatchE { get; set; }
        public string Code { get; set; }
        public int MixBy { get; set; }
        public DateTime ExpiredTime { get; set; }
        public DateTime CreatedTime { get; set; }
    }
 
}

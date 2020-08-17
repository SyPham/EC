using EC_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.DTO
{
    public class GlueCreateDto1
    {
        public GlueCreateDto1()
        {
            Chemical = new GlueDto1 { ID = this.GlueID, Name = Name };
        }

        public int ID { get; set; }
        public string Code { get; set; }
        public int GlueID { get; set; }
        public string Name { get; set; }
        public string CreatedDate { get; set; }
        public string GlueName { get; set; }
        public string ModelNo { get; set; }
        public int BPFCEstablishID { get; set; }
        public string PathName { get; set; }
        public int PartNameID { get; set; }
        public string MaterialName { get; set; }
        public string Consumption { get; set; }
        public int ExpiredTime { get; set; }
        public int CreatedBy { get; set; }
        public int MaterialNameID { get; set; }
        public int KindID { get; set; }
        public int PartID { get; set; }
        public int MaterialID { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public GlueDto1 Chemical { get; set; }
    }
    public class GlueDto1
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}

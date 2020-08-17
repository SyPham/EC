using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class MapModel
    {
        public int ID { get; set; }
        public int ModelNameID { get; set; }
        public int ModelNoID { get; set; }
        public DateTime CreatedDate { get; set; }
        public MapModel()
        {
            this.CreatedDate = DateTime.Now;
        }
    }
}

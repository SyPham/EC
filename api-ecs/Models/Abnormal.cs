using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class Abnormal
    {
        public Abnormal()
        {
            this.CreatedDate = DateTime.Now;
        }
        public int ID { get; set; }
        public string Ingredient { get; set; }
        public string Building { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

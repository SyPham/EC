using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class Building
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }
        public int? ParentID { get; set; }
        public ICollection<Plan> Plans { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class MaterialName
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public ICollection<Glue> Glues { get; set; }

    }
}

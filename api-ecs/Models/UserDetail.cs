using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EC_API.Models
{
    public class UserDetail
    {
        public UserDetail()
        {
            this.CreatedDate = DateTime.Now;
        }
        public int ID { get; set; }
        public int UserID { get; set; }
        public int LineID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}

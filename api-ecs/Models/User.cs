using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EC_API.Models
{
    public class User
    {
        public User()
        {
            this.CreatedDate = DateTime.Now.ToString("MMMM dd, yyyy HH:mm:ss");
        }

        [Key]
        public int ID { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public string CreatedDate { get; set; }
    }
}
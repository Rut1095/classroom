using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public enum eUserTypes { STUDENT = 0, TEACHER = 1 }

    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int? ClassLevel { get; set; }
        public string Email { get; set; }
        public eUserTypes Type { get; set; }
        public int ClassId { get; set; }

        public User()
        {

        }

        public User(DAL.Users user)
        {
            this.Id = user.Id;
            this.UserName = user.name;
            this.Email = user.email;
            this.ClassLevel = user.classLevel; 
            this.Password = user.password;
            this.Type = (eUserTypes)user.type;
            this.ClassId = (int)user.classId;
        }

        public DAL.Users convertToDAL()
        {
            return new DAL.Users() {
                Id = this.Id,
                name = UserName,
                password = Password,
                classLevel=ClassLevel,
                email=Email,
                type= (short?)(int)Type,
                classId = ClassId
            };
        }
        // conver tdo to dal
        // add to dal
        // check if user exe
    }
}

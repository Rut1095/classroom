using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class UsersLogic
    {
        static DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities();

        public static DTO.User Login(DTO.User user)
        {
            var usersList = db.Users.Where(p => p.name == user.UserName && p.password == user.Password);
            if (usersList.Count() == 1)
                return new DTO.User(usersList.First());
            else return null;
        }

        public static bool Register(DTO.User user)
        {
            try
            {
                // List<lesson> lessonsDAL = new List<lesson>();
                //List<UsersLesson> userLessons= db.UsersLessons.Where(ul => ul.idUser == 2).ToList();
                // foreach (var item in userLessons)
                // {
                //   lessonsDAL.Add(db.lessons.FirstOrDefault(lesson => lesson.Id == item.idLesson));
                // }
                // return lessonsDAL;
                db.Users.Add(user.convertToDAL());

                db.SaveChanges();
            }
            catch(Exception ex)
            {
                return false;
            }
            return true;
        }

        public static List<User> GetUsers()
        {
            List<User> users = new List<User>();
            try
            {
                foreach (var user in db.Users)
                {
                    users.Add(new User(user));
                }
                return users;
            }
            catch
            {
                return new List<User>();
            }
        }
    }
}

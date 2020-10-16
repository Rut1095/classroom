using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActiveUser = DTO.ActiveUser;

namespace BL
{
    public static class UsersLogic
    {
        //static DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities();

        public static DTO.User Login(DTO.User user)
        {
            using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
            {
                var usersList = db.Users.Where(p => p.name == user.UserName && p.password == user.Password);

                if (usersList.Count() == 1)
                    return new DTO.User(usersList.First());
                else return null;
            }
        }

        public static bool Register(DTO.User user)
        {
            try
            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
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

            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }

        public static List<ActiveUser> GetActivesUsers(DTO.ActiveUser user)
        {
            using (DigitlClassRoomUpdateEntities db1 = new DigitlClassRoomUpdateEntities())
            {
                try
                {
                    //var userA = db1.ActiveUser.FirstOrDefault(p => p.sessionId == user.sessionId && p.UserId == user.UserId);
                    //userA.ConnectTime = user.ConnectTime;
                    //db1.SaveChanges();
                    return GetUsersOfLesson(user.ClassLessonId);
                }
                catch
                {
                    return null;
                }
            }
        }

        public static ActiveUser SetActiveUser(int classId, int lessonId, int userId, String sessionId)
        {
            using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
            {
                try
                {
                    var classlesson = db.ClassLessons.FirstOrDefault(l => l.classId == classId && l.lessonId == lessonId && l.lesseonIsActive == true);
                    if (classlesson != null)
                    {
                        var userActiveDB = db.ActiveUser.FirstOrDefault(a => a.UserId == userId);
                        if (userActiveDB != null)
                        {
                            //if the user found in -another- class and lesson then do nothing
                            if (userActiveDB.ClassLessonId != classlesson.Id)
                            {
                                userActiveDB.ClassLessonId = classlesson.Id;
                                userActiveDB.ConnectTime = DateTime.Now.TimeOfDay;
                            }
                            userActiveDB.sessionId = sessionId;
                            db.SaveChanges();
                            return ActiveUser.ConvertToDTO(userActiveDB);


                        }

                        //when the user dont found in classlesson table then add ActiveUser
                        ActiveUser u = new ActiveUser();
                        u.ClassLessonId = classlesson.Id;
                        u.UserId = userId;
                        u.ConnectTime = DateTime.Now.TimeOfDay;
                        //u.sessionId=
                        DAL.ActiveUser activeUser = DTO.ActiveUser.ConvertToDAL(u);
                        db.ActiveUser.Add(activeUser);
                        db.SaveChanges();
                        //user.sessionId=
                        return u;
                    }
                    else
                    {
                        return null;
                    }
                }
                catch
                {
                    return null;
                }
            }
        }

        ////public static bool SetActiveUser(DTO.User user)
        ////{
        ////    try
        ////    {

        ////        db.ActiveUser.Add(user.convertToDAL());

        ////        db.SaveChanges();
        ////    }
        ////    catch (Exception eex)
        ////    {
        ////        return false;
        ////    }
        ////    return true;
        ////}

        public static List<ActiveUser> GetUsersOfLesson(int? classLessonId)
        {
            using (DigitlClassRoomUpdateEntities db1 = new DigitlClassRoomUpdateEntities())
            {
                List<User> users = new List<User>();
                try
                {
                    var activeUsers = db1.ActiveUser.Where(p => p.ClassLessonId == classLessonId).ToList();
                    List<DTO.ActiveUser> actives = new List<DTO.ActiveUser>();

                    foreach (var item in activeUsers)
                    {
                        DTO.ActiveUser a = ActiveUser.ConvertToDTO(item);
                        a.NameUser = db1.Users.FirstOrDefault(p => p.Id == item.UserId).name;
                        actives.Add(a);
                    }
                    return actives;
                }
                catch
                {
                    return null;
                }
            }
        }
        public static void StartNewLesson(String Id)
        {

            using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
            {
                int id = int.Parse(Id);
                var ClassLessonsArray = db.ClassLessons.FirstOrDefault(cl => cl.Id == id);
                ClassLessonsArray.lesseonIsActive = true;
                db.SaveChanges();

            }

        }
    }
}

using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class LessonsLogic
    {

        //static DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities();
        public static bool AddNewLesson(Lesson lesson)
        {
            try
            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {

                    db.lessons.Add(lesson.convertToDAL());
                    db.SaveChanges();
                }
            }
            catch
            {
                return false;
            }
            return true;
        }

        public static List<Lesson> GetLessons()
        {
            List<Lesson> lessons = new List<Lesson>();
            try
            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {

                    foreach (var les in db.lessons)
                    {
                        lessons.Add(new Lesson(les));
                    }
                }
                return lessons;
            }
            catch
            {
                return new List<Lesson>();
            }
        }

        public static List<Lesson> GetLessonsByClassId(int classId)
        {
            List<Lesson> lessons = new List<Lesson>();
            try
            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {
                    var lessonsinClasses =
                 db.ClassLessons.Where(p => p.classId == classId );

                    // p.name == user.UserName && p.password == user.Password);

                    // var lessonsinClasses = (from ls in db.lessons
                    //                         join ls_cl in db.lessons);

                    foreach (var classLesson in lessonsinClasses)
                    {
                        int lessonId = classLesson.lessonId;

                        foreach (var les in db.lessons)
                        {
                            if (lessonId == les.Id)
                            {
                                lessons.Add(new Lesson(les));
                                break;
                            }
                        }
                    }

                    return lessons;
                }
             
            }
            catch
            {
                return new List<Lesson>();
            }
        }
        public static DTO.ClassLessons AddNewLessonTeacherClass(DTO.ClassLessons lessons)
        {
            using (DAL.DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
            {
                DAL.ClassLessons l = DTO.ClassLessons.convertToDAL(lessons);

                //foreach (var less in db.ClassLessons)
                //{
                //    if (l.lessonId == lessons.Id && l.classId == lessons.classId)
                //    {
                //        return lessons;
                //    }

                //}
                db.ClassLessons.Add(l);
                db.SaveChanges();
                lessons.Id = l.Id;
                return lessons;
            }
        }
        public static DTO.Lesson AddNewLesson(string lesson )
        {
            try
            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {
                    var newLess = new DAL.lessons();
                    newLess.name = lesson;
                    db.lessons.Add(newLess);
                    db.SaveChanges();
                    DTO.Lesson less = new DTO.Lesson(newLess);
                    return less;
                }
            }
            catch
            {
                return null;
            }
           
        }
       
        //public static List<DTO.Lesson> GetLessonsByTeacherId(int Id)
        //{
        //    List<lessons> lessons = new List<lessons>();
        //    {
        //        try
        //        {

        //            using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
        //            {



        //                var lessonsinClasses = db.ClassLessons.Where(p => p.teacherId == Id);
        //                foreach (var classLesson in lessonsinClasses)
        //                {
        //                    int lessonId = classLesson.lessonId;

        //                    foreach (var les in db.lessons)
        //                    {
        //                        if (lessonId == les.Id)
        //                        {
        //                            lessons.Add(new Lesson(les));
        //                            break;
        //                        }
        //                    }
        //                }
        //                return lessons;
        //            }

        //        }
        //        catch
        //        {
        //            return new List<Lesson>();
        //        }
        //    }
        //}
    }
}

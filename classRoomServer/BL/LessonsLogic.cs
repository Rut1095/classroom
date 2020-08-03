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

        static DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities();
        public static bool AddNewLesson(Lesson lesson)
        {
            try
            {
                db.lessons.Add(lesson.convertToDAL());
                db.SaveChanges();
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
                foreach (var les in db.lessons)
                {
                    lessons.Add(new Lesson(les));
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
                var lessonsinClasses = 
                    db.ClassLessons.Where(p => p.classId ==classId);
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
            catch
            {
                return new List<Lesson>();
            }
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL
{
    public static class ClassLogic
    {
        //static DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities();

        public static List<DTO.Classes> Getclasses()
        {
            List<DTO.Classes> classes = new List<DTO.Classes>();
            try

            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {
                    foreach (var cl in db.Classes)
                    {
                        classes.Add(new DTO.Classes(cl));
                    }
                    return classes;
                }

            }
            catch
            {
                return new List<DTO.Classes>();
            }
        }

        public static List<DTO.Classes> GetclassesByTeacherId(int Id)
        {
            List<DTO.Classes> classes = new List<DTO.Classes>();
            try
            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {
                    //linq
                    var clesson = (
                        from cls in db.Classes
                        join clsLes in db.ClassLessons on cls.Id equals clsLes.classId
                        where clsLes.teacherId == Id
                        orderby cls.name
                        select cls
                        ).Distinct();
                    foreach (var clss in clesson)
                    {
                        var cl = DTO.Classes.convertToDTO(clss);

                        var lessondOfClass = (
                            from les in db.lessons
                            join clsLes in db.ClassLessons on les.Id equals clsLes.lessonId
                            where clsLes.teacherId == Id && cl.Id == clsLes.classId
                            orderby les.name
                            select les
                            ).Distinct() ;

                        foreach (var Lesson in lessondOfClass)
                        {
                            cl.Lessons.Add(new DTO.Lesson(Lesson));
                        }

                        classes.Add(cl);
                    }
                    return classes;
                }
            }
            catch
            {
                return new List<DTO.Classes>();
            }
        }
        public static DTO.ClassLessons getClassLesson(int ClassLessonId)
        {
            using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
            {
                var l = db.ClassLessons.FirstOrDefault(predicate => predicate.Id == ClassLessonId );
                return DTO.ClassLessons.convertToDTO(l);
            }
        }


        public static DTO.ClassLessons getClassLesson(int ClassId, int LessonId)
        {
            using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
            {
                var l = db.ClassLessons.FirstOrDefault(predicate => predicate.classId == ClassId && predicate.lessonId == LessonId);
                return DTO.ClassLessons.convertToDTO(l);
            }
        }
    }

}

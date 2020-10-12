using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class ClassLessons
    {
        public int Id { get; set; }
        public int classId { get; set; }
        public int lessonId { get; set; }
        public bool lesseonIsActive { get; set; }
        
       public int teacherId { get; set; }
        public static DAL.ClassLessons convertToDAL (ClassLessons l)
        {
            return new DAL.ClassLessons()
            {
                Id = l.Id,
                classId = l.classId,
                lessonId = l.lessonId,
                lesseonIsActive = l.lesseonIsActive,
                teacherId = l.teacherId
            };
        }
        public static DTO.ClassLessons convertToDTO(DAL.ClassLessons l)
        {
            return new DTO.ClassLessons()
            {
                Id = l.Id,
                classId = l.classId,
                lessonId = l.lessonId,
                lesseonIsActive = l.lesseonIsActive
            };
        }
    }
}


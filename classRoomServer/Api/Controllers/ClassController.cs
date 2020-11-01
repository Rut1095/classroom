using DTO;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Collections.Generic;

namespace Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("classes")]
    public class ClassController : ApiController
    {
        //[Route("new-lesson")]
        //[HttpPost]
        //public bool NewLesson(Lesson lesson)
        //{
        //    return BL.LessonsLogic.AddNewLesson(lesson);
        //}
        /*
        [Route("{classId}")]
        [HttpGet]
        public List<Lesson> GetLessons(int classId)
        {
            return BL.LessonsLogic.GetLessons();
        }
        */

        [Route("all")]
        [HttpGet]
        public List<DTO.Classes> GetClassesAll()
        {
            return BL.ClassLogic.Getclasses();
        }

        [Route("{teacherId}")]
        [HttpGet]
        public List<DTO.Classes> getclassesByTeacherId(int teacherId)
        {
            return BL.ClassLogic.GetclassesByTeacherId(teacherId);
        }

        [Route("getClassLesson/{ClassLessonId}")]
        [HttpGet]
        public ClassLessons getClassLesson(int classLessonId)
        {
            return BL.ClassLogic.getClassLesson(classLessonId);
        }
        [Route("getClassLesson/{ClassId}/{LessonId}")]
        [HttpGet]
        public ClassLessons getClassLessonByIds(int ClassId, int LessonId)
        {
            return BL.ClassLogic.getClassLesson(ClassId,LessonId);
        }
    }
}

using DTO;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Collections.Generic;

namespace Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("lessons")]
    public class LessonController : ApiController
    {
        [Route("new-lesson")]
        [HttpPost]
        public bool NewLesson(Lesson lesson)
        {
            return BL.LessonsLogic.AddNewLesson(lesson);
        }
        
        [Route("{classId}")]
        [HttpGet]
        public List<Lesson> GetLessons(int classId)
        {
            return BL.LessonsLogic.GetLessonsByClassId(classId);
        }
        
        /*
        [Route("all")]
        [HttpGet]
        public List<Lesson> GetLessonsAll()
        {
            return BL.LessonsLogic.GetLessons();
        }*/
    }
}

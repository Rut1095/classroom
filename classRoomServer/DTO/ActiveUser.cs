using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class ActiveUser
    {

        public int UserId { get; set; }
        public int? ClassLessonId { get; set; }
        public TimeSpan? ConnectTime { get; set; }
        public String sessionId { get; set; }
        public string NameUser { get; set; }
        public static ActiveUser ConvertToDTO(DAL.ActiveUser a)
        {
            return new ActiveUser()
            {
                UserId = a.UserId,
                ClassLessonId = a.ClassLessonId,
                ConnectTime = a.ConnectTime,
                sessionId = a.sessionId
            };
        }
        public static DAL.ActiveUser ConvertToDAL(ActiveUser a)
        {
            return new DAL.ActiveUser()
            {
                UserId = a.UserId,
                ClassLessonId = a.ClassLessonId,
                ConnectTime = a.ConnectTime,
                sessionId = a.sessionId
            };
        }
    }
}

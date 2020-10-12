using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class LessonTeacheerView
    {
        public int IdClass { get; set; }
        public int NameClass { get; set; }
        public List<Lesson> LessonsClass { get; set; }
    }
}

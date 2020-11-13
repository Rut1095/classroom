using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DocumentAddRequest
    {
        public int UserId { get; set; }
        public int ClassId { get; set; }
        public int LessonId { get; set; }
        public String FileBase64 { get; set; }
        public String FileName { get; set; }
    }
}

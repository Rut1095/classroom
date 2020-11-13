using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
     public class Document
    {
        public int Id { get; set; }
        public String FileName { get; set; }
        public int UploadUserId { get; set; }
        public String FilePath { get; set; }
        public int ClassLessonId { get; set; }
        public DateTime CreationTime { get; set; }

        public Document(DAL.Document doc)
        {
            this.Id = doc.Id;
            this.FileName = doc.fileName;
            this.UploadUserId = doc.uploadUserId;
            this.FilePath = doc.filePath;
            this.ClassLessonId = doc.ClassLessonId;
            this.CreationTime = doc.creationTime;
        }
    }
}

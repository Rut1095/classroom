using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class DocumentsLogic
    {
        public static List<DTO.Document> GetDocuments()
        {
            List<DTO.Document> documents = new List<DTO.Document>();
            try

            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {
                    foreach (var doc in db.Document)
                    {
                        documents.Add(new DTO.Document(doc));
                    }
                    return documents;
                }

            }
            catch
            {
                return new List<DTO.Document>();
            }
        }

        public static DTO.Document AddDocument(DocumentAddRequest request)
        {//
            try
            {
                string ext = request.FileName.Substring(request.FileName.IndexOf(".") + 1, 3);
                /////
                
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {
                    var classlesson = db.ClassLessons.FirstOrDefault(l => l.classId == request.ClassId && l.lessonId == request.LessonId);
                    if (classlesson != null)
                    {
                        DAL.Document doc = new DAL.Document();
                        doc.ClassLessonId = classlesson.Id;
                        doc.creationTime = DateTime.Now;
                        doc.fileName = request.FileName;
                        doc.filePath = "";
                        doc.uploadUserId = request.UserId;

                        doc = db.Document.Add(doc);
                        db.SaveChanges(); 

                        if(doc.Id > 0)
                        {
                            File.WriteAllBytes(@"E:\projects\classroom\classRoomServer\Api\Docs\" + doc.Id + "." + ext, Convert.FromBase64String(request.FileBase64));
                            doc.filePath = "https://10.0.0.5:44333/Docs/" + doc.Id + "." + ext;
                            db.SaveChanges();
                        }
                        return new DTO.Document(doc);

                    }
                    else
                        return null;

                }//ext
               
            }
            catch (Exception)
            {

                throw;
            }

            return null;
        }


    }
}

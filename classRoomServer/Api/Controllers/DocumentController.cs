using DTO;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Collections.Generic;

namespace Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("documents")]
    public class DocumentController : ApiController
    {

        [Route("{classId}/{lessonId}")]
        [HttpGet]
        public List<Document> GetAllDocument(int classId, int lessonId)
        {
            return BL.DocumentsLogic.GetDocuments(classId, lessonId);
        }


        [Route("")]
        [HttpPost]
        public Document AddDocument(DocumentAddRequest request)
        {
            return  BL.DocumentsLogic.AddDocument(request);
        }

        [Route("{docId}")]
        [HttpDelete]
        public bool RemoveDocument(int docId)
        {
            return BL.DocumentsLogic.RemoveDocument(docId);
        }


    }
}
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

        [Route("")]
        [HttpGet]
        public List<Document> GetAllDocument()
        {
            return BL.DocumentsLogic.GetDocuments();
        }


        [Route("")]
        [HttpPost]
        public Document AddDocument(DocumentAddRequest request)
        {
         
            return  BL.DocumentsLogic.AddDocument(request);

        }

    }
}
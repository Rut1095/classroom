using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("users")]
    public class UsersController : ApiController
    {
        [Route("login")]
        [HttpPost]
        public User Login(User user)
      
       {
            return BL.UsersLogic.Login(user);   
        }

        [Route("register")]
        [HttpPost]
        public bool Register(User user)
        {
            return BL.UsersLogic.Register(user);
        }
        [Route("activeUser/{ClassId}/{LessonId}/{UserId}/{sessionId}")]
        [HttpGet]
        public ActiveUser SetActiveUser(int ClassId,int LessonId,int UserId,string sessionId)
        {
            return BL.UsersLogic.SetActiveUser(ClassId,LessonId,UserId, sessionId);
        }

        //[Route("ActiveUser")]
        //[HttpPost]
        //public ActiveUser SetActiveUser(ActiveUser user)
        //{
        //    return BL.UsersLogic.SetActiveUser(user);
        //}
        [Route("GetActivesUsers")]
        [HttpPost]
        public List<ActiveUser> GetActivesUsers(ActiveUser user)
        {
            return BL.UsersLogic.GetActivesUsers(user);
        }
        //[Route("all/{ClassLessonId}")]
        //[HttpGet]
        //public List<User> GetAllUsers(int ClassLessonId)
        //{
        //    if()
        //    return BL.UsersLogic.GetUsers(ClassLessonId);
        //}

        [Route("{id}")]
        [HttpPost]
        public void SetlessonIsActive(string id)

        {
             BL.UsersLogic.StartNewLesson(id);
        }

    }
    
}

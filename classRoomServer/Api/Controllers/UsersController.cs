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
        [Route("activeUser/{ClassId}/{LessonId}/{UserId}/{sessionId}/{showCam}/{showMic}")]
        [HttpGet]
        public ActiveUser SetActiveUser(int ClassId,int LessonId,int UserId,string sessionId, bool showCam, bool showMic)
        {
            return BL.UsersLogic.SetActiveUser(ClassId,LessonId,UserId, sessionId, showCam, showMic);
        }

        [Route("activeUser/{ClassId}/{LessonId}/{UserId}/{sessionId}")]
        [HttpGet]
        public ActiveUser SetActiveUser(int ClassId, int LessonId, int UserId, string sessionId)
        {
            return BL.UsersLogic.SetActiveUser(ClassId, LessonId, UserId, sessionId, null, null);
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

       

        
        [Route("{userId}/showCamera/{showCamera}")]
        [HttpGet]
        public void SetShowCamera(int userId, bool showCamera)
        {
            BL.UsersLogic.SetShowCamera(userId,showCamera);
        }

        [Route("{userId}/showMicrophone/{showMicrophone}")]
        [HttpGet]
        public void SetMicrophone(int userId, bool showMicrophone)
        
       {
            BL.UsersLogic.SetMicrophone(userId, showMicrophone);
        }
        //[Route("userId")]
        //[HttpDelete]
        //public Users deleteUnactiveUser(int userId)
        //{
        //  return  BL.UsersLogic.deleteUnactiveUser(userId);
        //}


    }

}

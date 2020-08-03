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

        [Route("all")]
        [HttpGet]
        public List<User> GetAllUsers()
        {
            return BL.UsersLogic.GetUsers();
        }

    }
    
}

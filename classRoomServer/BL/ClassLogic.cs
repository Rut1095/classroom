using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL
{
  public static class  ClassLogic
    {
        static DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities();

        public static List<DTO.Classes> Getclasses() {  
            List<DTO.Classes> classes = new List<DTO.Classes>();
            try
            {
                foreach (var cl in db.Classes)
                {
                    classes.Add(new DTO.Classes(cl));
                }
                return classes;
            }
            catch
            {
                return new List<DTO.Classes>();
            }
        }
           
    }
}

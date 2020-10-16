using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL
{
    public static class ClassLogic
    {
        //static DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities();

        public static List<DTO.Classes> Getclasses()
        {
            List<DTO.Classes> classes = new List<DTO.Classes>();
            try

            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                {
                    foreach (var cl in db.Classes)
                    {
                        classes.Add(new DTO.Classes(cl));
                    }
                    return classes;
                }

            }
            catch
            {
                return new List<DTO.Classes>();
            }
        }

        public static List<DTO.Classes> GetclassesByTeacherId(int Id)
        {
            List<DTO.Classes> classes = new List<DTO.Classes>();
            try
            {
                using (DigitlClassRoomUpdateEntities db = new DigitlClassRoomUpdateEntities())
                
               {
                    //linq
                    var clesson = (
                        from cls in db.Classes
                        join clsLes in db.ClassLessons on cls.Id equals clsLes.classId
                        where clsLes.teacherId == Id
                        orderby cls.name
                        select cls
                        ).Distinct();
                 

                    foreach (var cl in clesson)
                    {
                        classes.Add(DTO.Classes.convertToDTO(cl));

                    }
                    return classes;
                    //}
                }


            }
            catch
            {
                return new List<DTO.Classes>();
            }
        }

    }
}

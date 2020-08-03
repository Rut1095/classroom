namespace DTO
{
    public class Lesson
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public int NumberUsers { get; set; }

        public Lesson()
        {

        }


        public Lesson(DAL.lessons lessonDal)
        {
            this.Id = lessonDal.Id;
            this.Name = lessonDal.name;
        }


        public DAL.lessons convertToDAL()
        {
           return new DAL.lessons() { Id = Id, name = Name };
        }

    }
}

namespace DTO
{
    public class Classes
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public int NumberUsers { get; set; }

        public Classes()
        {

        }


        public Classes(DAL.Classes classesDal)
        {
            this.Id = classesDal.Id;
            this.Name = classesDal.name;
        }

        public static DTO.Classes convertToDTO(DAL.Classes classes)
        {
            return new DTO.Classes() { 
                Id = classes.Id, 
                Name = classes.name
            };
        }

    }
}

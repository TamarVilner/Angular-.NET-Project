using WebApplication2.Models;

namespace AngularServerApp.Models
{
    public class Student
    {
        public int id { get; set; }
        public string? fName { get; set; }
        public string? lName { get; set; }
        public string? adress { get; set; }
        public int fon { get; set; }
        public DateTime active { get; set; }
        public int avg { get; set; }
        public EducationPrograms educationPrograms { get; set; }
        public string? classS { get; set; }
        public DaysAbsence[]? arrAbsence { get; set; }
    }

    public enum EducationPrograms
    {
        Engineers,
        Architecture,
        Mathematics,
        Dance,
        Singing
    }
}

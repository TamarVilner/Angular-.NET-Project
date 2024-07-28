using AngularServerApp.Models;
using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AngularServerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        public static List<Student> STUDENTS = new List<Student>
        {
            new Student() {id=1, fName="s1", lName="from server", adress="s1@gmail.com", fon=0673, avg=54, educationPrograms=EducationPrograms.Dance , classS="A", active=new DateTime(2023, 3, 10),  arrAbsence = new DaysAbsence[] { new DaysAbsence{ startDaysAbsence = new DateTime(2023, 05, 05), numberOfDaysAbsence = 3 }}},
            new Student() {id=2, fName="s2", lName="from server", adress="s2@gmail.com", fon=0673, avg=99, educationPrograms=EducationPrograms.Mathematics, classS="A", active=new DateTime(2024, 3, 10), arrAbsence = new DaysAbsence[] { new DaysAbsence { startDaysAbsence = new DateTime(2021, 06, 05), numberOfDaysAbsence = 8 }}},
            new Student() {id=3, fName="s3", lName="from server", adress="s3@gmail.com", fon=0543, avg=59, educationPrograms=EducationPrograms.Engineers, classS="B", active=new DateTime(2025, 3, 10), arrAbsence = new DaysAbsence[] { new DaysAbsence{ startDaysAbsence = new DateTime(2024, 01, 01), numberOfDaysAbsence = 4 }}}
        };

        // GET: api/<StudentsController>
        [HttpGet]
        public IEnumerable<Student> Get()
        {
            
            return STUDENTS;
        }

        //GET api/<StudentsController>/5
        //[HttpGet("{active}")]
        [HttpGet("filterByActive/{active}")]

        public IEnumerable<Student> Get(bool active)
        {
            if (active)
                return STUDENTS.Where(x => x.avg > 55);
            return  STUDENTS;
        }

        [HttpGet("filterById/{id}")]

        public Student Get(int id)
        {
            return STUDENTS.FirstOrDefault(x => x.id == id);
        }

        [HttpPost]
        public bool Post([FromBody] Student studentToSave)
        {
            STUDENTS.Add(studentToSave);
            return true;
        }

        // PUT api/<StudentsController>/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody] Student student)
        {
            Student? s = STUDENTS.Find(x => x.id == id);
            if (s == null)
                return false;
            s.fName = student.fName;
            s.lName = student.lName;
            s.adress = student.adress;
            s.fon = student.fon;
            s.avg = student.avg;
            s.classS = student.classS;
            s.active = student.active;
            s.arrAbsence = student.arrAbsence;
            s.educationPrograms = student.educationPrograms;

            return true;

        }

        // DELETE api/<StudentsController>/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            Student? student = STUDENTS.FirstOrDefault(x => x.id == id);
            if (student != null)
            {
                STUDENTS.Remove(student);
                return true;
            }
            return false;

        }
    }


}
